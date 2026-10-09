import base64
import hashlib
import hmac
import json
import os
import secrets
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, Query, HTTPException, Header, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "cleaned_tours.json"
INQUIRIES_FILE = DATA_DIR / "inquiries.json"
CUSTOM_TRIPS_FILE = DATA_DIR / "custom_trips.json"
HAPPY_TRAVELLERS_FILE = DATA_DIR / "happy_travellers.json"
REVIEW_UPLOADS_DIR = DATA_DIR / "review_uploads"

DATA_DIR.mkdir(parents=True, exist_ok=True)
REVIEW_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

ADMIN_USERNAME = os.getenv("TRIPPLANKARO_ADMIN_USERNAME", "")
ADMIN_PASSWORD = os.getenv("TRIPPLANKARO_ADMIN_PASSWORD", "")
SESSION_SECRET = os.getenv("TRIPPLANKARO_SESSION_SECRET", "")
SESSION_TTL_SECONDS = int(os.getenv("TRIPPLANKARO_SESSION_TTL", str(8 * 60 * 60)))

app = FastAPI(
    title="tripplankaro.com API",
    description="Backend API for tripplankaro.com - We plan, you enjoy.",
    version="2.0.0"
)

# Same-origin deployment is preferred. Local development uses the Vite origin.
CORS_ORIGINS = [origin.strip() for origin in os.getenv("TRIPPLANKARO_CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.mount("/media", StaticFiles(directory=str(REVIEW_UPLOADS_DIR)), name="review-media")


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def load_json_file(path: Path, default):
    if not path.exists():
        return default
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return default


def save_json_file(path: Path, data):
    temp = path.with_suffix(path.suffix + ".tmp")
    with temp.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    temp.replace(path)


def load_tours():
    data = load_json_file(DATA_FILE, [])
    return data if isinstance(data, list) else []


ALL_TOURS = load_tours()


def normalize_phone(phone: str) -> str:
    return "".join(ch for ch in phone if ch.isdigit())


def require_admin_configured():
    if not ADMIN_USERNAME or not ADMIN_PASSWORD or not SESSION_SECRET:
        raise HTTPException(
            status_code=503,
            detail="Admin authentication is not configured. Set TRIPPLANKARO_ADMIN_USERNAME, TRIPPLANKARO_ADMIN_PASSWORD and TRIPPLANKARO_SESSION_SECRET."
        )


def make_admin_token(username: str) -> str:
    payload = {
        "sub": username,
        "iat": int(time.time()),
        "exp": int(time.time()) + SESSION_TTL_SECONDS,
        "nonce": secrets.token_hex(8),
    }
    raw = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode()
    encoded = base64.urlsafe_b64encode(raw).decode().rstrip("=")
    signature = hmac.new(SESSION_SECRET.encode(), encoded.encode(), hashlib.sha256).hexdigest()
    return f"{encoded}.{signature}"


def require_admin(authorization: Optional[str] = Header(default=None)):
    require_admin_configured()
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing admin session")
    token = authorization[7:].strip()
    try:
        encoded, signature = token.split(".", 1)
        expected = hmac.new(SESSION_SECRET.encode(), encoded.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            raise ValueError("bad signature")
        padded = encoded + "=" * (-len(encoded) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded.encode()).decode())
        if payload.get("exp", 0) < int(time.time()) or payload.get("sub") != ADMIN_USERNAME:
            raise ValueError("expired")
        return payload
    except (ValueError, KeyError, json.JSONDecodeError, UnicodeDecodeError):
        raise HTTPException(status_code=401, detail="Invalid or expired admin session")


# Basic in-memory login throttle. For multi-instance production deployment, put rate limiting at the reverse proxy/WAF.
LOGIN_FAILURES = {}


def check_login_rate_limit(client_key: str):
    now = time.time()
    attempts = [t for t in LOGIN_FAILURES.get(client_key, []) if now - t < 900]
    LOGIN_FAILURES[client_key] = attempts
    if len(attempts) >= 5:
        raise HTTPException(status_code=429, detail="Too many failed login attempts. Try again later.")


class AdminLoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=1, max_length=200)


class InquiryRequest(BaseModel):
    tour_id: Optional[str] = None
    tour_name: Optional[str] = None
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=30)
    email: Optional[str] = None
    squad_size: int = Field(default=2, ge=1, le=100)
    departure_city: Optional[str] = Field(default=None, max_length=120)
    travel_date: Optional[str] = None
    meal_preference: Optional[str] = Field(default=None, max_length=120)
    notes: Optional[str] = Field(default=None, max_length=2000)
    status: str = Field(default="new", max_length=30)

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, value):
        digits = normalize_phone(value)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Please enter a valid phone number")
        return value.strip()


class CustomTripRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=30)
    email: Optional[str] = None
    vibe: Optional[str] = Field(default="Squad Trips", max_length=120)
    destination: Optional[str] = Field(default=None, max_length=120)
    duration: Optional[str] = Field(default="5-7 Days", max_length=80)
    budget_per_person: Optional[str] = Field(default="₹15,000 - ₹25,000", max_length=80)
    squad_size: int = Field(default=4, ge=1, le=100)
    notes: Optional[str] = Field(default=None, max_length=2000)


class ReviewRecord(BaseModel):
    id: str
    created_at: str
    updated_at: str
    status: str
    name: str
    phone: str
    email: Optional[str] = None
    trip_name: Optional[str] = None
    destination: Optional[str] = None
    rating: int
    story: str
    photo_url: Optional[str] = None
    likes: int = 0


def normalize_legacy_inquiry(record: dict) -> dict:
    """Keep the old JSON shape readable while filling the standardized fields."""
    created = record.get("created_at") or now_iso()
    return {
        "id": str(record.get("id") or uuid.uuid4().hex[:8]),
        "created_at": created,
        "updated_at": record.get("updated_at") or created,
        "status": record.get("status") or "new",
        "tour_id": record.get("tour_id"),
        "tour_name": record.get("tour_name"),
        "name": record.get("name") or "",
        "phone": record.get("phone") or "",
        "email": record.get("email"),
        "squad_size": int(record.get("squad_size") or 2),
        "departure_city": record.get("departure_city"),
        "travel_date": record.get("travel_date"),
        "meal_preference": record.get("meal_preference"),
        "notes": record.get("notes"),
    }


def load_inquiries():
    raw = load_json_file(INQUIRIES_FILE, [])
    normalized = [normalize_legacy_inquiry(x) for x in raw if isinstance(x, dict)]
    if normalized != raw:
        save_json_file(INQUIRIES_FILE, normalized)
    return normalized


def load_reviews():
    raw = load_json_file(HAPPY_TRAVELLERS_FILE, [])
    return [x for x in raw if isinstance(x, dict) and x.get("status") == "published"]


def save_tours(tours):
    save_json_file(DATA_FILE, tours)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "company": "tripplankaro.com", "tagline": "We plan, you enjoy"}


@app.get("/api/stats")
def get_stats():
    reviews = load_reviews()
    review_count = len(reviews)
    rating = round(sum(r.get("rating", 0) for r in reviews) / review_count, 1) if review_count else 0
    destinations_count = len({str(t.get("destination", "")).strip() for t in ALL_TOURS if t.get("destination")})
    return {
        "company_name": "tripplankaro.com",
        "tagline": "We plan, you enjoy",
        "total_tours": len(ALL_TOURS),
        "destinations_count": destinations_count,
        "happy_travelers": review_count,
        "rating": rating,
        "reviews_count": review_count,
        "whatsapp_number": "+91 6353731027",
        "whatsapp_url": "https://wa.me/916353731027?text=Hey%20Tripplankaro%20team!%20I%20want%20to%20plan%20a%20trip.%20Can%20you%20help%20me%3F",
        "instagram_handle": "@tripplankaro",
        "instagram_url": "https://instagram.com/tripplankaro",
        "linkedin_url": "https://linkedin.com/company/tripplankaro"
    }


@app.post("/api/admin/login")
def admin_login(credentials: AdminLoginRequest, request: Request):
    require_admin_configured()
    client_key = request.client.host if request.client else "unknown"
    check_login_rate_limit(client_key)
    valid_user = hmac.compare_digest(credentials.username, ADMIN_USERNAME)
    valid_pass = hmac.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (valid_user and valid_pass):
        LOGIN_FAILURES.setdefault(client_key, []).append(time.time())
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    LOGIN_FAILURES.pop(client_key, None)
    return {"success": True, "token": make_admin_token(ADMIN_USERNAME), "expires_in": SESSION_TTL_SECONDS}


@app.get("/api/admin/session")
def admin_session(authorization: Optional[str] = Header(default=None)):
    payload = require_admin(authorization)
    return {"authenticated": True, "username": payload["sub"], "expires_at": payload["exp"]}


@app.get("/api/tours")
def get_tours(
    q: Optional[str] = None,
    tour_type: Optional[str] = None,
    vibe: Optional[str] = None,
    destination: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    duration_cat: Optional[str] = None,
    sort_by: Optional[str] = "featured",
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0)
):
    results = ALL_TOURS.copy()
    if q:
        q_lower = q.lower().strip()
        results = [
            t for t in results
            if q_lower in t["tour_name"].lower()
            or q_lower in t["destination"].lower()
            or q_lower in t.get("overview", "").lower()
            or any(q_lower in v.lower() for v in t.get("vibes", []))
        ]
    if tour_type and tour_type.lower() != "all":
        results = [t for t in results if t["tour_type"].lower() == tour_type.lower()]
    if vibe and vibe.lower() != "all":
        results = [t for t in results if any(vibe.lower() in v.lower() for v in t.get("vibes", []))]
    if destination and destination.lower() != "all":
        results = [
            t for t in results
            if destination.lower() in t.get("destination_key", "").lower()
            or destination.lower() in t["destination"].lower()
        ]
    if min_price is not None:
        results = [t for t in results if t["pricing"]["discounted_price_num"] >= min_price]
    if max_price is not None:
        results = [t for t in results if t["pricing"]["discounted_price_num"] <= max_price]
    if duration_cat == "short":
        results = [t for t in results if t["days"] <= 4]
    elif duration_cat == "week":
        results = [t for t in results if 5 <= t["days"] <= 8]
    elif duration_cat == "long":
        results = [t for t in results if t["days"] >= 9]
    if sort_by == "price_asc":
        results.sort(key=lambda x: x["pricing"]["discounted_price_num"])
    elif sort_by == "price_desc":
        results.sort(key=lambda x: x["pricing"]["discounted_price_num"], reverse=True)
    elif sort_by == "rating":
        results.sort(key=lambda x: (x.get("rating", 0), x.get("review_count", 0)), reverse=True)
    elif sort_by == "duration_asc":
        results.sort(key=lambda x: x["days"])
    elif sort_by == "duration_desc":
        results.sort(key=lambda x: x["days"], reverse=True)
    else:
        results.sort(key=lambda x: (x.get("is_featured", False), x.get("is_trending", False), x.get("rating", 0)), reverse=True)
    total_count = len(results)
    return {"total": total_count, "offset": offset, "limit": limit, "tours": results[offset: offset + limit]}


@app.get("/api/tours/{tour_id}")
def get_tour_detail(tour_id: str):
    for tour in ALL_TOURS:
        if str(tour["tour_id"]) == str(tour_id):
            return tour
    raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")


@app.get("/api/destinations")
def get_destinations():
    counts, sample_images, dest_types = {}, {}, {}
    for t in ALL_TOURS:
        d = t["destination"]
        counts[d] = counts.get(d, 0) + 1
        if d not in sample_images:
            sample_images[d] = t["image"]
            dest_types[d] = t["tour_type"]
    return [
        {"name": d, "tour_count": count, "image": sample_images.get(d), "tour_type": dest_types.get(d, "Domestic")}
        for d, count in sorted(counts.items(), key=lambda x: x[1], reverse=True)[:12]
    ]


@app.get("/api/vibes")
def get_vibes():
    vibe_counts = {}
    for t in ALL_TOURS:
        for v in t.get("vibes", []):
            vibe_counts[v] = vibe_counts.get(v, 0) + 1
    vibe_meta = {
        "#AestheticStays": {"label": "Aesthetic Stays", "emoji": "🏡", "desc": "Boutique stays & mountain villas"},
        "#SquadGoals": {"label": "Squad Trips", "emoji": "👯‍♂️", "desc": "Group party villas & road trips"},
        "#InstaWorthy": {"label": "Insta-Worthy", "emoji": "📸", "desc": "Photogenic spots & sunset reels"},
        "#AdrenalineRush": {"label": "Adventure & Treks", "emoji": "🧗‍♀️", "desc": "Rafting, treks & jungle safaris"},
        "#BudgetBangers": {"label": "Budget Backpackers", "emoji": "💸", "desc": "High on experience, low on cost"},
        "#SunsetChasers": {"label": "Beach & Chill", "emoji": "🏖️", "desc": "Coastal vibes & sunset sundowners"},
        "#SoloExplorer": {"label": "Solo Friendly", "emoji": "🎒", "desc": "Safe escapes to reset & explore"},
        "#CultureCraze": {"label": "Heritage & Culture", "emoji": "🕌", "desc": "Royal palaces & historic streets"}
    }
    return [
        {"tag": tag, "label": vibe_meta.get(tag, {"label": tag.replace("#", "")}).get("label", tag),
         "emoji": vibe_meta.get(tag, {}).get("emoji", "✨"),
         "description": vibe_meta.get(tag, {}).get("desc", "Curated experience"), "count": count}
        for tag, count in sorted(vibe_counts.items(), key=lambda x: x[1], reverse=True)
    ]


@app.post("/api/inquiries")
def submit_inquiry(inquiry: InquiryRequest):
    inquiries = load_inquiries()
    timestamp = now_iso()
    inquiry_record = {
        "id": uuid.uuid4().hex[:8],
        "created_at": timestamp,
        "updated_at": timestamp,
        "status": inquiry.status or "new",
        **inquiry.model_dump(exclude={"status"}),
    }
    inquiries.append(inquiry_record)
    save_json_file(INQUIRIES_FILE, inquiries)
    return {
        "success": True,
        "message": f"Thanks {inquiry.name}! Your inquiry for '{inquiry.tour_name or 'custom trip'}' has been received. Our team will contact you on WhatsApp/Phone shortly!",
        "inquiry_id": inquiry_record["id"]
    }


@app.post("/api/custom-trip")
def submit_custom_trip(trip: CustomTripRequest):
    trips = load_json_file(CUSTOM_TRIPS_FILE, [])
    if not isinstance(trips, list):
        trips = []
    timestamp = now_iso()
    trip_record = {"id": uuid.uuid4().hex[:8], "created_at": timestamp, "updated_at": timestamp, "status": "new", **trip.model_dump()}
    trips.append(trip_record)
    save_json_file(CUSTOM_TRIPS_FILE, trips)
    return {"success": True, "message": f"Awesome {trip.name}! Your custom trip plan for {trip.destination or trip.vibe} has been received.", "plan_id": trip_record["id"]}


@app.get("/api/happy-travellers")
def get_happy_travellers(limit: int = Query(default=30, ge=1, le=100)):
    reviews = load_reviews()
    reviews.sort(key=lambda r: r.get("created_at", ""), reverse=True)
    public = []
    for r in reviews[:limit]:
        public.append({k: r.get(k) for k in ["id", "created_at", "name", "trip_name", "destination", "rating", "story", "photo_url", "likes"]})
    count = len(reviews)
    avg = round(sum(r.get("rating", 0) for r in reviews) / count, 1) if count else 0
    return {"total": count, "average_rating": avg, "reviews": public}


REVIEW_RATE_LIMIT = {}


def check_review_rate_limit(request: Request):
    key = request.client.host if request.client else "unknown"
    now = time.time()
    recent = [t for t in REVIEW_RATE_LIMIT.get(key, []) if now - t < 600]
    if len(recent) >= 3:
        raise HTTPException(status_code=429, detail="Too many review submissions. Please try again later.")
    recent.append(now)
    REVIEW_RATE_LIMIT[key] = recent


@app.post("/api/happy-travellers")
def create_happy_traveller(
    request: Request,
    name: str = Form(..., min_length=2, max_length=100),
    phone: str = Form(..., min_length=7, max_length=30),
    email: Optional[str] = Form(default=None, max_length=200),
    trip_name: Optional[str] = Form(default=None, max_length=160),
    destination: Optional[str] = Form(default=None, max_length=120),
    rating: int = Form(..., ge=1, le=5),
    story: str = Form(..., min_length=10, max_length=3000),
    photo: Optional[UploadFile] = File(default=None),
):
    check_review_rate_limit(request)
    phone_digits = normalize_phone(phone)
    if len(phone_digits) < 7 or len(phone_digits) > 15:
        raise HTTPException(status_code=422, detail="Please enter a valid phone number")
    email_clean = email.strip() if email else None
    if email_clean and "@" not in email_clean:
        raise HTTPException(status_code=422, detail="Please enter a valid email address")

    reviews = load_json_file(HAPPY_TRAVELLERS_FILE, [])
    if not isinstance(reviews, list):
        reviews = []
    duplicate = any(
        normalize_phone(str(r.get("phone", ""))) == phone_digits
        and (str(r.get("trip_name", "")).strip().lower() == str(trip_name or "").strip().lower())
        and r.get("status") == "published"
        for r in reviews
    )
    if duplicate:
        raise HTTPException(status_code=409, detail="A Happy Traveller post for this phone number and trip already exists.")

    photo_url = None
    if photo and photo.filename:
        allowed = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
        ext = allowed.get((photo.content_type or "").lower())
        if not ext:
            raise HTTPException(status_code=400, detail="Only JPG, PNG or WEBP photos are allowed.")
        content = photo.file.read(5 * 1024 * 1024 + 1)
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Photo must be 5 MB or smaller.")
        filename = f"{uuid.uuid4().hex}{ext}"
        target = REVIEW_UPLOADS_DIR / filename
        target.write_bytes(content)
        photo_url = f"/media/{filename}"

    timestamp = now_iso()
    record = {
        "id": uuid.uuid4().hex[:12],
        "created_at": timestamp,
        "updated_at": timestamp,
        "status": "published",
        "name": name.strip(),
        "phone": phone.strip(),
        "email": email_clean,
        "trip_name": trip_name.strip() if trip_name else None,
        "destination": destination.strip() if destination else None,
        "rating": rating,
        "story": story.strip(),
        "photo_url": photo_url,
        "likes": 0,
    }
    reviews.append(record)
    save_json_file(HAPPY_TRAVELLERS_FILE, reviews)
    return {"success": True, "message": "Your Happy Traveller post is live!", "review": {k: record.get(k) for k in ["id", "created_at", "name", "trip_name", "destination", "rating", "story", "photo_url", "likes"]}}


@app.post("/api/happy-travellers/{review_id}/like")
def like_happy_traveller(review_id: str, request: Request):
    # Lightweight abuse guard: one like per IP per post per 10 minutes in this process.
    key = f"like:{request.client.host if request.client else 'unknown'}:{review_id}"
    now = time.time()
    recent = REVIEW_RATE_LIMIT.get(key, [])
    recent = [t for t in recent if now - t < 600]
    if recent:
        raise HTTPException(status_code=429, detail="You have already liked this post recently.")
    recent.append(now)
    REVIEW_RATE_LIMIT[key] = recent

    reviews = load_json_file(HAPPY_TRAVELLERS_FILE, [])
    for review in reviews:
        if review.get("id") == review_id and review.get("status") == "published":
            review["likes"] = int(review.get("likes", 0)) + 1
            review["updated_at"] = now_iso()
            save_json_file(HAPPY_TRAVELLERS_FILE, reviews)
            return {"success": True, "likes": review["likes"]}
    raise HTTPException(status_code=404, detail="Happy Traveller post not found")


# Admin endpoints
@app.get("/api/admin/inquiries")
def get_admin_inquiries(authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    return load_inquiries()


@app.get("/api/admin/custom-trips")
def get_admin_custom_trips(authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    data = load_json_file(CUSTOM_TRIPS_FILE, [])
    return data if isinstance(data, list) else []


@app.get("/api/admin/happy-travellers")
def get_admin_happy_travellers(authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    reviews = load_json_file(HAPPY_TRAVELLERS_FILE, [])
    return reviews if isinstance(reviews, list) else []


@app.delete("/api/admin/happy-travellers/{review_id}")
def delete_happy_traveller(review_id: str, authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    reviews = load_json_file(HAPPY_TRAVELLERS_FILE, [])
    kept = [r for r in reviews if r.get("id") != review_id]
    if len(kept) == len(reviews):
        raise HTTPException(status_code=404, detail="Happy Traveller post not found")
    removed = next((r for r in reviews if r.get("id") == review_id), None)
    if removed and removed.get("photo_url"):
        filename = Path(str(removed["photo_url"])).name
        try:
            (REVIEW_UPLOADS_DIR / filename).unlink(missing_ok=True)
        except OSError:
            pass
    save_json_file(HAPPY_TRAVELLERS_FILE, kept)
    return {"success": True, "deleted_review_id": review_id}


@app.post("/api/admin/tours")
def create_tour(tour: dict, authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    global ALL_TOURS
    if not tour.get("tour_name") or not tour.get("destination"):
        raise HTTPException(status_code=400, detail="tour_name and destination are required")
    numeric_ids = [int(t["tour_id"]) for t in ALL_TOURS if str(t.get("tour_id", "")).isdigit()]
    tour["tour_id"] = str(max(numeric_ids, default=0) + 1)
    ALL_TOURS.append(tour)
    save_tours(ALL_TOURS)
    return {"success": True, "tour": tour}


@app.put("/api/admin/tours/{tour_id}")
def update_tour(tour_id: str, tour: dict, authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    global ALL_TOURS
    for i, existing in enumerate(ALL_TOURS):
        if str(existing.get("tour_id")) == str(tour_id):
            tour["tour_id"] = str(tour_id)
            ALL_TOURS[i] = tour
            save_tours(ALL_TOURS)
            return {"success": True, "tour": tour}
    raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")


@app.delete("/api/admin/tours/{tour_id}")
def delete_tour(tour_id: str, authorization: Optional[str] = Header(default=None)):
    require_admin(authorization)
    global ALL_TOURS
    before = len(ALL_TOURS)
    ALL_TOURS = [t for t in ALL_TOURS if str(t.get("tour_id")) != str(tour_id)]
    if len(ALL_TOURS) == before:
        raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")
    save_tours(ALL_TOURS)
    return {"success": True, "deleted_tour_id": str(tour_id)}

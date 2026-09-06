import os
import json
import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, Query, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="tripplankaro.com API",
    description="Backend API for tripplankaro.com - We plan, you enjoy.",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite runs on 5173, 3000, or any local origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "cleaned_tours.json")
INQUIRIES_FILE = os.path.join(os.path.dirname(__file__), "data", "inquiries.json")
CUSTOM_TRIPS_FILE = os.path.join(os.path.dirname(__file__), "data", "custom_trips.json")
ADMIN_KEY = os.getenv("TRIPPLANKARO_ADMIN_KEY", "tripplan2026")

def load_tours():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

ALL_TOURS = load_tours()


def require_admin(x_admin_key: Optional[str] = Header(default=None)):
    if not x_admin_key or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing admin key")


def save_tours(tours):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(tours, f, indent=2, ensure_ascii=False)


def load_json_file(path):
    if not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except (OSError, json.JSONDecodeError):
        return []

class InquiryRequest(BaseModel):
    tour_id: Optional[str] = None
    tour_name: Optional[str] = None
    name: str
    phone: str
    email: Optional[str] = None
    squad_size: Optional[int] = 2
    travel_date: Optional[str] = None
    notes: Optional[str] = None

class CustomTripRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    vibe: Optional[str] = "Squad Trips"
    destination: Optional[str] = None
    duration: Optional[str] = "5-7 Days"
    budget_per_person: Optional[str] = "₹15,000 - ₹25,000"
    squad_size: Optional[int] = 4
    notes: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {"status": "ok", "company": "tripplankaro.com", "tagline": "We plan, you enjoy"}

@app.get("/api/stats")
def get_stats():
    return {
        "company_name": "tripplankaro.com",
        "tagline": "We plan, you enjoy",
        "total_tours": len(ALL_TOURS),
        "destinations_count": 35,
        "happy_travelers": "14,500+",
        "rating": 4.9,
        "reviews_count": "3,800+",
        "whatsapp_number": "+91 9016272544",
        "whatsapp_url": "https://wa.me/919016272544?text=Hey%20Tripplankaro%20team!%20I%20want%20to%20plan%20a%20trip.%20Can%20you%20help%20me%20with%20custom%20itineraries%3F",
        "instagram_handle": "@tripplankaro",
        "instagram_url": "https://instagram.com/tripplankaro",
        "linkedin_url": "https://linkedin.com/company/tripplankaro"
    }

@app.get("/api/tours")
def get_tours(
    q: Optional[str] = None,
    tour_type: Optional[str] = None,
    vibe: Optional[str] = None,
    destination: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    duration_cat: Optional[str] = None, # "short", "week", "long"
    sort_by: Optional[str] = "featured", # "featured", "price_asc", "price_desc", "rating", "duration"
    limit: int = 50,
    offset: int = 0
):
    results = ALL_TOURS.copy()

    # Search filter
    if q:
        q_lower = q.lower().strip()
        results = [
            t for t in results
            if q_lower in t["tour_name"].lower()
            or q_lower in t["destination"].lower()
            or q_lower in t["overview"].lower()
            or any(q_lower in v.lower() for v in t.get("vibes", []))
        ]

    # Tour Type filter
    if tour_type and tour_type.lower() != "all":
        results = [t for t in results if t["tour_type"].lower() == tour_type.lower()]

    # Vibe filter
    if vibe and vibe.lower() != "all":
        results = [t for t in results if any(vibe.lower() in v.lower() for v in t.get("vibes", []))]

    # Destination filter
    if destination and destination.lower() != "all":
        results = [
            t for t in results 
            if destination.lower() in t["destination_key"].lower() or destination.lower() in t["destination"].lower()
        ]

    # Price range filter
    if min_price is not None:
        results = [t for t in results if t["pricing"]["discounted_price_num"] >= min_price]
    if max_price is not None:
        results = [t for t in results if t["pricing"]["discounted_price_num"] <= max_price]

    # Duration filter
    if duration_cat:
        if duration_cat == "short":
            results = [t for t in results if t["days"] <= 4]
        elif duration_cat == "week":
            results = [t for t in results if 5 <= t["days"] <= 8]
        elif duration_cat == "long":
            results = [t for t in results if t["days"] >= 9]

    # Sorting
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
    else: # featured
        results.sort(key=lambda x: (x.get("is_featured", False), x.get("is_trending", False), x.get("rating", 0)), reverse=True)

    total_count = len(results)
    paginated = results[offset : offset + limit]

    return {
        "total": total_count,
        "offset": offset,
        "limit": limit,
        "tours": paginated
    }

@app.get("/api/tours/{tour_id}")
def get_tour_detail(tour_id: str):
    for tour in ALL_TOURS:
        if str(tour["tour_id"]) == str(tour_id):
            return tour
    raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")

@app.get("/api/destinations")
def get_destinations():
    counts = {}
    sample_images = {}
    dest_types = {}
    
    for t in ALL_TOURS:
        d = t["destination"]
        counts[d] = counts.get(d, 0) + 1
        if d not in sample_images:
            sample_images[d] = t["image"]
            dest_types[d] = t["tour_type"]
            
    sorted_dests = sorted(counts.items(), key=lambda x: x[1], reverse=True)
    return [
        {
            "name": d,
            "tour_count": count,
            "image": sample_images.get(d),
            "tour_type": dest_types.get(d, "Domestic")
        }
        for d, count in sorted_dests[:12]
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
    
    results = []
    for tag, count in vibe_counts.items():
        meta = vibe_meta.get(tag, {"label": tag.replace("#", ""), "emoji": "✨", "desc": "Curated experience"})
        results.append({
            "tag": tag,
            "label": meta["label"],
            "emoji": meta["emoji"],
            "description": meta["desc"],
            "count": count
        })
    results.sort(key=lambda x: x["count"], reverse=True)
    return results

@app.post("/api/inquiries")
def submit_inquiry(inquiry: InquiryRequest):
    os.makedirs(os.path.dirname(INQUIRIES_FILE), exist_ok=True)
    inquiries = []
    if os.path.exists(INQUIRIES_FILE):
        try:
            with open(INQUIRIES_FILE, "r", encoding="utf-8") as f:
                inquiries = json.load(f)
        except Exception:
            inquiries = []
            
    inquiry_record = {
        "id": str(uuid.uuid4())[:8],
        "created_at": datetime.now().isoformat(),
        **inquiry.model_dump()
    }
    inquiries.append(inquiry_record)
    with open(INQUIRIES_FILE, "w", encoding="utf-8") as f:
        json.dump(inquiries, f, indent=2, ensure_ascii=False)
        
    return {
        "success": True,
        "message": f"Thanks {inquiry.name}! Your inquiry for '{inquiry.tour_name or 'custom trip'}' has been received. Our team will contact you on WhatsApp/Phone shortly!",
        "inquiry_id": inquiry_record["id"]
    }

@app.post("/api/custom-trip")
def submit_custom_trip(trip: CustomTripRequest):
    os.makedirs(os.path.dirname(CUSTOM_TRIPS_FILE), exist_ok=True)
    trips = []
    if os.path.exists(CUSTOM_TRIPS_FILE):
        try:
            with open(CUSTOM_TRIPS_FILE, "r", encoding="utf-8") as f:
                trips = json.load(f)
        except Exception:
            trips = []
            
    trip_record = {
        "id": str(uuid.uuid4())[:8],
        "created_at": datetime.now().isoformat(),
        **trip.model_dump()
    }
    trips.append(trip_record)
    with open(CUSTOM_TRIPS_FILE, "w", encoding="utf-8") as f:
        json.dump(trips, f, indent=2, ensure_ascii=False)
        
    return {
        "success": True,
        "message": f"Awesome {trip.name}! Your custom trip plan for {trip.destination or trip.vibe} has been locked in. Our trip architects are building your itinerary!",
        "plan_id": trip_record["id"]
    }


@app.get("/api/admin/inquiries")
def get_admin_inquiries(x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    return load_json_file(INQUIRIES_FILE)


@app.get("/api/admin/custom-trips")
def get_admin_custom_trips(x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    return load_json_file(CUSTOM_TRIPS_FILE)


@app.post("/api/admin/tours")
def create_tour(tour: dict, x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    global ALL_TOURS
    if not tour.get("tour_name") or not tour.get("destination"):
        raise HTTPException(status_code=400, detail="tour_name and destination are required")
    if any(str(t.get("tour_id")) == str(tour.get("tour_id")) for t in ALL_TOURS if tour.get("tour_id") is not None):
        raise HTTPException(status_code=409, detail="Tour ID already exists")
    numeric_ids = [int(t["tour_id"]) for t in ALL_TOURS if str(t.get("tour_id", "")).isdigit()]
    tour["tour_id"] = str(max(numeric_ids, default=0) + 1)
    ALL_TOURS.append(tour)
    save_tours(ALL_TOURS)
    return {"success": True, "tour": tour}


@app.put("/api/admin/tours/{tour_id}")
def update_tour(tour_id: str, tour: dict, x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    global ALL_TOURS
    for i, existing in enumerate(ALL_TOURS):
        if str(existing.get("tour_id")) == str(tour_id):
            tour["tour_id"] = str(tour_id)
            ALL_TOURS[i] = tour
            save_tours(ALL_TOURS)
            return {"success": True, "tour": tour}
    raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")


@app.delete("/api/admin/tours/{tour_id}")
def delete_tour(tour_id: str, x_admin_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_key)
    global ALL_TOURS
    before = len(ALL_TOURS)
    ALL_TOURS = [t for t in ALL_TOURS if str(t.get("tour_id")) != str(tour_id)]
    if len(ALL_TOURS) == before:
        raise HTTPException(status_code=404, detail=f"Tour {tour_id} not found")
    save_tours(ALL_TOURS)
    return {"success": True, "deleted_tour_id": str(tour_id)}

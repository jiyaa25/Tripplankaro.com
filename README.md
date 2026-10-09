# TripPlanKaro

TripPlanKaro is a React/Vite travel website backed by FastAPI. The current source contains the sampled tour catalogue plus customer enquiry, custom-trip, wishlist, squad cost-splitting, admin management and a real **Happy Travellers** community feed.

## Project structure

```text
tripplankaro/
├── backend/
│   ├── main.py
│   ├── clean_tours.py
│   ├── requirements.txt
│   ├── .env.example
│   └── data/
│       ├── cleaned_tours.json
│       ├── inquiries.json
│       ├── happy_travellers.json
│       └── review_uploads/
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
```

## Run locally

### 1. Backend

From the project root:

```bash
cd backend
python -m venv .venv
```

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
$env:TRIPPLANKARO_ADMIN_USERNAME="admin"
$env:TRIPPLANKARO_ADMIN_PASSWORD="replace-with-your-strong-password"
$env:TRIPPLANKARO_SESSION_SECRET="replace-with-a-long-random-secret"
```

**macOS/Linux:**

```bash
source .venv/bin/activate
export TRIPPLANKARO_ADMIN_USERNAME="admin"
export TRIPPLANKARO_ADMIN_PASSWORD="replace-with-your-strong-password"
export TRIPPLANKARO_SESSION_SECRET="replace-with-a-long-random-secret"
```

Install dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Backend health check:

```text
http://127.0.0.1:8001/api/health
```

Interactive API documentation:

```text
http://127.0.0.1:8001/docs
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

Vite proxies both `/api` and uploaded review `/media` files to the FastAPI server.

## Admin portal

The admin portal now uses **backend authentication**, not a password embedded in the frontend bundle.

1. Set `TRIPPLANKARO_ADMIN_USERNAME`.
2. Set `TRIPPLANKARO_ADMIN_PASSWORD`.
3. Set a long random `TRIPPLANKARO_SESSION_SECRET`.
4. Start the backend.
5. Open the website and use the lock icon.
6. Sign in with the configured username/password.

The backend issues a short-lived signed session token. The browser keeps it in `sessionStorage`; admin API calls use `Authorization: Bearer <token>`.

For a production deployment, put the three secrets in the hosting provider's secret/environment-variable manager. Never place them in `frontend/.env`, source control, or client-side JavaScript.

## Customer enquiry data model

Booking inquiries now use one consistent schema while remaining compatible with the existing `inquiries.json` records. The standardized record includes:

- `id`
- `created_at`
- `updated_at`
- `status`
- `tour_id`
- `tour_name`
- `name`
- `phone`
- `email`
- `squad_size`
- `departure_city`
- `travel_date`
- `meal_preference`
- `notes`

Existing records are normalized when they are read, so old data is not discarded.

## Happy Travellers community

The old hardcoded testimonials have been removed. The public section starts at **0 posts / 0.0 rating** and grows only from real submissions.

Customers can:

- submit their name and phone/WhatsApp number;
- optionally provide email, trip name and destination;
- select a 1–5 rating;
- write their own travel story;
- optionally upload a JPG/PNG/WEBP trip photo up to 5 MB;
- see their post immediately after publishing;
- like other traveller posts.

The public API never exposes the reviewer's phone or email. Admin can inspect those private contact details and remove a post.

The website refreshes the public feed periodically so new posts from other visitors appear without a manual page refresh.

For production, SMS/WhatsApp OTP verification can be added as a separate identity-verification layer using a provider such as MSG91, Twilio or another chosen provider. The current design intentionally avoids inventing a fake OTP mechanism when no messaging provider is configured.

## API routes

### Public

- `GET /api/health`
- `GET /api/stats`
- `GET /api/tours`
- `GET /api/tours/{tour_id}`
- `GET /api/destinations`
- `GET /api/vibes`
- `POST /api/inquiries`
- `POST /api/custom-trip`
- `GET /api/happy-travellers`
- `POST /api/happy-travellers`
- `POST /api/happy-travellers/{review_id}/like`

### Admin

- `POST /api/admin/login`
- `GET /api/admin/session`
- `GET /api/admin/inquiries`
- `GET /api/admin/custom-trips`
- `GET /api/admin/happy-travellers`
- `DELETE /api/admin/happy-travellers/{review_id}`
- `POST /api/admin/tours`
- `PUT /api/admin/tours/{tour_id}`
- `DELETE /api/admin/tours/{tour_id}`

## Tour loading

The tour explorer loads 60 tours at a time and supports:

```text
Showing 1–60 of 165 tours
[ Load More Tours ]
```

The next batch is fetched with the API's `offset` parameter and appended to the existing grid. Changing a search/filter/sort starts a fresh result set.

## WhatsApp

The site's WhatsApp contact has been standardized to:

```text
+91 6353731027
```

## Production notes

- Use HTTPS.
- Store admin credentials and session secret in the hosting platform's secret manager.
- Put the FastAPI app behind a production reverse proxy such as Nginx, Caddy or the hosting platform's managed proxy.
- Use persistent storage/object storage for customer-uploaded photos in production; the included local `data/review_uploads` directory is suitable for a single-server deployment but not a scalable multi-instance architecture.
- Add a real SMS/WhatsApp OTP provider before advertising phone verification as a verified identity feature.
- Back up `backend/data` regularly or move customer data to a managed database as traffic grows.

## Frontend production build

```bash
cd frontend
npm install
npm run build
npm run preview
```

`frontend/node_modules` and `frontend/dist` are intentionally excluded from the source archive. Run `npm install` locally so platform-specific dependencies are installed correctly.

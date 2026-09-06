# TripPlanKaro

TripPlanKaro is a React/Vite frontend backed by a FastAPI API. The project contains 165 cleaned tours, tour filtering, inquiry submission, custom-trip requests, wishlist support, a squad bill splitter, and an admin portal.

## Project structure

```text
tripplankaro/
├── backend/
│   ├── main.py
│   ├── clean_tours.py
│   ├── requirements.txt
│   └── data/
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
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt

# Optional: set a custom admin key
# Windows PowerShell: $env:TRIPPLANKARO_ADMIN_KEY = "your-key"
# macOS/Linux: export TRIPPLANKARO_ADMIN_KEY=your-key

uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Backend health check: `http://127.0.0.1:8001/api/health`
API docs: `http://127.0.0.1:8001/docs`

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The Vite development server proxies `/api` requests to `http://127.0.0.1:8001`. Start the backend first so the tours and forms work.

### Production build

```bash
cd frontend
npm install
npm run build
npm run preview
```

## Admin portal

The UI opens the admin portal from the lock icon. The default local key is `tripplan2026`. For a real deployment, set `TRIPPLANKARO_ADMIN_KEY` on the backend and `VITE_ADMIN_KEY` for the frontend build to the same value.

The backend now protects admin inquiry/custom-trip/tour-management endpoints with `X-Admin-Key`.

## API routes

- `GET /api/health`
- `GET /api/stats`
- `GET /api/tours`
- `GET /api/tours/{tour_id}`
- `GET /api/destinations`
- `GET /api/vibes`
- `POST /api/inquiries`
- `POST /api/custom-trip`
- `GET /api/admin/inquiries` (admin key)
- `GET /api/admin/custom-trips` (admin key)
- `POST /api/admin/tours` (admin key)
- `PUT /api/admin/tours/{tour_id}` (admin key)
- `DELETE /api/admin/tours/{tour_id}` (admin key)

## Important

`frontend/node_modules` and `frontend/dist` are intentionally excluded from the distributable source archive. Run `npm install` locally instead of copying platform-specific `node_modules`.

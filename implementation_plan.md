# Tripplankaro — Static Frontend Migration Plan

## Summary

Convert the existing React + Vite frontend from a backend-dependent app (FastAPI at `/api/*`) into a **fully static, 100% frontend-only** application deployable to Vercel for free.

All 15 existing components are preserved and improved. Backend API calls are replaced with static JSON data + client-side logic. The admin portal is replaced with a documentation page.

---

## What Changes vs. Current State

| Aspect | Before (current) | After (plan) |
|---|---|---|
| Tours data | `fetch('/api/tours')` | `import toursData from '../data/tours.json'` |
| Destinations | `fetch('/api/destinations')` | `import destinationsData from '../data/destinations.json'` |
| Reviews | `fetch('/api/happy-travellers')` | Static `reviews.json` + Google Form link |
| Custom Trip | `POST /api/custom-trip` | WhatsApp pre-filled message only |
| Inquiry Form | `POST /api/inquiries` | WhatsApp pre-filled message only |
| Admin Portal | Login + backend CRUD | Removed; replaced with content guide doc |
| Vite proxy | `/api` → FastAPI | Removed entirely |

---

## Open Questions

> [!IMPORTANT]
> **Tours data source**: The `all_tours.json` in the project root has ~165 scraped tours from thefoxtraveller.com (a third-party). These are used as a starting catalogue — owners should replace with real Tripplankaro tours by editing `tours.json`. The build will use ~50 cleaned, normalized tours from this source.

> [!IMPORTANT]
> **Images**: The scraped tours have no dedicated `image` field. The first itinerary day's image URL will be used as the tour card image. Owners should add real images to `public/images/tours/` and update the `image` field in `tours.json`.

> [!NOTE]
> The scraped `all_tours.json` data has repeated text noise in itinerary descriptions. The normalized `tours.json` will truncate each day description to the first clean ~300 characters.

---

## Proposed Changes

### Phase 1 — Static Data Files

#### [NEW] `frontend/src/data/tours.json`
Normalized schema with fields: tour_id, slug, tour_name, destination, country, tour_type, tags, vibes, duration (days/nights), pricing (original/discounted/discount_percentage), group_size, images, gallery_images, overview, highlights, included, excluded, itinerary, rating, review_count, featured, trending, budget_category, active

#### [NEW] `frontend/src/data/destinations.json`
10 destinations: Goa, Ladakh, Manali, Kashmir, Uttarakhand, Himachal Pradesh, Thailand, Dubai, Bali, Maldives with: short_description, best_time, monthly weather, culture, food, must_try_foods, top_attractions, hidden_gems, travel_tips, faq, map_coordinates, featured, active

#### [NEW] `frontend/src/data/reviews.json`
8-12 sample verified traveller reviews with: review_id, name, location, tour_id, destination, rating, review, date, image, verified, featured, active

#### [NEW] `frontend/src/data/offers.json`
4-6 promotional offers with: offer_id, title, tour_id, description, old_price, new_price, discount, badge, valid_until, featured, active

#### [NEW] `frontend/src/data/company.json`
email, phone, whatsapp, instagram, website, tagline, address (from brand spec)

#### [NEW] `frontend/src/data/categories.json`
Mood/vibe categories with icons

---

### Phase 2 — Core Infrastructure

#### [MODIFY] [`vite.config.js`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/vite.config.js)
- Remove server proxy (`/api`, `/media`)

#### [NEW] `frontend/public/vercel.json`
SPA fallback routing for Vercel

#### [NEW] `frontend/public/robots.txt`
SEO robots file

#### [NEW] `frontend/src/utils/filterTours.js`
Client-side search + filter + sort logic (no backend)

#### [NEW] `frontend/src/utils/whatsapp.js`
Reusable contextual WhatsApp message generator

---

### Phase 3 — Modified Components

#### [MODIFY] [`App.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/App.jsx)
- Replace all `fetch('/api/...')` with static JSON imports
- Client-side filtering/sorting/search using filterTours.js
- Remove AdminPortal
- Add OffersSection + MoodGrid

#### [MODIFY] [`ReviewsSection.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/components/ReviewsSection.jsx)
- Remove all API fetch calls
- Load from static `reviews.json`
- Replace "post story" form with Google Form link
- Keep liked state in localStorage

#### [MODIFY] [`CustomTripBuilder.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/components/CustomTripBuilder.jsx)
- Remove `fetch('/api/custom-trip')`
- Submit → WhatsApp pre-filled message only
- Show "Trip Brief" summary before sending

#### [MODIFY] [`TourDetailModal.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/components/TourDetailModal.jsx)
- Remove `fetch('/api/inquiries')`
- Inquiry → WhatsApp pre-filled message
- Keep existing display UI intact

#### [MODIFY] [`Navbar.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/components/Navbar.jsx)
- Remove Admin Portal lock button
- Add mobile hamburger menu

#### [MODIFY] [`Footer.jsx`](file:///c:/Users/jiyam/OneDrive/Desktop/Documents/tripplankaro/frontend/src/components/Footer.jsx)
- Fix contact info: `info@triplankaro.com`, phone `6353731027`
- Fix Instagram: `https://www.instagram.com/trip.plankaro/`

---

### Phase 4 — New Components

#### [NEW] `frontend/src/components/OffersSection.jsx`
Current/limited offers from offers.json with countdown timers and WhatsApp CTA

#### [NEW] `frontend/src/components/MoodGrid.jsx`
"What are you in the mood for?" — 10 mood cards that filter tours by vibe

#### [MODIFY] `frontend/src/components/AdminPortal.jsx`
Fully replaced with a static content guide (how to edit JSON files)

---

### Phase 5 — SEO & Deployment

#### [MODIFY] `frontend/index.html`
- Add title, meta description, OG tags
- Add TravelAgency structured data (JSON-LD)

#### [NEW] `frontend/public/sitemap.xml`
Static sitemap for SEO

#### [NEW] `README.md` (project root, full replacement)
- Local dev setup
- Vercel deployment steps
- How to add/edit tours, destinations, offers, reviews
- Schema reference
- Image naming conventions
- Known limitations

---

## Verification Plan

### Build Test
```bash
cd frontend
npm install
npm run build
```

### Manual Checks
- Search "Goa" → filters tours instantly
- Domestic/International toggle works
- Vibe filter + duration + price slider all work
- Sort (price, rating) works
- VibeQuiz completes → filters tours
- TourDetailModal opens → WhatsApp inquiry works
- CustomTripBuilder → WhatsApp link (no API)
- SquadBillSplitter calculates correctly
- WishlistDrawer saves/removes tours in localStorage
- ReviewsSection shows static reviews, no API errors
- OffersSection renders active offers
- MoodGrid filters by clicking mood
- Light + Dark mode both work
- Mobile 375px works without horizontal scroll
- No console errors related to `/api/`
- `npm run build` exits 0

### Known Limitations (frontend-only architecture)
- Reviews cannot be user-submitted (Google Form redirect instead)
- Enquiry forms go to WhatsApp, not a database
- Tour/destination data requires JSON file editing + git commit + Vercel redeploy
- No real-time inventory or booking system

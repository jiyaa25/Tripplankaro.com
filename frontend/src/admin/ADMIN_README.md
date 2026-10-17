# 🧳 Tripplankaro Admin Guide: How to Add & Update Tours & Reviews

Welcome to the **Tripplankaro Content Management Guide**!  
This guide is designed for **non-technical admins** so you can easily add new tour packages, update existing prices/details, or publish real customer reviews collected from Google Forms without needing to write any website code.

---

## 📁 Where Files Live
All admin content is managed in this folder:
```
frontend/src/admin/
├── tours/                   <-- Put new tour files (.json) here
│   └── example-tour.json    <-- Ready-to-copy tour template
├── reviews/                 <-- Put new customer reviews (.json) here
│   └── example-review.json  <-- Ready-to-copy review template
├── tour-schema.json         <-- Reference for all tour fields
├── review-schema.json       <-- Reference for all review fields
└── ADMIN_README.md          <-- This guide
```

---

## 🚀 The 3-Step Workflow

Whenever you want to add or change tours/reviews:

### Step 1: Create or Edit a File
- **To add a new Tour:**  
  1. Duplicate `example-tour.json` inside the `tours/` folder.
  2. Rename it, for example `kashmir-honeymoon-package.json` or `dubai-desert-safari.json`.
  3. Open it in any text editor (Notepad, VS Code, etc.) and fill in your details (title, price, itinerary, hotels, images).

- **To add a new Review:**  
  1. Duplicate `example-review.json` inside the `reviews/` folder.
  2. Rename it, for example `review-priya-patel.json`.
  3. Fill in the reviewer's name, destination, rating (1 to 5), and their feedback text.

---

### Step 2: Run the 1-Line Import Command
Open a terminal in the `frontend` folder and run:

```bash
npm run admin:import
```

**What this automatically does for you:**
- Checks and formats all prices into standard Indian Rupee format (e.g. `₹23,500`).
- Computes discount percentages and duration labels.
- Adds new tours and reviews right at the top of the website so visitors see your latest packages immediately.
- Updates existing tours automatically if the title or slug already exists (so you can easily change prices anytime).

---

### Step 3: Save & Push to Git
Commit your changes and push to Git:
```bash
git add .
git commit -m "Admin: Added new tour package and customer reviews"
git push
```
The live website will automatically update with your new packages!

---

## 📝 Tour Package Fields Explained

| Field | Example | Notes |
| :--- | :--- | :--- |
| `tour_name` | `"Royal Rajasthan Forts & Palaces – 5N/6D"` | Full display title |
| `destination` | `"Rajasthan"` or `"Goa"` or `"Bali"` | Main destination name |
| `tour_type` | `"Domestic"`, `"International"`, or `"Theme Tour"` | Must be one of these three |
| `duration` | `{"days": 6, "nights": 5, "text": "6D / 5N"}` | Days and nights |
| `pricing` | `{"original_price_num": 28000, "discounted_price_num": 23500}` | Price numbers in INR |
| `image` | `"https://images.unsplash.com/..."` | Main display photo URL |
| `gallery_images` | `["https://...", "https://..."]` | 2 to 6 photo URLs for the popup |
| `overview` | `"Experience the grandeur of..."` | 2-3 sentences describing the trip |
| `highlights` | `["Daily royal breakfast", "Amer fort tour"]` | Bullet points |
| `included` | `["Hotel stays", "AC cab", "Toll taxes"]` | What's included in price |
| `excluded` | `["Flight tickets", "Monument entries"]` | What's not included |
| `itinerary` | Day-by-day plan (`day`, `title`, `description`) | Detailed daily schedule |

---

## 🌟 Customer Review Fields Explained

| Field | Example | Notes |
| :--- | :--- | :--- |
| `name` | `"Aarav & Meera Sharma"` | Customer name |
| `location` | `"Mumbai"` | Customer city |
| `destination` | `"Uttarakhand"` or `"Goa"` | Destination visited |
| `rating` | `5` or `4.8` | Rating out of 5 |
| `review` | `"Tripplankaro planned our trip smoothly..."` | Customer review text |
| `date` | `"March 2026"` | Month & Year |
| `image` | `"https://..."` | Customer avatar or photo |

---


*Note: Always make a zip backup or Git branch before deleting.*

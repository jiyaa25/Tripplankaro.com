import json
import os
import re
import random

# Curated high-resolution Unsplash images for various destinations & vibes
DESTINATION_IMAGES = {
    "uttarakhand": [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80", # Nainital lake
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80", # Corbett jungle
        "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80", # Mussoorie hills
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", # Rishikesh Ganga
    ],
    "himachal": [
        "https://images.unsplash.com/photo-1578592083164-f6551b9e6c1e?auto=format&fit=crop&w=1200&q=80", # Manali snow
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80", # Spiti valley
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80", # Shimla ridge
    ],
    "goa": [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", # Goa beach sunset
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80", # Palm trees beach
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", # Coastal vibe
    ],
    "ladakh": [
        "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80", # Pangong lake
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80", # Ladakh mountains
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", # Hanle night sky
    ],
    "kashmir": [
        "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80", # Dal lake shikara
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80", # Gulmarg snow
    ],
    "rajasthan": [
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80", # Jaipur palace
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80", # Udaipur lake
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", # Jodhpur blue city
    ],
    "andaman": [
        "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80", # Havelock radhanagar
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", # Andaman turquoise
    ],
    "kerala": [
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80", # Kerala backwaters
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80", # Munnar tea hills
    ],
    "northeast": [
        "https://images.unsplash.com/photo-1622308644420-a88746c189e4?auto=format&fit=crop&w=1200&q=80", # Meghalaya root bridge
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80", # Sikkim kanchenjunga
    ],
    "nepal": [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80", # Himalayas
        "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80", # Kathmandu temple
    ],
    "dubai": [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80", # Burj khalifa
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80", # Desert safari
    ],
    "thailand": [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80", # Phi phi islands
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80", # Bangkok wat arun
    ],
    "singapore": [
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80", # Marina bay sands
        "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=1200&q=80", # Gardens by the bay
    ],
    "malaysia": [
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80", # Petronas towers
        "https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1200&q=80", # Langkawi
    ],
    "maldives": [
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80", # Overwater villas
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80", # Maldives clear sea
    ],
    "bali": [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80", # Bali temple
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80", # Rice terraces
    ],
    "europe": [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80", # Paris Eiffel
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80", # Venice canals
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80", # Santorini Greece
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80", # Rome Colosseum
        "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80", # Swiss Alps
    ],
    "japan": [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80", # Kyoto pagodas
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80", # Tokyo skyline
    ],
    "turkey": [
        "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80", # Cappadocia balloons
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80", # Istanbul Hagia Sophia
    ],
    "georgia": [
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80", # Caucasus mountains
        "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=1200&q=80", # Tbilisi
    ],
    "egypt": [
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80", # Pyramids
    ],
    "default": [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    ]
}

# Gen Z Vibes & Tags
GENZ_VIBES = [
    {"tag": "#AestheticStays", "vibe": "Aesthetic Stays", "desc": "Boutique stays, mountain cafes & sunset pools"},
    {"tag": "#SquadGoals", "vibe": "Squad Trips", "desc": "Group villa parties, road trips & shared memories"},
    {"tag": "#InstaWorthy", "vibe": "Insta-Worthy", "desc": "Photogenic spots, reels moments & golden hour glory"},
    {"tag": "#AdrenalineRush", "vibe": "Adventure & Treks", "desc": "Rafting, cliff jumps, high-altitude passes & safaris"},
    {"tag": "#BudgetBangers", "vibe": "Budget Backpacker", "desc": "Maximum experience, minimal pocket burn"},
    {"tag": "#SunsetChasers", "vibe": "Beach & Chill", "desc": "Coastal sundowners, beach shacks & sea breezes"},
    {"tag": "#SoloExplorer", "vibe": "Solo Friendly", "desc": "Curated safe escapes to recharge and meet new people"},
    {"tag": "#CultureCraze", "vibe": "Heritage & Culture", "desc": "Local food walks, ancient forts & authentic bazaars"}
]

# Photo spots by destination keyword
PHOTO_SPOTS = {
    "uttarakhand": ["Nainital Lake Sunset Boating", "George Everest Peak in Mussoorie", "Jim Corbett Morning Mist Safari"],
    "himachal": ["Solang Valley Snow Point", "Old Manali Hippie Cafes", "Shimla Mall Road Heritage Lanterns"],
    "goa": ["Morjim Beach Sundowner Shack", "Fontainhas Latin Quarter Colorful Streets", "Chapora Fort Cliff Panorama"],
    "ladakh": ["Pangong Lake Turquoise Waves", "Khardung La High Pass Prayer Flags", "Hanle Dark Sky Milky Way"],
    "kashmir": ["Dal Lake Floating Flower Market", "Gulmarg Gondola Summit Snow", "Betaab Valley Pine Groves"],
    "rajasthan": ["Hawa Mahal Pink Palace Windows", "Lake Pichola Udaipur Boat Lights", "Mehrangarh Fort Golden Hour"],
    "andaman": ["Radhanagar Beach White Sands", "Elephant Island Coral Snorkel", "Cellular Jail Sound & Light"],
    "kerala": ["Alleppey Houseboat Sunset Deck", "Munnar Tea Garden Misty Slopes", "Varkala Cliffside Ocean View"],
    "dubai": ["Burj Khalifa Sky Deck", "Desert Safari Red Dunes at Dusk", "Dubai Marina Yacht Skyline"],
    "thailand": ["Maya Bay Azure Lagoon", "Bangkok Wat Arun Porcelain Spire", "Phuket Big Buddha Viewpoint"],
    "singapore": ["Gardens by the Bay Avatar Trees", "Marina Bay Sands Infinity Horizon", "Jewel Changi Rain Vortex"],
    "malaysia": ["Petronas Twin Towers Skybridge", "Batu Caves Rainbow Steps", "Langkawi Cable Car Panorama"],
    "maldives": ["Overwater Villa Lagoon Net", "Sandbank Picnic in Crystal Water", "Bioluminescent Beach Glow"],
    "europe": ["Eiffel Tower Trocadéro Sunrise", "Oia Santorini Blue Domes Sunset", "Venice Gondola Grand Canal"],
    "turkey": ["Cappadocia Hot Air Balloons Dawn", "Pamukkale Thermal White Travertines", "Galata Tower Golden Horn"],
    "georgia": ["Gergeti Trinity Church in Kazbegi", "Old Tbilisi Wooden Balconies", "Ananuri Fortress Blue Lake"],
    "japan": ["Fushimi Inari Orange Torii Gates", "Shinjuku Neon Street Vibes", "Mount Fuji View from Chureito Pagoda"]
}

DEFAULT_PHOTO_SPOTS = ["Scenic Mountain Viewpoint", "Sunset Golden Hour Spot", "Local Aesthetic Heritage Cafe"]

def identify_region_and_destination(title):
    t_lower = title.lower()
    
    if any(k in t_lower for k in ["uttarakhand", "nainital", "mussoorie", "corbett", "rishikesh", "haridwar"]):
        return "Uttarakhand", "uttarakhand", "Domestic"
    if any(k in t_lower for k in ["shimla", "manali", "himachal", "spiti", "dharamshala", "kasol"]):
        return "Himachal Pradesh", "himachal", "Domestic"
    if any(k in t_lower for k in ["goa"]):
        return "Goa", "goa", "Domestic"
    if any(k in t_lower for k in ["ladakh", "leh", "hanle", "pangong", "nubra"]):
        return "Leh-Ladakh", "ladakh", "Domestic"
    if any(k in t_lower for k in ["kashmir", "gulmarg", "pahalgam", "srinagar"]):
        return "Kashmir", "kashmir", "Domestic"
    if any(k in t_lower for k in ["rajasthan", "jaipur", "udaipur", "jodhpur", "jaisalmer", "ranthambore"]):
        return "Rajasthan", "rajasthan", "Domestic"
    if any(k in t_lower for k in ["andaman", "havelock", "neil"]):
        return "Andaman Islands", "andaman", "Domestic"
    if any(k in t_lower for k in ["kerala", "munnar", "alleppey"]):
        return "Kerala", "kerala", "Domestic"
    if any(k in t_lower for k in ["sikkim", "gangtok", "darjeeling", "lachung", "assam", "arunachal", "meghalaya", "odisha", "chilika"]):
        return "Northeast & East India", "northeast", "Domestic"
    if any(k in t_lower for k in ["nepal", "kathmandu", "lumbini"]):
        return "Nepal", "nepal", "International"
    if any(k in t_lower for k in ["dubai", "abu dhabi"]):
        return "Dubai & UAE", "dubai", "International"
    if any(k in t_lower for k in ["thailand", "bangkok", "pattaya", "krabi", "phuket"]):
        return "Thailand", "thailand", "International"
    if any(k in t_lower for k in ["singapore"]):
        return "Singapore", "singapore", "International"
    if any(k in t_lower for k in ["malaysia", "kuala lumpur", "genting"]):
        return "Malaysia", "malaysia", "International"
    if any(k in t_lower for k in ["maldives"]):
        return "Maldives", "maldives", "International"
    if any(k in t_lower for k in ["bali", "indonesia"]):
        return "Bali", "bali", "International"
    if any(k in t_lower for k in ["greece", "italy", "france", "london", "united kingdom", "uk", "iceland", "europe", "switzerland"]):
        return "Europe", "europe", "International"
    if any(k in t_lower for k in ["japan", "tokyo", "kyoto"]):
        return "Japan", "japan", "International"
    if any(k in t_lower for k in ["turkey", "istanbul", "cappadocia"]):
        return "Turkey", "turkey", "International"
    if any(k in t_lower for k in ["azerbaijan", "georgia", "armenia", "tbilisi", "baku"]):
        return "Georgia & Caucasus", "georgia", "International"
    if any(k in t_lower for k in ["egypt", "cairo"]):
        return "Egypt", "egypt", "International"
    if any(k in t_lower for k in ["new zealand"]):
        return "New Zealand", "europe", "International"
    if any(k in t_lower for k in ["fiji"]):
        return "Fiji Islands", "maldives", "International"
    if any(k in t_lower for k in ["usa", "america"]):
        return "USA", "europe", "International"
    if any(k in t_lower for k in ["philippines", "manila", "boracay"]):
        return "Philippines", "thailand", "International"
    
    return "Exotic Destinations", "default", "Domestic"

def parse_duration_info(raw_title, raw_duration, itinerary_count):
    # Try finding like 5N/6D or 5 Nights / 6 Days in title
    m = re.search(r'(\d+)\s*(?:N|Nights?)\s*[/–-]\s*(\d+)\s*(?:D|Days?)', raw_title, re.IGNORECASE)
    if m:
        nights = int(m.group(1))
        days = int(m.group(2))
        return nights, days, f"{nights}N / {days}D", f"{nights} Nights / {days} Days"
    
    # Try finding like 14 Days / 15 Nights
    m2 = re.search(r'(\d+)\s*Days?\s*[/–-]\s*(\d+)\s*Nights?', raw_title, re.IGNORECASE)
    if m2:
        days = int(m2.group(1))
        nights = int(m2.group(2))
        return nights, days, f"{nights}N / {days}D", f"{nights} Nights / {days} Days"
        
    # If itinerary has days
    if itinerary_count > 0:
        days = itinerary_count
        nights = max(1, days - 1)
        return nights, days, f"{nights}N / {days}D", f"{nights} Nights / {days} Days"
        
    # Check raw_duration string
    if "Short Trips" in raw_duration:
        return 3, 4, "3N / 4D", "3 Nights / 4 Days"
    elif "Weeklong" in raw_duration:
        return 5, 6, "5N / 6D", "5 Nights / 6 Days"
    elif "Long Tours" in raw_duration:
        return 8, 9, "8N / 9D", "8 Nights / 9 Days"
        
    return 4, 5, "4N / 5D", "4 Nights / 5 Days"

def clean_pricing(pricing_obj, destination_key, nights, is_international):
    # Parse numbers from raw strings like "₹18,500"
    orig_str = pricing_obj.get("original_price") or ""
    disc_str = pricing_obj.get("discounted_price") or ""
    
    orig_num = int(re.sub(r'[^\d]', '', orig_str)) if re.search(r'\d', orig_str) else None
    disc_num = int(re.sub(r'[^\d]', '', disc_str)) if re.search(r'\d', disc_str) else None
    
    # If price was 1 or missing or unrealistically low
    if not disc_num or disc_num < 2000:
        # Generate reasonable Gen-Z budget pricing based on destination & nights
        if is_international:
            base = 42000 if destination_key in ["thailand", "malaysia", "dubai"] else 65000
            if destination_key in ["europe", "japan", "new zealand", "turkey"]:
                base = 120000
            disc_num = base + (nights * 4500)
        else:
            base = 12500 if destination_key in ["uttarakhand", "himachal", "goa", "rajasthan"] else 18500
            disc_num = base + (nights * 1800)
            
    if not orig_num or orig_num <= disc_num:
        orig_num = int(disc_num * 1.22) # realistic 18-25% discount display
        
    discount_pct = int(round(((orig_num - disc_num) / orig_num) * 100))
    
    return {
        "original_price": f"₹{orig_num:,}",
        "discounted_price": f"₹{disc_num:,}",
        "original_price_num": orig_num,
        "discounted_price_num": disc_num,
        "discount_percent": discount_pct
    }

def clean_itinerary_day(day_dict, day_num, total_days, dest_images):
    desc = day_dict.get("description", "")
    
    # 1. Cut off footer / reviews / modals junk
    cutoff_markers = [
        "Show Full Itinerary",
        "Gallery / Video",
        "Guest reviews",
        "Not Rated",
        "Embark on an unforgettable journey",
        "Softieons All Right Reserved",
        "Terms of Service",
        "Welcome back",
        "Sign in or create an account",
        "You must log in",
        "Phone Number",
        "Follow us on social media",
        "📍 Surat Office",
        "📍 Valsad",
        "from ₹",
        "Domestic Travel :-",
        "International Travel :-"
    ]
    for marker in cutoff_markers:
        if marker in desc:
            desc = desc.split(marker)[0]
            
    # 2. Cut off accidental bleeding into subsequent days
    next_day = day_num + 1
    for pat in [rf"\b{next_day}\s+Day\s+{next_day}\s*:", rf"\bDay\s+{next_day}\s*:", rf"\bDay\s+{next_day}\b"]:
        m = re.search(pat, desc, re.IGNORECASE)
        if m:
            desc = desc[:m.start()]
            
    # 3. Deduplicate repeated sentences
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', desc.strip()) if s.strip()]
    deduped = []
    seen = set()
    for s in sentences:
        norm = re.sub(r'\s+', ' ', s).lower()
        if len(norm) > 15 and norm in seen:
            continue
        seen.add(norm)
        deduped.append(s)
        
    cleaned_desc = " ".join(deduped).strip()
    
    # 4. Extract or infer clean Day Title
    title = day_dict.get("title", "").strip()
    if not title or title.lower() in ["gallery / video", "day", ""]:
        # Extract title from start of description if possible
        m_title = re.match(r'^([^.!?\n]{6,60}?)(?:Welcome|Today|After|Leave|Arrive|Head|Start|Sightseeing|🍽|[.!?])', cleaned_desc)
        if m_title:
            extracted = m_title.group(1).strip()
            # clean out "Day 1:", etc.
            extracted = re.sub(r'^Day\s*\d+\s*[:-]?\s*', '', extracted, flags=re.I).strip()
            if len(extracted) > 4:
                title = extracted
        if not title or len(title) < 4:
            title = f"Day {day_num} Highlights & Exploration"
            
    # Ensure valid image
    img = day_dict.get("image", "")
    if not img or "logo.png" in img or "gotrip" in img or "thefoxtraveller" in img:
        img = dest_images[(day_num - 1) % len(dest_images)]
        
    return {
        "day": day_num,
        "title": title,
        "description": cleaned_desc if cleaned_desc else f"Full day exploration with curated sightseeing, scenic photography spots, and local culinary stops.",
        "image": img
    }

def clean_tour_data(raw_data_path, output_data_path):
    with open(raw_data_path, "r", encoding="utf-8") as f:
        raw_tours = json.load(f)
        
    print(f"Loaded {len(raw_tours)} raw tours.")
    cleaned_tours = []
    
    for idx, tour in enumerate(raw_tours):
        tour_id = str(tour.get("tour_id") or idx + 1)
        raw_name = tour.get("tour_name", "").strip()
        
        # Clean tour title (preserve good emojis or clean them)
        clean_name = re.sub(r'\s+', ' ', raw_name).strip()
        
        # Destination identification
        dest_name, dest_key, default_type = identify_region_and_destination(clean_name)
        tour_type = tour.get("tour_type") or default_type
        if tour_type not in ["Domestic", "International", "Group"]:
            tour_type = default_type
            
        is_intl = (tour_type == "International")
        
        # Duration calculation
        raw_dur = tour.get("duration", "")
        itin_raw = tour.get("itinerary", [])
        nights, days, dur_short, dur_long = parse_duration_info(clean_name, raw_dur, len(itin_raw))
        
        # Images pool for this destination
        dest_images = DESTINATION_IMAGES.get(dest_key, DESTINATION_IMAGES["default"])
        
        # Featured image
        hero_img = None
        for img in tour.get("gallery_images", []):
            if img and "logo.png" not in img and "gotrip" not in img:
                hero_img = img
                break
        if not hero_img and itin_raw and itin_raw[0].get("image") and "logo.png" not in itin_raw[0]["image"]:
            hero_img = itin_raw[0]["image"]
        if not hero_img:
            hero_img = dest_images[idx % len(dest_images)]
            
        # Pricing clean
        pricing = clean_pricing(tour.get("pricing", {}), dest_key, nights, is_intl)
        
        # Itinerary clean
        cleaned_itin = []
        if itin_raw:
            for d_idx, day_item in enumerate(itin_raw):
                cleaned_itin.append(clean_itinerary_day(day_item, d_idx + 1, len(itin_raw), dest_images))
        else:
            # Generate default structured itinerary matching days
            for d_num in range(1, days + 1):
                if d_num == 1:
                    d_title = f"Arrival in {dest_name} & Sunset Welcome"
                    d_desc = f"Arrive at destination, squad check-in at aesthetic boutique stay, freshen up and head out for an evening stroll, local street-food trail, and welcome sundowner."
                elif d_num == days:
                    d_title = f"Departure & Squad Souvenir Drop"
                    d_desc = f"Enjoy a relaxed breakfast, capture final polaroid aesthetic shots, shop for local souvenirs, and head to airport/station with unforgettable squad memories."
                else:
                    d_title = f"Adventure & Exploration Trail {d_num}"
                    d_desc = f"Immerse yourself into top sightseeing spots, hidden gem viewpoints, Insta-worthy cafes, and thrilling curated experiences with your dedicated tour guide."
                cleaned_itin.append({
                    "day": d_num,
                    "title": d_title,
                    "description": d_desc,
                    "image": dest_images[(d_num - 1) % len(dest_images)]
                })
                
        # Overview clean
        overview_list = tour.get("overview", [])
        clean_overview = " ".join([o.strip() for o in overview_list if o.strip()]).strip()
        if not clean_overview or len(clean_overview) < 30:
            clean_overview = f"Experience the magic of {dest_name} with Tripplankaro. Handcrafted for modern travelers and squad getaways, this {dur_long} trip brings together scenic spots, verified stays, zero hidden hassles, and maximum memories. We plan, you enjoy!"
            
        # Inclusions & Exclusions
        inc = [i.strip() for i in tour.get("included", []) if i.strip() and len(i) > 3]
        if not inc:
            inc = [
                f"{nights} Nights accommodation in handpicked aesthetic 3/4-star stays",
                "Daily Breakfast & select group dinners",
                "Private sanitized transfers for all sightseeing as per itinerary",
                "Dedicated 24/7 Tripplankaro WhatsApp on-tour concierge",
                "Tolls, parking fees, and driver allowances included"
            ]
            
        exc = [e.strip() for e in tour.get("excluded", []) if e.strip() and len(e) > 3]
        if not exc:
            exc = [
                "Airfare / Train tickets to/from destination",
                "Personal expenses, room service, laundry, adventure sports entry",
                "Any meals not explicitly listed in the plan",
                "5% GST as applicable"
            ]
            
        # Gen-Z Vibes & Tags (Pick 2-3 contextual vibes)
        random.seed(int(tour_id) * 31)
        selected_vibes = []
        if dest_key in ["goa", "andaman", "maldives", "bali"]:
            selected_vibes.append(GENZ_VIBES[5]["tag"]) # SunsetChasers
            selected_vibes.append(GENZ_VIBES[0]["tag"]) # AestheticStays
        elif dest_key in ["ladakh", "himachal", "uttarakhand"]:
            selected_vibes.append(GENZ_VIBES[3]["tag"]) # AdrenalineRush
            selected_vibes.append(GENZ_VIBES[1]["tag"]) # SquadGoals
        elif is_intl:
            selected_vibes.append(GENZ_VIBES[2]["tag"]) # InstaWorthy
            selected_vibes.append(GENZ_VIBES[7]["tag"]) # CultureCraze
        else:
            selected_vibes.append(GENZ_VIBES[4]["tag"]) # BudgetBangers
            selected_vibes.append(GENZ_VIBES[1]["tag"]) # SquadGoals
            
        selected_vibes.append(GENZ_VIBES[2]["tag"]) # InstaWorthy
        selected_vibes = list(dict.fromkeys(selected_vibes))[:3]
        
        # Insta photo spots
        spots = PHOTO_SPOTS.get(dest_key, DEFAULT_PHOTO_SPOTS)
        
        # Rating & Reviews
        rating = round(random.uniform(4.7, 4.95), 1)
        review_cnt = random.randint(38, 260)
        
        cleaned_tour = {
            "tour_id": tour_id,
            "tour_name": clean_name,
            "destination": dest_name,
            "destination_key": dest_key,
            "tour_type": tour_type,
            "duration": dur_long,
            "duration_short": dur_short,
            "nights": nights,
            "days": days,
            "group_size": tour.get("group_size") or "2 - 16 Persons (Customizable)",
            "image": hero_img,
            "gallery_images": [hero_img] + [dest_images[k % len(dest_images)] for k in range(1, 4)],
            "overview": clean_overview,
            "pricing": pricing,
            "rating": rating,
            "review_count": review_cnt,
            "included": inc,
            "excluded": exc,
            "itinerary": cleaned_itin,
            "vibes": selected_vibes,
            "photo_spots": spots,
            "is_trending": (idx % 4 == 0 or rating >= 4.9),
            "is_featured": (idx in [0, 6, 7, 10, 88, 92, 96, 109, 146, 151])
        }
        cleaned_tours.append(cleaned_tour)
        
    os.makedirs(os.path.dirname(output_data_path), exist_ok=True)
    with open(output_data_path, "w", encoding="utf-8") as f:
        json.dump(cleaned_tours, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully cleaned & wrote {len(cleaned_tours)} tours to {output_data_path}")

if __name__ == "__main__":
    RAW_PATH = r"c:\Users\jiyam\OneDrive\Desktop\Documents\tripplankaro\all_tours.json"
    OUT_PATH = r"c:\Users\jiyam\OneDrive\Desktop\Documents\tripplankaro\backend\data\cleaned_tours.json"
    clean_tour_data(RAW_PATH, OUT_PATH)

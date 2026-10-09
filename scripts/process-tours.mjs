import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const rawDataPath = path.join(rootDir, 'all_tours.json');
const outputToursPath = path.join(rootDir, 'frontend', 'src', 'data', 'tours.json');

// Ensure destination folder exists
fs.mkdirSync(path.dirname(outputToursPath), { recursive: true });

console.log('Reading raw tours from:', rawDataPath);
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
console.log(`Loaded ${rawData.length} raw tours.`);

// Known destinations lookup
const destinationMap = [
  { id: 'goa', name: 'Goa', state: 'Goa', country: 'India', keywords: ['goa', 'calangute', 'baga', 'panaji'] },
  { id: 'manali', name: 'Manali & Himachal', state: 'Himachal Pradesh', country: 'India', keywords: ['manali', 'solang', 'rohtang', 'himachal', 'kasol', 'shimla', 'spiti', 'dharamshala', 'jibhi', 'bir'] },
  { id: 'kashmir', name: 'Kashmir', state: 'Jammu & Kashmir', country: 'India', keywords: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'sonmarg'] },
  { id: 'kerala', name: 'Kerala', state: 'Kerala', country: 'India', keywords: ['kerala', 'munnar', 'alleppey', 'kochi', 'wayanad', 'kovalam'] },
  { id: 'rajasthan', name: 'Rajasthan', state: 'Rajasthan', country: 'India', keywords: ['rajasthan', 'jaipur', 'udaipur', 'jaisalmer', 'jodhpur', 'pushkar'] },
  { id: 'uttarakhand', name: 'Uttarakhand', state: 'Uttarakhand', country: 'India', keywords: ['uttarakhand', 'rishikesh', 'nainital', 'mussoorie', 'kedarnath', 'badrinath', 'corbett', 'chopta', 'haridwar', 'auli'] },
  { id: 'ladakh', name: 'Ladakh', state: 'Ladakh', country: 'India', keywords: ['ladakh', 'leh', 'nubra', 'pangong', 'khardung'] },
  { id: 'sikkim', name: 'Sikkim & Northeast', state: 'Sikkim', country: 'India', keywords: ['sikkim', 'gangtok', 'darjeeling', 'meghalaya', 'shillong', 'cherrapunji', 'kaziranga', 'tawang'] },
  { id: 'dubai', name: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', keywords: ['dubai', 'uae', 'abu dhabi', 'burj'] },
  { id: 'bali', name: 'Bali', state: 'Bali', country: 'Indonesia', keywords: ['bali', 'ubud', 'kuta', 'seminyak', 'nusa penida', 'indonesia'] },
  { id: 'thailand', name: 'Thailand', state: 'Thailand', country: 'Thailand', keywords: ['thailand', 'bangkok', 'phuket', 'krabi', 'pattaya'] },
  { id: 'vietnam', name: 'Vietnam', state: 'Vietnam', country: 'Vietnam', keywords: ['vietnam', 'hanoi', 'da nang', 'ho chi minh', 'ha long'] },
  { id: 'maldives', name: 'Maldives', state: 'Maldives', country: 'Maldives', keywords: ['maldives', 'male'] },
  { id: 'singapore', name: 'Singapore', state: 'Singapore', country: 'Singapore', keywords: ['singapore', 'sentosa'] },
  { id: 'andaman', name: 'Andaman Islands', state: 'Andaman and Nicobar', country: 'India', keywords: ['andaman', 'port blair', 'havelock', 'neil'] },
  { id: 'nepal', name: 'Nepal', state: 'Nepal', country: 'Nepal', keywords: ['nepal', 'kathmandu', 'pokhara'] },
  { id: 'bhutan', name: 'Bhutan', state: 'Bhutan', country: 'Bhutan', keywords: ['bhutan', 'thimphu', 'paro'] },
  { id: 'sri-lanka', name: 'Sri Lanka', state: 'Sri Lanka', country: 'Sri Lanka', keywords: ['sri lanka', 'colombo', 'kandy', 'bentota'] },
  { id: 'georgia', name: 'Georgia & Baku', state: 'Caucasus', country: 'Georgia', keywords: ['georgia', 'baku', 'azerbaijan', 'tbilisi'] }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanScrapedText(text) {
  if (!text) return '';
  // Cut off junk footer scraped text
  const cutOffTriggers = [
    'Guest reviews',
    'Show Full Itinerary',
    'Gallery / Video',
    'Embark on an unforgettable journey',
    'Softieons',
    'Phone Number',
    'You must log in to write review',
    'About Digital Terms of Service',
    'Sign in or create an account',
    'from ₹'
  ];

  let cleaned = text;
  for (const trigger of cutOffTriggers) {
    const idx = cleaned.indexOf(trigger);
    if (idx !== -1) {
      cleaned = cleaned.substring(0, idx);
    }
  }

  // Remove repetitive duplicated sentences
  const sentences = cleaned.split(/(?<=[.?!])\s+/);
  const uniqueSentences = [];
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length > 5 && !uniqueSentences.includes(trimmed)) {
      uniqueSentences.push(trimmed);
    }
  }

  return uniqueSentences.join(' ').trim();
}

function detectDestination(title, overviewText) {
  const haystack = `${title} ${overviewText}`.toLowerCase();
  for (const dest of destinationMap) {
    for (const kw of dest.keywords) {
      if (haystack.includes(kw)) {
        return dest;
      }
    }
  }
  return {
    id: 'india-explorer',
    name: 'Incredible India',
    state: 'India',
    country: 'India'
  };
}

function parseDuration(durationStr, itineraryCount) {
  let days = 4;
  let nights = 3;

  // Try extracting from title like "5N/6D" or "6D/5N"
  const nPattern = /(\d+)\s*N(?:ights?)?\s*[/&,]\s*(\d+)\s*D(?:ays?)?/i;
  const dPattern = /(\d+)\s*D(?:ays?)?\s*[/&,]\s*(\d+)\s*N(?:ights?)?/i;
  const daysOnlyPattern = /(\d+)\s*D(?:ays?)?/i;

  const matchN = durationStr.match(nPattern);
  const matchD = durationStr.match(dPattern);
  const matchDaysOnly = durationStr.match(daysOnlyPattern);

  if (matchN) {
    nights = parseInt(matchN[1], 10);
    days = parseInt(matchN[2], 10);
  } else if (matchD) {
    days = parseInt(matchD[1], 10);
    nights = parseInt(matchD[2], 10);
  } else if (matchDaysOnly) {
    days = parseInt(matchDaysOnly[1], 10);
    nights = Math.max(1, days - 1);
  } else if (itineraryCount && itineraryCount > 1) {
    days = itineraryCount;
    nights = Math.max(1, itineraryCount - 1);
  }

  return {
    days,
    nights,
    text: `${days}D / ${nights}N`
  };
}

function parsePrice(pricingObj) {
  let original_price_num = 20000;
  let discounted_price_num = 16000;

  if (pricingObj?.discounted_price) {
    const raw = pricingObj.discounted_price.replace(/[^\d]/g, '');
    if (raw) discounted_price_num = parseInt(raw, 10);
  }
  if (pricingObj?.original_price) {
    const raw = pricingObj.original_price.replace(/[^\d]/g, '');
    if (raw) original_price_num = parseInt(raw, 10);
  } else {
    original_price_num = Math.round(discounted_price_num * 1.25);
  }

  if (discounted_price_num <= 0) discounted_price_num = 14999;
  if (original_price_num <= discounted_price_num) {
    original_price_num = Math.round(discounted_price_num * 1.25);
  }

  const discount_percent = Math.round(((original_price_num - discounted_price_num) / original_price_num) * 100);

  return {
    currency: 'INR',
    original_price: `₹${original_price_num.toLocaleString('en-IN')}`,
    discounted_price: `₹${discounted_price_num.toLocaleString('en-IN')}`,
    original_price_num,
    discounted_price_num,
    discount_percent,
    per_person: true
  };
}

const allVibes = [
  '#SunsetChasers',
  '#AdrenalineRush',
  '#InstaWorthy',
  '#BudgetBangers',
  '#SquadGoals',
  '#SoloExplorer',
  '#AestheticStays'
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80'
];

let processedCount = 0;
const processedTours = rawData.map((raw, idx) => {
  const cleanTitle = (raw.tour_name || `Tour ${idx + 1}`)
    .replace(/^[\u{1F300}-\u{1F9FF}\s]+/u, '') // remove leading emoji
    .trim();

  const overviewText = Array.isArray(raw.overview) ? raw.overview.join(' ') : (raw.overview || '');
  const destInfo = detectDestination(cleanTitle, overviewText);
  const dur = parseDuration(`${cleanTitle} ${raw.duration || ''}`, raw.itinerary?.length);
  const pricing = parsePrice(raw.pricing);

  // Clean itinerary
  const cleanItinerary = (raw.itinerary || [])
    .filter(d => !d.title?.includes('Gallery') && !d.title?.includes('reviews'))
    .map(d => {
      let dTitle = d.title ? d.title.trim() : '';
      let desc = cleanScrapedText(d.description || '');
      if (!dTitle && desc) {
        // extract first few words as title
        const firstWords = desc.split(/[.:\n]/)[0].slice(0, 45);
        dTitle = firstWords || `Day ${d.day} Itinerary`;
      }
      return {
        day: d.day,
        title: dTitle || `Day ${d.day} Highlights`,
        description: desc || `Explore the highlights and hidden gems of ${destInfo.name}.`,
        image: d.image || fallbackImages[idx % fallbackImages.length]
      };
    });

  // Pick main image
  let mainImage = null;
  if (cleanItinerary.length > 0 && cleanItinerary[0].image && !cleanItinerary[0].image.includes('logo.png')) {
    mainImage = cleanItinerary[0].image;
  } else if (raw.gallery_images && raw.gallery_images.length > 0) {
    mainImage = raw.gallery_images[0];
  } else {
    mainImage = fallbackImages[idx % fallbackImages.length];
  }

  // Gallery images
  const gallery = [];
  if (mainImage) gallery.push(mainImage);
  cleanItinerary.forEach(item => {
    if (item.image && !gallery.includes(item.image) && !item.image.includes('logo.png')) {
      gallery.push(item.image);
    }
  });

  // Generate deterministic rating & review count for high visual appeal
  const rating = +(4.6 + ((idx * 7) % 4) * 0.1).toFixed(1);
  const review_count = 18 + ((idx * 13) % 95);

  // Assign vibes
  const vibe1 = allVibes[idx % allVibes.length];
  const vibe2 = allVibes[(idx + 2) % allVibes.length];
  const vibes = [vibe1, vibe2];

  // Domestic vs International
  let tour_type = raw.tour_type || 'Domestic';
  if (['dubai', 'bali', 'thailand', 'vietnam', 'maldives', 'singapore', 'nepal', 'bhutan', 'sri-lanka', 'georgia'].includes(destInfo.id)) {
    tour_type = 'International';
  }

  // Tags
  const tags = [
    destInfo.name,
    tour_type,
    pricing.discounted_price_num < 20000 ? 'Budget Friendly' : 'Premium Stay',
    dur.days <= 4 ? 'Weekend Friendly' : 'Deep Explore'
  ];

  const highlights = (raw.included && raw.included.length > 0)
    ? raw.included.slice(0, 4)
    : [
        `Guided sightseeing in ${destInfo.name}`,
        'Comfortable handpicked hotel stays',
        'Daily breakfast & local dining guidance',
        'Private transfers as per itinerary'
      ];

  const slug = slugify(`${cleanTitle}-${raw.tour_id || idx + 1}`);

  processedCount++;

  return {
    tour_id: String(raw.tour_id || idx + 1),
    slug,
    tour_name: cleanTitle,
    destination_id: destInfo.id,
    destination: destInfo.name,
    country: destInfo.country,
    state: destInfo.state,
    city: destInfo.name,
    tour_type,
    tags,
    vibes,
    travel_styles: [dur.days <= 4 ? 'Quick Getaway' : 'Immersive Tour', 'Sightseeing & Culture'],
    suitable_for: ['Friends', 'Couples', 'Solo Travellers'],
    duration: {
      days: dur.days,
      nights: dur.nights,
      text: dur.text
    },
    duration_short: dur.text,
    pricing,
    group_size: raw.group_size || '2–12 travellers',
    hotel: {
      category: pricing.discounted_price_num > 30000 ? '4-Star Boutique' : '3-Star Handpicked',
      name: `Premium Stays in ${destInfo.name}`,
      room_type: 'Double / Twin Sharing'
    },
    transport: 'Private AC Vehicle + Airport/Station Transfers',
    image: mainImage,
    gallery_images: gallery.slice(0, 6),
    overview: overviewText.slice(0, 500) || `Experience the best of ${destInfo.name} with Tripplankaro's curated itinerary crafted for hassle-free memories.`,
    highlights,
    included: (raw.included && raw.included.length > 0) ? raw.included : [
      'Accommodation on twin sharing basis',
      'Daily breakfast at hotels',
      'AC private vehicle for transfers and sightseeing',
      'Driver allowances, toll tax, parking',
      '24x7 on-trip concierge assistance'
    ],
    excluded: (raw.excluded && raw.excluded.length > 0) ? raw.excluded : [
      'Airfare / Train tickets unless explicitly mentioned',
      'Personal expenses, tips and porterage',
      'Entry tickets to monuments not listed in inclusions',
      'Anything not mentioned under inclusions'
    ],
    itinerary: cleanItinerary,
    pickup_location: `${destInfo.name} Airport / Railway Station`,
    drop_location: `${destInfo.name} Airport / Railway Station`,
    best_time: 'October to April',
    difficulty: 'Easy',
    rating,
    review_count,
    featured: idx < 12,
    trending: idx % 3 === 0,
    new: idx % 5 === 0,
    budget_category: pricing.discounted_price_num < 15000 ? 'under-15k' : pricing.discounted_price_num < 30000 ? 'under-30k' : 'luxury',
    season: 'All Season',
    is_trending: idx % 3 === 0,
    active: true
  };
});

fs.writeFileSync(outputToursPath, JSON.stringify(processedTours, null, 2), 'utf8');
console.log(`Successfully wrote ${processedCount} cleaned tours to ${outputToursPath}`);

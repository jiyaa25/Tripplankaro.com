/**
 * Tripplankaro - Admin Content Importer Script
 *
 * This script scans:
 *  - frontend/src/admin/tours/   (all *.json files)
 *  - frontend/src/admin/reviews/ (all *.json files)
 *
 * It validates required fields, automatically computes missing slugs/IDs/tags/currencies,
 * updates or adds them to:
 *  - frontend/src/data/tours.json
 *  - frontend/src/data/reviews.json
 *
 * Can be run with: npm run admin:import
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths - adminImport.js is in src/utils/, so go up two levels to frontend root
const ROOT_FRONTEND = path.resolve(__dirname, '..', '..');
const ADMIN_TOURS_DIR = path.join(ROOT_FRONTEND, 'src', 'admin', 'tours');
const ADMIN_REVIEWS_DIR = path.join(ROOT_FRONTEND, 'src', 'admin', 'reviews');

const TOURS_DATA_PATH = path.join(ROOT_FRONTEND, 'src', 'data', 'tours.json');
const REVIEWS_DATA_PATH = path.join(ROOT_FRONTEND, 'src', 'data', 'reviews.json');

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatPriceINR(num) {
  if (typeof num !== 'number' || isNaN(num)) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
}

function processTours() {
  console.log('\n🔍 [1/2] Processing Admin Tours...');
  if (!fs.existsSync(ADMIN_TOURS_DIR)) {
    console.log(`⚠️  Admin tours folder not found at: ${ADMIN_TOURS_DIR}`);
    return;
  }

  const tourFiles = fs.readdirSync(ADMIN_TOURS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('.'));
  if (tourFiles.length === 0) {
    console.log('ℹ️  No tour JSON files found in admin/tours/. Skipping.');
    return;
  }

  let existingTours = [];
  try {
    if (fs.existsSync(TOURS_DATA_PATH)) {
      existingTours = JSON.parse(fs.readFileSync(TOURS_DATA_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('❌ Failed reading existing tours.json:', err.message);
    existingTours = [];
  }

  let addedCount = 0;
  let updatedCount = 0;

  for (const file of tourFiles) {
    const filePath = path.join(ADMIN_TOURS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const item = JSON.parse(content);

      if (!item.tour_name || !item.destination) {
        console.warn(`⚠️ Skipping ${file}: Missing 'tour_name' or 'destination'.`);
        continue;
      }

      // Auto compute defaults
      const slug = item.slug || slugify(item.tour_name);
      const tour_id = item.tour_id || `admin-${slugify(item.destination)}-${Date.now().toString().slice(-4)}`;

      // Pricing cleanup
      const pricing = item.pricing || {};
      const discNum = pricing.discounted_price_num || 15000;
      const origNum = pricing.original_price_num || Math.round(discNum * 1.15);
      const discountPercent = origNum > discNum ? Math.round(((origNum - discNum) / origNum) * 100) : 0;

      const normalizedPricing = {
        currency: pricing.currency || 'INR',
        original_price: pricing.original_price || formatPriceINR(origNum),
        discounted_price: pricing.discounted_price || formatPriceINR(discNum),
        original_price_num: origNum,
        discounted_price_num: discNum,
        discount_percent: pricing.discount_percent !== undefined ? pricing.discount_percent : discountPercent,
        per_person: pricing.per_person !== undefined ? pricing.per_person : true
      };

      // Duration cleanup
      const days = item.duration?.days || 5;
      const nights = item.duration?.nights !== undefined ? item.duration.nights : Math.max(0, days - 1);
      const durationText = item.duration?.text || `${days}D / ${nights}N`;
      const normalizedDuration = {
        days,
        nights,
        text: durationText
      };

      const normalizedTour = {
        tour_id,
        slug,
        tour_name: item.tour_name,
        destination_id: slugify(item.destination),
        destination: item.destination,
        country: item.country || 'India',
        state: item.state || item.destination,
        city: item.city || item.destination,
        tour_type: item.tour_type || 'Domestic',
        tags: item.tags || [item.destination, item.tour_type || 'Domestic'],
        vibes: item.vibes || ['#InstaWorthy', '#Wanderlust'],
        travel_styles: item.travel_styles || ['Sightseeing & Culture'],
        suitable_for: item.suitable_for || ['Couples', 'Family', 'Friends'],
        duration: normalizedDuration,
        duration_short: durationText,
        pricing: normalizedPricing,
        group_size: item.group_size || 'Flexible',
        hotel: item.hotel || {
          category: '3-Star / 4-Star Handpicked',
          name: `Premium Stays in ${item.destination}`,
          room_type: 'Double / Twin Sharing'
        },
        transport: item.transport || 'Private AC Vehicle + Airport/Station Transfers',
        image: item.image || (item.gallery_images && item.gallery_images[0]) || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        gallery_images: item.gallery_images || [item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
        overview: item.overview || `Discover the best of ${item.destination} with Tripplankaro. Tailored stays, private transfers, and handpicked local experiences.`,
        highlights: item.highlights || [
          'Handpicked comfortable hotel stays with breakfast.',
          'Private dedicated AC cab for all transfers and sightseeing.',
          'Assistance on arrival and 24x7 trip support.'
        ],
        included: item.included || [
          'Hotel accommodation with breakfast',
          'Private AC transfers and sightseeing',
          'Driver charges, toll tax, and fuel'
        ],
        excluded: item.excluded || [
          'Flight / Train tickets',
          'Monument entry fees and camera charges',
          'Personal expenses'
        ],
        itinerary: item.itinerary || [
          {
            day: 1,
            title: `Arrival in ${item.destination}`,
            description: `Arrive at the destination and check in to your hotel. Spend the rest of the day relaxing and exploring nearby local markets.`,
            image: item.image || ''
          }
        ],
        pickup_location: item.pickup_location || `${item.destination} Airport / Railway Station`,
        drop_location: item.drop_location || `${item.destination} Airport / Railway Station`,
        best_time: item.best_time || 'All Year Round',
        difficulty: item.difficulty || 'Easy',
        rating: item.rating || 4.8,
        review_count: item.review_count || 12,
        featured: Boolean(item.featured),
        trending: Boolean(item.trending),
        new: true,
        budget_category: discNum <= 20000 ? 'under-20k' : discNum <= 40000 ? 'under-40k' : 'luxury',
        season: item.season || 'All Season',
        is_trending: Boolean(item.trending),
        active: item.active !== undefined ? item.active : true
      };

      // Check if tour already exists by slug or tour_name
      const existingIndex = existingTours.findIndex(t => t.slug === slug || t.tour_name.toLowerCase() === item.tour_name.toLowerCase());
      if (existingIndex >= 0) {
        existingTours[existingIndex] = { ...existingTours[existingIndex], ...normalizedTour };
        updatedCount++;
        console.log(`  🔄 Updated existing tour: "${item.tour_name}"`);
      } else {
        // Prepend so new admin tours appear first on the site!
        existingTours.unshift(normalizedTour);
        addedCount++;
        console.log(`  ✨ Added new tour: "${item.tour_name}"`);
      }
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  fs.writeFileSync(TOURS_DATA_PATH, JSON.stringify(existingTours, null, 2), 'utf-8');
  console.log(`✅ Tours sync complete! Added: ${addedCount}, Updated: ${updatedCount}. Total tours: ${existingTours.length}`);
}

function processReviews() {
  console.log('\n🔍 [2/2] Processing Admin Reviews...');
  if (!fs.existsSync(ADMIN_REVIEWS_DIR)) {
    console.log(`⚠️  Admin reviews folder not found at: ${ADMIN_REVIEWS_DIR}`);
    return;
  }

  const reviewFiles = fs.readdirSync(ADMIN_REVIEWS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('.'));
  if (reviewFiles.length === 0) {
    console.log('ℹ️  No review JSON files found in admin/reviews/. Skipping.');
    return;
  }

  let existingReviews = [];
  try {
    if (fs.existsSync(REVIEWS_DATA_PATH)) {
      existingReviews = JSON.parse(fs.readFileSync(REVIEWS_DATA_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('❌ Failed reading existing reviews.json:', err.message);
    existingReviews = [];
  }

  let addedCount = 0;
  let updatedCount = 0;

  for (const file of reviewFiles) {
    const filePath = path.join(ADMIN_REVIEWS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const item = JSON.parse(content);

      if (!item.name || !item.review) {
        console.warn(`⚠️ Skipping ${file}: Missing 'name' or 'review'.`);
        continue;
      }

      const review_id = item.review_id || `rev-admin-${slugify(item.name).slice(0, 10)}-${Date.now().toString().slice(-4)}`;

      const photos = item.photos || (item.image ? [item.image] : []);
      const primaryPhoto = photos[0] || item.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80';

      const normalizedReview = {
        review_id,
        title: item.title || `Amazing Trip to ${item.destination || 'Incredible Place'}`,
        name: item.name,
        location: item.location || 'India',
        tour_id: item.tour_id || '',
        destination: item.destination || 'India',
        month_year: item.month_year || item.date || 'Recently',
        trip_type: item.trip_type || 'Individual Tour',
        rating: typeof item.rating === 'number' ? item.rating : 5,
        review: item.review,
        date: item.date || item.month_year || 'Recent Trip',
        photos: photos.length > 0 ? photos : [primaryPhoto],
        image: primaryPhoto,
        verified: item.verified !== undefined ? item.verified : true,
        featured: item.featured !== undefined ? item.featured : true,
        active: item.active !== undefined ? item.active : true
      };

      const existingIndex = existingReviews.findIndex(r => r.name.toLowerCase() === item.name.toLowerCase() && r.destination.toLowerCase() === normalizedReview.destination.toLowerCase());
      if (existingIndex >= 0) {
        existingReviews[existingIndex] = { ...existingReviews[existingIndex], ...normalizedReview };
        updatedCount++;
        console.log(`  🔄 Updated review from: "${item.name}"`);
      } else {
        existingReviews.unshift(normalizedReview);
        addedCount++;
        console.log(`  ✨ Added new review from: "${item.name}"`);
      }
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  fs.writeFileSync(REVIEWS_DATA_PATH, JSON.stringify(existingReviews, null, 2), 'utf-8');
  console.log(`✅ Reviews sync complete! Added: ${addedCount}, Updated: ${updatedCount}. Total reviews: ${existingReviews.length}`);
}

console.log('====================================================');
console.log('🚀 Tripplankaro Admin Content Sync Starting...');
console.log('====================================================');
processTours();
processReviews();
console.log('\n🎉 All admin content imported successfully into website data files!');
console.log('====================================================\n');

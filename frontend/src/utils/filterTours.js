export function filterAndSortTours(tours, {
  searchQuery = '',
  tourType = 'all', // 'all', 'Domestic', 'International'
  destination = 'all',
  vibe = 'all',
  budgetMax = null,
  durationFilter = 'all', // 'all', 'short' (<=3), 'medium' (4-6), 'long' (7+)
  hotelCategory = 'all',
  sortBy = 'recommended'
} = {}) {
  if (!Array.isArray(tours)) return [];

  const query = searchQuery.trim().toLowerCase();

  const filtered = tours.filter(tour => {
    if (!tour || tour.active === false) return false;

    // Search query match
    if (query) {
      const matchName = tour.tour_name?.toLowerCase().includes(query);
      const matchDest = tour.destination?.toLowerCase().includes(query);
      const matchCountry = tour.country?.toLowerCase().includes(query);
      const matchOverview = tour.overview?.toLowerCase().includes(query);
      const matchTags = Array.isArray(tour.tags) && tour.tags.some(t => t.toLowerCase().includes(query));
      const matchVibes = Array.isArray(tour.vibes) && tour.vibes.some(v => v.toLowerCase().includes(query));
      const matchHighlights = Array.isArray(tour.highlights) && tour.highlights.some(h => h.toLowerCase().includes(query));

      if (!matchName && !matchDest && !matchCountry && !matchOverview && !matchTags && !matchVibes && !matchHighlights) {
        return false;
      }
    }

    // Tour Type filter
    if (tourType && tourType !== 'all') {
      if (tour.tour_type?.toLowerCase() !== tourType.toLowerCase()) {
        return false;
      }
    }

    // Destination filter
    if (destination && destination !== 'all') {
      const dMatch = tour.destination?.toLowerCase() === destination.toLowerCase() ||
                    tour.destination_id?.toLowerCase() === destination.toLowerCase();
      if (!dMatch) return false;
    }

    // Vibe filter
    if (vibe && vibe !== 'all') {
      const hasVibe = Array.isArray(tour.vibes) && tour.vibes.some(v =>
        v.toLowerCase().replace(/[^a-z0-9]/g, '') === vibe.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
      if (!hasVibe) return false;
    }

    // Budget Max filter
    if (budgetMax && budgetMax > 0) {
      const price = tour.pricing?.discounted_price_num || 0;
      if (price > budgetMax) return false;
    }

    // Duration filter
    if (durationFilter && durationFilter !== 'all') {
      const days = tour.duration?.days || 4;
      if (durationFilter === 'short' && days > 3) return false;
      if (durationFilter === 'medium' && (days < 4 || days > 6)) return false;
      if (durationFilter === 'long' && days < 7) return false;
    }

    // Hotel category filter
    if (hotelCategory && hotelCategory !== 'all') {
      if (!tour.hotel?.category?.toLowerCase().includes(hotelCategory.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    const priceA = a.pricing?.discounted_price_num || 0;
    const priceB = b.pricing?.discounted_price_num || 0;
    const daysA = a.duration?.days || 0;
    const daysB = b.duration?.days || 0;
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    const reviewsA = a.review_count || 0;
    const reviewsB = b.review_count || 0;

    switch (sortBy) {
      case 'price-low':
      case 'price_asc':
        return priceA - priceB;
      case 'price-high':
      case 'price_desc':
        return priceB - priceA;
      case 'shortest':
        return daysA - daysB;
      case 'longest':
        return daysB - daysA;
      case 'rating':
      case 'highest_rated':
        return ratingB - ratingA;
      case 'popular':
      case 'most_popular':
        return reviewsB - reviewsA;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case 'newest':
        return (b.new ? 1 : 0) - (a.new ? 1 : 0);
      case 'best-value':
        return (b.pricing?.discount_percent || 0) - (a.pricing?.discount_percent || 0);
      case 'recommended':
      default:
        // When user searched for something, prioritize exact/direct destination and title matches first!
        if (query) {
          const score = (t) => {
            let s = 0;
            const dest = t.destination?.toLowerCase() || '';
            const name = t.tour_name?.toLowerCase() || '';
            if (dest === query) s += 100;
            else if (dest.includes(query)) s += 50;
            if (name.includes(query)) s += 30;
            return s;
          };
          const scoreDiff = score(b) - score(a);
          if (scoreDiff !== 0) return scoreDiff;
        }

        // Featured first, then rating
        return ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) || (ratingB - ratingA);
    }
  });

  return sorted;
}

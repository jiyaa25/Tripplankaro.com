import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OffersSection from './components/OffersSection';
import MoodGrid from './components/MoodGrid';
import VibeQuiz from './components/VibeQuiz';
import DestinationsShowcase from './components/DestinationsShowcase';
import TourFilters from './components/TourFilters';
import TourCard from './components/TourCard';
import TourDetailModal from './components/TourDetailModal';
import DestinationDetailModal from './components/DestinationDetailModal';
import TourComparisonModal from './components/TourComparisonModal';
import TripBudgetCalculator from './components/TripBudgetCalculator';
import SquadBillSplitter from './components/SquadBillSplitter';
import CustomTripBuilder from './components/CustomTripBuilder';
import WhyTripPlanKaro from './components/WhyTripPlanKaro';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import WishlistDrawer from './components/WishlistDrawer';
import ContentGuide from './components/ContentGuide';

import { filterAndSortTours } from './utils/filterTours';
import { generateTourWhatsAppMessage, openWhatsApp } from './utils/whatsapp';

// Static Data
import toursData from './data/tours.json';
import destinationsData from './data/destinations.json';
import companyData from './data/company.json';

import { Compass, Sparkles, Scale, Heart, ArrowRight } from 'lucide-react';

const PAGE_SIZE = 18;

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tripplankaro_theme') || 'dark';
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [tourType, setTourType] = useState('all'); // 'all', 'Domestic', 'International'
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [durationCat, setDurationCat] = useState('all');
  const [maxPrice, setMaxPrice] = useState(350000);
  const [sortBy, setSortBy] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Modals & Drawers
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState(null);
  const [selectedTourForSplitter, setSelectedTourForSplitter] = useState(null);
  const [selectedTourForCalculator, setSelectedTourForCalculator] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Wishlist state (localStorage)
  const [savedTours, setSavedTours] = useState(() => {
    try {
      const stored = localStorage.getItem('tripplankaro_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Compared tours state (up to 3)
  const [comparedTours, setComparedTours] = useState(() => {
    try {
      const stored = localStorage.getItem('tripplankaro_compared');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed tours (localStorage)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const stored = localStorage.getItem('tripplankaro_recent');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Apply theme class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tripplankaro_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripplankaro_saved', JSON.stringify(savedTours));
    } catch (e) {
      console.error(e);
    }
  }, [savedTours]);

  // Sync compared tours to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripplankaro_compared', JSON.stringify(comparedTours));
    } catch (e) {
      console.error(e);
    }
  }, [comparedTours]);

  // Sync recently viewed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripplankaro_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  // Toggle Save Tour
  const toggleSaveTour = useCallback((tour) => {
    setSavedTours(prev => {
      const exists = prev.some(t => t.tour_id === tour.tour_id);
      if (exists) {
        return prev.filter(t => t.tour_id !== tour.tour_id);
      } else {
        return [...prev, tour];
      }
    });
  }, []);

  const isTourSaved = useCallback((tourId) => {
    return savedTours.some(t => t.tour_id === tourId);
  }, [savedTours]);

  // Toggle Compare Tour (max 3)
  const toggleCompareTour = useCallback((tour) => {
    setComparedTours(prev => {
      const exists = prev.some(t => t.tour_id === tour.tour_id);
      if (exists) {
        return prev.filter(t => t.tour_id !== tour.tour_id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 tours simultaneously.');
          return prev;
        }
        return [...prev, tour];
      }
    });
  }, []);

  const isTourCompared = useCallback((tourId) => {
    return comparedTours.some(t => t.tour_id === tourId);
  }, [comparedTours]);

  const removeComparedTour = useCallback((tourId) => {
    setComparedTours(prev => prev.filter(t => t.tour_id !== tourId));
  }, []);

  // Open tour details and record recently viewed
  const handleOpenTourDetails = useCallback((tour) => {
    setSelectedTourForModal(tour);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(t => t.tour_id !== tour.tour_id);
      return [tour, ...filtered].slice(0, 6);
    });
  }, []);

  // Quick WhatsApp Enquiry for tour
  const handleQuickWhatsApp = useCallback((tour) => {
    const msg = generateTourWhatsAppMessage(tour);
    openWhatsApp(msg);
  }, []);

  // Reset Filters
  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setTourType('all');
    setSelectedVibe('all');
    setSelectedDestination('all');
    setDurationCat('all');
    setMaxPrice(350000);
    setSortBy('recommended');
    setVisibleCount(PAGE_SIZE);
  }, []);

  // Quick Filter handlers
  const handleQuickSearch = (tag) => {
    setSearchQuery(tag);
    setSelectedDestination('all');
    setVisibleCount(PAGE_SIZE);
    const el = document.getElementById('explore-trips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDestination = (destName) => {
    if (selectedDestination.toLowerCase() === destName.toLowerCase()) {
      setSelectedDestination('all');
    } else {
      setSelectedDestination(destName);
    }
    setVisibleCount(PAGE_SIZE);
    const el = document.getElementById('explore-trips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectMood = (moodVibe) => {
    setSelectedVibe(moodVibe);
    setVisibleCount(PAGE_SIZE);
    const el = document.getElementById('explore-trips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTourById = (tourId) => {
    const found = toursData.find(t => t.tour_id === String(tourId));
    if (found) {
      handleOpenTourDetails(found);
    }
  };

  // Filter and Sort tours purely in client memory
  const filteredTours = useMemo(() => {
    return filterAndSortTours(toursData, {
      searchQuery,
      tourType,
      destination: selectedDestination,
      vibe: selectedVibe,
      budgetMax: maxPrice,
      durationFilter: durationCat,
      sortBy
    });
  }, [searchQuery, tourType, selectedDestination, selectedVibe, maxPrice, durationCat, sortBy]);

  const displayedTours = useMemo(() => {
    return filteredTours.slice(0, visibleCount);
  }, [filteredTours, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredTours.length));
  };

  // Nav Anchor scrolling helper
  const handleNavigate = (viewId) => {
    let elementId = 'explore-trips';
    if (viewId === 'home') elementId = 'root';
    if (viewId === 'destinations') elementId = 'destinations';
    if (viewId === 'offers') elementId = 'offers-section';
    if (viewId === 'vibe') elementId = 'vibe-quiz';
    if (viewId === 'splitter') elementId = 'squad-splitter';
    if (viewId === 'calculator') elementId = 'trip-calculator';
    if (viewId === 'builder') elementId = 'custom-builder';
    if (viewId === 'reviews') elementId = 'reviews';

    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        savedToursCount={savedTours.length}
        openWishlist={() => setIsWishlistOpen(true)}
        comparedToursCount={comparedTours.length}
        openComparison={() => setIsComparisonOpen(true)}
        onNavigate={handleNavigate}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* 2. Hero Section */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={tourType}
          setActiveCategory={setTourType}
          onQuickSearch={handleQuickSearch}
          totalTours={toursData.length}
        />

        {/* 3. Trending Now & Current Offers Section */}
        <OffersSection onSelectTourById={handleSelectTourById} />

        {/* 4. Mood Grid ("What are you in the mood for?") */}
        <MoodGrid
          onSelectMood={handleSelectMood}
          activeMood={selectedVibe}
        />

        {/* 5. Vibe Quiz Section */}
        <VibeQuiz
          onSelectVibe={handleSelectMood}
        />

        {/* 6. Popular Destinations Showcase */}
        <DestinationsShowcase
          destinations={destinationsData}
          onSelectDestination={handleSelectDestination}
          selectedDestination={selectedDestination}
          onExploreDestination={(dest) => setSelectedDestinationForModal(dest)}
        />

        {/* 7. Explore Tours Section (Search, Filters & Tour Cards) */}
        <section id="explore-trips" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            {/* Header & Active Chips */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--coral-primary)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px'
                }}>
                  <Compass size={16} />
                  <span>Curated Catalogue ({toursData.length} Total Trips)</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
                  Explore <span className="gradient-text">Holiday Itineraries</span>
                </h2>
              </div>

              {/* Budget Quick Filters */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Under ₹15K', max: 15000 },
                  { label: 'Under ₹25K', max: 25000 },
                  { label: 'Under ₹40K', max: 40000 },
                  { label: 'Under ₹60K', max: 60000 }
                ].map(b => (
                  <button
                    key={b.max}
                    onClick={() => setMaxPrice(b.max)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: maxPrice === b.max ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                      background: maxPrice === b.max ? 'rgba(255,56,92,0.15)' : 'rgba(255,255,255,0.04)',
                      color: maxPrice === b.max ? 'var(--coral-primary)' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Controls Component */}
            <TourFilters
              tourType={tourType}
              setTourType={setTourType}
              selectedVibe={selectedVibe}
              setSelectedVibe={setSelectedVibe}
              durationCat={durationCat}
              setDurationCat={setDurationCat}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              totalResults={filteredTours.length}
            />

            {/* Tours Grid */}
            {displayedTours.length === 0 ? (
              <div className="glass" style={{
                padding: '60px 20px',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-hover)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧭🔍</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No Matching Trips Found</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
                  Try resetting your filters, selecting a different destination, or adjusting your budget limits.
                </p>
                <button onClick={handleResetFilters} className="gradient-btn" style={{ padding: '10px 22px' }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '22px'
                }}>
                  {displayedTours.map(tour => (
                    <TourCard
                      key={tour.tour_id}
                      tour={tour}
                      isSaved={isTourSaved(tour.tour_id)}
                      onToggleSave={toggleSaveTour}
                      onOpenDetails={handleOpenTourDetails}
                      onQuickWhatsApp={handleQuickWhatsApp}
                      isCompared={isTourCompared(tour.tour_id)}
                      onToggleCompare={toggleCompareTour}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredTours.length && (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="secondary-btn"
                      style={{ padding: '13px 32px', fontSize: '0.92rem' }}
                    >
                      <span>Show More Trips ({filteredTours.length - visibleCount} remaining)</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 8. Trip Budget Calculator Section */}
        <TripBudgetCalculator initialTour={selectedTourForCalculator} />

        {/* 9. Squad Expense Splitter Section */}
        <SquadBillSplitter initialTour={selectedTourForSplitter} />

        {/* 10. Custom Trip Builder */}
        <CustomTripBuilder />

        {/* 11. Why Tripplankaro */}
        <WhyTripPlanKaro />

        {/* 12. Verified Traveler Stories (Reviews) */}
        <ReviewsSection />
      </main>

      {/* 13. Floating WhatsApp Trigger */}
      <FloatingWhatsApp />

      {/* 14. Footer */}
      <Footer
        onFilterDestination={handleSelectDestination}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* MODAL 1: Tour Detail Modal */}
      {selectedTourForModal && (
        <TourDetailModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
          onOpenSplitter={(tour) => {
            setSelectedTourForSplitter(tour);
            const el = document.getElementById('squad-splitter');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCalculator={(tour) => {
            setSelectedTourForCalculator(tour);
            const el = document.getElementById('trip-calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          isSaved={isTourSaved(selectedTourForModal.tour_id)}
          onToggleSave={toggleSaveTour}
          isCompared={isTourCompared(selectedTourForModal.tour_id)}
          onToggleCompare={toggleCompareTour}
        />
      )}

      {/* MODAL 2: Destination Detail Modal (Weather, Leaflet Map, Culture, Tours) */}
      {selectedDestinationForModal && (
        <DestinationDetailModal
          destination={selectedDestinationForModal}
          allTours={toursData}
          onClose={() => setSelectedDestinationForModal(null)}
          onOpenTour={handleOpenTourDetails}
          onToggleSave={toggleSaveTour}
          isTourSaved={isTourSaved}
        />
      )}

      {/* MODAL 3: Tour Comparison Modal */}
      {isComparisonOpen && (
        <TourComparisonModal
          tours={comparedTours}
          onClose={() => setIsComparisonOpen(false)}
          onRemoveTour={removeComparedTour}
          onOpenDetails={handleOpenTourDetails}
        />
      )}

      {/* MODAL 4: Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedTours={savedTours}
        onRemoveTour={(id) => setSavedTours(prev => prev.filter(t => t.tour_id !== id))}
        onOpenDetails={handleOpenTourDetails}
        onOpenSplitter={(tour) => {
          setSelectedTourForSplitter(tour);
          const el = document.getElementById('squad-splitter');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalculator={(tour) => {
          setSelectedTourForCalculator(tour);
          const el = document.getElementById('trip-calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        recentlyViewed={recentlyViewed}
      />

      {/* MODAL 5: Content & Deployment Guide (Replaces backend AdminPortal) */}
      <ContentGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VibeQuiz from './components/VibeQuiz';
import DestinationsShowcase from './components/DestinationsShowcase';
import TourFilters from './components/TourFilters';
import TourCard from './components/TourCard';
import TourDetailModal from './components/TourDetailModal';
import SquadBillSplitter from './components/SquadBillSplitter';
import CustomTripBuilder from './components/CustomTripBuilder';
import WhyTripPlanKaro from './components/WhyTripPlanKaro';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import WishlistDrawer from './components/WishlistDrawer';
import AdminPortal from './components/AdminPortal';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tripplankaro_theme') || 'dark';
  });

  // Data states
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [tourType, setTourType] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [durationCat, setDurationCat] = useState('all');
  const [maxPrice, setMaxPrice] = useState(350000);
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Drawers
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);
  const [selectedTourForSplitter, setSelectedTourForSplitter] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Wishlist state
  const [savedTours, setSavedTours] = useState(() => {
    try {
      const stored = localStorage.getItem('tripplankaro_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tripplankaro_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripplankaro_saved', JSON.stringify(savedTours));
    } catch (e) {
      console.error(e);
    }
  }, [savedTours]);

  // Load initial destinations
  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(err => console.error('Failed to load destinations:', err));
  }, []);

  // Fetch tours with debounce
  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (tourType !== 'all') params.append('tour_type', tourType);
      if (selectedVibe !== 'all') params.append('vibe', selectedVibe);
      if (selectedDestination !== 'all') params.append('destination', selectedDestination);
      if (durationCat !== 'all') params.append('duration_cat', durationCat);
      if (maxPrice < 350000) params.append('max_price', maxPrice);
      if (sortBy) params.append('sort_by', sortBy);
      params.append('limit', '60');

      const res = await fetch(`/api/tours?${params.toString()}`);
      const data = await res.json();
      setTours(data.tours || []);
      setTotalResults(data.total || 0);
    } catch (err) {
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, tourType, selectedVibe, selectedDestination, durationCat, maxPrice, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTours();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchTours]);

  const toggleSaveTour = (tour) => {
    setSavedTours(prev => {
      const exists = prev.some(t => t.tour_id === tour.tour_id);
      if (exists) {
        return prev.filter(t => t.tour_id !== tour.tour_id);
      } else {
        return [...prev, tour];
      }
    });
  };

  const isTourSaved = (tourId) => savedTours.some(t => t.tour_id === tourId);

  const handleResetFilters = () => {
    setSearchQuery('');
    setTourType('all');
    setSelectedVibe('all');
    setSelectedDestination('all');
    setDurationCat('all');
    setMaxPrice(350000);
    setSortBy('featured');
  };

  const handleQuickWhatsApp = (tour) => {
    const text = encodeURIComponent(
      `Hey Tripplankaro! ✈️ I am interested in *${tour.tour_name}* (${tour.duration_short}, ${tour.pricing?.discounted_price}/pax). Can you help me with group availability?`
    );
    window.open(`https://wa.me/919016272544?text=${text}`, '_blank');
  };

  const handleSelectVibeFromQuiz = (vibeTag) => {
    setSelectedVibe(vibeTag);
  };

  const handleSelectDestination = (destName) => {
    setSelectedDestination(destName);
    const el = document.getElementById('explore-trips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSearch = (keyword) => {
    setSearchQuery(keyword);
    const el = document.getElementById('explore-trips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (section) => {
    let targetId = 'explore-trips';
    if (section === 'vibe') targetId = 'vibe-quiz';
    else if (section === 'destinations') targetId = 'destinations';
    else if (section === 'splitter') targetId = 'squad-splitter';
    else if (section === 'builder') targetId = 'custom-builder';
    else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        savedToursCount={savedTours.length}
        openWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        onAdminOpen={() => setIsAdminOpen(true)}
      />

      {/* Hero Header */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={tourType}
        setActiveCategory={setTourType}
        onQuickSearch={handleQuickSearch}
        totalTours={totalResults}
      />

      {/* Interactive Gen-Z Vibe Quiz */}
      <VibeQuiz onSelectVibe={handleSelectVibeFromQuiz} />

      {/* Destinations Hub Showcase */}
      <DestinationsShowcase
        destinations={destinations}
        onSelectDestination={handleSelectDestination}
        selectedDestination={selectedDestination}
      />

      {/* Main Tour Explorer Section */}
      <section id="explore-trips" style={{ padding: '70px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
              <span>All 165+ Handpicked Tours</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)' }}>
              Explore Curated <span className="gradient-text">Squad Getaways</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
              Cleaned itineraries, verified 3/4-star stays, transparent prices, and 24/7 on-tour support.
            </p>
          </div>

          {/* Filters Bar */}
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
            totalResults={totalResults}
          />

          {/* Tour Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✈️</div>
              <p style={{ fontWeight: 600 }}>Loading curated trips...</p>
            </div>
          ) : tours.length === 0 ? (
            <div className="glass" style={{
              borderRadius: 'var(--radius-lg)',
              padding: '60px 20px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
              border: '1px solid var(--border-color)'
            }}>
              <AlertCircle size={44} color="var(--coral-primary)" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                No Trips Found Matching Those Filters
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Try relaxing your budget slider, resetting the vibe filter, or searching for another destination!
              </p>
              <button onClick={handleResetFilters} className="gradient-btn" style={{ padding: '10px 24px' }}>
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {tours.map((tour) => (
                <TourCard
                  key={tour.tour_id}
                  tour={tour}
                  isSaved={isTourSaved(tour.tour_id)}
                  onToggleSave={toggleSaveTour}
                  onOpenDetails={(t) => setSelectedTourForModal(t)}
                  onQuickWhatsApp={handleQuickWhatsApp}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Squad Split-the-Bill Calculator */}
      <SquadBillSplitter initialTour={selectedTourForSplitter} />

      {/* Custom Dream Trip Builder */}
      <CustomTripBuilder />

      {/* Why Choose Tripplankaro */}
      <WhyTripPlanKaro />

      {/* Reviews & Social Proof */}
      <ReviewsSection />

      {/* Footer */}
      <Footer onFilterDestination={handleSelectDestination} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Saved Squad Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedTours={savedTours}
        onRemoveTour={(id) => setSavedTours(prev => prev.filter(t => t.tour_id !== id))}
        onOpenDetails={(t) => setSelectedTourForModal(t)}
        onOpenSplitter={(t) => {
          setSelectedTourForSplitter(t);
          const el = document.getElementById('squad-splitter');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {isAdminOpen && <AdminPortal onClose={() => setIsAdminOpen(false)} />}

      {/* Tour Detail Modal */}
      {selectedTourForModal && (
        <TourDetailModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
          onOpenSplitter={(t) => {
            setSelectedTourForSplitter(t);
            const el = document.getElementById('squad-splitter');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          isSaved={isTourSaved(selectedTourForModal.tour_id)}
          onToggleSave={toggleSaveTour}
        />
      )}
    </div>
  );
}

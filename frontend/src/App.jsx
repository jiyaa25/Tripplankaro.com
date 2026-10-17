import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BestPackagesSection from './components/BestPackagesSection';
import CatalogPage from './components/CatalogPage';
import TripBudgetCalculator from './components/TripBudgetCalculator';
import CustomTripBuilder from './components/CustomTripBuilder';
import VibeQuiz from './components/VibeQuiz';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import TourDetailModal from './components/TourDetailModal';
import DestinationDetailModal from './components/DestinationDetailModal';
import WishlistDrawer from './components/WishlistDrawer';

// Static Data
import toursData from './data/tours.json';
import destinationsData from './data/destinations.json';

import { generateTourWhatsAppMessage, openWhatsApp } from './utils/whatsapp';

export default function App() {
  // Theme State - Default to 'light' for first time visitors as requested
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tripplankaro_theme') || 'light';
  });

  // Active Multi-Page View:
  // 'home', 'domestic', 'international', 'theme-tour', 'calculator', 'custom-tour'
  const [activePage, setActivePage] = useState('home');

  // Search State in Hero
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState(null);
  const [selectedTourForCalculator, setSelectedTourForCalculator] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Wishlist state (localStorage)
  const [savedTours, setSavedTours] = useState(() => {
    try {
      const stored = localStorage.getItem('tripplankaro_saved');
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

  // Sync recently viewed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripplankaro_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  // Wishlist actions
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

  // Modal Tour Details
  const handleOpenTourDetails = useCallback((tour) => {
    setSelectedTourForModal(tour);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(t => t.tour_id !== tour.tour_id);
      return [tour, ...filtered].slice(0, 6);
    });
  }, []);

  // Quick WhatsApp Enquiry
  const handleQuickWhatsApp = useCallback((tour) => {
    const msg = generateTourWhatsAppMessage(tour);
    openWhatsApp(msg);
  }, []);

  // Search from Hero:
  // Navigate to all trips so whether destination is domestic or international, all matching tours appear!
  const handleHeroSearchSubmit = ({ destination }) => {
    setHeroSearchQuery(destination || '');
    setActivePage('theme-tour');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select package from Best Packages carousel:
  // Open all matching tour packages consistently
  const handleSelectPackageFromHome = (destName) => {
    setHeroSearchQuery(destName);
    setActivePage('theme-tour');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Header / Navbar matching user screenshot 2 */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        savedToursCount={savedTours.length}
        openWishlist={() => setIsWishlistOpen(true)}
        activePage={activePage}
        onSelectPage={(pageId) => {
          // Clear previous search query when explicitly navigating via navbar tabs
          setHeroSearchQuery('');
          setActivePage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => {
          setActivePage('theme-tour');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Multi-Page View Routing */}
      <main style={{ flex: 1 }}>
        {/* PAGE 1: HOME PAGE (Clean, Minimal & Engaging) */}
        {activePage === 'home' && (
          <>
            {/* Opening Carousel Hero matching image 1 & 2 */}
            <Hero
              searchQuery={heroSearchQuery}
              setSearchQuery={setHeroSearchQuery}
              onSearchSubmit={handleHeroSearchSubmit}
            />

            {/* Best Packages & Trust Banner matching image 3 */}
            <BestPackagesSection
              onSelectPackage={handleSelectPackageFromHome}
              onViewAllPackages={() => {
                setActivePage('international');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Verified Traveler Stories */}
            <ReviewsSection />
          </>
        )}

        {/* PAGE 2: DOMESTIC TOURS PAGE */}
        {activePage === 'domestic' && (
          <CatalogPage
            title="Domestic Holiday Packages 🇮🇳"
            subtitle="Explore incredible India — from snow-capped Himalayan peaks and serene Kashmiri valleys to Goa's sun-drenched beaches."
            defaultTourType="Domestic"
            toursData={toursData}
            onOpenDetails={handleOpenTourDetails}
            onQuickWhatsApp={handleQuickWhatsApp}
            isTourSaved={isTourSaved}
            toggleSaveTour={toggleSaveTour}
            initialSearchQuery={heroSearchQuery}
          />
        )}

        {/* PAGE 3: INTERNATIONAL TOURS PAGE */}
        {activePage === 'international' && (
          <CatalogPage
            title="International Holiday Packages ✈️"
            subtitle="From tropical island escapes in Bali and Thailand to modern wonders in Dubai and Singapore — handcrafted with 24/7 concierge."
            defaultTourType="International"
            toursData={toursData}
            onOpenDetails={handleOpenTourDetails}
            onQuickWhatsApp={handleQuickWhatsApp}
            isTourSaved={isTourSaved}
            toggleSaveTour={toggleSaveTour}
            initialSearchQuery={heroSearchQuery}
          />
        )}

        {/* PAGE 4: THEME TOURS PAGE (Beach, Trekking, Luxury, Honeymoon, Squad) */}
        {activePage === 'theme-tour' && (
          <CatalogPage
            title="Curated Theme Tours 🌴"
            subtitle="Choose holidays tailored by experience — beach vibes, high-altitude mountain treks, romantic retreats, and thrilling squad roadtrips."
            defaultTourType="all"
            toursData={toursData}
            onOpenDetails={handleOpenTourDetails}
            onQuickWhatsApp={handleQuickWhatsApp}
            isTourSaved={isTourSaved}
            toggleSaveTour={toggleSaveTour}
            initialSearchQuery={heroSearchQuery}
          />
        )}

        {/* PAGE 5: VIBE QUIZ PAGE (Find My Trip) */}
        {activePage === 'vibe-quiz' && (
          <div style={{ padding: '30px 0 60px 0' }}>
            <VibeQuiz
              onSelectVibe={(vibeTag) => {
                setHeroSearchQuery(vibeTag);
                setActivePage('theme-tour');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenTour={handleOpenTourDetails}
            />
          </div>
        )}

        {/* PAGE 6: CALCULATOR PAGE */}
        {activePage === 'calculator' && (
          <div style={{ padding: '30px 0 60px 0' }}>
            <TripBudgetCalculator initialTour={selectedTourForCalculator} />
          </div>
        )}

        {/* PAGE 6: CUSTOMIZED TOUR PAGE */}
        {activePage === 'custom-tour' && (
          <div style={{ padding: '30px 0 60px 0' }}>
            <CustomTripBuilder />
          </div>
        )}
      </main>

      {/* 3. Floating WhatsApp Support */}
      <FloatingWhatsApp />

      {/* 4. Footer Matching Reference Image 4 */}
      <Footer onNavigatePage={setActivePage} />

      {/* MODAL 1: Tour Detail Modal */}
      {selectedTourForModal && (
        <TourDetailModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
          onOpenCalculator={(tour) => {
            setSelectedTourForCalculator(tour);
            setActivePage('calculator');
            setSelectedTourForModal(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isSaved={isTourSaved(selectedTourForModal.tour_id)}
          onToggleSave={toggleSaveTour}
        />
      )}

      {/* MODAL 2: Destination Detail Modal */}
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

      {/* MODAL 3: Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedTours={savedTours}
        onRemoveTour={(id) => setSavedTours(prev => prev.filter(t => t.tour_id !== id))}
        onOpenDetails={handleOpenTourDetails}
        onOpenCalculator={(tour) => {
          setSelectedTourForCalculator(tour);
          setActivePage('calculator');
          setIsWishlistOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        recentlyViewed={recentlyViewed}
      />
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import TourCard from './TourCard';
import TourFilters from './TourFilters';
import { Compass, ArrowRight } from 'lucide-react';
import { filterAndSortTours } from '../utils/filterTours';

const PAGE_SIZE = 18;

export default function CatalogPage({
  title,
  subtitle,
  defaultTourType = 'all',
  toursData,
  onOpenDetails,
  onQuickWhatsApp,
  isTourSaved,
  toggleSaveTour,
  initialSearchQuery = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [tourType, setTourType] = useState(defaultTourType);
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [durationCat, setDurationCat] = useState('all');
  const [maxPrice, setMaxPrice] = useState(350000);
  const [sortBy, setSortBy] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Sync state if props change (e.g. searching a new term from header or switching tabs)
  useEffect(() => {
    setSearchQuery(initialSearchQuery || '');
  }, [initialSearchQuery]);

  useEffect(() => {
    setTourType(defaultTourType);
  }, [defaultTourType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setTourType(defaultTourType);
    setSelectedVibe('all');
    setSelectedDestination('all');
    setDurationCat('all');
    setMaxPrice(350000);
    setSortBy('recommended');
    setVisibleCount(PAGE_SIZE);
  };

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
  }, [toursData, searchQuery, tourType, selectedDestination, selectedVibe, maxPrice, durationCat, sortBy]);

  const displayedTours = useMemo(() => {
    return filteredTours.slice(0, visibleCount);
  }, [filteredTours, visibleCount]);

  return (
    <div style={{ padding: '40px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ff5722',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              <Compass size={16} />
              <span>{filteredTours.length} Curated Packages</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: 0 }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '1rem', maxWidth: '650px' }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Quick Budget Filters */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { label: 'Under ₹20K', max: 20000 },
              { label: 'Under ₹35K', max: 35000 },
              { label: 'Under ₹50K', max: 50000 },
              { label: 'Under ₹80K', max: 80000 },
              { label: 'All Budgets', max: 350000 }
            ].map(b => (
              <button
                key={b.max}
                onClick={() => setMaxPrice(b.max)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: maxPrice === b.max ? '1px solid #ff5722' : '1px solid var(--border-color)',
                  background: maxPrice === b.max ? 'rgba(255,87,34,0.15)' : 'var(--bg-card)',
                  color: maxPrice === b.max ? '#ff5722' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
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

        {/* Filter Controls Bar */}
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
          <div style={{
            padding: '70px 20px',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-color)',
            background: 'var(--bg-card)',
            marginTop: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧭🔍</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No Matching Trips Found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
              Try loosening your filters, adjusting your price limits, or browsing all available destinations.
            </p>
            <button onClick={handleResetFilters} className="gradient-btn" style={{ padding: '10px 24px' }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '24px'
            }}>
              {displayedTours.map(tour => (
                <TourCard
                  key={tour.tour_id}
                  tour={tour}
                  isSaved={isTourSaved(tour.tour_id)}
                  onToggleSave={toggleSaveTour}
                  onOpenDetails={onOpenDetails}
                  onQuickWhatsApp={onQuickWhatsApp}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredTours.length && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredTours.length))}
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
    </div>
  );
}

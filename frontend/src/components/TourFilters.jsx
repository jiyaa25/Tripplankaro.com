import React from 'react';
import { SlidersHorizontal, RotateCcw, Globe, Home } from 'lucide-react';

export default function TourFilters({
  tourType,
  setTourType,
  selectedVibe,
  setSelectedVibe,
  durationCat,
  setDurationCat,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  const vibes = [
    { tag: 'all', label: 'All Types', emoji: '✨' },
    { tag: '#AestheticStays', label: 'Aesthetic Stays', emoji: '🏡' },
    { tag: '#SquadGoals', label: 'Group Trips', emoji: '👯‍♂️' },
    { tag: '#InstaWorthy', label: 'Photogenic', emoji: '📸' },
    { tag: '#AdrenalineRush', label: 'Adventure & Treks', emoji: '🧗‍♀️' },
    { tag: '#BudgetBangers', label: 'Budget Friendly', emoji: '💸' },
    { tag: '#SunsetChasers', label: 'Beach & Coastal', emoji: '🏖️' },
    { tag: '#SoloExplorer', label: 'Solo Friendly', emoji: '🎒' },
    { tag: '#CultureCraze', label: 'Heritage & Culture', emoji: '🕌' }
  ];

  const types = [
    { id: 'all', label: 'All Tours', icon: null },
    { id: 'Domestic', label: 'India Trips 🇮🇳', icon: null },
    { id: 'International', label: 'International ✈️', icon: null },
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Weekend (2–4 Days)' },
    { id: 'week', label: 'Weeklong (5–8 Days)' },
    { id: 'long', label: 'Grand Explorer (9+ Days)' }
  ];

  const hasActiveFilters = tourType !== 'all' || selectedVibe !== 'all' || durationCat !== 'all' || maxPrice < 350000;

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      border: '1px solid var(--border-color)',
      marginBottom: '36px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top row: Domestic/International Tabs & Sort */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '16px'
      }}>
        {/* Tour Type tabs — Domestic / International */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginRight: '4px'
          }}>
            Destination:
          </span>
          {types.map(t => (
            <button
              key={t.id}
              id={`filter-type-${t.id.toLowerCase()}`}
              onClick={() => setTourType(t.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: tourType === t.id ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                background: tourType === t.id ? 'var(--coral-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: tourType === t.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontFamily: 'inherit'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <strong>{totalResults}</strong> tours found
          </span>
          <select
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            <option value="featured">✨ Featured & Trending</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated (5★)</option>
            <option value="duration_asc">Duration: Short to Long</option>
            <option value="duration_desc">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      {/* Row 2: Travel Vibe/Category Tags */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Travel Vibe:
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              id="reset-filters-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--coral-primary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'inherit'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset All</span>
            </button>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px'
        }}>
          {vibes.map((v, i) => {
            const isSelected = selectedVibe === v.tag;
            return (
              <button
                key={i}
                id={`filter-vibe-${i}`}
                onClick={() => setSelectedVibe(v.tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(255, 56, 92, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--coral-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition)',
                  fontFamily: 'inherit'
                }}
              >
                <span>{v.emoji}</span>
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Duration tabs & Price Slider */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-color)'
      }}>
        {/* Duration */}
        <div>
          <span style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '8px'
          }}>
            Duration:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {durations.map(d => (
              <button
                key={d.id}
                id={`filter-dur-${d.id}`}
                onClick={() => setDurationCat(d.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: durationCat === d.id ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  background: durationCat === d.id ? 'rgba(255, 56, 92, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  color: durationCat === d.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Max Budget / Person:
            </span>
            <span style={{ color: 'var(--coral-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
              {maxPrice >= 350000 ? 'Any Budget' : `Under ₹${maxPrice.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            id="filter-max-price-slider"
            min="10000"
            max="350000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--coral-primary)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>₹10,000</span>
            <span>₹1,50,000</span>
            <span>₹3,50,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

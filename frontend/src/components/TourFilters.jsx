import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const vibes = [
    { tag: 'all', label: 'All Vibes', emoji: '✨' },
    { tag: '#SunsetChasers', label: 'Sunset Chasers', emoji: '🌅' },
    { tag: '#AdrenalineRush', label: 'Adrenaline Rush', emoji: '🧗' },
    { tag: '#InstaWorthy', label: 'Insta Worthy', emoji: '📸' },
    { tag: '#BudgetBangers', label: 'Budget Bangers', emoji: '💸' },
    { tag: '#SquadGoals', label: 'Squad Goals', emoji: '👯‍♂️' },
    { tag: '#SoloExplorer', label: 'Solo Explorer', emoji: '🎒' },
    { tag: '#AestheticStays', label: 'Aesthetic Stays', emoji: '🏡' }
  ];

  const types = [
    { id: 'all', label: 'All Tours' },
    { id: 'Domestic', label: 'India Trips 🇮🇳' },
    { id: 'International', label: 'International ✈️' },
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Weekend (≤3D)' },
    { id: 'medium', label: 'Weeklong (4–6D)' },
    { id: 'long', label: 'Grand Tour (7D+)' }
  ];

  const budgetTiers = [
    { label: 'All Budgets', max: 350000 },
    { label: 'Under ₹15K', max: 15000 },
    { label: 'Under ₹25K', max: 25000 },
    { label: 'Under ₹40K', max: 40000 },
    { label: 'Under ₹60K', max: 60000 }
  ];

  const sortOptions = [
    { id: 'recommended', label: 'Recommended ✨' },
    { id: 'price-low', label: 'Price: Low to High 💰' },
    { id: 'price-high', label: 'Price: High to Low 💎' },
    { id: 'popular', label: 'Trending Vibes 🔥' },
    { id: 'shortest', label: 'Shortest Duration ⚡' },
    { id: 'longest', label: 'Longest Duration 🗓️' },
    { id: 'best-value', label: 'Best Value / Discount %' }
  ];

  const hasActiveFilters = tourType !== 'all' || selectedVibe !== 'all' || durationCat !== 'all' || maxPrice < 350000;

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px',
      border: '1px solid var(--border-color)',
      marginBottom: '32px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Row: Domestic / International Tabs + Sort + Mobile Filter Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '18px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '16px'
      }}>
        {/* Type tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          {types.map(t => (
            <button
              key={t.id}
              id={`filter-type-${t.id.toLowerCase()}`}
              onClick={() => setTourType(t.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: tourType === t.id ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                background: tourType === t.id ? 'var(--coral-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: tourType === t.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Results Count & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{totalResults}</strong> trips
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={15} color="var(--text-muted)" />
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {sortOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              id="reset-filters-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 56, 92, 0.1)',
                border: '1px solid rgba(255, 56, 92, 0.25)',
                color: 'var(--coral-primary)',
                padding: '7px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={13} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Vibe Pills */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'none'
        }}>
          {vibes.map(v => {
            const isSelected = selectedVibe === v.tag;
            return (
              <button
                key={v.tag}
                onClick={() => setSelectedVibe(v.tag)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(255,56,92,0.15)' : 'rgba(255,255,255,0.03)',
                  color: isSelected ? 'var(--coral-primary)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)'
                }}
              >
                <span>{v.emoji}</span>
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Budget Tiers & Duration Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)'
      }}>
        {/* Budget Tiers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Budget:
          </span>
          {budgetTiers.map(b => (
            <button
              key={b.max}
              onClick={() => setMaxPrice(b.max)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: maxPrice === b.max ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                background: maxPrice === b.max ? 'rgba(255,56,92,0.12)' : 'transparent',
                color: maxPrice === b.max ? 'var(--coral-primary)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Duration filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Days:
          </span>
          {durations.map(d => (
            <button
              key={d.id}
              onClick={() => setDurationCat(d.id)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: durationCat === d.id ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                background: durationCat === d.id ? 'rgba(255,56,92,0.12)' : 'transparent',
                color: durationCat === d.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

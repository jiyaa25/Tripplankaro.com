import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function DestinationsShowcase({ destinations, onSelectDestination, selectedDestination }) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section id="destinations" style={{
      padding: '60px 0',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px'
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
              <MapPin size={16} />
              <span>Explore By Hub</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
              Trending <span className="gradient-text">Destinations</span>
            </h2>
          </div>
          {selectedDestination && selectedDestination !== 'all' && (
            <button
              onClick={() => onSelectDestination('all')}
              className="secondary-btn"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Clear Destination Filter ({selectedDestination}) ✕
            </button>
          )}
        </div>

        {/* Destination Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {destinations.map((d, i) => {
            const isSelected = selectedDestination && (
              selectedDestination.toLowerCase() === d.name.toLowerCase()
            );

            return (
              <div
                key={i}
                id={`destination-card-${i}`}
                onClick={() => onSelectDestination(d.name)}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-coral)' : 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Image */}
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 14, 26, 0.92) 0%, rgba(10, 14, 26, 0.2) 60%, transparent 100%)'
                }} />

                {/* Badge for Type */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px'
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: d.tour_type === 'International' ? 'rgba(139,92,246,0.8)' : 'rgba(16,185,129,0.8)',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {d.tour_type}
                  </span>
                </div>

                {/* Content at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '2px'
                    }}>
                      {d.name}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontWeight: 600
                    }}>
                      {d.tour_count} Curated Tours
                    </p>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

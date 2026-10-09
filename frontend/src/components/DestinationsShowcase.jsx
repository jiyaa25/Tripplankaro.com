import React from 'react';
import { MapPin, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

export default function DestinationsShowcase({
  destinations,
  onSelectDestination,
  selectedDestination,
  onExploreDestination
}) {
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
              Popular <span className="gradient-text">Destinations</span>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {destinations.map((d, i) => {
            const isSelected = selectedDestination && (
              selectedDestination.toLowerCase() === d.name.toLowerCase()
            );

            return (
              <div
                key={d.destination_id || i}
                id={`destination-card-${i}`}
                style={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: isSelected ? '2px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-coral)' : 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                  cursor: 'pointer'
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
                onClick={() => {
                  if (onExploreDestination) {
                    onExploreDestination(d);
                  } else {
                    onSelectDestination(d.name);
                  }
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
                  background: 'linear-gradient(to top, rgba(10, 14, 26, 0.92) 0%, rgba(10, 14, 26, 0.3) 60%, transparent 100%)'
                }} />

                {/* Badge for Region / Country */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px'
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(10, 14, 26, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {d.region || d.country}
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
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '2px',
                      lineHeight: 1.2
                    }}>
                      {d.name}
                    </h3>
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 600,
                      margin: 0
                    }}>
                      {d.short_description?.slice(0, 48)}...
                    </p>
                  </div>
                  <div
                    title="Explore Hub Guide"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(255,56,92,0.85)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0
                    }}
                  >
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

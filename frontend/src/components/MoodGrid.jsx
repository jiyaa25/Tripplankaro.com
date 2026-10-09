import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import categoriesData from '../data/categories.json';

export default function MoodGrid({ onSelectMood, activeMood }) {
  return (
    <section id="mood-explorer" style={{
      padding: '50px 0',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 30px auto' }}>
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
            <Sparkles size={16} />
            <span>Discover Your Vibe</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '8px' }}>
            What are you in the <span className="gradient-text">mood for?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Filter handpicked itineraries by how you want to feel — from adrenaline rushes to cozy mountain retreats.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '14px'
        }}>
          {categoriesData.map(cat => {
            const isSelected = activeMood === cat.id || activeMood === cat.vibe;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectMood(cat.vibe || cat.name)}
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--coral-primary)' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-coral)' : 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '14px'
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{cat.emoji}</div>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
                    {cat.name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', marginTop: '2px' }}>
                    {cat.description}
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

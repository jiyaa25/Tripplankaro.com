import React, { useState, useEffect } from 'react';
import { Flame, Clock, Tag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import offersData from '../data/offers.json';
import { openWhatsApp } from '../utils/whatsapp';

function calculateTimeLeft(validUntil) {
  const diff = new Date(validUntil).getTime() - new Date().getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function OffersSection({ onSelectTourById }) {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const updateTimers = () => {
      const times = {};
      offersData.forEach(offer => {
        if (offer.valid_until) {
          times[offer.offer_id] = calculateTimeLeft(offer.valid_until);
        }
      });
      setTimeRemaining(times);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter out expired or inactive offers
  const activeOffers = offersData.filter(offer => {
    if (!offer.active) return false;
    if (offer.valid_until) {
      const isStillValid = new Date(offer.valid_until).getTime() > Date.now();
      if (!isStillValid) return false;
    }
    return true;
  });

  if (activeOffers.length === 0) return null;

  return (
    <section id="offers-section" style={{
      padding: '50px 0',
      background: 'rgba(255, 56, 92, 0.02)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
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
              color: 'var(--coral-primary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              <Flame size={16} />
              <span>Limited Season Discounts</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
              Trending Now & <span className="gradient-text">Special Offers</span>
            </h2>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚡ Direct booking incentives & seasonal squad perks
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {activeOffers.map(offer => {
            const timer = timeRemaining[offer.offer_id];

            return (
              <div
                key={offer.offer_id}
                className="glass"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'var(--transition)',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--coral-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-coral)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image & Badges */}
                <div style={{ height: '170px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span style={{
                      background: 'var(--sunset-gradient)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-coral)'
                    }}>
                      {offer.badge || 'OFFER'}
                    </span>
                    <span style={{
                      background: 'rgba(0,0,0,0.7)',
                      color: '#00f2fe',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {offer.discount}
                    </span>
                  </div>
                </div>

                {/* Offer Content */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--coral-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {offer.destination}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', lineHeight: 1.3 }}>
                    {offer.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                    {offer.description}
                  </p>

                  {/* Countdown Timer if available */}
                  {timer && (
                    <div style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.78rem'
                    }}>
                      <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="var(--coral-primary)" />
                        Ends In:
                      </span>
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {timer.days}d {timer.hours}h {timer.minutes}m {timer.seconds}s
                      </span>
                    </div>
                  )}

                  {/* Pricing and Action */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '12px'
                  }}>
                    <div>
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.8rem', marginRight: '6px' }}>
                        {offer.old_price}
                      </span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--coral-primary)' }}>
                        {offer.new_price}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (offer.tour_id && onSelectTourById) {
                          onSelectTourById(offer.tour_id);
                        } else {
                          openWhatsApp(`Hi Tripplankaro! 👋 I'm interested in claiming the *${offer.title}* offer for ${offer.destination}. Can you share details?`);
                        }
                      }}
                      className="gradient-btn"
                      style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                    >
                      <span>Claim Deal</span>
                      <ArrowRight size={14} />
                    </button>
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

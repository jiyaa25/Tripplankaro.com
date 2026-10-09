import React from 'react';
import { X, Scale, Star, Clock, Check, AlertCircle, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { generateTourWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function TourComparisonModal({ tours = [], onClose, onRemoveTour, onOpenDetails }) {
  if (!tours || tours.length === 0) return null;

  // Compute highlights among the compared tours
  const lowestPriceId = tours.reduce((min, t) => {
    const p = t.pricing?.discounted_price_num || 999999;
    return p < min.price ? { id: t.tour_id, price: p } : min;
  }, { id: null, price: 999999 }).id;

  const highestRatingId = tours.reduce((max, t) => {
    const r = t.rating || 0;
    return r > max.rating ? { id: t.tour_id, rating: r } : max;
  }, { id: null, rating: 0 }).id;

  const longestDurationId = tours.reduce((max, t) => {
    const d = t.duration?.days || 0;
    return d > max.days ? { id: t.tour_id, days: d } : max;
  }, { id: null, days: 0 }).id;

  const bestValueId = tours.reduce((max, t) => {
    const disc = t.pricing?.discount_percent || 0;
    return disc > max.disc ? { id: t.tour_id, disc } : max;
  }, { id: null, disc: 0 }).id;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass"
        onClick={e => e.stopPropagation()}
        style={{
          width: '95%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={22} color="var(--coral-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Compare Itineraries ({tours.length} / 3)
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Matrix (Horizontally scrollable on small screens) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${tours.length}, minmax(260px, 1fr))`,
            gap: '20px',
            alignItems: 'start'
          }}>
            {tours.map(tour => {
              const isBestPrice = tour.tour_id === lowestPriceId;
              const isHighestRating = tour.tour_id === highestRatingId;
              const isLongest = tour.tour_id === longestDurationId;
              const isBestValue = tour.tour_id === bestValueId;

              return (
                <div
                  key={tour.tour_id}
                  className="glass"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveTour(tour.tour_id)}
                    title="Remove from comparison"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 10,
                      background: 'rgba(0,0,0,0.7)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={15} />
                  </button>

                  {/* Image */}
                  <div style={{ height: '160px', position: 'relative' }}>
                    <img
                      src={tour.image}
                      alt={tour.tour_name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Highlight Badge */}
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {isBestPrice && (
                        <span style={{ background: '#10b981', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                          BEST PRICE 💰
                        </span>
                      )}
                      {isLongest && (
                        <span style={{ background: '#6366f1', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                          LONGEST ⏱️
                        </span>
                      )}
                      {isBestValue && !isBestPrice && (
                        <span style={{ background: '#ec4899', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                          BEST VALUE 🏷️
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--coral-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                        {tour.destination}
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '2px', lineHeight: 1.3 }}>
                        {tour.tour_name}
                      </h4>
                    </div>

                    {/* Price & Tour Type */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--coral-primary)' }}>
                          {tour.pricing?.discounted_price}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>per person</div>
                      </div>
                      <div style={{ background: 'rgba(255,56,92,0.15)', padding: '3px 8px', borderRadius: '4px', color: 'var(--coral-primary)', fontWeight: 800, fontSize: '0.78rem' }}>
                        <span>{tour.tour_type || 'Curated'}</span>
                      </div>
                    </div>

                    {/* Attributes Comparison */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>⏱ Duration:</span>
                        <strong>{tour.duration_short}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>👥 Group Size:</span>
                        <strong>{tour.group_size}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>🏨 Hotel Category:</span>
                        <strong>{tour.hotel?.category || 'Handpicked 3-Star'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>🚗 Transfers:</span>
                        <strong>Private AC Vehicle</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>🍽️ Meals:</span>
                        <strong>Breakfast Included</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>☀️ Best Season:</span>
                        <strong>{tour.best_time || 'Oct – Apr'}</strong>
                      </div>
                    </div>

                    {/* Key Inclusions */}
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Included:
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {(tour.highlights || tour.included || []).slice(0, 3).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenDetails(tour);
                        }}
                        className="secondary-btn"
                        style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
                      >
                        View Full Details
                      </button>
                      <button
                        onClick={() => openWhatsApp(generateTourWhatsAppMessage(tour))}
                        className="gradient-btn"
                        style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
                      >
                        <MessageCircle size={15} />
                        <span>Enquire on WA</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

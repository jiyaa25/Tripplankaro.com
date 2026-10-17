import React, { useState } from 'react';
import { X, Heart, Trash2, ArrowRight, MessageCircle, Share2, Calculator, Eye } from 'lucide-react';
import { generateTourWhatsAppMessage, openWhatsApp, createWhatsAppLink } from '../utils/whatsapp';
import { getTourImage } from '../utils/imageFallback';

function WishlistThumbnail({ tour, size = 74 }) {
  const resolved = getTourImage(tour.image, tour.destination);
  const [src, setSrc] = useState(resolved);

  return (
    <img
      src={src}
      alt={tour.tour_name}
      onError={() => setSrc(getTourImage(null, tour.destination))}
      loading="lazy"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: size > 50 ? 'var(--radius-sm)' : '6px',
        objectFit: 'cover',
        flexShrink: 0,
        backgroundColor: '#1f2937'
      }}
    />
  );
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedTours = [],
  onRemoveTour,
  onOpenDetails,
  onOpenCalculator,
  recentlyViewed = []
}) {
  if (!isOpen) return null;

  const totalEstimate = savedTours.reduce((acc, t) => acc + (t.pricing?.discounted_price_num || 0), 0);

  const handleShareWishlist = () => {
    const listText = savedTours.map(t => `• ${t.tour_name} (${t.pricing?.discounted_price})`).join('\n');
    const fullText = `🌴 *MY TRIPS BUCKET LIST ON TRIPPLANKARO* ✈️\n\n${listText}\n\nEstimated Cost: ₹${totalEstimate.toLocaleString('en-IN')}/person\nExplore on tripplankaro.com ("We Plan, You Enjoy")!`;

    if (navigator.share) {
      navigator.share({ title: 'My Trips - Tripplankaro', text: fullText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(fullText);
      alert('Trip shortlist copied to clipboard!');
    }
  };

  const handleWhatsAppWishlist = () => {
    const listText = savedTours.map(t => `• ${t.tour_name} (${t.pricing?.discounted_price})`).join('\n');
    const message = `Hi Tripplankaro! 👋
I'm looking at my shortlisted trips on your website:
${listText}

Estimated budget: ₹${totalEstimate.toLocaleString('en-IN')}/head
Can you help us plan and check upcoming dates for these?`;
    openWhatsApp(message);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '480px',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1050,
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="var(--coral-primary)" fill="var(--coral-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              My Trips ({savedTours.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-wishlist-drawer-btn"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
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

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {savedTours.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 10px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>❤️‍🩹</div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                No Trips Saved Yet
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Click the heart icon on any tour card to bookmark packages for your upcoming holiday!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {savedTours.map((t) => (
                <div
                  key={t.tour_id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <WishlistThumbnail tour={t} size={74} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--coral-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                      {t.destination} • {t.duration_short}
                    </div>
                    <h5
                      onClick={() => {
                        onClose();
                        onOpenDetails(t);
                      }}
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        margin: '3px 0 6px 0',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {t.tour_name}
                    </h5>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                        {t.pricing?.discounted_price}
                      </span>

                      {/* Item Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {onOpenCalculator && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenCalculator(t);
                            }}
                            title="Calculate Budget"
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                          >
                            <Calculator size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => onRemoveTour(t.tour_id)}
                          title="Remove"
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recently Viewed Section */}
          {recentlyViewed && recentlyViewed.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '18px', marginTop: '10px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={14} />
                <span>Recently Viewed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentlyViewed.slice(0, 3).map(r => (
                  <div
                    key={r.tour_id}
                    onClick={() => {
                      onClose();
                      onOpenDetails(r);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-card)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--coral-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <WishlistThumbnail tour={r} size={42} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {r.tour_name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--coral-primary)', fontWeight: 700 }}>
                        {r.pricing?.discounted_price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedTours.length > 0 && (
          <div style={{
            padding: '18px 20px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-card)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Combined Estimate:</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Per person approx</div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--coral-primary)' }}>
                ₹{totalEstimate.toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px' }}>
              <button
                onClick={handleWhatsAppWishlist}
                className="gradient-btn"
                style={{ padding: '12px', fontSize: '0.88rem' }}
              >
                <MessageCircle size={16} />
                <span>Enquire All on WA</span>
              </button>

              <button
                onClick={handleShareWishlist}
                className="secondary-btn"
                style={{ padding: '12px', fontSize: '0.88rem' }}
              >
                <Share2 size={16} />
                <span>Share List</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

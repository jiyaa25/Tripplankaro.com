import React from 'react';
import { X, Heart, Trash2, ArrowRight, MessageCircle, Share2, Calculator } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedTours,
  onRemoveTour,
  onOpenDetails,
  onOpenSplitter
}) {
  if (!isOpen) return null;

  const totalEstimate = savedTours.reduce((acc, t) => acc + (t.pricing?.discounted_price_num || 0), 0);

  const handleShareWishlist = () => {
    const listText = savedTours.map(t => `• ${t.tour_name} (${t.pricing?.discounted_price})`).join('\n');
    const fullText = `🌴 *OUR SQUAD BUCKET LIST ON TRIPPLANKARO* ✈️\n\n${listText}\n\nEstimated Cost: ₹${totalEstimate.toLocaleString()}/head\nCheck them out on tripplankaro.com ("We plan, you enjoy")!`;

    if (navigator.share) {
      navigator.share({ title: 'Squad Wishlist', text: fullText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(fullText);
      alert('Squad bucket list copied to clipboard!');
    }
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
          maxWidth: '460px',
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
            <h3 style={{ fontSize: '1.2rem' }}>
              Squad Saved Trips ({savedTours.length})
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
            <div style={{ textAlign: 'center', padding: '60px 10px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>❤️‍🩹</div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                Your Squad Wishlist is Empty
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Click the heart icon on any tour card to bookmark trips for your squad vacation!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {savedTours.map((t) => (
                <div
                  key={t.tour_id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    display: 'flex',
                    gap: '12px',
                    padding: '10px'
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.tour_name}
                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--coral-primary)', fontWeight: 700 }}>
                      {t.destination} • {t.duration_short}
                    </div>
                    <h4
                      onClick={() => {
                        onClose();
                        onOpenDetails(t);
                      }}
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.25,
                        margin: '2px 0 4px 0',
                        cursor: 'pointer',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {t.tour_name}
                    </h4>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {t.pricing?.discounted_price}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveTour(t.tour_id)}
                    title="Remove from saved"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '6px',
                      alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedTours.length > 0 && (
          <div style={{
            padding: '18px 20px',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Combined Wishlist Total:
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--coral-primary)' }}>
                ₹{totalEstimate.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleShareWishlist}
                className="secondary-btn"
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
              >
                <Share2 size={15} />
                <span>Share with Squad</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenSplitter(savedTours[0]);
                }}
                className="gradient-btn"
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
              >
                <Calculator size={15} />
                <span>Split Bill</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

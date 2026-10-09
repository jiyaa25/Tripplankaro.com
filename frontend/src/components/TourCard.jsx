import React, { useState } from 'react';
import { Heart, Clock, ArrowRight, MessageCircle, Sparkles, Scale } from 'lucide-react';
import { getTourImage } from '../utils/imageFallback';

export default function TourCard({
  tour,
  isSaved,
  onToggleSave,
  onOpenDetails,
  onQuickWhatsApp,
  isCompared = false,
  onToggleCompare
}) {
  const {
    tour_id,
    tour_name,
    destination,
    duration_short,
    group_size,
    image,
    pricing,
    rating,
    review_count,
    vibes,
    tour_type,
    is_trending
  } = tour;

  const resolvedImage = getTourImage(image, destination);
  const [imgSrc, setImgSrc] = useState(resolvedImage);

  return (
    <div
      id={`tour-card-${tour_id}`}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        const img = e.currentTarget.querySelector('.tour-card-img');
        if (img) img.style.transform = 'scale(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        const img = e.currentTarget.querySelector('.tour-card-img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        height: '210px',
        overflow: 'hidden',
        background: '#1f2937'
      }}>
        <img
          src={imgSrc}
          alt={tour_name}
          className="tour-card-img"
          loading="lazy"
          onError={() => setImgSrc(getTourImage(null, destination))}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 2
        }}>
          <span style={{
            background: 'rgba(10, 14, 26, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Clock size={12} color="var(--coral-primary)" />
            {duration_short}
          </span>

          {pricing?.discount_percent > 0 && (
            <span style={{
              background: 'var(--coral-primary)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {pricing.discount_percent}% OFF
            </span>
          )}
        </div>

        {/* Action icons: Compare & Wishlist */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 2
        }}>
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(tour);
              }}
              id={`compare-btn-${tour_id}`}
              title={isCompared ? "Remove from comparison" : "Compare this tour"}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: isCompared ? 'var(--coral-primary)' : 'rgba(10, 14, 26, 0.65)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <Scale size={16} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(tour);
            }}
            id={`wishlist-btn-${tour_id}`}
            title={isSaved ? "Remove from wishlist" : "Save to squad wishlist"}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(10, 14, 26, 0.65)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              color: isSaved ? 'var(--coral-primary)' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Heart size={18} fill={isSaved ? "var(--coral-primary)" : "none"} />
          </button>
        </div>

        {/* Trending Chip */}
        {is_trending && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(255, 159, 28, 0.9)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} />
            <span>TRENDING VIBE</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Destination & Type */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px'
        }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--coral-primary)'
          }}>
            {destination} • {tour_type}
          </span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {group_size || 'Custom Group'}
          </span>
        </div>

        {/* Tour Name */}
        <h3
          onClick={() => onOpenDetails(tour)}
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.35,
            fontWeight: 800,
            marginBottom: '10px',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--coral-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          {tour_name}
        </h3>

        {/* Vibe Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '16px'
        }}>
          {vibes?.slice(0, 2).map((v, idx) => (
            <span key={idx} className="tag-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              {v}
            </span>
          ))}
        </div>

        {/* Price & CTA Section */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              From <span style={{ textDecoration: 'line-through' }}>{pricing?.original_price}</span>
            </div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)'
            }}>
              {pricing?.discounted_price}
              <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>
                /person
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => onQuickWhatsApp(tour)}
              title="Instant WhatsApp Enquiry"
              id={`wa-quote-btn-${tour_id}`}
              style={{
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                color: '#25d366',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#25d366';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)';
                e.currentTarget.style.color = '#25d366';
              }}
            >
              <MessageCircle size={18} />
            </button>

            <button
              onClick={() => onOpenDetails(tour)}
              id={`view-tour-btn-${tour_id}`}
              className="gradient-btn"
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

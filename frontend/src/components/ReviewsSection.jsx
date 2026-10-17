import React, { useState } from 'react';
import { Camera, ExternalLink, Sparkles, Globe, Compass, Calendar, X, Image as ImageIcon } from 'lucide-react';
import companyData from '../data/company.json';
import reviewsData from '../data/reviews.json';

export default function ReviewsSection() {
  const googleFormUrl = companyData.google_review_form || 'https://forms.gle/tripplankaro-reviews';
  const activeReviews = (reviewsData || []).filter(r => r.active !== false);

  // Modal / lightbox state for viewing all 2-3 photos from a reviewer
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id) => {
    setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" style={{
      padding: '75px 0 65px 0',
      borderBottom: '1px solid var(--border-color)',
      background: 'transparent',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 42px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--coral-primary)',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px'
          }}>
            <Sparkles size={16} />
            <span>Real Traveler Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', fontWeight: 800, marginBottom: '14px', lineHeight: 1.25 }}>
            Loved by Travelers <span className="gradient-text">Around the Globe</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Genuine vacation memories, authentic photos, and unfiltered reviews submitted directly by our explorers.
          </p>
        </div>

        {/* 1. Review Cards Grid - Matching Image 2 Design */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {activeReviews.map((item, idx) => {
            const reviewId = item.review_id || `review-${idx}`;
            const isExpanded = !!expandedReviews[reviewId];
            const photosList = Array.isArray(item.photos) && item.photos.length > 0 
              ? item.photos 
              : [item.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'];
            const primaryPhoto = photosList[0];
            const tripType = item.trip_type || 'Individual Tour';
            const isGroup = tripType.toLowerCase().includes('group');

            // Format month
            const displayMonth = item.month_year || item.date?.split(' ')[0] || 'Trip';

            return (
              <div
                key={reviewId}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div>
                  {/* Top Row: Title + Author vs Photo with Floating Month Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '14px'
                  }}>
                    {/* Left: Bold Title & Traveler Name */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                        marginBottom: '6px'
                      }}>
                        {item.title || `Trip to ${item.destination}`}
                      </h3>
                      <div style={{
                        fontSize: '0.96rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 600
                      }}>
                        {item.name}
                      </div>
                    </div>

                    {/* Right: Rounded Photo with Date Capsule */}
                    <div 
                      onClick={() => setActivePhotoModal({ name: item.name, title: item.title, photos: photosList })}
                      title="Click to view full photos"
                      style={{
                        position: 'relative',
                        width: '88px',
                        height: '88px',
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        src={primaryPhoto}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                          objectFit: 'cover',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80';
                        }}
                      />

                      {/* Multi-photo badge pill if user uploaded > 1 photos */}
                      {photosList.length > 1 && (
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0, 0, 0, 0.65)',
                          color: '#fff',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          borderRadius: '8px',
                          padding: '2px 5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <ImageIcon size={10} />
                          <span>{photosList.length}</span>
                        </div>
                      )}

                      {/* Floating Month Badge at bottom of image matching Image 2 */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        padding: '2px 9px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#334155',
                        whiteSpace: 'nowrap'
                      }}>
                        <Calendar size={11} color="#64748b" />
                        <span>{displayMonth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Italic Testimonial Text */}
                  <div style={{ marginTop: '8px', marginBottom: '14px' }}>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.93rem',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      margin: 0
                    }}>
                      "{isExpanded ? item.review : (item.review.length > 130 ? `${item.review.slice(0, 130)}...` : item.review)}"
                    </p>

                    {item.review.length > 130 && (
                      <button
                        onClick={() => toggleExpand(reviewId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0284c7',
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          padding: '4px 0',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Destination Pill + Tour Style Pill matching Image 2 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {/* Left: Destination and Tour Type Icons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)'
                    }}>
                      <Globe size={15} color="var(--text-muted)" />
                      <span>{item.destination}</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)'
                    }}>
                      <Compass size={15} color="var(--text-muted)" />
                      <span>{tripType}</span>
                    </div>
                  </div>

                  {/* Right: Colored Tour Capsule Button (Pink for Individual, Cyan for Group) */}
                  <div style={{
                    padding: '6px 14px',
                    borderRadius: '25px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: isGroup ? 'rgba(6, 182, 212, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                    color: isGroup ? '#0891b2' : '#9333ea',
                    border: isGroup ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid rgba(168, 85, 247, 0.25)'
                  }}>
                    <span>{tripType}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Callout Box: Submit Experience via Google Form */}
        <div style={{
          borderRadius: '24px',
          padding: '38px 30px',
          border: '1.5px dashed var(--border-color)',
          background: 'var(--bg-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(255, 87, 34, 0.12)',
            color: 'var(--coral-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Camera size={26} />
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Traveled with Tripplankaro Recently? 📸
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.96rem',
            maxWidth: '650px',
            margin: '0 auto 24px',
            lineHeight: 1.6
          }}>
            Upload 2 to 3 photos or videos along with your travel highlights via our quick Google Form. Your story will be showcased right here!
          </p>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="share-experience-btn"
            className="gradient-btn"
            style={{
              padding: '13px 28px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              borderRadius: '50px',
              boxShadow: '0 4px 14px rgba(255, 87, 34, 0.35)'
            }}
          >
            <Camera size={18} />
            <span>Share Your Travel Experience</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Lightbox Modal: Viewing multiple photos submitted by user */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3px' }}>
                  {activePhotoModal.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Photos submitted by {activePhotoModal.name}
                </p>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Photos Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: activePhotoModal.photos.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px'
            }}>
              {activePhotoModal.photos.map((url, pIdx) => (
                <div key={pIdx} style={{ borderRadius: '14px', overflow: 'hidden', height: '260px' }}>
                  <img
                    src={url}
                    alt={`${activePhotoModal.name} trip photo ${pIdx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

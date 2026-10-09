import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Camera,
  Star,
  MessageCircle,
  Send,
  Calculator,
  Share2,
  Heart,
  ChevronRight,
  Scale,
  Sparkles
} from 'lucide-react';
import { generateTourWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { getTourImage, getGalleryImages } from '../utils/imageFallback';

export default function TourDetailModal({
  tour,
  onClose,
  onOpenSplitter,
  onOpenCalculator,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare
}) {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'inclusions', 'photos', 'book'
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    squad_size: 4,
    departure_city: '',
    travel_date: '',
    meal_preference: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!tour) return null;

  const {
    tour_id,
    tour_name,
    destination,
    duration,
    duration_short,
    group_size,
    pricing,
    rating,
    review_count,
    overview,
    included,
    excluded,
    itinerary,
    vibes,
    photo_spots,
    gallery_images,
    image
  } = tour;

  // Resolve images — replaces broken thefoxtraveller.com URLs with reliable Unsplash fallbacks
  const resolvedHeroImage = getTourImage(image, destination);
  const resolvedGallery = getGalleryImages(gallery_images, destination, image);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    const msg = `Hi Tripplankaro! 👋
I want to enquire about planning this trip:
*${tour_name}* (ID: ${tour_id}, ${duration_short})
Price: ${pricing?.discounted_price || 'On Request'}

Details:
• Name: ${inquiryForm.name}
• Phone: ${inquiryForm.phone}
• Travelers: ${inquiryForm.squad_size} persons
• Preferred Date: ${inquiryForm.travel_date || 'Flexible'}
• Departure City: ${inquiryForm.departure_city || 'Not specified'}
• Meal Preference: ${inquiryForm.meal_preference || 'None'}
• Notes: ${inquiryForm.notes || 'None'}

Please check availability and connect with me!`;
    openWhatsApp(msg);
  };

  const handleWhatsAppDirect = () => {
    const msg = generateTourWhatsAppMessage(tour);
    openWhatsApp(msg);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour_name,
        text: `Check out this trip on Tripplankaro: ${tour_name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Trip link copied to clipboard for your squad!');
    }
  };

  const activeDay = itinerary && itinerary[selectedDayIndex] ? itinerary[selectedDayIndex] : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255, 56, 92, 0.15)',
              color: 'var(--coral-primary)',
              fontWeight: 800,
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase'
            }}>
              {destination}
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {duration_short}
            </span>
            {vibes?.map((v, idx) => (
              <span key={idx} className="tag-badge" style={{ fontSize: '0.7rem' }}>
                {v}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(tour)}
                title={isCompared ? "Remove from comparison" : "Compare this tour"}
                style={{
                  background: isCompared ? 'var(--coral-primary)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-color)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <Scale size={17} />
              </button>
            )}
            <button
              onClick={() => onToggleSave(tour)}
              title={isSaved ? "Saved in wishlist" : "Save trip"}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSaved ? 'var(--coral-primary)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <Heart size={18} fill={isSaved ? "var(--coral-primary)" : "none"} />
            </button>
            <button
              onClick={handleShare}
              title="Share with Squad"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={onClose}
              id="close-modal-btn"
              title="Close"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
          {/* Title & Quick Stats */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h2 style={{ fontSize: '1.65rem', lineHeight: 1.25, marginBottom: '8px' }}>
                {tour_name}
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={16} color="var(--coral-primary)" />
                  {duration_short || duration?.text || 'Custom Duration'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={16} color="var(--coral-primary)" />
                  {group_size || 'Custom Group'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--coral-primary)', fontWeight: 700 }}>
                  <Sparkles size={15} />
                  <span>Curated Tour</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Regular: <span style={{ textDecoration: 'line-through' }}>{pricing?.original_price}</span>
                {pricing?.discount_percent > 0 && (
                  <span style={{ color: 'var(--coral-primary)', fontWeight: 700, marginLeft: '6px' }}>
                    {pricing.discount_percent}% OFF
                  </span>
                )}
              </div>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                color: 'var(--coral-primary)',
                fontFamily: 'var(--font-heading)'
              }}>
                {pricing?.discounted_price}
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}> /person</span>
              </div>
            </div>
          </div>

          {/* Gallery Snapshot */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '24px'
          }}>
            {resolvedGallery.slice(0, 4).map((imgUrl, idx) => (
              <div key={idx} style={{
                height: '130px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#1e293b'
              }}>
                <img
                  src={imgUrl}
                  alt={`Tour snapshot ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = resolvedHeroImage; }}
                />
              </div>
            ))}
          </div>

          {/* Overview text */}
          <div style={{
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '24px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            fontSize: '0.94rem'
          }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              ✨ Trip Overview:
            </strong>
            {overview}
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            gap: '24px',
            marginBottom: '24px',
            overflowX: 'auto'
          }}>
            {[
              { id: 'itinerary', label: `Day-by-Day Itinerary (${itinerary?.length || 0}D)` },
              { id: 'inclusions', label: 'Inclusions & Exclusions' },
              { id: 'photos', label: 'Insta Photo Spots 📸' },
              { id: 'book', label: 'Book / Inquire' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`modal-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid var(--coral-primary)' : '3px solid transparent',
                  color: activeTab === tab.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '10px 0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div>
              {/* Day Pills */}
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                {itinerary?.map((dayItem, idx) => (
                  <button
                    key={idx}
                    id={`itinerary-day-btn-${idx + 1}`}
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      border: selectedDayIndex === idx ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                      background: selectedDayIndex === idx ? 'var(--coral-primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedDayIndex === idx ? '#fff' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'var(--transition)'
                    }}
                  >
                    Day {dayItem.day}
                  </button>
                ))}
              </div>

              {/* Active Day Detail Card */}
              {activeDay && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: activeDay.image ? '1fr 280px' : '1fr',
                  gap: '24px'
                }} className="day-detail-grid">
                  <div>
                    <div style={{
                      color: 'var(--coral-primary)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px'
                    }}>
                      Day {activeDay.day} Itinerary
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '14px' }}>
                      {activeDay.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-line'
                    }}>
                      {activeDay.description}
                    </p>
                  </div>

                  {activeDay.image && (
                    <div style={{
                      height: '200px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      background: '#1e293b'
                    }}>
                      <img
                        src={getTourImage(activeDay.image, destination)}
                        alt={`Day ${activeDay.day} ${activeDay.title}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = resolvedHeroImage; }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Inclusions */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#10b981',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  marginBottom: '16px'
                }}>
                  <CheckCircle size={20} />
                  <span>What's Included in Package</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {included?.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ef4444',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  marginBottom: '16px'
                }}>
                  <XCircle size={20} />
                  <span>What's Not Included</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {excluded?.map((exc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#ef4444', marginTop: '2px' }}>✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: INSTA PHOTO SPOTS */}
          {activeTab === 'photos' && (
            <div>
              <div style={{ marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>
                  Top 3 Curated Photo Spots for Your Feed 📸
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Every Tripplankaro tour is timed so you hit the most aesthetic viewpoints during golden hour.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {photo_spots?.map((spot, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255, 56, 92, 0.15)',
                      color: 'var(--coral-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Camera size={22} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--coral-primary)' }}>
                        SPOT #{idx + 1}
                      </span>
                      <h4 style={{ fontSize: '0.98rem', marginTop: '2px' }}>{spot}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Best time: Sunset / Dawn</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BOOK / INQUIRE FORM */}
          {activeTab === 'book' && (
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              {submitSuccess ? (
                <div style={{
                  padding: '32px',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉</div>
                  <h3 style={{ fontSize: '1.4rem', color: '#10b981', marginBottom: '8px' }}>
                    Inquiry Received!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    Thanks {inquiryForm.name}! A dedicated Tripplankaro trip architect will message you on WhatsApp with the best squad deal.
                  </p>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="gradient-btn"
                    style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                  >
                    <MessageCircle size={16} />
                    <span>Open in WhatsApp Now</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.3rem' }}>Reserve Your Squad's Spot</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Fill this out or ping us directly on WhatsApp. No advance payment required right now!
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="e.g. Aryan Sharma"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        Squad Size (Pax)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={inquiryForm.squad_size}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, squad_size: parseInt(e.target.value) || 1 })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        Estimated Travel Date
                      </label>
                      <input
                        type="date"
                        value={inquiryForm.travel_date}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, travel_date: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        Departure City
                      </label>
                      <input
                        type="text"
                        value={inquiryForm.departure_city}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, departure_city: e.target.value })}
                        placeholder="e.g. Surat"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        Meal Preference
                      </label>
                      <select
                        value={inquiryForm.meal_preference}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, meal_preference: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                      >
                        <option value="">No preference</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Pure Vegetarian">Pure Vegetarian</option>
                        <option value="Jain">Jain</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                      Any custom requests or vibe preferences?
                    </label>
                    <textarea
                      rows={2}
                      value={inquiryForm.notes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                      placeholder="e.g. Need private pool villa / want adventure sports pass..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="gradient-btn"
                      style={{ flex: 1, padding: '12px', fontSize: '0.95rem' }}
                    >
                      <Send size={16} />
                      <span>{submitting ? 'Submitting...' : 'Send Inquiry Request'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      style={{
                        background: '#25d366',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '12px 20px',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WA</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Quick Action Bar */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onClose();
                onOpenSplitter(tour);
              }}
              id="split-bill-shortcut-btn"
              className="secondary-btn"
              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
            >
              <Calculator size={15} />
              <span>Split Squad Cost 💸</span>
            </button>

            {onOpenCalculator && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCalculator(tour);
                }}
                className="secondary-btn"
                style={{ padding: '8px 14px', fontSize: '0.84rem' }}
              >
                <span>🧮 Budget Calc</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleWhatsAppDirect}
              style={{
                background: '#25d366',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '8px 18px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Enquiry</span>
            </button>

            <button
              onClick={() => setActiveTab('book')}
              className="gradient-btn"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              <span>Plan This Trip</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

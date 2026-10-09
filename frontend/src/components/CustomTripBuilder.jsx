import React, { useState } from 'react';
import { Sparkles, Send, MessageCircle, CheckCircle, ArrowRight, Compass, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateCustomTripWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function CustomTripBuilder() {
  const [formData, setFormData] = useState({
    destination: '',
    travelDates: '',
    travelers: '4',
    budget: '₹20,000 - ₹35,000 per person',
    travelStyle: 'Sightseeing & Leisure',
    hotelType: '3-4 Star Handpicked Stays',
    activities: 'Sightseeing, Local Cafes, Photography',
    food: 'Breakfast included + Local food recommendations',
    transport: 'Private AC Cab for our squad',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
  };

  const handleSendToWhatsApp = () => {
    const msg = generateCustomTripWhatsAppMessage(formData);
    openWhatsApp(msg);
  };

  return (
    <section id="custom-builder" style={{
      padding: '70px 0',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--coral-primary)',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            <Compass size={16} />
            <span>Tailor-Made Vacation Architect</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '8px' }}>
            Build Your <span className="gradient-text">Custom Dream Trip</span> 🎒
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Looking for a specific route, private villa, or offbeat spots? Send your requirements to Tripplankaro.
          </p>
        </div>

        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '34px 28px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)'
        }}>
          {submitted ? (
            /* Readable Trip Brief Review Screen */
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>📋✨</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>
                  Your Custom Trip Brief is Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Review your specifications below and send your requirements to Tripplankaro via WhatsApp.
                </p>
              </div>

              {/* Brief Card */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.88rem',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>📍 Destination:</span> <strong>{formData.destination || 'Flexible'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>📅 Travel Window:</span> <strong>{formData.travelDates || 'Upcoming'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>👥 Travelers:</span> <strong>{formData.travelers} Persons</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>💰 Budget Target:</span> <strong>{formData.budget}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>✨ Travel Style:</span> <strong>{formData.travelStyle}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>🏨 Hotel Category:</span> <strong>{formData.hotelType}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>🚗 Transport:</span> <strong>{formData.transport}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>🍽️ Meal Plan:</span> <strong>{formData.food}</strong></div>
                </div>
                {formData.activities && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>🎒 Key Activities:</span> {formData.activities}
                  </div>
                )}
                {formData.specialRequests && (
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>📝 Special Requests:</span> {formData.specialRequests}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSendToWhatsApp}
                  className="gradient-btn"
                  style={{ padding: '13px 26px', fontSize: '0.95rem' }}
                >
                  <MessageCircle size={18} />
                  <span>Send my trip request on WhatsApp</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="secondary-btn"
                  style={{ padding: '13px 20px', fontSize: '0.9rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Edit Specifications</span>
                </button>
              </div>
            </div>
          ) : (
            /* Builder Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Destination & Month */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Where do you want to travel? *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Kashmir, Ladakh, Bali, Goa..."
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Tentative Travel Month / Dates *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Mid October, Diwali week, Next month"
                    value={formData.travelDates}
                    onChange={e => setFormData({ ...formData, travelDates: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Travelers & Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Number of Travelers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 friends, 2 adults + 1 kid"
                    value={formData.travelers}
                    onChange={e => setFormData({ ...formData, travelers: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Budget Preference (Per Person)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="Under ₹15,000">Backpacker / Budget (Under ₹15,000)</option>
                    <option value="₹15,000 - ₹25,000">Comfort Explorer (₹15,000 - ₹25,000)</option>
                    <option value="₹25,000 - ₹45,000">Premium Stays (₹25,000 - ₹45,000)</option>
                    <option value="₹45,000+">Luxury / International (₹45,000+)</option>
                  </select>
                </div>
              </div>

              {/* Travel Style & Hotel Category */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Travel Style
                  </label>
                  <select
                    value={formData.travelStyle}
                    onChange={e => setFormData({ ...formData, travelStyle: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="Relaxed & Leisure">Relaxed & Leisure</option>
                    <option value="Adventure, Hiking & Thrill">Adventure, Hiking & Thrill</option>
                    <option value="Sightseeing & Culture">Sightseeing & Culture</option>
                    <option value="Party & Nightlife">Party & Nightlife</option>
                    <option value="Romantic & Private">Romantic & Private</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Hotel Preference
                  </label>
                  <select
                    value={formData.hotelType}
                    onChange={e => setFormData({ ...formData, hotelType: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="3-Star Clean Handpicked Hotels">3-Star Clean Handpicked Hotels</option>
                    <option value="4-Star Boutique Resorts">4-Star Boutique Resorts</option>
                    <option value="5-Star Luxury / Pool Villa">5-Star Luxury / Pool Villa</option>
                    <option value="Backpacker Hostels / Homestays">Backpacker Hostels / Homestays</option>
                  </select>
                </div>
              </div>

              {/* Activities, Food & Transport */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Preferred Activities
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Scuba, Paragliding, Trekking, Cafes"
                    value={formData.activities}
                    onChange={e => setFormData({ ...formData, activities: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Internal Transport
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Private Cab / Scooters / Tempo Traveller"
                    value={formData.transport}
                    onChange={e => setFormData({ ...formData, transport: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Special Requests / Dietary / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us any specific stops, dietary restrictions (pure veg, jain food), or surprise celebration requirements..."
                  value={formData.specialRequests}
                  onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="submit"
                  className="gradient-btn"
                  style={{ padding: '14px 32px', fontSize: '1rem' }}
                >
                  <Sparkles size={18} />
                  <span>Generate Trip Brief</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

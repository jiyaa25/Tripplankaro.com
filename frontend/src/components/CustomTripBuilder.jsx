import React, { useState } from 'react';
import { Sparkles, Send, MessageCircle, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CustomTripBuilder() {
  const [formData, setFormData] = useState({
    vibe: 'Squad Trips & Party',
    destination: '',
    duration: '5-7 Days',
    budget_per_person: '₹15,000 - ₹25,000',
    squad_size: 4,
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const vibes = [
    { label: 'Squad Trips & Party', emoji: '👯‍♂️' },
    { label: 'Mountain Treks & Silence', emoji: '🏔️' },
    { label: 'Beach Sundowners & Cafes', emoji: '🏖️' },
    { label: 'International Backpacking', emoji: '✈️' },
    { label: 'Aesthetic Boutique Stays', emoji: '🏡' }
  ];

  const durations = ['Weekend (3-4 Days)', '5-7 Days', '8-10 Days', '11+ Days'];
  const budgets = ['Under ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+ (International)'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppHandoff = () => {
    const text = encodeURIComponent(
      `Hey Tripplankaro! ✈️ Custom trip request from *${formData.name}*:\n\n• Vibe: ${formData.vibe}\n• Destination: ${formData.destination || 'Open to suggestions'}\n• Duration: ${formData.duration}\n• Budget: ${formData.budget_per_person}\n• Squad Size: ${formData.squad_size} pax\n• Note: ${formData.notes || 'None'}\n\nLet's plan this!`
    );
    window.open(`https://wa.me/919016272544?text=${text}`, '_blank');
  };

  return (
    <section id="custom-builder" style={{
      padding: '70px 0',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ maxWidth: '820px' }}>
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
            <span>Tailor-Made Trips</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '8px' }}>
            Build Your <span className="gradient-text">Custom Dream Itinerary</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Want something unique for your squad? Pick your vibe and let our travel architects create a personalized trip.
          </p>
        </div>

        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '36px 30px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🚀✨</div>
              <h3 style={{ fontSize: '1.6rem', color: '#10b981', marginBottom: '8px' }}>
                Your Custom Moodboard Is Set!
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                margin: '0 auto 24px auto',
                fontSize: '0.95rem'
              }}>
                Thanks {formData.name}! Our trip architects have received your requirements for {formData.destination || formData.vibe}.
                We will send you a curated presentation with stays, pricing, and secret photo spots!
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleWhatsAppHandoff}
                  style={{
                    background: '#25d366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '12px 24px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Send Requirements on WhatsApp</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="secondary-btn"
                  style={{ padding: '12px 20px' }}
                >
                  <span>Build Another Itinerary</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Vibe Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px' }}>
                  1. What's the trip vibe?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {vibes.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      id={`builder-vibe-${i}`}
                      onClick={() => setFormData({ ...formData, vibe: v.label })}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        border: formData.vibe === v.label ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
                        background: formData.vibe === v.label ? 'rgba(255, 56, 92, 0.15)' : 'rgba(255,255,255,0.04)',
                        color: formData.vibe === v.label ? 'var(--coral-primary)' : 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'var(--transition)'
                      }}
                    >
                      <span>{v.emoji}</span>
                      <span>{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination & Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    2. Destination (or leave blank for ideas)
                  </label>
                  <input
                    type="text"
                    id="builder-destination-input"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Kasol & Spiti, Goa, Bali, Vietnam..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    3. Duration
                  </label>
                  <select
                    id="builder-duration-select"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    {durations.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Squad Size & Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    4. Squad Size (Number of travelers)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    id="builder-squad-size"
                    value={formData.squad_size}
                    onChange={(e) => setFormData({ ...formData, squad_size: parseInt(e.target.value) || 1 })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    5. Budget per person
                  </label>
                  <select
                    id="builder-budget-select"
                    value={formData.budget_per_person}
                    onChange={(e) => setFormData({ ...formData, budget_per_person: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    {budgets.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="builder-name-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Yash Patel"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    id="builder-phone-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98250 12345"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  id="builder-submit-btn"
                  className="gradient-btn"
                  style={{ flex: 1, padding: '14px', fontSize: '1rem' }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Generating Itinerary...' : 'Get My Custom Squad Itinerary'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppHandoff}
                  id="builder-wa-direct-btn"
                  style={{
                    background: '#25d366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 20px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>WA Quick Chat</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

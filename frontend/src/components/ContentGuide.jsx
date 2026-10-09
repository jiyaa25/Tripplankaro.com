import React, { useState } from 'react';
import { X, BookOpen, FileCode, GitBranch, UploadCloud, CheckCircle, Terminal, HelpCircle } from 'lucide-react';

export default function ContentGuide({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass"
        onClick={e => e.stopPropagation()}
        style={{
          width: '95%',
          maxWidth: '860px',
          maxHeight: '90vh',
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
            <BookOpen size={20} color="var(--coral-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Tripplankaro Content & Deployment Guide
            </h3>
          </div>
          <button
            onClick={onClose}
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
            <X size={16} />
          </button>
        </div>

        {/* Tab Nav */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(0,0,0,0.1)',
          padding: '0 20px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '🚀 Static Workflow' },
            { id: 'tours', label: '🏖️ Add/Edit Tours' },
            { id: 'destinations', label: '📍 Destinations' },
            { id: 'offers', label: '🔥 Offers & Timers' },
            { id: 'reviews', label: '💬 Reviews & FAQs' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === t.id ? '2px solid var(--coral-primary)' : '2px solid transparent',
                color: activeTab === t.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', fontSize: '0.9rem', lineHeight: 1.6 }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <CheckCircle size={18} /> Zero Backend, Free Vercel Hosting
                </strong>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Tripplankaro is 100% static React + Vite. All data lives in structured JSON files under <code>src/data/</code>. No database, server maintenance or monthly infrastructure fees.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>The 4-Step Update Workflow</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '12px'
                }}>
                  <div className="glass" style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📝</div>
                    <strong>1. Edit JSON</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Modify <code>src/data/tours.json</code></div>
                  </div>
                  <div className="glass" style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🖼️</div>
                    <strong>2. Add Images</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Save to <code>public/images/</code></div>
                  </div>
                  <div className="glass" style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>💻</div>
                    <strong>3. Git Commit</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}><code>git commit -am "Update"</code></div>
                  </div>
                  <div className="glass" style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🚀</div>
                    <strong>4. Auto Deploy</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vercel rebuilds in &lt;60s</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Local Verification Commands</h4>
                <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
                  <code>
{`# 1. Install dependencies
npm install

# 2. Run dev server locally
npm run dev

# 3. Test production build
npm run build`}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'tours' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1.05rem' }}>How to Add or Modify a Tour</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                Open <code>frontend/src/data/tours.json</code>. Each tour is an object adhering to the schema below:
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', overflowX: 'auto', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                <code>
{`{
  "tour_id": "166",
  "slug": "manali-snow-escapade-166",
  "tour_name": "Manali Snow Adventure & Solang Valley",
  "destination_id": "manali",
  "destination": "Manali & Himachal",
  "country": "India",
  "state": "Himachal Pradesh",
  "tour_type": "Domestic",
  "tags": ["Manali", "Snow", "Adventure"],
  "vibes": ["#AdrenalineRush", "#SunsetChasers"],
  "duration": { "days": 5, "nights": 4, "text": "5D / 4N" },
  "duration_short": "5D / 4N",
  "pricing": {
    "original_price": "₹22,000",
    "discounted_price": "₹17,500",
    "discounted_price_num": 17500,
    "discount_percent": 20
  },
  "image": "https://images.unsplash.com/...",
  "overview": "Experience powdery snow in Solang and Atal Tunnel...",
  "included": ["Hotel with Breakfast", "Private AC Cab", "Driver allowances"],
  "excluded": ["Airfare", "Personal expenses"],
  "rating": 4.9,
  "review_count": 34,
  "featured": true,
  "active": true
}`}
                </code>
              </pre>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1.05rem' }}>How to Add or Edit Destinations</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                Open <code>frontend/src/data/destinations.json</code>. Each destination includes monthly weather breakdowns, attractions, etiquette, and map coordinates for Leaflet.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', overflowX: 'auto', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                <code>
{`{
  "destination_id": "goa",
  "name": "Goa",
  "region": "West Coast",
  "country": "India",
  "image": "https://...",
  "best_time_to_visit": "October to March",
  "map_coordinates": { "lat": 15.2993, "lng": 74.124 },
  "map_markers": [
    { "name": "Fort Aguada", "type": "Heritage", "lat": 15.4925, "lng": 73.7737, "desc": "17th-century fort" }
  ],
  "monthly_weather": [
    { "month": "Jan", "temp": "21–31°C", "rainfall": "Zero", "crowd": "High", "verdict": "Peak season" }
  ]
}`}
                </code>
              </pre>
            </div>
          )}

          {activeTab === 'offers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1.05rem' }}>How to Manage Seasonal Offers</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                Edit <code>frontend/src/data/offers.json</code>. Setting <code>valid_until</code> in ISO format (e.g. <code>2026-12-31T23:59:59Z</code>) activates the real-time countdown timer. Expired offers vanish automatically without manual removal.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1.05rem' }}>How to Curate Reviews & Company Info</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                • Curated customer reviews reside in <code>frontend/src/data/reviews.json</code>. Set <code>"verified": true</code> only for genuine customer feedback.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                • "Share your experience" button connects directly to your Google Form (configured in <code>src/data/company.json</code>).
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                • Phone, WhatsApp, and Instagram links are centralized in <code>src/data/company.json</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

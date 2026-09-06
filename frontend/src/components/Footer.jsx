import React from 'react';
import { Compass, MessageCircle, Phone, Mail, MapPin, Heart } from 'lucide-react';
const PHONE = '919023532824';
const PHONE_DISPLAY = '+91 90235 32824';
const EMAIL = 'Info@tripplankaro.com';
const INSTAGRAM_URL = 'https://instagram.com/tripplankaro';
const WA_URL = `https://wa.me/${PHONE}?text=Hey%20TripPlanKaro!%20I%27m%20planning%20a%20trip.%20Can%20you%20help%3F`;

export default function Footer({ onFilterDestination }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 0 30px 0',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '48px'
        }}>
          {/* Brand Col */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--sunset-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Compass size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  tripplan<span className="gradient-text">karo</span>.com
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--coral-primary)', textTransform: 'uppercase' }}>
                  We plan, you enjoy ✈️
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '8px' }}>
              A travel company born in Surat, Gujarat — crafting curated domestic & international holidays for Indian travelers who love quality experiences.
            </p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '20px', color: 'var(--text-muted)' }}>
              Squad getaways · Mountain treks · Beach escapes · International adventures
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @tripplankaro"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E1306C';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Support"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#25D366';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="https://linkedin.com/company/tripplankaro"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Tripplankaro"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0A66C2';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>


          {/* Popular Destinations Col */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>
              Popular Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {['Goa', 'Uttarakhand', 'Himachal Pradesh', 'Leh-Ladakh', 'Kashmir', 'Thailand', 'Dubai & UAE', 'Bali', 'Maldives'].map((dest, i) => (
                <li key={i}>
                  <button
                    onClick={() => onFilterDestination && onFilterDestination(dest)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--coral-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {dest} Tours →
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>
              Planning Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#vibe-quiz" style={{ color: 'inherit', textDecoration: 'none' }}>Find Your Perfect Trip ✨</a></li>
              <li><a href="#squad-splitter" style={{ color: 'inherit', textDecoration: 'none' }}>Group Cost Splitter 💸</a></li>
              <li><a href="#custom-builder" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Trip Request 🚀</a></li>
              <li><a href="#why-us" style={{ color: 'inherit', textDecoration: 'none' }}>Why Choose Us 💡</a></li>
              <li><a href="#destinations" style={{ color: 'inherit', textDecoration: 'none' }}>Explore Destinations 📍</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--coral-primary)" style={{ flexShrink: 0 }} />
                <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--coral-primary)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {EMAIL}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '2px' }}>
                <MapPin size={16} color="var(--coral-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Surat, Gujarat — India 🇮🇳
                </span>
              </div>
              <div style={{ marginTop: '4px' }}>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#fff',
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem'
        }}>
          <div>
            © {year} <strong>tripplankaro.com</strong> · Surat, Gujarat, India. All rights reserved. Made with{' '}
            <Heart size={14} color="var(--coral-primary)" fill="var(--coral-primary)" style={{ verticalAlign: 'middle' }} />{' '}
            for travelers across India.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

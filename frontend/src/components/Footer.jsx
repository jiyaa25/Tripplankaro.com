import React from 'react';
import { Compass, MessageCircle, Phone, Mail, MapPin, Heart } from 'lucide-react';
import companyData from '../data/company.json';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function Footer({ onFilterDestination, onOpenGuide }) {
  const year = new Date().getFullYear();
  const waUrl = createWhatsAppLink('Hey TripPlanKaro! I\'m planning a trip. Can you help?');

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
          {/* Brand Column */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px',
              borderRadius: '12px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <img
                src="/logo.png"
                alt="Tripplankaro - We Plan, You Enjoy"
                style={{
                  height: '38px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '8px' }}>
              A travel company born in Surat, Gujarat — crafting curated domestic & international holidays for travelers who value genuine experiences.
            </p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '20px', color: 'var(--text-muted)' }}>
              Squad getaways · Mountain treks · Beach escapes · International adventures
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={companyData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title={`Instagram ${companyData.instagram_handle}`}
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
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a
                href={waUrl}
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore Trips
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {['Goa', 'Himachal & Manali', 'Uttarakhand', 'Kashmir', 'Kerala', 'Rajasthan', 'Ladakh', 'Dubai', 'Bali'].map(dest => (
                <li key={dest}>
                  <a
                    href="#explore-trips"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onFilterDestination) onFilterDestination(dest);
                      const el = document.getElementById('explore-trips');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {dest} Packages
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Planning Tools */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Planning Tools
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <a href="#vibe-quiz" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Find My Trip (Vibe Quiz) ✨
                </a>
              </li>
              <li>
                <a href="#trip-calculator" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Trip Budget Calculator 🧮
                </a>
              </li>
              <li>
                <a href="#squad-splitter" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Squad Cost Splitter 💸
                </a>
              </li>
              <li>
                <a href="#custom-builder" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Build Custom Trip 🎒
                </a>
              </li>
              <li>
                <a href="#offers-section" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Current Seasonal Offers 🔥
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--coral-primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  📖 Content & Deployment Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Phone size={16} color="var(--coral-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Call / WhatsApp</div>
                  <a href={`tel:${companyData.phone}`} style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none' }}>
                    {companyData.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Mail size={16} color="var(--coral-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Enquiry</div>
                  <a href={`mailto:${companyData.email}`} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                    {companyData.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--coral-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Office Branches</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                    📍 Surat: UG 12, Blue Arc, Althan Road<br />
                    📍 Valsad: 303, Millennium Apt, Halar Road
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {year} Tripplankaro ({companyData.website.replace('https://', '')}). All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Handcrafted with <Heart size={13} color="var(--coral-primary)" fill="var(--coral-primary)" /> in Gujarat, India
          </div>
        </div>
      </div>
    </footer>
  );
}

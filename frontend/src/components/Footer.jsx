import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import companyData from '../data/company.json';
import { createWhatsAppLink } from '../utils/whatsapp';

const INSTA_HIGHLIGHTS = [
  {
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=500&q=80',
    caption: 'Thailand Longtail Boats'
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80',
    caption: 'Bali Infinity Pool & Temple'
  },
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80',
    caption: 'Dubai Burj Khalifa View'
  },
  {
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80',
    caption: 'Scuba Diving with Sea Turtle'
  },
  {
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80',
    caption: 'Santorini Blue Domes'
  },
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
    caption: 'Himalayan Mountain Treks'
  },
  {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=500&q=80',
    caption: 'Vietnam Temple Sunrise'
  }
];

export default function Footer({ onNavigatePage }) {
  const waUrl = createWhatsAppLink('Hey Tripplankaro! I am planning a holiday and need details.');

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      paddingTop: '60px',
      overflow: 'hidden'
    }}>
      {/* 1. "FOLLOW OUR JOURNEY" Instagram Bar - Exactly matching Image 4 */}
      <div className="container" style={{ marginBottom: '45px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              marginBottom: '4px'
            }}>
              FOLLOW OUR JOURNEY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Instagram Gradient Icon Box */}
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 3px 10px rgba(220, 39, 67, 0.3)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                fontWeight: 800,
                color: '#ff5722',
                margin: 0
              }}>
                @trip.plankaro
              </h3>
            </div>
            <p style={{
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
              marginTop: '4px',
              margin: '4px 0 0 0'
            }}>
              Travel inspiration, latest trips, happy travellers and more!
            </p>
          </div>

          {/* Follow on Instagram Button */}
          <a
            href={companyData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 22px',
              borderRadius: '50px',
              border: '1.5px solid #ff5722',
              color: '#ff5722',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'var(--transition)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ff5722';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ff5722';
            }}
          >
            <span>Follow on Instagram</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 7 Horizontal Photo Tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          overflowX: 'auto'
        }}>
          {INSTA_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              style={{
                height: '145px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                cursor: 'pointer'
              }}
              onClick={() => window.open(companyData.instagram, '_blank')}
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bottom Warm Cream/Peach Wave Bar - Image 4 contact band */}
      <div style={{
        background: 'var(--theme-footer-bg, #fff4ee)',
        borderTop: '1px solid rgba(255, 87, 34, 0.12)',
        padding: '38px 0 28px 0',
        position: 'relative'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '28px'
        }}>
          {/* Logo Column */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: '20px',
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }} className="footer-border-right">
            <div style={{
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}>
              <img
                src="/logo.png"
                alt="Tripplankaro"
                style={{
                  height: '42px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>

          {/* Call Us Column */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingRight: '20px',
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }} className="footer-border-right">
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 87, 34, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff5722'
            }}>
              <Phone size={20} strokeWidth={2.3} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Call Us</div>
              <a
                href={`tel:${companyData.phone}`}
                style={{
                  fontSize: '1.08rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  textDecoration: 'none'
                }}
              >
                {companyData.phone}
              </a>
            </div>
          </div>

          {/* Email Us Column */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingRight: '20px',
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }} className="footer-border-right">
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 87, 34, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff5722'
            }}>
              <Mail size={20} strokeWidth={2.3} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Email Us</div>
              <a
                href={`mailto:${companyData.email}`}
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  textDecoration: 'none'
                }}
              >
                {companyData.email}
              </a>
            </div>
          </div>

          {/* Visit Us Column */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            maxWidth: '280px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 87, 34, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff5722',
              flexShrink: 0
            }}>
              <MapPin size={20} strokeWidth={2.3} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Visit Us</div>
              <div style={{
                fontSize: '0.86rem',
                fontWeight: 600,
                color: '#0f172a',
                lineHeight: 1.35
              }}>
                UG-30 Atlanta Business Hub,<br />
                Near Croma VIP Road, Surat - 395007
              </div>
            </div>
          </div>

          {/* Social Icons matching image 4 right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Instagram */}
            <a
              href={companyData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#25D366',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
              }}
            >
              <Phone size={18} strokeWidth={2.4} />
            </a>

            {/* Location Pin */}
            <a
              href="https://maps.google.com/?q=Atlanta+Business+Hub+VIP+Road+Surat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ff5722',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(255, 87, 34, 0.3)'
              }}
            >
              <MapPin size={18} strokeWidth={2.4} />
            </a>
          </div>
        </div>

        {/* Small copyright subline */}
        <div style={{
          textAlign: 'center',
          marginTop: '22px',
          fontSize: '0.78rem',
          color: '#94a3b8'
        }}>
          © {new Date().getFullYear()} Tripplankaro.com • We Plan, You Enjoy • Surat, Gujarat
        </div>
      </div>
    </footer>
  );
}

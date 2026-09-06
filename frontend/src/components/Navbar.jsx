import React from 'react';
import { Compass, Heart, Moon, Sun, MessageCircle, Sparkles, Lock } from 'lucide-react';

const PHONE = '+919023532824';
const WA_URL = `https://wa.me/${PHONE.replace('+', '')}?text=Hey%20TripPlanKaro!%20I%20want%20to%20plan%20a%20trip.%20Can%20you%20help%3F`;

export default function Navbar({
  theme,
  toggleTheme,
  savedToursCount,
  openWishlist,
  onNavigate,
  onAdminOpen
}) {
  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          id="nav-logo"
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--sunset-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-coral)'
          }}>
            <Compass size={24} />
          </div>
          <div>
            <div style={{
              fontSize: '1.35rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ color: 'var(--text-primary)' }}>tripplan</span>
              <span className="gradient-text">karo</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--coral-primary)' }}>.com</span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}>
              We Plan, You Enjoy ✈️
            </div>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          fontWeight: 600,
          fontSize: '0.9rem'
        }} className="desktop-nav">
          <a 
            href="#explore-trips" 
            onClick={() => onNavigate('tours')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Explore Trips
          </a>
          <a 
            href="#destinations" 
            onClick={() => onNavigate('destinations')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Destinations
          </a>
          <a 
            href="#vibe-quiz" 
            onClick={() => onNavigate('vibe')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Find Your Trip ✨
          </a>
          <a 
            href="#squad-splitter" 
            onClick={() => onNavigate('splitter')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Cost Splitter 💸
          </a>
          <a 
            href="#custom-builder" 
            onClick={() => onNavigate('builder')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Custom Trip
          </a>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            id="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'var(--transition)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Admin Portal */}
          <button
            onClick={onAdminOpen}
            id="admin-portal-btn"
            title="Admin Portal"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'var(--transition)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--coral-primary)'; e.currentTarget.style.borderColor = 'var(--coral-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Lock size={16} />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            id="wishlist-toggle-btn"
            title="Saved Trips"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'var(--transition)'
            }}
          >
            <Heart size={16} color="var(--coral-primary)" fill={savedToursCount > 0 ? "var(--coral-primary)" : "none"} />
            <span style={{ display: 'none' }} className="wishlist-label">Saved</span>
            <span style={{
              background: 'var(--coral-primary)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '10px'
            }}>
              {savedToursCount}
            </span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-cta"
            className="gradient-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={17} />
            <span>Chat on WA</span>
          </a>
        </div>
      </div>
    </header>
  );
}

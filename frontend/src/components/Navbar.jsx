import React, { useState } from 'react';
import { Compass, Heart, Moon, Sun, MessageCircle, Sparkles, Scale, Calculator, Menu, X, BookOpen } from 'lucide-react';
import companyData from '../data/company.json';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function Navbar({
  theme,
  toggleTheme,
  savedToursCount = 0,
  openWishlist,
  comparedToursCount = 0,
  openComparison,
  onNavigate,
  onOpenGuide
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waUrl = createWhatsAppLink('Hey Tripplankaro! I want to plan a trip. Can you help?');

  const handleNavClick = (viewId) => {
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(viewId);
  };

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
        gap: '14px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          id="nav-logo"
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
          }}>
            <img
              src="/logo.png"
              alt="Tripplankaro - We Plan, You Enjoy"
              style={{
                height: '36px',
                width: 'auto',
                maxWidth: '145px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontWeight: 600,
          fontSize: '0.88rem'
        }} className="desktop-nav">
          <a
            href="#explore-trips"
            onClick={() => handleNavClick('tours')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Explore Trips
          </a>
          <a
            href="#destinations"
            onClick={() => handleNavClick('destinations')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Destinations
          </a>
          <a
            href="#offers-section"
            onClick={() => handleNavClick('offers')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Offers 🔥
          </a>
          <a
            href="#vibe-quiz"
            onClick={() => handleNavClick('vibe')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Find My Trip ✨
          </a>
          <a
            href="#trip-calculator"
            onClick={() => handleNavClick('calculator')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Calculator 🧮
          </a>
          <a
            href="#custom-builder"
            onClick={() => handleNavClick('builder')}
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

          {/* Compare Button if items compared */}
          {comparedToursCount > 0 && (
            <button
              onClick={openComparison}
              title={`Compare ${comparedToursCount} Tours`}
              style={{
                background: 'rgba(255, 56, 92, 0.15)',
                border: '1px solid var(--coral-primary)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                color: 'var(--coral-primary)',
                fontWeight: 800,
                fontSize: '0.82rem'
              }}
            >
              <Scale size={16} />
              <span>Compare ({comparedToursCount})</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            id="wishlist-toggle-btn"
            title="My Shortlisted Trips"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              padding: '8px 13px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'var(--transition)'
            }}
          >
            <Heart size={16} color="var(--coral-primary)" fill={savedToursCount > 0 ? "var(--coral-primary)" : "none"} />
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

          {/* WhatsApp CTA (Desktop) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-cta"
            className="gradient-btn desktop-only"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={16} />
            <span>Chat on WA</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="mobile-only"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'none', // Overridden in CSS for mobile
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '65px',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 99
        }}>
          <a
            href="#explore-trips"
            onClick={() => handleNavClick('tours')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            🏖️ Explore All Trips
          </a>
          <a
            href="#destinations"
            onClick={() => handleNavClick('destinations')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            📍 Popular Destinations
          </a>
          <a
            href="#offers-section"
            onClick={() => handleNavClick('offers')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            🔥 Seasonal Offers
          </a>
          <a
            href="#vibe-quiz"
            onClick={() => handleNavClick('vibe')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            ✨ Find My Trip (Vibe Quiz)
          </a>
          <a
            href="#trip-calculator"
            onClick={() => handleNavClick('calculator')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            🧮 Trip Budget Calculator
          </a>
          <a
            href="#squad-splitter"
            onClick={() => handleNavClick('splitter')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            💸 Squad Cost Splitter
          </a>
          <a
            href="#custom-builder"
            onClick={() => handleNavClick('builder')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            🎒 Custom Trip Builder
          </a>
          <a
            href="#reviews"
            onClick={() => handleNavClick('reviews')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', padding: '6px 0' }}
          >
            📸 Traveler Stories
          </a>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenGuide) onOpenGuide();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                color: 'var(--coral-primary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <BookOpen size={16} />
              <span>Content & Deployment Guide</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn"
              style={{ padding: '12px', textAlign: 'center', textDecoration: 'none', justifyContent: 'center' }}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

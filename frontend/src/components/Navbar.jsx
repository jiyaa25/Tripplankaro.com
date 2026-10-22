import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  Layers,
  Zap,
  Calculator,
  Edit3,
  Search,
  Heart,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function Navbar({
  theme,
  toggleTheme,
  savedToursCount = 0,
  openWishlist,
  comparedToursCount = 0,
  openComparison,
  activePage = 'home',
  onSelectPage,
  onOpenSearch
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waUrl = createWhatsAppLink('Hey Tripplankaro! I want to plan a holiday. Can you guide me?');

  const navItems = [
    { id: 'domestic',      label: 'Domestic Tour',     icon: <MapPin     size={14} /> },
    { id: 'international', label: 'International Tour', icon: <Globe      size={14} /> },
    { id: 'theme-tour',    label: 'Theme Tour',         icon: <Layers     size={14} /> },
    { id: 'vibe-quiz',     label: 'Vibe Quiz',          icon: <Zap        size={14} /> },
    { id: 'calculator',    label: 'Calculator',         icon: <Calculator size={14} /> },
    { id: 'custom-tour',   label: 'Customized Tour',    icon: <Edit3      size={14} /> },
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onSelectPage) onSelectPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'var(--transition)'
    }}>
      {/* Brand-colour top accent bar */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #ff385c 0%, #ff6b4a 55%, #ff9f1c 100%)'
      }} />

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        height: '62px'
      }}>

        {/* ── Logo ── */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          id="nav-logo"
        >
          <img
            src="/logo.png"
            alt="Tripplankaro – We Plan, You Enjoy"
            style={{
              height: '40px',
              width: 'auto',
              maxWidth: '160px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* ── Centre Nav ── */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flex: '1 1 auto',
            justifyContent: 'center'
          }}
        >
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: isActive ? 'var(--coral-primary)' : 'var(--text-primary)',
                  position: 'relative',
                  borderRadius: '6px',
                  transition: 'color 0.2s ease, background 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--coral-primary)';
                  e.currentTarget.style.background = 'rgba(255,56,92,0.07)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                <span style={{
                  opacity: 0.65,
                  color: isActive ? 'var(--coral-primary)' : 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '11px',
                    right: '11px',
                    height: '2px',
                    background: 'var(--coral-primary)',
                    borderRadius: '2px 2px 0 0'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Right Actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

          {/* Search */}
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else handleNavClick('domestic');
            }}
            title="Search Packages"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-primary)'; e.currentTarget.style.color = 'var(--coral-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Search size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
          </button>

          {/* Wishlist */}
          <button
            onClick={openWishlist}
            id="wishlist-toggle-btn"
            title="Shortlisted Tours"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '0 12px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.78rem',
              transition: 'var(--transition)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Heart size={15} color="var(--coral-primary)" fill={savedToursCount > 0 ? 'var(--coral-primary)' : 'none'} />
            <span style={{
              background: 'var(--coral-primary)',
              color: '#fff',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '1px 6px',
              borderRadius: '10px',
              lineHeight: 1.5
            }}>
              {savedToursCount}
            </span>
          </button>

          {/* Chat on WhatsApp — real WA icon, text never wraps */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-cta"
            className="desktop-only"
            style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #ff8a00 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '0 18px',
              height: '38px',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(255,75,43,0.35)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,75,43,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,75,43,0.35)'; }}
          >
            {/* Official WhatsApp SVG path */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="mobile-only"
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '65px',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 99,
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: activePage === item.id ? 'rgba(255,56,92,0.10)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '11px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activePage === item.id ? 'var(--coral-primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ opacity: 0.65, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '10px',
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #ff8a00 100%)',
              color: '#fff',
              textAlign: 'center',
              padding: '12px',
              borderRadius: '30px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}

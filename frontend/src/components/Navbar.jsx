import React, { useState } from 'react';
import {
  Home,
  Globe,
  Palmtree,
  Calculator,
  FileEdit,
  Search,
  Heart,
  Moon,
  Sun,
  MessageCircle,
  Sparkles,
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
    { id: 'domestic', label: 'Domestic Tour', icon: <Home size={17} color="#ff5722" /> },
    { id: 'international', label: 'International Tour', icon: <Globe size={17} color="#0284c7" /> },
    { id: 'theme-tour', label: 'Theme Tour', icon: <Palmtree size={17} color="#10b981" /> },
    { id: 'vibe-quiz', label: 'Vibe Quiz', icon: <Sparkles size={17} color="#ec4899" /> },
    { id: 'calculator', label: 'Calculator', icon: <Calculator size={17} color="#8b5cf6" /> },
    { id: 'custom-tour', label: 'Customized Tour', icon: <FileEdit size={17} color="#f59e0b" /> },
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
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '10px 0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          id="nav-logo"
        >
          <div style={{
            background: '#ffffff',
            padding: '4px 10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <img
              src="/logo.png"
              alt="Tripplankaro - We Plan, You Enjoy"
              style={{
                height: '38px',
                width: 'auto',
                maxWidth: '150px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Center Nav Links matching user image 2 */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontWeight: 600,
          fontSize: '0.88rem'
        }} className="desktop-nav">
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--coral-primary)' : 'var(--text-primary)',
                  position: 'relative',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-primary)'}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--coral-primary)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Trigger */}
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else handleNavClick('domestic');
            }}
            title="Search Packages"
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
            <Search size={18} />
          </button>

          {/* Theme Toggle Button */}
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

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            id="wishlist-toggle-btn"
            title="Shortlisted Tours"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              padding: '7px 12px',
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
              padding: '1px 6px',
              borderRadius: '10px'
            }}>
              {savedToursCount}
            </span>
          </button>

          {/* Chat on WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-cta"
            style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #ff8a00 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(255, 75, 43, 0.35)',
              transition: 'all 0.25s ease'
            }}
            className="desktop-only"
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="mobile-only"
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'none',
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '62px',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99,
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: activePage === item.id ? 'rgba(255, 56, 92, 0.12)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: activePage === item.id ? 'var(--coral-primary)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '8px',
              background: 'var(--sunset-gradient)',
              color: '#fff',
              textAlign: 'center',
              padding: '12px',
              borderRadius: '30px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}

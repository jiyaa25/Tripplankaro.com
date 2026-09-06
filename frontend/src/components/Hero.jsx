import React from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, Clock, Users, ArrowRight, Globe, Home } from 'lucide-react';

const PHONE = '+919023532824';

export default function Hero({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onQuickSearch,
  totalTours
}) {
  const trendingTags = ['Goa', 'Ladakh', 'Manali', 'Dubai', 'Thailand', 'Kashmir', 'Uttarakhand', 'Bali'];

  return (
    <section style={{
      position: 'relative',
      padding: '70px 0 50px 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-color)'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '20%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,56,92,0.18) 0%, rgba(255,56,92,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)',
        filter: 'blur(70px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Brand Tagline Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 56, 92, 0.12)',
          border: '1px solid rgba(255, 56, 92, 0.3)',
          color: '#ff5274',
          fontWeight: 700,
          fontSize: '0.85rem',
          marginBottom: '20px'
        }}>
          <Sparkles size={16} />
          <span>tripplankaro.com — We Plan, You Enjoy</span>
          <span style={{
            background: 'var(--coral-primary)',
            color: '#fff',
            fontSize: '0.68rem',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            SURAT, GUJARAT ⚡
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          margin: '0 auto 18px auto'
        }}>
          Ditch the Boring Tours. <br />
          <span className="gradient-text">We Plan, You Enjoy.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 28px auto',
          fontWeight: 400
        }}>
          Handcrafted stays, group getaways, mountain treks & international adventures from Surat.
          Zero hidden fees, verified experiences, and a 24/7 WhatsApp concierge.
        </p>

        {/* Domestic / International Quick Toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          gap: '4px',
          marginBottom: '24px'
        }}>
          <button
            id="hero-filter-all"
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeCategory === 'all' ? 'var(--sunset-gradient)' : 'transparent',
              color: activeCategory === 'all' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit'
            }}
          >
            <Sparkles size={14} />
            All Trips
          </button>
          <button
            id="hero-filter-domestic"
            onClick={() => setActiveCategory('Domestic')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeCategory === 'Domestic' ? 'var(--sunset-gradient)' : 'transparent',
              color: activeCategory === 'Domestic' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit'
            }}
          >
            <Home size={14} />
            India Trips 🇮🇳
          </button>
          <button
            id="hero-filter-international"
            onClick={() => setActiveCategory('International')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeCategory === 'International' ? 'var(--sunset-gradient)' : 'transparent',
              color: activeCategory === 'International' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit'
            }}
          >
            <Globe size={14} />
            International ✈️
          </button>
        </div>

        {/* Search Box */}
        <div style={{
          maxWidth: '740px',
          margin: '0 auto 20px auto',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 10px 8px 24px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-md)',
          backdropFilter: 'blur(16px)'
        }} className="search-bar-wrap">
          <MapPin size={22} color="var(--coral-primary)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            id="main-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where do you want to go? (e.g. Goa, Ladakh, Bali, Dubai...)"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: 'inherit'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'var(--text-secondary)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          )}
          <button 
            id="main-search-btn"
            className="gradient-btn"
            style={{
              padding: '12px 28px',
              fontSize: '0.95rem'
            }}
            onClick={() => {
              const el = document.getElementById('explore-trips');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Search size={18} />
            <span style={{ display: 'inline-block' }}>Find Trips</span>
          </button>
        </div>

        {/* Trending Tags */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            🔥 Trending:
          </span>
          {trendingTags.map(tag => (
            <button
              key={tag}
              id={`trending-tag-${tag.toLowerCase()}`}
              onClick={() => onQuickSearch(tag)}
              style={{
                background: searchQuery.toLowerCase() === tag.toLowerCase() ? 'var(--coral-primary)' : 'rgba(255,255,255,0.06)',
                color: searchQuery.toLowerCase() === tag.toLowerCase() ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Feature Badges / Proof */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,56,92,0.15)', color: 'var(--coral-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Users size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>14,500+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Happy Travelers</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(16,185,129,0.15)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ShieldCheck size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>4.9 / 5.0 ★</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Reviews</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(139,92,246,0.15)', color: '#a78bfa',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Clock size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>24/7 Support</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant WhatsApp</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(0,242,254,0.15)', color: '#00f2fe',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sparkles size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{totalTours || 165}+ Tours</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Curated Packages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

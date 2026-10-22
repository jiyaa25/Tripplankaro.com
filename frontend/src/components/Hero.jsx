import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    subtitle: "Let's Explore The World",
    titleLine1: "Your World. Your Journey.",
    titleLine2: "We Plan, You Enjoy.",
    desc: "From tropical escapes to unforgettable city adventures, discover thoughtfully crafted holidays designed around you."
  },
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
    subtitle: "Let's Explore The World",
    titleLine1: "Your World. Your Journey.",
    titleLine2: "We Plan, You Enjoy.",
    desc: "From tropical escapes to unforgettable city adventures, discover thoughtfully crafted holidays designed around you."
  },
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
    subtitle: "Let's Explore The World",
    titleLine1: "Your World. Your Journey.",
    titleLine2: "We Plan, You Enjoy.",
    desc: "From tropical escapes to unforgettable city adventures, discover thoughtfully crafted holidays designed around you."
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
    subtitle: "Let's Explore The World",
    titleLine1: "Your World. Your Journey.",
    titleLine2: "We Plan, You Enjoy.",
    desc: "From tropical escapes to unforgettable city adventures, discover thoughtfully crafted holidays designed around you."
  }
];

const MONTHS = [
  'Select Month', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Hero({
  searchQuery,
  setSearchQuery,
  onQuickSearch,
  onSearchSubmit
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('Select Month');
  const [travellerCount, setTravellerCount] = useState('2 Travellers');

  // Auto rotate background every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handleSearch = () => {
    if (onSearchSubmit) {
      onSearchSubmit({
        destination: searchQuery,
        month: selectedMonth,
        travellers: travellerCount
      });
    }
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '560px',
      height: '68vh',
      maxHeight: '680px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      backgroundColor: '#0a101d'
    }}>
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === currentSlide ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0
          }}
        >
          <img
            src={slide.image}
            alt={slide.titleLine1}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: idx === currentSlide ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 7s ease-out'
            }}
          />
          {/* Subtle vignette / atmospheric overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(8, 15, 29, 0.45) 0%, rgba(8, 15, 29, 0.25) 45%, rgba(8, 15, 29, 0.65) 100%)'
          }} />
        </div>
      ))}

      {/* Slide Navigation Arrow Left */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.88)',
          color: '#1e293b',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* Slide Navigation Arrow Right */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.88)',
          color: '#1e293b',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Main Content Area */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 20px',
        maxWidth: '1050px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Playful cursive subtitle */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Brush Script MT', 'Caveat', cursive, sans-serif",
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          letterSpacing: '0.04em',
          color: '#ffffff',
          textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          marginBottom: '6px'
        }}>
          <span>{HERO_SLIDES[currentSlide].subtitle}</span>
          <span style={{ fontSize: '1.2rem', opacity: 0.9 }}>✈️</span>
        </div>

        {/* Big Bold Headline */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          marginBottom: '14px'
        }}>
          {HERO_SLIDES[currentSlide].titleLine1} <br />
          <span style={{
            background: 'linear-gradient(90deg, #ff5722 0%, #ff8a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none'
          }}>
            {HERO_SLIDES[currentSlide].titleLine2}
          </span>
        </h1>

        {/* Subtitle / Paragraph */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
          color: 'rgba(255, 255, 255, 0.92)',
          maxWidth: '680px',
          margin: '0 auto 32px auto',
          lineHeight: 1.5,
          textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          fontWeight: 400
        }}>
          {HERO_SLIDES[currentSlide].desc}
        </p>

        {/* Unified Capsule Search Bar */}
        <div style={{
          width: '100%',
          maxWidth: '860px',
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(12px)',
          borderRadius: '50px',
          padding: '8px 10px 8px 24px',
          display: 'grid',
          gridTemplateColumns: '1.8fr 1.2fr 1.2fr auto',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
          color: '#1f2937'
        }} className="hero-capsule-bar">
          {/* 1. Destination Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left',
            paddingRight: '12px',
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }}>
            <MapPin size={22} color="#ff5722" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Where to?
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="e.g. Bali, Thailand, Dubai..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#111827',
                  padding: '2px 0'
                }}
              />
            </div>
          </div>

          {/* 2. Travel Month Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left',
            paddingRight: '12px',
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }}>
            <Calendar size={20} color="#ff5722" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Travel Month
              </div>
              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#111827',
                  cursor: 'pointer',
                  padding: '2px 0'
                }}
              >
                {MONTHS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Travellers Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left',
            paddingRight: '10px'
          }}>
            <Users size={20} color="#ff5722" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Travellers
              </div>
              <select
                value={travellerCount}
                onChange={e => setTravellerCount(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#111827',
                  cursor: 'pointer',
                  padding: '2px 0'
                }}
              >
                <option value="1 Traveller">1 Traveller</option>
                <option value="2 Travellers">2 Travellers</option>
                <option value="3-5 Travellers">3-5 Travellers</option>
                <option value="Squad (6+ Travellers)">Squad (6+)</option>
              </select>
            </div>
          </div>

          {/* 4. Search CTA Button */}
          <button
            onClick={handleSearch}
            style={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #ff8a00 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '13px 26px',
              fontWeight: 700,
              fontSize: '0.94rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(255, 75, 43, 0.4)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Search size={18} strokeWidth={2.5} />
            <span>Search Trips</span>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '28px'
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === currentSlide ? '28px' : '10px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentSlide ? '#ff5722' : 'rgba(255, 255, 255, 0.55)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

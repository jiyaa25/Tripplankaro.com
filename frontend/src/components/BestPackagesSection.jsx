import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, DollarSign, Headphones, HeartHandshake, ThumbsUp } from 'lucide-react';

const POPULAR_DESTINATIONS = [
  {
    name: 'Thailand',
    duration: '5N / 6D',
    price: '₹60,000/-',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80',
    tag: 'Island & City'
  },
  {
    name: 'Bali',
    duration: '6N / 7D',
    price: '₹82,000/-',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
    tag: 'Tropical Paradise'
  },
  {
    name: 'Singapore',
    duration: '4N / 5D',
    price: '₹90,000/-',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80',
    tag: 'Futuristic City'
  },
  {
    name: 'Dubai',
    duration: '4N / 5D',
    price: '₹75,000/-',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
    tag: 'Luxury & Safari'
  },
  {
    name: 'Vietnam',
    duration: '6N / 7D',
    price: '₹85,000/-',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=80',
    tag: 'Heritage & Bay'
  },
  {
    name: 'Europe',
    duration: '6N / 7D',
    price: '₹1,20,000/-',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=700&q=80',
    tag: 'Scenic & Historic'
  }
];

const TRUST_FEATURES = [
  {
    icon: <ShieldCheck size={26} color="#00bcd4" strokeWidth={2.2} />,
    iconBg: 'rgba(0, 188, 212, 0.12)',
    title: 'Verified Experiences',
    desc: 'Handpicked stays and trusted partners'
  },
  {
    icon: <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>₹</span>,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    title: 'Transparent Pricing',
    desc: 'No hidden fees, what you see is what you pay'
  },
  {
    icon: <Headphones size={26} color="#3b82f6" strokeWidth={2.2} />,
    iconBg: 'rgba(59, 130, 246, 0.12)',
    title: '24/7 Support',
    desc: 'Always here on WhatsApp'
  },
  {
    icon: <HeartHandshake size={26} color="#ff5722" strokeWidth={2.2} />,
    iconBg: 'rgba(255, 87, 34, 0.12)',
    title: 'Personalised Planning',
    desc: 'Trips designed around your needs'
  },
  {
    icon: <ThumbsUp size={26} color="#6366f1" strokeWidth={2.2} />,
    iconBg: 'rgba(99, 102, 241, 0.12)',
    title: 'Memorable Experiences',
    desc: "Creating journeys that you'll cherish forever"
  }
];

export default function BestPackagesSection({ onSelectPackage, onViewAllPackages }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      padding: '60px 0 50px 0',
      background: 'var(--bg-primary)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              marginBottom: '4px'
            }}>
              POPULAR PACKAGES
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Explore Our <span style={{ color: '#ff5722' }}>Best Packages</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Scroll navigation arrows */}
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'var(--transition)'
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'var(--transition)'
              }}
            >
              <ChevronRight size={18} />
            </button>

            {/* View All Packages button */}
            <button
              onClick={onViewAllPackages}
              style={{
                background: 'transparent',
                border: '1.5px solid #ff5722',
                color: '#ff5722',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
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
              <span>View All Packages</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel of Best Package Cards */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="no-scrollbar"
        >
          {POPULAR_DESTINATIONS.map((pkg, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPackage(pkg.name)}
              style={{
                flex: '0 0 215px',
                scrollSnapAlign: 'start',
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 87, 34, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 87, 34, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Card Image */}
              <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden'
              }}>
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
              </div>

              {/* Card Details */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  margin: '0 0 6px 0',
                  color: 'var(--text-primary)'
                }}>
                  {pkg.name}
                </h3>

                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '14px'
                }}>
                  <span>☀️ {pkg.duration}</span>
                </div>

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Starting from</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ff5722' }}>
                      {pkg.price}
                    </div>
                  </div>

                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1.5px solid #ff5722',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff5722'
                  }}>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Why Travellers Choose Us" Banner - Matching User Image 3 bottom part */}
        <div style={{
          marginTop: '45px',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          padding: '36px 30px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--text-muted)',
            marginBottom: '6px'
          }}>
            WHY TRAVELLERS CHOOSE US
          </div>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: '36px'
          }}>
            Travel Made <span style={{ color: '#ff5722' }}>Simple & Hassle-Free</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}>
            {TRUST_FEATURES.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: item.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px'
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  marginBottom: '6px',
                  color: 'var(--text-primary)'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

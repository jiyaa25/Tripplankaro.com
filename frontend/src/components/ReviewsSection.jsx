import React from 'react';
import { Star, Camera, CheckCircle2 } from 'lucide-react';

const PHONE = '919023532824';

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Tanmay Deshmukh",
      handle: "Surat, Gujarat",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      trip: "Leh-Ladakh Hanle Expedition (7N/8D)",
      rating: 5,
      comment: "Our college group of 8 had zero patience to plan hotels and permits. TripPlanKaro handled everything perfectly. The Hanle dark sky night was an experience none of us will ever forget. Highly recommended!",
      tag: "Group Trip"
    },
    {
      name: "Ananya Mehra",
      handle: "Ahmedabad, Gujarat",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      trip: "Explore Divine Uttarakhand (5N/6D)",
      rating: 5,
      comment: "The stays in Nainital and Mussoorie were absolutely beautiful. Perfect views from the balcony every morning. The WhatsApp support team helped us find great local restaurants too. Will definitely book again!",
      tag: "Aesthetic Stays"
    },
    {
      name: "Rohan & Rhea",
      handle: "Vadodara, Gujarat",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      trip: "Goa Coastal Getaway (3N/4D)",
      rating: 5,
      comment: "The cost splitter tool on the site was perfect for splitting expenses with our group of 6. We paid, showed up, and everything was taken care of. Zero drama with local arrangements — very professional!",
      tag: "Beach & Coastal"
    },
    {
      name: "Kabir Varma",
      handle: "Surat, Gujarat",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      trip: "Thailand Krabi & Phuket (6N/7D)",
      rating: 5,
      comment: "First international trip with my friends. TripPlanKaro gave us island hopping, private villa with pool in Phuket, and handled all visa queries patiently. Best travel experience I've had in years!",
      tag: "International"
    }
  ];

  const stats = [
    { value: "14,500+", label: "Happy Travelers" },
    { value: "4.9★", label: "Average Rating" },
    { value: "165+", label: "Tour Packages" },
    { value: "35+", label: "Destinations" }
  ];

  return (
    <section style={{
      padding: '80px 0',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(255, 255, 255, 0.01)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--coral-primary)',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            <Camera size={16} />
            <span>Traveler Stories</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
            Loved by <span className="gradient-text">14,500+ Happy Travelers</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
            Real feedback from real travelers who trusted us with their holidays.
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '48px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          border: '1px solid var(--border-color)'
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                background: 'var(--sunset-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)',
                position: 'relative',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Top User Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--coral-primary)'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{r.name}</span>
                    <CheckCircle2 size={14} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    📍 {r.handle}
                  </div>
                </div>
              </div>

              {/* Stars & Trip pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={15} fill="var(--gold-star)" color="var(--gold-star)" />
                  ))}
                </div>
                <span className="tag-badge" style={{ fontSize: '0.68rem' }}>
                  {r.tag}
                </span>
              </div>

              {/* Comment */}
              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                flex: 1,
                marginBottom: '12px'
              }}>
                "{r.comment}"
              </p>

              {/* Trip Pill */}
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                borderTop: '1px solid var(--border-color)',
                paddingTop: '10px'
              }}>
                ✈️ {r.trip}
              </div>
            </div>
          ))}
        </div>

        {/* CTA to WhatsApp */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.98rem' }}>
            Ready to plan your next trip? Our team is just a WhatsApp away. ✈️
          </p>
          <a
            href={`https://wa.me/${PHONE}?text=Hi%20TripPlanKaro!%20I%20want%20to%20plan%20a%20trip.%20Can%20you%20help%20me%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn"
            style={{ padding: '14px 32px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex' }}
          >
            <span>💬 Start Planning on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

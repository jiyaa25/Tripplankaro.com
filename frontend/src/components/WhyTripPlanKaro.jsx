import React from 'react';
import { ShieldCheck, HeartHandshake, Zap, Camera, Users, Sparkles, MapPin } from 'lucide-react';

export default function WhyTripPlanKaro() {
  const points = [
    {
      icon: <Zap size={24} color="#ff385c" />,
      title: "Flexible, Curated Itineraries",
      desc: "No rigid bus tours or rushed schedules. Our trips give you breathing room, café time, and curated spots — designed to feel like a holiday, not a checklist."
    },
    {
      icon: <Sparkles size={24} color="#a78bfa" />,
      title: "Handpicked Quality Stays",
      desc: "From mountain chalets and cliffside villas to beachside boutique cottages — every stay is verified for cleanliness, comfort, great views, and overall experience."
    },
    {
      icon: <HeartHandshake size={24} color="#10b981" />,
      title: "24/7 WhatsApp Concierge",
      desc: "Flight delay? Need a late-night café tip? Our team is just one WhatsApp message away throughout your journey — real people, not bots."
    },
    {
      icon: <Camera size={24} color="#00f2fe" />,
      title: "Iconic Photo-Worthy Stops",
      desc: "Every itinerary includes built-in golden-hour spots at the most scenic viewpoints, hidden waterfalls, and sunset corners that make memories last forever."
    },
    {
      icon: <Users size={24} color="#f59e0b" />,
      title: "Transparent Group Pricing",
      desc: "We make group travel painless — upfront transparent pricing, group payment options, and zero hidden local surprises. What we quote is what you pay."
    },
    {
      icon: <MapPin size={24} color="#ff385c" />,
      title: "We Plan, You Enjoy",
      desc: "From verified driver coordination to safari permits, temple passes, and ferry bookings — we handle every logistical detail. You just show up and make memories."
    }
  ];

  return (
    <section id="why-us" style={{
      padding: '80px 0',
      borderBottom: '1px solid var(--border-color)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px auto' }}>
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
            <Sparkles size={16} />
            <span>The Tripplankaro Difference</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
            Why Travelers Choose <span className="gradient-text">tripplankaro.com</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
            Born in Surat, Gujarat — built by passionate travelers for travelers across India. 
            We bring fresh ideas, honest pricing, and real human support to every holiday we plan.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {points.map((p, i) => (
            <div
              key={i}
              className="glass"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

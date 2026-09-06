import React, { useState, useEffect } from 'react';
import { Calculator, Users, Copy, Check, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export default function SquadBillSplitter({ initialTour }) {
  const [squadSize, setSquadSize] = useState(4);
  const [tourName, setTourName] = useState(initialTour ? initialTour.tour_name : 'Goa Beach Bliss');
  const [packageCost, setPackageCost] = useState(
    initialTour?.pricing?.discounted_price_num || 18500
  );
  const [travelCost, setTravelCost] = useState(4000);
  const [foodCost, setFoodCost] = useState(3500);
  const [miscCost, setMiscCost] = useState(2000);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTour) {
      setTourName(initialTour.tour_name);
      setPackageCost(initialTour.pricing?.discounted_price_num || 18500);
    }
  }, [initialTour]);

  const perPersonTotal = packageCost + travelCost + foodCost + miscCost;
  const grandTotal = perPersonTotal * squadSize;

  const generateWhatsAppMessage = () => {
    return `🔥 *TRIPPLANKARO SQUAD TRIP ESTIMATE* ✈️
━━━━━━━━━━━━━━━━━━
📍 *Trip:* ${tourName}
👥 *Squad Size:* ${squadSize} Friends

💰 *Per Person Breakdown:*
• Base Stay & Transfers: ₹${packageCost.toLocaleString()}
• Estimated Flights/Train: ₹${travelCost.toLocaleString()}
• Food & Drinks Fund: ₹${foodCost.toLocaleString()}
• Activities & Nightlife: ₹${miscCost.toLocaleString()}
━━━━━━━━━━━━━━━━━━
👉 *Total Per Person:* ₹${perPersonTotal.toLocaleString()}
🎉 *Total Squad Budget:* ₹${grandTotal.toLocaleString()}

Let's lock this in on Tripplankaro! "We plan, you enjoy" ✨`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="squad-splitter" style={{
      padding: '70px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
            <Calculator size={16} />
            <span>Squad Expense Estimator</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '8px' }}>
            Split The Bill <span className="gradient-text">Like Adults</span> 💸
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Stop arguing in the group chat. Calculate exact per-head costs and drop the receipt directly into your WhatsApp squad group!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Controls Form */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️ Adjust Squad Parameters</span>
            </h3>

            {/* Trip Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                Selected Trip / Destination
              </label>
              <input
                type="text"
                id="splitter-trip-name"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>

            {/* Squad Size Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Squad Members
                </span>
                <span style={{
                  color: 'var(--coral-primary)',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}>
                  {squadSize} Friends
                </span>
              </div>
              <input
                type="range"
                id="splitter-squad-size"
                min="1"
                max="16"
                value={squadSize}
                onChange={(e) => setSquadSize(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--coral-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Package Price */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Tripplankaro Package (per head)
                </label>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 700 }}>
                  ₹{packageCost.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                id="splitter-pkg-cost"
                step="500"
                value={packageCost}
                onChange={(e) => setPackageCost(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Travel / Flights */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Flights / Train Fund (per head)
                </label>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 700 }}>
                  ₹{travelCost.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="500"
                value={travelCost}
                onChange={(e) => setTravelCost(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Food & Drinks */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Food, Cafes & Drinks Fund (per head)
                </label>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 700 }}>
                  ₹{foodCost.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="500"
                value={foodCost}
                onChange={(e) => setFoodCost(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Misc / Activities */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  Nightlife, Shopping & Adventure
                </label>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 700 }}>
                  ₹{miscCost.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="500"
                value={miscCost}
                onChange={(e) => setMiscCost(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Results Receipt Card */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-hover)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--coral-primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                Receipt Breakdown
              </span>
              <span style={{
                fontSize: '0.72rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700
              }}>
                100% Transparent
              </span>
            </div>

            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Cost</div>
              <div style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                color: 'var(--coral-primary)',
                lineHeight: 1.1
              }}>
                ₹{perPersonTotal.toLocaleString()}
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}> / person</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Total Squad Pool ({squadSize} pax): <strong>₹{grandTotal.toLocaleString()}</strong>
              </div>
            </div>

            {/* Line items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Stays, Transfers & Sightseeing:</span>
                <span style={{ fontWeight: 700 }}>₹{packageCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Flights / Rail Travel:</span>
                <span style={{ fontWeight: 700 }}>₹{travelCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Cafes, Meals & Shacks:</span>
                <span style={{ fontWeight: 700 }}>₹{foodCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Activities & Nightlife Fund:</span>
                <span style={{ fontWeight: 700 }}>₹{miscCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Share to WhatsApp */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                id="send-wa-squad-btn"
                onClick={handleSendToWhatsApp}
                style={{
                  background: '#25d366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '12px 20px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                  transition: 'var(--transition)'
                }}
              >
                <MessageCircle size={18} />
                <span>Send to WhatsApp Group Chat</span>
              </button>

              <button
                id="copy-squad-breakdown-btn"
                onClick={handleCopy}
                className="secondary-btn"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.88rem'
                }}
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

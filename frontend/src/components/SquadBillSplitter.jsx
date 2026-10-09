import React, { useState, useEffect } from 'react';
import { Calculator, Copy, Check, MessageCircle } from 'lucide-react';
import { generateSquadSplitterWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function SquadBillSplitter({ initialTour }) {
  const [squadSize, setSquadSize] = useState(4);
  const [tripName, setTripName] = useState(initialTour ? initialTour.tour_name : 'Goa Beach Weekend');
  const [packageCost, setPackageCost] = useState(
    initialTour?.pricing?.discounted_price_num || 18500
  );
  const [travelCost, setTravelCost] = useState(3500);
  const [foodCost, setFoodCost] = useState(3000);
  const [activitiesCost, setActivitiesCost] = useState(2000);
  const [copied, setCopied] = useState(false);

  // Unequal split toggle & custom contributions
  const [enableUnequal, setEnableUnequal] = useState(false);
  const [customMembers, setCustomMembers] = useState([
    { name: 'Member 1 (Organizer)', amount: '' },
    { name: 'Member 2', amount: '' },
    { name: 'Member 3', amount: '' },
    { name: 'Member 4', amount: '' }
  ]);

  useEffect(() => {
    if (initialTour) {
      setTripName(initialTour.tour_name);
      setPackageCost(initialTour.pricing?.discounted_price_num || 18500);
    }
  }, [initialTour]);

  // Adjust custom member count when squad size changes
  useEffect(() => {
    setCustomMembers(prev => {
      const arr = [...prev];
      while (arr.length < squadSize) {
        arr.push({ name: `Member ${arr.length + 1}`, amount: '' });
      }
      return arr.slice(0, squadSize);
    });
  }, [squadSize]);

  const perPersonBase = packageCost + travelCost + foodCost + activitiesCost;
  const grandTotal = perPersonBase * squadSize;

  // Custom calculation
  const totalContributed = customMembers.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
  const difference = grandTotal - totalContributed;

  const handleCopy = () => {
    const text = generateSquadSplitterWhatsAppMessage({
      tripName,
      totalCost: grandTotal,
      memberCount: squadSize,
      perPersonCost: perPersonBase
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = generateSquadSplitterWhatsAppMessage({
      tripName,
      totalCost: grandTotal,
      memberCount: squadSize,
      perPersonCost: perPersonBase
    });
    openWhatsApp(text);
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
            Calculate exact per-head estimates or unequal contributions, then drop the brief straight into your group chat.
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
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️ Adjust Squad Parameters</span>
            </h3>

            {/* Trip Name & Squad Size */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Trip Title
                </label>
                <input
                  type="text"
                  value={tripName}
                  onChange={e => setTripName(e.target.value)}
                  placeholder="e.g. Goa Grad Trip"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Squad Size ({squadSize} pax)
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={squadSize}
                  onChange={e => setSquadSize(Math.max(2, parseInt(e.target.value, 10) || 2))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            {/* Expense Inputs */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Base Package / Stays (Per Person): ₹{packageCost.toLocaleString('en-IN')}
              </label>
              <input
                type="range"
                min="5000"
                max="80000"
                step="500"
                value={packageCost}
                onChange={e => setPackageCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--coral-primary)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Transport / Air (Per Person)
                </label>
                <input
                  type="number"
                  value={travelCost}
                  onChange={e => setTravelCost(Number(e.target.value) || 0)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Food & Drinks Fund (Per Person)
                </label>
                <input
                  type="number"
                  value={foodCost}
                  onChange={e => setFoodCost(Number(e.target.value) || 0)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Activities & Sightseeing (Per Person)
              </label>
              <input
                type="number"
                value={activitiesCost}
                onChange={e => setActivitiesCost(Number(e.target.value) || 0)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              />
            </div>

            {/* Unequal Contributions Toggle */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                  Unequal Squad Contributions?
                </span>
                <input
                  type="checkbox"
                  checked={enableUnequal}
                  onChange={e => setEnableUnequal(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--coral-primary)', cursor: 'pointer' }}
                />
              </div>

              {enableUnequal && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Specify amounts paid or budgeted by each individual:
                  </div>
                  {customMembers.map((m, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        value={m.name}
                        onChange={e => {
                          const updated = [...customMembers];
                          updated[idx].name = e.target.value;
                          setCustomMembers(updated);
                        }}
                        style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.78rem' }}
                      />
                      <input
                        type="number"
                        placeholder={`Share (₹${perPersonBase})`}
                        value={m.amount}
                        onChange={e => {
                          const updated = [...customMembers];
                          updated[idx].amount = e.target.value;
                          setCustomMembers(updated);
                        }}
                        style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.78rem' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Receipt View */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ borderBottom: '2px dashed var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--coral-primary)', fontWeight: 800 }}>
                  SQUAD ESTIMATE RECEIPT 🧾
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                  {tripName}
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {squadSize} members participating
                </div>
              </div>

              {/* Financial Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Base Package:</span>
                  <span>₹{packageCost.toLocaleString('en-IN')}/head</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Travel / Fuel:</span>
                  <span>₹{travelCost.toLocaleString('en-IN')}/head</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Food & Drinks:</span>
                  <span>₹{foodCost.toLocaleString('en-IN')}/head</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Activities & Sights:</span>
                  <span>₹{activitiesCost.toLocaleString('en-IN')}/head</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800 }}>Per Person Share:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>
                    ₹{perPersonBase.toLocaleString('en-IN')}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800 }}>Total Squad Budget:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--coral-primary)' }}>
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {enableUnequal && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: difference === 0 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${difference === 0 ? '#10b981' : '#f59e0b'}`,
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Allocated:</span>
                      <strong>₹{totalContributed.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>Difference / Remaining:</span>
                      <strong style={{ color: difference === 0 ? '#10b981' : '#f59e0b' }}>
                        {difference === 0 ? 'Balanced perfectly! ✨' : `₹${difference.toLocaleString('en-IN')}`}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleWhatsAppShare}
                className="gradient-btn"
                style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
              >
                <MessageCircle size={17} />
                <span>Share with Squad on WhatsApp</span>
              </button>
              <button
                onClick={handleCopy}
                className="secondary-btn"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copied ? 'Copied Receipt to Clipboard!' : 'Copy Receipt Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

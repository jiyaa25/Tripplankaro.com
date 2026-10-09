import React, { useState, useEffect } from 'react';
import { Calculator, Users, Moon, Plane, Car, Utensils, Compass, DollarSign, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { generateCalculatorWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function TripBudgetCalculator({ initialTour, onClose }) {
  const [destination, setDestination] = useState('Goa');
  const [travelers, setTravelers] = useState(4);
  const [nights, setNights] = useState(4);
  const [hotelCategory, setHotelCategory] = useState('3star'); // 'budget', '3star', '4star', 'luxury'
  const [rooms, setRooms] = useState(2);
  const [includeFlights, setIncludeFlights] = useState(false);
  const [flightPerPerson, setFlightPerPerson] = useState(5500);
  const [transportPerDay, setTransportPerDay] = useState(2200); // Cab/scooters
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState(900);
  const [activitiesPerPerson, setActivitiesPerPerson] = useState(2500);
  const [miscSpending, setMiscSpending] = useState(3000); // Shopping/emergency

  // Pre-fill if tour provided
  useEffect(() => {
    if (initialTour) {
      setDestination(initialTour.destination || initialTour.tour_name);
      const days = initialTour.duration?.days || 4;
      setNights(Math.max(1, days - 1));
      if (initialTour.pricing?.discounted_price_num) {
        // Approximate breakdown from tour price
        const totalPerHead = initialTour.pricing.discounted_price_num;
        setActivitiesPerPerson(Math.round(totalPerHead * 0.2));
        setFoodPerPersonPerDay(Math.round((totalPerHead * 0.3) / Math.max(1, days)));
      }
    }
  }, [initialTour]);

  // Hotel cost per room per night
  const hotelRates = {
    budget: 1800,
    '3star': 3200,
    '4star': 5500,
    luxury: 12000
  };

  const hotelTotal = (hotelRates[hotelCategory] || 3200) * rooms * nights;
  const transportTotal = transportPerDay * (nights + 1);
  const foodTotal = foodPerPersonPerDay * travelers * (nights + 1);
  const activitiesTotal = activitiesPerPerson * travelers;
  const flightTotal = includeFlights ? flightPerPerson * travelers : 0;
  const miscTotal = miscSpending;

  const grandTotal = Math.max(0, hotelTotal + transportTotal + foodTotal + activitiesTotal + flightTotal + miscTotal);
  const perPersonCost = Math.round(grandTotal / (travelers || 1));
  const safeTotal = grandTotal > 0 ? grandTotal : 1;

  const handleWhatsAppShare = () => {
    const message = generateCalculatorWhatsAppMessage({
      destination,
      travelers,
      nights,
      grandTotal,
      perPersonCost,
      breakdown: {
        hotel: hotelTotal,
        transport: transportTotal,
        food: foodTotal,
        activities: activitiesTotal
      }
    });
    openWhatsApp(message);
  };

  return (
    <section id="trip-calculator" style={{
      padding: '70px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
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
            <span>Smart Vacation Cost Planner</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '8px' }}>
            Trip Budget <span className="gradient-text">Calculator</span> 🧮
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Calculate realistic end-to-end trip expenses for your squad or family with zero hidden surprises.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Inputs Section */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️ Trip Inputs</span>
            </h3>

            {/* Destination & Travelers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="e.g. Goa, Manali, Bali"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Travelers ({travelers} pax)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={travelers}
                  onChange={e => {
                    const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                    setTravelers(val);
                    setRooms(Math.ceil(val / 2));
                  }}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Nights & Rooms */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Duration ({nights} Nights)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={nights}
                  onChange={e => setNights(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Hotel Rooms ({rooms})
                </label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={rooms}
                  onChange={e => setRooms(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Hotel Category */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Accommodation Style
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[
                  { id: 'budget', label: 'Hostel/Cozy', price: '₹1.8k' },
                  { id: '3star', label: '3-Star Handpicked', price: '₹3.2k' },
                  { id: '4star', label: '4-Star Boutique', price: '₹5.5k' },
                  { id: 'luxury', label: '5-Star Luxury', price: '₹12k' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setHotelCategory(cat.id)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 'var(--radius-sm)',
                      border: hotelCategory === cat.id ? '2px solid var(--coral-primary)' : '1px solid var(--border-color)',
                      background: hotelCategory === cat.id ? 'rgba(255,56,92,0.12)' : 'transparent',
                      color: hotelCategory === cat.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div>{cat.label}</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>{cat.price}/nt</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Food & Activities slider/inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Food / Person / Day (₹{foodPerPersonPerDay})
                </label>
                <input
                  type="range"
                  min="400"
                  max="3500"
                  step="100"
                  value={foodPerPersonPerDay}
                  onChange={e => setFoodPerPersonPerDay(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--coral-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Activities / Person (₹{activitiesPerPerson})
                </label>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={activitiesPerPerson}
                  onChange={e => setActivitiesPerPerson(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--coral-primary)' }}
                />
              </div>
            </div>

            {/* Local Transport & Misc Shopping Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Cab / Transport / Day (₹{transportPerDay})
                </label>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="100"
                  value={transportPerDay}
                  onChange={e => setTransportPerDay(Number(e.target.value) || 0)}
                  style={{ width: '100%', accentColor: 'var(--coral-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Buffer / Shopping Total (₹{miscSpending})
                </label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={miscSpending}
                  onChange={e => setMiscSpending(Number(e.target.value) || 0)}
                  style={{ width: '100%', accentColor: 'var(--coral-primary)' }}
                />
              </div>
            </div>

            {/* Flights Toggle */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: includeFlights ? '10px' : 0 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plane size={16} color="var(--coral-primary)" />
                  Include Round-Trip Flights?
                </span>
                <input
                  type="checkbox"
                  checked={includeFlights}
                  onChange={e => setIncludeFlights(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--coral-primary)', cursor: 'pointer' }}
                />
              </div>
              {includeFlights && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Airfare / Head:</span>
                  <input
                    type="number"
                    value={flightPerPerson}
                    onChange={e => setFlightPerPerson(Number(e.target.value) || 0)}
                    style={{ width: '120px', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results & Breakdown */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 800 }}>
                    Estimated Total Budget
                  </span>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 900, color: 'var(--coral-primary)' }}>
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 800 }}>
                    Per Person
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>
                    ₹{perPersonCost.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    for {travelers} travelers ({nights} nights)
                  </div>
                </div>
              </div>

              {/* Itemized Breakdown Bar */}
              <div style={{
                height: '10px',
                borderRadius: '5px',
                overflow: 'hidden',
                display: 'flex',
                marginBottom: '20px',
                background: 'rgba(255,255,255,0.1)'
              }}>
                <div style={{ width: `${(hotelTotal / safeTotal) * 100}%`, background: '#ff385c' }} title="Stays" />
                <div style={{ width: `${(foodTotal / safeTotal) * 100}%`, background: '#f59e0b' }} title="Food" />
                <div style={{ width: `${(transportTotal / safeTotal) * 100}%`, background: '#3b82f6' }} title="Transport" />
                <div style={{ width: `${(activitiesTotal / safeTotal) * 100}%`, background: '#10b981' }} title="Activities" />
                {includeFlights && <div style={{ width: `${(flightTotal / safeTotal) * 100}%`, background: '#8b5cf6' }} title="Flights" />}
              </div>

              {/* Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🏨 Stays ({rooms} rooms × {nights} nights)</span>
                  <strong>₹{hotelTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🍽️ Food & Cafes ({travelers} pax)</span>
                  <strong>₹{foodTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🚗 Local Transport / Cabs</span>
                  <strong>₹{transportTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🧗 Activities & Sightseeing</span>
                  <strong>₹{activitiesTotal.toLocaleString('en-IN')}</strong>
                </div>
                {includeFlights && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>✈️ Flights ({travelers} pax)</span>
                    <strong>₹{flightTotal.toLocaleString('en-IN')}</strong>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🛍️ Misc Spending & Buffer</span>
                  <strong>₹{miscTotal.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            {/* Send to WhatsApp CTA */}
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={handleWhatsAppShare}
                className="gradient-btn"
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
              >
                <MessageCircle size={18} />
                <span>Send this budget to WhatsApp</span>
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Directly quotes your exact breakdown to our travel planner. Zero obligation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

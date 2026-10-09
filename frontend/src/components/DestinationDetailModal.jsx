import React, { useState } from 'react';
import { X, MapPin, Calendar, Thermometer, CloudRain, Users, Utensils, Compass, Info, Check, ShieldAlert, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import TourCard from './TourCard';

export default function DestinationDetailModal({
  destination,
  allTours = [],
  onClose,
  onOpenTour,
  onToggleSave,
  isTourSaved
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'weather', 'culture', 'map', 'tours'
  const [openFaq, setOpenFaq] = useState(null);

  if (!destination) return null;

  // Filter matching tours
  const matchingTours = allTours.filter(t =>
    t.destination_id?.toLowerCase() === destination.destination_id?.toLowerCase() ||
    t.destination?.toLowerCase().includes(destination.name?.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass"
        onClick={e => e.stopPropagation()}
        style={{
          width: '96%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Destination Hero Header */}
        <div style={{
          position: 'relative',
          height: '280px',
          minHeight: '280px',
          overflow: 'hidden'
        }}>
          <img
            src={destination.image}
            alt={destination.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.4) 60%, rgba(0,0,0,0.3) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>

          {/* Header Info */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 56, 92, 0.25)',
                color: '#ff758f',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                <MapPin size={13} />
                <span>{destination.region}, {destination.country}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#fff', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>
                {destination.name}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', maxWidth: '650px', marginTop: '6px' }}>
                {destination.short_description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)'
              }}>
                🗓️ Best: {destination.best_time_to_visit}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(0,0,0,0.15)',
          padding: '0 24px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📖 Overview & Story' },
            { id: 'weather', label: '☀️ Weather by Month' },
            { id: 'culture', label: '🍲 Food & Culture' },
            { id: 'map', label: '🗺️ Interactive Map' },
            { id: 'tours', label: `✈️ Trips (${matchingTours.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 18px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--coral-primary)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--coral-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Story */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>The Soul of {destination.name}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem' }}>
                  {destination.long_story}
                </p>
              </div>

              {/* Quick Facts Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                background: 'rgba(255,255,255,0.03)',
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800 }}>IDEAL DURATION</div>
                  <div style={{ fontWeight: 800, marginTop: '2px' }}>{destination.ideal_duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800 }}>BUDGET LEVEL</div>
                  <div style={{ fontWeight: 800, marginTop: '2px' }}>{destination.price_level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800 }}>CURRENCY</div>
                  <div style={{ fontWeight: 800, marginTop: '2px' }}>{destination.currency}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800 }}>LANGUAGES</div>
                  <div style={{ fontWeight: 800, marginTop: '2px' }}>{destination.languages?.join(', ')}</div>
                </div>
              </div>

              {/* Attractions & Hidden Gems */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div className="glass" style={{ padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--coral-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={17} />
                    <span>Top Sights & Attractions</span>
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {destination.top_attractions?.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="glass" style={{ padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: '#10b981', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={17} />
                    <span>Hidden Gems (Offbeat)</span>
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {destination.hidden_gems?.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Travel Tips & Etiquette */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#60a5fa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={16} />
                    <span>Traveler Tips</span>
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    {destination.travel_tips?.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={16} />
                    <span>Local Etiquette</span>
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    {destination.local_etiquette?.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              {destination.faq && destination.faq.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Frequently Asked Questions</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {destination.faq.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.02)'
                        }}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <span>{item.q}</span>
                          {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {openFaq === i && (
                          <div style={{ padding: '0 16px 14px 16px', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                            {item.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WEATHER BY MONTH */}
          {activeTab === 'weather' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Curated Climate & Seasonality Guide</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  {destination.rainfall_information} {destination.crowd_information}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '12px'
              }}>
                {destination.monthly_weather?.map(m => (
                  <div
                    key={m.month}
                    className="glass"
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--coral-primary)' }}>
                      {m.month}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      {m.temp}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      🌧️ {m.rainfall}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: m.crowd === 'High' || m.crowd === 'Peak' ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                      👥 {m.crowd} Season
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', borderTop: '1px solid var(--border-color)', paddingTop: '4px' }}>
                      {m.verdict}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOOD & CULTURE */}
          {activeTab === 'culture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Cultural Heritage</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                  {destination.culture}
                </p>
                {destination.heritage_story && (
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', marginTop: '8px' }}>
                    <strong>Heritage Note:</strong> {destination.heritage_story}
                  </p>
                )}
              </div>

              {/* Food Section */}
              <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <Utensils size={18} />
                  <span>Must-Try Local Foods & Treats</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {destination.must_try_foods?.map((dish, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(255,255,255,0.03)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      🍽️ {dish}
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Wear & People */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--coral-primary)', marginBottom: '6px' }}>What to Wear / Packing</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{destination.clothing}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--coral-primary)', marginBottom: '6px' }}>People & Lifestyle</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{destination.people}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE MAP */}
          {activeTab === 'map' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Attractions & Landmarks Map</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Explore verified attractions, beaches, photo spots and heritage sites across {destination.name}.
                </p>
              </div>

              <InteractiveMap
                center={[destination.map_coordinates?.lat || 20.5937, destination.map_coordinates?.lng || 78.9629]}
                zoom={11}
                markers={destination.map_markers || []}
                title={destination.name}
                height="420px"
              />
            </div>
          )}

          {/* TAB 5: TOURS */}
          {activeTab === 'tours' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                  Available Tripplankaro Itineraries for {destination.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Choose a handcrafted package or customize your dates and stays.
                </p>
              </div>

              {matchingTours.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  No pre-built tours currently for this hub. Enquire on WhatsApp for a custom tailor-made plan!
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '18px'
                }}>
                  {matchingTours.map(t => (
                    <TourCard
                      key={t.tour_id}
                      tour={t}
                      isSaved={isTourSaved ? isTourSaved(t.tour_id) : false}
                      onToggleSave={() => onToggleSave && onToggleSave(t)}
                      onOpenDetails={() => {
                        onClose();
                        onOpenTour(t);
                      }}
                      onQuickWhatsApp={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

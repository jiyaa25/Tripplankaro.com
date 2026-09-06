import React, { useState, useEffect } from 'react';
import {
  X, Lock, Plus, Edit3, Trash2, Eye, Search,
  CheckCircle, AlertCircle, RefreshCw, Globe, Home,
  MessageCircle, Users, Star, Package, MapPin,
  ChevronDown, ChevronUp, Save, ClipboardList, Send
} from 'lucide-react';

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_KEY || 'tripplan2026';

const EMPTY_TOUR = {
  tour_name: '',
  destination: '',
  destination_key: '',
  tour_type: 'Domestic',
  duration: '',
  duration_short: '',
  nights: 1,
  days: 2,
  group_size: '2–15 persons',
  image: '',
  gallery_images: [],
  overview: '',
  pricing: {
    original_price: '',
    discounted_price: '',
    original_price_num: 0,
    discounted_price_num: 0,
    discount_percent: 0
  },
  rating: 4.5,
  review_count: 0,
  included: [''],
  excluded: [''],
  itinerary: [{ day: 1, title: '', description: '', image: '' }],
  vibes: [],
  photo_spots: [],
  is_trending: false,
  is_featured: false
};

const VIBE_OPTIONS = [
  '#AestheticStays', '#SquadGoals', '#InstaWorthy',
  '#AdrenalineRush', '#BudgetBangers', '#SunsetChasers',
  '#SoloExplorer', '#CultureCraze'
];

export default function AdminPortal({ onClose }) {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data
  const [tours, setTours] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [customTrips, setCustomTrips] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Tour form state
  const [showTourForm, setShowTourForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [tourForm, setTourForm] = useState(EMPTY_TOUR);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLogin = () => {
    if (passInput === ADMIN_PASSCODE) {
      setAuthed(true);
      loadData();
    } else {
      setPassError('Incorrect passcode. Please try again.');
      setPassInput('');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [toursRes, statsRes, inqRes, customRes] = await Promise.all([
        fetch('/api/tours?limit=200').then(r => r.json()),
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/admin/inquiries', { headers: { 'X-Admin-Key': ADMIN_PASSCODE } }).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/admin/custom-trips', { headers: { 'X-Admin-Key': ADMIN_PASSCODE } }).then(r => r.ok ? r.json() : []).catch(() => [])
      ]);
      setTours(toursRes.tours || []);
      setStats(statsRes);
      setInquiries(Array.isArray(inqRes) ? inqRes : []);
      setCustomTrips(Array.isArray(customRes) ? customRes : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTour = async () => {
    setFormError('');
    setFormSuccess('');
    if (!tourForm.tour_name.trim()) { setFormError('Tour name is required.'); return; }
    if (!tourForm.destination.trim()) { setFormError('Destination is required.'); return; }
    if (!tourForm.pricing.discounted_price_num) { setFormError('Price is required.'); return; }

    setSaving(true);
    try {
      const method = editingTour ? 'PUT' : 'POST';
      const url = editingTour ? `/api/admin/tours/${editingTour.tour_id}` : '/api/admin/tours';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_PASSCODE },
        body: JSON.stringify(tourForm)
      });
      const data = await res.json();
      if (res.ok) {
        setFormSuccess(editingTour ? 'Tour updated successfully!' : 'Tour added successfully!');
        setTimeout(() => {
          setShowTourForm(false);
          setEditingTour(null);
          setTourForm(EMPTY_TOUR);
          setFormSuccess('');
          loadData();
        }, 1500);
      } else {
        setFormError(data.detail || 'Failed to save tour.');
      }
    } catch (e) {
      setFormError('Network error. Make sure backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTour = async (tourId, tourName) => {
    if (!window.confirm(`Delete "${tourName}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/tours/${tourId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': ADMIN_PASSCODE }
      });
      if (res.ok) {
        setTours(prev => prev.filter(t => t.tour_id !== tourId));
      }
    } catch (e) {
      alert('Delete failed. Check backend.');
    }
  };

  const openEditForm = (tour) => {
    setEditingTour(tour);
    setTourForm({ ...EMPTY_TOUR, ...tour });
    setFormError('');
    setFormSuccess('');
    setShowTourForm(true);
  };

  const openNewForm = () => {
    setEditingTour(null);
    setTourForm(EMPTY_TOUR);
    setFormError('');
    setFormSuccess('');
    setShowTourForm(true);
  };

  const filteredTours = tours.filter(t => {
    const matchQ = !searchQ || t.tour_name.toLowerCase().includes(searchQ.toLowerCase()) || t.destination.toLowerCase().includes(searchQ.toLowerCase());
    const matchType = filterType === 'all' || t.tour_type === filterType;
    return matchQ && matchType;
  });

  // Styles
  const tabStyle = (isActive) => ({
    padding: '10px 18px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    background: isActive ? 'var(--coral-primary)' : 'rgba(255,255,255,0.06)',
    color: isActive ? '#fff' : 'var(--text-secondary)',
    fontWeight: 700,
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'var(--transition)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  });

  if (!authed) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content glass"
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '420px',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
            background: 'var(--bg-secondary)',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'var(--sunset-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <Lock size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '28px' }}>
            Enter your passcode to manage tours & view inquiries.
          </p>
          <input
            type="password"
            placeholder="Enter passcode..."
            value={passInput}
            onChange={e => { setPassInput(e.target.value); setPassError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoFocus
            style={{
              width: '100%',
              padding: '14px 18px',
              background: 'var(--bg-card)',
              border: passError ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              outline: 'none',
              marginBottom: passError ? '8px' : '20px',
              boxSizing: 'border-box'
            }}
          />
          {passError && (
            <p style={{ color: 'var(--coral-primary)', fontSize: '0.82rem', marginBottom: '16px' }}>
              {passError}
            </p>
          )}
          <button onClick={handleLogin} className="gradient-btn" style={{ width: '100%', padding: '14px' }}>
            <Lock size={16} />
            <span>Access Admin Portal</span>
          </button>
          <button
            onClick={onClose}
            style={{ marginTop: '14px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ alignItems: 'flex-start', padding: '0' }}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '96vh',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          margin: '2vh auto'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,56,92,0.06)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'var(--sunset-gradient)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Lock size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>Admin Portal</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>tripplankaro.com — Manage Tours & Inquiries</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={loadData} title="Refresh" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={16} />
            </button>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
          <button style={tabStyle(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>
            <Package size={15} /> Dashboard
          </button>
          <button style={tabStyle(activeTab === 'tours')} onClick={() => setActiveTab('tours')}>
            <MapPin size={15} /> Manage Tours ({tours.length})
          </button>
          <button style={tabStyle(activeTab === 'inquiries')} onClick={() => setActiveTab('inquiries')}>
            <MessageCircle size={15} /> Inquiries ({inquiries.length})
          </button>
          <button style={tabStyle(activeTab === 'custom')} onClick={() => setActiveTab('custom')}>
            <ClipboardList size={15} /> Custom Trips ({customTrips.length})
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
              <p>Loading data...</p>
            </div>
          )}

          {/* Dashboard */}
          {!loading && activeTab === 'dashboard' && (
            <div>
              <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                {[
                  { label: 'Total Tours', value: tours.length, icon: <Package size={22} color="var(--coral-primary)" />, color: 'rgba(255,56,92,0.12)' },
                  { label: 'India Tours', value: tours.filter(t => t.tour_type === 'Domestic').length, icon: <Home size={22} color="#10b981" />, color: 'rgba(16,185,129,0.12)' },
                  { label: 'International', value: tours.filter(t => t.tour_type === 'International').length, icon: <Globe size={22} color="#a78bfa" />, color: 'rgba(139,92,246,0.12)' },
                  { label: 'Inquiries', value: inquiries.length, icon: <MessageCircle size={22} color="#00f2fe" />, color: 'rgba(0,242,254,0.12)' },
                  { label: 'Custom Trips', value: customTrips.length, icon: <ClipboardList size={22} color="#f59e0b" />, color: 'rgba(245,158,11,0.12)' },
                  { label: 'Featured', value: tours.filter(t => t.is_featured).length, icon: <Star size={22} color="#fbbf24" />, color: 'rgba(251,191,36,0.12)' },
                ].map((s, i) => (
                  <div key={i} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      {s.icon}
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(255,56,92,0.06)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid rgba(255,56,92,0.2)' }}>
                <p style={{ fontWeight: 700, marginBottom: '8px' }}>🚀 Quick Actions</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => { setActiveTab('tours'); openNewForm(); }} className="gradient-btn" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                    <Plus size={15} /> Add New Tour
                  </button>
                  <button onClick={() => setActiveTab('inquiries')} style={{ padding: '10px 20px', fontSize: '0.88rem', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={15} /> View Inquiries
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manage Tours */}
          {!loading && activeTab === 'tours' && !showTourForm && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1.3rem' }}>Manage Tours</h3>
                <button onClick={openNewForm} className="gradient-btn" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                  <Plus size={15} /> Add New Tour
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search tours..."
                    style={{ width: '100%', paddingLeft: '36px', padding: '10px 14px 10px 36px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                {['all', 'Domestic', 'International'].map(type => (
                  <button key={type} onClick={() => setFilterType(type)} style={{ padding: '10px 16px', borderRadius: 'var(--radius-full)', border: filterType === type ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)', background: filterType === type ? 'var(--coral-primary)' : 'transparent', color: filterType === type ? '#fff' : 'var(--text-secondary)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {type === 'all' ? 'All' : type === 'Domestic' ? '🇮🇳 India' : '✈️ International'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredTours.map(tour => (
                  <div key={tour.tour_id} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '16px 20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={tour.image} alt={tour.tour_name} style={{ width: '72px', height: '52px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tour.tour_name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {tour.destination} · {tour.duration_short} · {tour.pricing?.discounted_price}/person
                        {tour.is_featured && <span style={{ marginLeft: '8px', color: '#fbbf24' }}>⭐ Featured</span>}
                        {tour.is_trending && <span style={{ marginLeft: '8px', color: '#10b981' }}>🔥 Trending</span>}
                      </div>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: tour.tour_type === 'Domestic' ? 'rgba(16,185,129,0.15)' : 'rgba(139,92,246,0.15)', color: tour.tour_type === 'Domestic' ? '#10b981' : '#a78bfa', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                      {tour.tour_type === 'Domestic' ? '🇮🇳 India' : '✈️ Intl'}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button onClick={() => openEditForm(tour)} title="Edit Tour" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => handleDeleteTour(tour.tour_id, tour.tour_name)} title="Delete Tour" style={{ background: 'rgba(255,56,92,0.1)', border: '1px solid rgba(255,56,92,0.3)', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', color: 'var(--coral-primary)' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tour Form */}
          {!loading && activeTab === 'tours' && showTourForm && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <button onClick={() => { setShowTourForm(false); setEditingTour(null); }} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
                  ← Back
                </button>
                <h3 style={{ fontSize: '1.3rem' }}>{editingTour ? `Edit: ${editingTour.tour_name.slice(0, 35)}...` : 'Add New Tour'}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Basic Info */}
                <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--coral-primary)' }}>Basic Information</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TOUR NAME *</label>
                      <input value={tourForm.tour_name} onChange={e => setTourForm(f => ({ ...f, tour_name: e.target.value }))} placeholder="e.g. 🏔️ Manali Snow Escape – 5N/6D" style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DESTINATION *</label>
                      <input value={tourForm.destination} onChange={e => setTourForm(f => ({ ...f, destination: e.target.value, destination_key: e.target.value.toLowerCase() }))} placeholder="e.g. Himachal Pradesh" style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TOUR TYPE *</label>
                      <select value={tourForm.tour_type} onChange={e => setTourForm(f => ({ ...f, tour_type: e.target.value }))} style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}>
                        <option value="Domestic">Domestic (India)</option>
                        <option value="International">International</option>
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>NIGHTS</label>
                        <input type="number" min="1" value={tourForm.nights} onChange={e => setTourForm(f => ({ ...f, nights: +e.target.value, days: +e.target.value + 1, duration: `${e.target.value} Nights / ${+e.target.value + 1} Days`, duration_short: `${e.target.value}N / ${+e.target.value + 1}D` }))} style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>GROUP SIZE</label>
                        <input value={tourForm.group_size} onChange={e => setTourForm(f => ({ ...f, group_size: e.target.value }))} placeholder="e.g. 2–15 persons" style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--coral-primary)' }}>Pricing</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ORIGINAL PRICE (₹)</label>
                      <input type="number" value={tourForm.pricing.original_price_num} onChange={e => {
                        const num = +e.target.value;
                        const disc = tourForm.pricing.discounted_price_num;
                        const pct = disc && num ? Math.round(((num - disc) / num) * 100) : 0;
                        setTourForm(f => ({ ...f, pricing: { ...f.pricing, original_price_num: num, original_price: `₹${num.toLocaleString()}`, discount_percent: pct } }));
                      }} placeholder="25000" style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DISCOUNTED PRICE (₹) *</label>
                      <input type="number" value={tourForm.pricing.discounted_price_num} onChange={e => {
                        const disc = +e.target.value;
                        const orig = tourForm.pricing.original_price_num;
                        const pct = orig && disc ? Math.round(((orig - disc) / orig) * 100) : 0;
                        setTourForm(f => ({ ...f, pricing: { ...f.pricing, discounted_price_num: disc, discounted_price: `₹${disc.toLocaleString()}`, discount_percent: pct } }));
                      }} placeholder="18500" style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    {tourForm.pricing.discount_percent > 0 && (
                      <div style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>
                        ✓ {tourForm.pricing.discount_percent}% discount auto-calculated
                      </div>
                    )}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>MAIN IMAGE URL</label>
                      <input value={tourForm.image} onChange={e => setTourForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>RATING (1-5)</label>
                      <input type="number" min="1" max="5" step="0.1" value={tourForm.rating} onChange={e => setTourForm(f => ({ ...f, rating: +e.target.value }))} style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                        <input type="checkbox" checked={tourForm.is_featured} onChange={e => setTourForm(f => ({ ...f, is_featured: e.target.checked }))} />
                        Featured
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                        <input type="checkbox" checked={tourForm.is_trending} onChange={e => setTourForm(f => ({ ...f, is_trending: e.target.checked }))} />
                        Trending
                      </label>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', gridColumn: '1 / -1' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--coral-primary)' }}>Tour Overview</h4>
                  <textarea value={tourForm.overview} onChange={e => setTourForm(f => ({ ...f, overview: e.target.value }))} placeholder="Describe the tour highlights, route, and experience..." rows={4} style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
                </div>

                {/* Vibes */}
                <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--coral-primary)' }}>Travel Vibes</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {VIBE_OPTIONS.map(vibe => (
                      <button
                        key={vibe}
                        type="button"
                        onClick={() => setTourForm(f => ({
                          ...f,
                          vibes: f.vibes.includes(vibe) ? f.vibes.filter(v => v !== vibe) : [...f.vibes, vibe]
                        }))}
                        style={{ padding: '5px 12px', borderRadius: 'var(--radius-full)', border: tourForm.vibes.includes(vibe) ? '1px solid var(--coral-primary)' : '1px solid var(--border-color)', background: tourForm.vibes.includes(vibe) ? 'rgba(255,56,92,0.15)' : 'transparent', color: tourForm.vibes.includes(vibe) ? 'var(--coral-primary)' : 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Included / Excluded */}
                <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--coral-primary)' }}>Inclusions & Exclusions</h4>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', display: 'block', marginBottom: '8px' }}>✓ INCLUDED</label>
                    {tourForm.included.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <input value={item} onChange={e => setTourForm(f => { const arr = [...f.included]; arr[idx] = e.target.value; return { ...f, included: arr }; })} placeholder="e.g. Breakfast & Dinner" style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none' }} />
                        <button onClick={() => setTourForm(f => ({ ...f, included: f.included.filter((_, i) => i !== idx) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => setTourForm(f => ({ ...f, included: [...f.included, ''] }))} style={{ fontSize: '0.78rem', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>+ Add Item</button>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--coral-primary)', display: 'block', marginBottom: '8px' }}>✗ EXCLUDED</label>
                    {tourForm.excluded.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <input value={item} onChange={e => setTourForm(f => { const arr = [...f.excluded]; arr[idx] = e.target.value; return { ...f, excluded: arr }; })} placeholder="e.g. Flight tickets" style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', outline: 'none' }} />
                        <button onClick={() => setTourForm(f => ({ ...f, excluded: f.excluded.filter((_, i) => i !== idx) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => setTourForm(f => ({ ...f, excluded: [...f.excluded, ''] }))} style={{ fontSize: '0.78rem', color: 'var(--coral-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>+ Add Item</button>
                  </div>
                </div>
              </div>

              {/* Save / Error */}
              <div style={{ marginTop: '24px', padding: '20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  {formError && <p style={{ color: 'var(--coral-primary)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>⚠️ {formError}</p>}
                  {formSuccess && <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>✅ {formSuccess}</p>}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => { setShowTourForm(false); setEditingTour(null); }} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', fontWeight: 700 }}>
                    Cancel
                  </button>
                  <button onClick={handleSaveTour} disabled={saving} className="gradient-btn" style={{ padding: '12px 28px', fontSize: '0.95rem', opacity: saving ? 0.7 : 1 }}>
                    <Save size={16} />
                    <span>{saving ? 'Saving...' : (editingTour ? 'Update Tour' : 'Add Tour')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inquiries */}
          {!loading && activeTab === 'inquiries' && (
            <div>
              <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Booking Inquiries ({inquiries.length})</h3>
              {inquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                  <MessageCircle size={40} style={{ margin: '0 auto 16px auto', display: 'block' }} />
                  <p>No inquiries yet. They'll appear here when customers reach out.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[...inquiries].reverse().map((inq, i) => (
                    <div key={i} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '18px 22px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>{inq.name}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            📱 {inq.phone}{inq.email && ` · ✉️ ${inq.email}`} · 🗓️ {new Date(inq.created_at).toLocaleDateString('en-IN')}
                          </div>
                          {inq.tour_name && <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>🏝️ <strong>Tour:</strong> {inq.tour_name}</div>}
                          {inq.travel_date && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>📅 Travel Date: {inq.travel_date} · 👥 Group: {inq.squad_size} pax</div>}
                          {inq.notes && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>"{inq.notes}"</div>}
                        </div>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)}!%20Thank%20you%20for%20your%20inquiry%20about%20${encodeURIComponent(inq.tour_name || 'your trip')}%20at%20TripPlanKaro.%20We%27d%20love%20to%20help%20you%20plan%20your%20perfect%20holiday!%20%F0%9F%8C%9F`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ padding: '8px 14px', background: '#25D366', color: '#fff', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
                        >
                          <MessageCircle size={14} /> Reply on WA
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Trips */}
          {!loading && activeTab === 'custom' && (
            <div>
              <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Custom Trip Requests ({customTrips.length})</h3>
              {customTrips.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                  <ClipboardList size={40} style={{ margin: '0 auto 16px auto', display: 'block' }} />
                  <p>No custom trip requests yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[...customTrips].reverse().map((trip, i) => (
                    <div key={i} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '18px 22px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>{trip.name}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            📱 {trip.phone}{trip.email && ` · ✉️ ${trip.email}`} · 🗓️ {new Date(trip.created_at).toLocaleDateString('en-IN')}
                          </div>
                          <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                            📍 {trip.destination || trip.vibe} · ⏱️ {trip.duration} · 👥 {trip.squad_size} people · 💰 {trip.budget_per_person}
                          </div>
                          {trip.notes && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>"{trip.notes}"</div>}
                        </div>
                        <a
                          href={`https://wa.me/${trip.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(trip.name)}!%20We%20received%20your%20custom%20trip%20request%20for%20${encodeURIComponent(trip.destination || trip.vibe)}%20at%20TripPlanKaro.%20Our%20team%20is%20designing%20your%20perfect%20itinerary!%20%F0%9F%8C%9F`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ padding: '8px 14px', background: '#25D366', color: '#fff', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
                        >
                          <MessageCircle size={14} /> Reply on WA
                        </a>
                      </div>
                    </div>
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

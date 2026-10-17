import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Compass, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import toursData from '../data/tours.json';
import { getTourImage } from '../utils/imageFallback';

export default function VibeQuiz({ onSelectVibe, onOpenTour }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    companion: null,
    mood: null,
    scope: null,
    budget: null,
    pace: null,
    activity: null
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'companion',
      title: "Who's in your travel squad?",
      subtitle: "Pick the crew you're packing bags with",
      options: [
        { label: "The Squad (College / Work Friends)", emoji: "👯‍♂️", tag: "squad", vibe: "#SquadGoals" },
        { label: "Just Me & Bae (Romantic Reset)", emoji: "💖", tag: "couple", vibe: "#AestheticStays" },
        { label: "Solo Explorer (Reset & Make Memories)", emoji: "🎒", tag: "solo", vibe: "#SoloExplorer" },
        { label: "Family Vacation", emoji: "👨‍👩‍👧‍👦", tag: "family", vibe: "#InstaWorthy" }
      ]
    },
    {
      id: 'mood',
      title: "What's the core energy you're craving?",
      subtitle: "How do you want your vacation days to feel?",
      options: [
        { label: "Beach Sundowners & Ocean Breezes", emoji: "🏖️", vibe: "#SunsetChasers", keywords: ['goa', 'beach', 'bali', 'andaman'] },
        { label: "Himalayan Snow, High Passes & Thrills", emoji: "🏔️", vibe: "#AdrenalineRush", keywords: ['manali', 'snow', 'trek', 'ladakh', 'uttarakhand'] },
        { label: "Photogenic Stays, Palaces & Cafes", emoji: "📸", vibe: "#InstaWorthy", keywords: ['rajasthan', 'kashmir', 'cafe', 'palace'] },
        { label: "Max Fun, Street Food & Budget Wins", emoji: "💸", vibe: "#BudgetBangers", keywords: ['budget', 'kasol', 'rishikesh', 'food'] }
      ]
    },
    {
      id: 'scope',
      title: "Domestic Escape or Passport Ready?",
      subtitle: "Choose your travel horizon",
      options: [
        { label: "Incredible India Trips (Hassle-Free)", emoji: "🇮🇳", type: "Domestic" },
        { label: "International Adventure (Dubai, Bali, Thailand...)", emoji: "✈️", type: "International" },
        { label: "Open to wherever the vibe is best!", emoji: "🌍", type: "all" }
      ]
    },
    {
      id: 'budget',
      title: "What's the per-person budget ballpark?",
      subtitle: "Keep it real for maximum value",
      options: [
        { label: "Budget Friendly (Under ₹18,000)", emoji: "⚡", maxBudget: 18000 },
        { label: "Comfort Mid-Range (₹18,000 - ₹35,000)", emoji: "🌟", maxBudget: 35000 },
        { label: "Premium / International (₹35,000+)", emoji: "💎", maxBudget: 100000 }
      ]
    },
    {
      id: 'pace',
      title: "Adventure vs Relaxation?",
      subtitle: "Your preferred holiday rhythm",
      options: [
        { label: "High Energy: Rafting, Safaris, Treks & Exploring", emoji: "🧗", vibe: "#AdrenalineRush" },
        { label: "Chill & Unwind: Sunset walks, pool villas, quiet cafes", emoji: "🧘", vibe: "#SunsetChasers" }
      ]
    }
  ];

  const personalities = {
    '#SunsetChasers': {
      title: "SUNSET CHASER 🌅",
      tagline: "Salt in your hair, golden hour cocktails and carefree coastal vibes.",
      desc: "You prioritize breathtaking twilight views, beachfront living, relaxed cafes, and recharging by the water."
    },
    '#AdrenalineRush': {
      title: "HIMALAYAN TRAILBLAZER 🧗",
      tagline: "Chasing snow passes, white river rapids and mountain peaks.",
      desc: "For you, a vacation means testing your limits, feeling the raw mountain wind, and waking up to 360-degree Himalayan panoramas."
    },
    '#InstaWorthy': {
      title: "AESTHETIC VOYAGER 📸",
      tagline: "Boutique stays, golden palaces and memories captured in style.",
      desc: "You appreciate thoughtfully designed architecture, royal courtyards, heritage food, and photogenic corners worth framing."
    },
    '#BudgetBangers': {
      title: "SMART EXPEDITIONER 💸",
      tagline: "Maximum sights, maximum fun, zero financial regret.",
      desc: "You know how to unlock the most rewarding travel experiences without unnecessary markups. True backpacker grit with smart comforts."
    },
    '#SquadGoals': {
      title: "SQUAD CAPTAIN 👯‍♂️",
      tagline: "Group laughs, late-night talks and legendary squad stories.",
      desc: "The destination is great, but the squad you travel with makes it unforgettable. You love shared villas and buzzing evening energy."
    },
    '#SoloExplorer': {
      title: "FREE SPIRIT SOLOIST 🎒",
      tagline: "No schedules, spontaneous trails and authentic self-discovery.",
      desc: "Travelling on your own terms to recharge, write your own story, and connect with inspiring people along the way."
    }
  };

  const handleOptionSelect = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate Personality & Matches
      let matchedVibe = '#SunsetChasers';
      if (updated.mood?.vibe) {
        matchedVibe = updated.mood.vibe;
      } else if (updated.pace?.vibe) {
        matchedVibe = updated.pace.vibe;
      } else if (updated.companion?.vibe) {
        matchedVibe = updated.companion.vibe;
      }

      // Filter and score top 3 tours from static tours
      const candidateTours = toursData
        .filter(t => {
          if (updated.scope?.type && updated.scope.type !== 'all') {
            if (t.tour_type !== updated.scope.type) return false;
          }
          return true;
        })
        .map(t => {
          let score = 70; // baseline
          // Vibe match
          if (t.vibes?.includes(matchedVibe)) score += 15;
          // Budget match
          if (updated.budget?.maxBudget && t.pricing?.discounted_price_num <= updated.budget.maxBudget) {
            score += 10;
          }
          // Rating booster
          if (t.rating >= 4.8) score += 4;

          const matchPercent = Math.min(98, score + Math.floor(Math.random() * 3));
          return {
            ...t,
            matchPercent,
            matchReason: `Matches your desire for ${updated.mood?.label || 'unforgettable sights'} and fits your squad size.`
          };
        })
        .sort((a, b) => b.matchPercent - a.matchPercent)
        .slice(0, 3);

      const personality = personalities[matchedVibe] || personalities['#SunsetChasers'];

      setResult({
        vibe: matchedVibe,
        personality,
        topTours: candidateTours
      });
      setStep(questions.length);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ companion: null, mood: null, scope: null, budget: null, pace: null, activity: null });
    setResult(null);
  };

  const currentQ = questions[step];

  return (
    <section id="vibe-quiz" style={{
      padding: '70px 0',
      borderBottom: '1px solid var(--border-color)',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
            <span>Interactive Travel Matchmaker</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '8px' }}>
            Find Your <span className="gradient-text">Travel Persona</span> ✨
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Answer 5 fun questions and let our client-side matcher pair you with the ideal itinerary.
          </p>
        </div>

        {/* Card Container */}
        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '36px 30px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          minHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {step < questions.length ? (
            <div>
              {/* Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--coral-primary)', textTransform: 'uppercase' }}>
                  Question {step + 1} of {questions.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {Math.round(((step) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '28px' }}>
                <div style={{ width: `${((step + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--sunset-gradient)', transition: 'width 0.3s ease' }} />
              </div>

              {/* Question Header */}
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.65rem)', fontWeight: 800, marginBottom: '6px' }}>
                  {currentQ.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: currentQ.options.length > 2 ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr 1fr',
                gap: '14px'
              }}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(currentQ.id, opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--coral-primary)';
                      e.currentTarget.style.background = 'rgba(255, 56, 92, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{opt.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.3 }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : result ? (
            /* Results Screen */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 56, 92, 0.15)',
                color: 'var(--coral-primary)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                <span>✨ YOUR TRAVEL PERSONALITY</span>
              </div>

              <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '8px' }} className="gradient-text">
                {result.personality.title}
              </h3>
              <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                “{result.personality.tagline}”
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
                {result.personality.desc}
              </p>

              {/* Recommended Matching Tours */}
              <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  🎯 Top Recommended Trips For You:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {result.topTours.map(t => (
                    <div
                      key={t.tour_id}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-md)',
                        padding: '14px 18px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: onOpenTour ? 'pointer' : 'default' }}
                        onClick={() => onOpenTour && onOpenTour(t)}
                      >
                        <img
                          src={getTourImage(t.image, t.destination)}
                          alt={t.tour_name}
                          style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{t.tour_name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--coral-primary)', fontWeight: 700 }}>
                            {t.destination} • {t.duration_short} • {t.pricing?.discounted_price}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: 'rgba(16,185,129,0.15)',
                          color: '#10b981',
                          fontWeight: 900,
                          fontSize: '0.82rem',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          {t.matchPercent}% MATCH
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    if (onSelectVibe) onSelectVibe(result.vibe);
                  }}
                  className="gradient-btn"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <span>Explore All Matching Trips</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleReset}
                  className="secondary-btn"
                  style={{ padding: '12px 20px', fontSize: '0.92rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

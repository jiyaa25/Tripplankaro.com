import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VibeQuiz({ onSelectVibe }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    companion: '',
    energy: '',
    duration: ''
  });
  const [resultVibe, setResultVibe] = useState(null);

  const questions = [
    {
      id: 'companion',
      title: "Who's in the travel crew?",
      subtitle: "Tell us who you're packing bags with",
      options: [
        { label: "The Squad (College/Office Friends)", emoji: "👯‍♂️", tag: "squad" },
        { label: "Just Me & Bae (Romantic Reset)", emoji: "💖", tag: "couple" },
        { label: "Solo Traveler (Recharge & Meet People)", emoji: "🎒", tag: "solo" },
        { label: "Family / Chill Group", emoji: "👨‍👩‍👧‍👦", tag: "family" }
      ]
    },
    {
      id: 'energy',
      title: "What's the energy you're craving?",
      subtitle: "How do you want your days to feel?",
      options: [
        { label: "Sundowner Cafes, Beach Music & Vibes", emoji: "🏖️", tag: "beach", vibe: "#SunsetChasers" },
        { label: "Himalayan Snow, High Passes & Silence", emoji: "🏔️", tag: "mountains", vibe: "#AdrenalineRush" },
        { label: "Photogenic Stays, Royal Forts & Content", emoji: "📸", tag: "insta", vibe: "#InstaWorthy" },
        { label: "Maximum Sights, Budget Hacking & Fun", emoji: "💸", tag: "budget", vibe: "#BudgetBangers" }
      ]
    },
    {
      id: 'duration',
      title: "How many days can you get off?",
      subtitle: "Choose your squad's vacation budget in days",
      options: [
        { label: "Quick 3–4 Days Weekend Getaway", emoji: "⚡", cat: "short" },
        { label: "Epic 5–8 Days Weeklong Holiday", emoji: "🌟", cat: "week" },
        { label: "Grand 9+ Days International Expedition", emoji: "✈️", cat: "long" }
      ]
    }
  ];

  const handleOptionClick = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate resulting Gen-Z vibe
      let matched = "#SquadGoals";
      if (updated.energy?.vibe) {
        matched = updated.energy.vibe;
      } else if (updated.companion?.tag === 'solo') {
        matched = "#SoloExplorer";
      } else if (updated.companion?.tag === 'couple') {
        matched = "#AestheticStays";
      }

      setResultVibe(matched);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  };

  const handleApplyVibe = () => {
    if (resultVibe) {
      onSelectVibe(resultVibe);
      const el = document.getElementById('explore-trips');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ companion: '', energy: '', duration: '' });
    setResultVibe(null);
  };

  return (
    <section id="vibe-quiz" style={{
      padding: '60px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ maxWidth: '820px' }}>
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
            <span>Interactive Matcher</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '10px' }}>
            Find Your <span className="gradient-text">Trip Vibe in 30 Seconds</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Don't know where to go? Answer 3 quick questions and our trip algorithm will match your squad's frequency.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '6px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '3px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${((step + 1) / (questions.length + 1)) * 100}%`,
            background: 'var(--sunset-gradient)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Question Cards */}
        {step < questions.length ? (
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '32px 28px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Step {step + 1} of {questions.length}
              </span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '6px' }}>
                {questions[step].title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {questions[step].subtitle}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  id={`vibe-opt-${step}-${i}`}
                  onClick={() => handleOptionClick(questions[step].id, opt)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,56,92,0.1)';
                    e.currentTarget.style.borderColor = 'var(--coral-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.6rem' }}>{opt.emoji}</span>
                  <span style={{ flex: 1 }}>{opt.label}</span>
                  <ArrowRight size={16} color="var(--text-muted)" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--coral-primary)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
              🎯✨
            </div>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,56,92,0.15)',
              color: 'var(--coral-primary)',
              fontWeight: 800,
              fontSize: '0.9rem',
              marginBottom: '12px'
            }}>
              Your Match: {resultVibe}
            </span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
              We've Calibrated Your Perfect Trip Vibe!
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '550px',
              margin: '0 auto 28px auto',
              fontSize: '0.95rem'
            }}>
              Based on your squad's energy, we filtered trips with the right balance of aesthetic stays,
              freedom to explore, photo spots, and zero boomer tour guides.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                id="apply-vibe-btn"
                className="gradient-btn"
                onClick={handleApplyVibe}
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <CheckCircle2 size={18} />
                <span>Show My {resultVibe} Trips</span>
              </button>

              <button
                id="reset-vibe-btn"
                className="secondary-btn"
                onClick={handleReset}
                style={{ padding: '14px 22px', fontSize: '0.95rem' }}
              >
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

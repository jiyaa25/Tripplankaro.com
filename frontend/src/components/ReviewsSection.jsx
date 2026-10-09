import React, { useState } from 'react';
import { Camera, Heart, MessageCircle, ExternalLink, Sparkles, Send, Gift, Award } from 'lucide-react';
import companyData from '../data/company.json';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function ReviewsSection() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Fallback direct link or Google Form
  const googleFormUrl = companyData.google_review_form || 'https://forms.gle/tripplankaro-reviews';

  return (
    <section id="reviews" style={{
      padding: '80px 0',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(255, 255, 255, 0.01)',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            color: 'var(--coral-primary)',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            <Sparkles size={16} />
            <span>Community & Real Experiences</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', marginBottom: '14px', lineHeight: 1.2 }}>
            Every Great Journey <span className="gradient-text">Begins With a Story</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            As a newly launched travel team born in Surat, we pour genuine care into crafting every trip. 
            Traveled with Tripplankaro recently? We’d love to hear your raw, unfiltered experience!
          </p>
        </div>

        {/* Authentic Launch State Card */}
        <div className="glass" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '40px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '32px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at top, rgba(255, 56, 92, 0.08) 0%, rgba(17, 24, 39, 0.75) 100%)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 56, 92, 0.15)',
            color: 'var(--coral-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <Camera size={30} />
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '10px' }}>
            Be Among Our First Travelers to Share Your Story 🌟
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            We do not believe in fake reviews or inflated ratings. Every story on Tripplankaro will come from authentic explorers who planned their holiday with us. Share your photos and honest feedback!
          </p>

          {/* Perks Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
                <Send size={16} color="var(--coral-primary)" />
                <span>100% Genuine Voices</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Your candid feedback directly guides upcoming squads on the best stays, cafes, and viewpoints.
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
                <Gift size={16} color="#10b981" />
                <span>Repeat Explorer Perk</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Submit your verified trip review to receive a special group upgrade voucher for your next getaway.
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
                <Award size={16} color="#f59e0b" />
                <span>Featured on our Feed</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Tag us or submit high-res holiday shots to get featured across our Instagram community.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="share-experience-btn"
              className="gradient-btn"
              style={{ padding: '14px 28px', textDecoration: 'none', fontSize: '0.96rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Camera size={18} />
              <span>Share Your Experience</span>
              <ExternalLink size={15} />
            </a>

            <a
              href={createWhatsAppLink('Hi Tripplankaro! 👋 I traveled with you recently and want to share my photos & feedback.')}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn"
              style={{ padding: '14px 24px', textDecoration: 'none', fontSize: '0.96rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageCircle size={18} color="#25D366" />
              <span>Send Feedback via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Note on Google Form */}
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Takes less than 60 seconds • Form responses are reviewed by our founding team in Surat.
        </div>
      </div>
    </section>
  );
}

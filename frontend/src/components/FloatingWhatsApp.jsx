import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const PHONE = '919023532824';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {/* Chat Bubble Tooltip */}
      {showTooltip && (
        <div style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          boxShadow: 'var(--shadow-md)',
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '220px',
          animation: 'slideUp 0.3s ease'
        }}>
          <span>Need help planning a trip? Chat with us! ✈️</span>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              flexShrink: 0
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Circle Button */}
      <a
        href={`https://wa.me/${PHONE}?text=Hey%20TripPlanKaro%20team!%20I%27m%20looking%20to%20plan%20a%20trip.%20Can%20you%20help%20me%20find%20the%20best%20itinerary%3F`}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="whatsapp-pulse"
        title="Chat on WhatsApp"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={30} />
      </a>
    </div>
  );
}

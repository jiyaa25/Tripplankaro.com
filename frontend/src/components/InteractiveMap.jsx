import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function InteractiveMap({
  center = [20.5937, 78.9629],
  zoom = 10,
  markers = [],
  title = 'Destination Map',
  height = '360px'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Cleanup previous map if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const lat = Number(center[0]) || 20.5937;
      const lng = Number(center[1]) || 78.9629;

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: zoom || 10,
        scrollWheelZoom: false
      });

      // Free OpenStreetMap CartoDB tiles (clean, modern travel style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      // Add markers
      const customPin = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
          background: #ff385c;
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        "><span style="transform: rotate(45deg); color: #fff; font-size: 13px; font-weight: bold;">📍</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });

      const boundsGroup = [];

      if (Array.isArray(markers) && markers.length > 0) {
        markers.forEach(m => {
          if (m.lat && m.lng) {
            const popupHtml = `
              <div style="font-family: inherit; padding: 4px;">
                <div style="font-weight: 800; color: #111827; font-size: 14px; margin-bottom: 2px;">${m.name}</div>
                ${m.type ? `<span style="background: rgba(255,56,92,0.12); color: #ff385c; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${m.type}</span>` : ''}
                ${m.desc ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #4b5563; line-height: 1.4;">${m.desc}</p>` : ''}
              </div>
            `;
            const marker = L.marker([m.lat, m.lng], { icon: customPin }).addTo(map);
            marker.bindPopup(popupHtml);
            boundsGroup.push([m.lat, m.lng]);
          }
        });

        if (boundsGroup.length > 1) {
          map.fitBounds(boundsGroup, { padding: [30, 30] });
        }
      }

      mapInstanceRef.current = map;
    } catch (err) {
      console.warn('Map initialization error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, markers, zoom]);

  return (
    <div style={{ width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: height, zIndex: 1 }} />
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '8px',
        background: 'rgba(0,0,0,0.7)',
        color: '#fff',
        fontSize: '0.72rem',
        padding: '3px 8px',
        borderRadius: '4px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        📍 {title} · OpenStreetMap
      </div>
    </div>
  );
}

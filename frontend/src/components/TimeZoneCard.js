import React from 'react';

const TimeZoneCard = ({ data, city, labels }) => {
  if (!data) return null;

  return (
    <div className="timezone-result glass-card"> {/* Added glass-card for styling consistency */}
      <h2 style={{ color: '#9575cd' }}>{city} 📍</h2>
      <div className="info-grid">
        <div className="info-item">
          <span>📅 {labels.tzDate}:</span>
          <strong>{data.datetime.split('T')[0]}</strong>
        </div>
        <div className="info-item">
          <span>⏰ {labels.tzTime}:</span>
          <strong>{data.datetime.split('T')[1].substring(0, 5)}</strong>
        </div>
        <div className="info-item">
          <span>🌍 {labels.tzZone}:</span>
          <small>{data.timezone}</small>
        </div>
      </div>
      <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>
        Offset: {data.utc_offset} 🕒
      </p>
    </div>
  );
};

export default TimeZoneCard;
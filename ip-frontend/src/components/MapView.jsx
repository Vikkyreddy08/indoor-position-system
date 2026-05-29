import React from 'react';

const MapView = ({ position, currentRoom }) => {
  const scale = 20; 

  const rooms = [
    { name: "Entrance", x: 2, y: 2, w: 4, h: 4, color: '#ecf0f1' },
    { name: "Conference Room", x: 8, y: 5, w: 6, h: 5, color: '#d5e6f2' },
    { name: "Laboratory", x: 15, y: 10, w: 5, h: 8, color: '#e8f6f3' },
    { name: "Office A", x: 5, y: 12, w: 4, h: 6, color: '#fef9e7' },
    { name: "Break Room", x: 12, y: 15, w: 6, h: 4, color: '#f4ecf7' }
  ];

  const containerStyle = {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid #edf2f7',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const mapAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    border: '2px solid #f1f5f9',
    borderRadius: '12px',
  };

  return (
    <div className="map-container" style={{ marginBottom: '30px' }}>
      <h3 style={{ textAlign: 'left', marginBottom: '15px', color: '#4a5568', fontSize: '1.1rem' }}>Live Floor Plan</h3>
      <div style={containerStyle}>
        <div style={mapAreaStyle}>
          {rooms.map((room) => (
            <div
              key={room.name}
              style={{
                position: 'absolute',
                left: `${(room.x / scale) * 100}%`,
                top: `${(room.y / scale) * 100}%`,
                width: `${(room.w / scale) * 100}%`,
                height: `${(room.h / scale) * 100}%`,
                backgroundColor: room.color,
                border: room.name === currentRoom ? '2px solid #3182ce' : '1px solid #cbd5e0',
                borderRadius: '8px',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: room.name === currentRoom ? '0 0 15px rgba(49, 130, 206, 0.2)' : 'none',
                zIndex: room.name === currentRoom ? 2 : 1
              }}
            >
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: room.name === currentRoom ? '700' : '500',
                color: room.name === currentRoom ? '#2c5282' : '#718096',
                textAlign: 'center',
                padding: '4px'
              }}>
                {room.name}
              </span>
            </div>
          ))}

          <div style={{
            position: 'absolute',
            left: `${(position.x / scale) * 100}%`,
            top: `${(position.y / scale) * 100}%`,
            width: '24px',
            height: '24px',
            backgroundColor: '#3182ce',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 0 0 4px rgba(49, 130, 206, 0.2), 0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
            <div className="ping" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid #3182ce',
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} />
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes ping {
            75%, 100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MapView;

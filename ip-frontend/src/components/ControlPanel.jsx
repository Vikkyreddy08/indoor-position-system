import React from 'react';

const ControlPanel = ({ onLocate, loading, currentRoom, error, autoRefresh, onToggleAutoRefresh }) => {
  const cardStyle = {
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #edf2f7',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const statusItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #f1f5f9'
  };

  return (
    <div className="control-panel" style={{ width: '100%' }}>
      <h3 style={{ textAlign: 'left', marginBottom: '15px', color: '#4a5568', fontSize: '1.1rem' }}>Dashboard</h3>
      
      <div style={cardStyle}>
        <div style={statusItemStyle}>
          <span style={{ color: '#718096', fontSize: '0.9rem' }}>Location Status</span>
          <span style={{ 
            color: loading ? '#ed8936' : '#48bb78', 
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: loading ? '#ed8936' : '#48bb78', 
              borderRadius: '50%',
              display: 'inline-block'
            }} />
            {loading ? 'Updating...' : 'Live'}
          </span>
        </div>

        <div style={statusItemStyle}>
          <span style={{ color: '#718096', fontSize: '0.9rem' }}>Active Room</span>
          <span style={{ color: '#2d3748', fontWeight: '700', fontSize: '1rem' }}>
            {currentRoom || 'Scanning...'}
          </span>
        </div>

        <button 
          onClick={onLocate} 
          disabled={loading}
          style={{
            padding: '14px',
            backgroundColor: loading ? '#e2e8f0' : '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(49, 130, 206, 0.3)',
            marginTop: '10px'
          }}
        >
          {loading ? 'Locating...' : 'Refresh Location'}
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 5px'
        }}>
          <label style={{ color: '#718096', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '20px',
              backgroundColor: autoRefresh ? '#48bb78' : '#cbd5e0',
              borderRadius: '20px',
              position: 'relative',
              transition: 'all 0.3s ease'
            }} onClick={onToggleAutoRefresh}>
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: autoRefresh ? '22px' : '2px',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }} />
            </div>
            Auto-update (2s)
          </label>
          
          {error && (
            <span style={{ color: '#e53e3e', fontSize: '0.8rem', fontWeight: '500' }}>
              Connection Error
            </span>
          )}
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        backgroundColor: '#ebf8ff', 
        borderRadius: '12px',
        border: '1px solid #bee3f8'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#2b6cb0' }}>Sensor Fusion Active</h4>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#4299e1', lineHeight: '1.4' }}>
          Combining WiFi RSSI, Bluetooth BLE, and Inertial measurement units for sub-meter accuracy.
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;

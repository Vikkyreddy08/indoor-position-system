import { useState, useEffect, useCallback } from 'react'
import MapView from './components/MapView'
import ControlPanel from './components/ControlPanel'
import { predictLocation } from './services/api'
import './App.css'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [room, setRoom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const getSimulatedSensorData = () => {
    return {
      wifi: [-60 + Math.random() * 10, -70 + Math.random() * 10, -80 + Math.random() * 10],
      bluetooth: [-50 + Math.random() * 5, -65 + Math.random() * 5],
      accelerometer: [0.1, 0.2, 9.8]
    }
  }

  const handleLocate = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const sensorData = getSimulatedSensorData()
      const result = await predictLocation(sensorData)
      setPosition({ x: result.x, y: result.y })
      setRoom(result.room)
    } catch (err) {
      setError('Failed to connect to positioning server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let interval
    if (autoRefresh) {
      handleLocate()
      interval = setInterval(() => {
        handleLocate()
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh, handleLocate])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Indoor Positioning System</h1>
        <p>Real-time Multi-Modal Hybrid Tracking</p>
      </header>

      <main className="app-content">
        <MapView position={position} currentRoom={room} />
        
        <ControlPanel 
          onLocate={handleLocate}
          loading={loading}
          currentRoom={room}
          error={error}
          autoRefresh={autoRefresh}
          onToggleAutoRefresh={() => setAutoRefresh(!autoRefresh)}
        />
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Hybrid Multi-Modal Indoor Positioning</p>
      </footer>
    </div>
  )
}

export default App

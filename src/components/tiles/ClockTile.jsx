import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ClockTile({ time: initialTime }) {
  const [showWorldClock, setShowWorldClock] = useState(false)
  const [now, setNow] = useState(new Date())
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (timeZone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now)
    } catch (e) {
      return '--:--:--'
    }
  }

  const CITIES = [
    { name: 'Ho Chi Minh', zone: 'Asia/Ho_Chi_Minh', label: 'Local' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', label: 'GMT+9' },
    { name: 'London', zone: 'Europe/London', label: 'GMT+1' },
    { name: 'New York', zone: 'America/New_York', label: 'GMT-4' }
  ]

  const handleToggle = (targetState) => {
    setShowWorldClock(targetState)
  }

  useEffect(() => {
    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current)
      // Instantly trigger a gorgeous jelly-like rubber stretch growing down
      gsap.fromTo(cardRef.current, 
        { scaleY: 0.88, scaleX: 0.96, opacity: 0.7, transformOrigin: 'top center' },
        { 
          scaleY: 1, 
          scaleX: 1,
          opacity: 1, 
          duration: 0.6, 
          ease: 'elastic.out(1.2, 0.65)'
        }
      )
    }
  }, [showWorldClock])

  if (showWorldClock) {
    return (
      <div 
        ref={cardRef}
        className="tile tile-clock" 
        data-i="1" 
        onClick={() => handleToggle(false)}
        style={{ cursor: 'pointer' }}
      >
        <div className="inner" style={{ gap: '8px', display: 'flex', flexDirection: 'column' }}>
          <div className="clock-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="lbl" style={{ margin: 0 }}>world clock</div>
            <span className="live-status-pill" style={{ padding: '2px 8px', fontSize: '9px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              Back ↩
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '4px' }}>
            {CITIES.map(city => (
              <div 
                className="lang-row" 
                key={city.name} 
                style={{ 
                  margin: 0, 
                  padding: '6px 12px', 
                  borderRadius: '10px',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div className="lang-left" style={{ gap: '6px' }}>
                  <span className="lang-name" style={{ fontSize: '11.5px', fontWeight: '700' }}>{city.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontFamily: "'Press Start 2P', monospace", 
                    fontSize: '9.5px', 
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em'
                  }}>
                    {formatTime(city.zone)}
                  </span>
                  <span className="lang-lvl" style={{ fontSize: '9px', opacity: 0.6 }}>{city.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={cardRef}
      className="tile tile-clock" 
      data-i="1" 
      onClick={() => handleToggle(true)}
      style={{ cursor: 'pointer' }}
      title="Click to reveal World Clock!"
    >
      <div className="inner" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
        <div className="lbl" style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span>local time</span>
          <span style={{ fontSize: '9.5px', color: 'var(--text3)', opacity: 0.8, fontWeight: 700 }}>Click to Expand 🌐</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '4px 0 2px 0' }}>
          <div className="clock" style={{ margin: 0 }}>{initialTime}</div>
          <span className="live-status-pill" style={{ padding: '3px 10px', fontSize: '9.5px', display: 'inline-flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
            LIVE
          </span>
        </div>
        <div className="clock-tz" style={{ margin: 0 }}>Ho Chi Minh City · GMT+7</div>
      </div>
    </div>
  )
}

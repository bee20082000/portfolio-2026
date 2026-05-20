export default function PanasonicTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('panasonic')}
      style={{ cursor: 'pointer', minHeight: '260px', position: 'relative', overflow: 'hidden', background: '#0d0d0d' }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.35
      }} />
      {/* Orange top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#ff5c2b' }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(255,92,43,0.08) 0%, rgba(0,0,0,0.85) 100%)'
      }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff5c2b' }}>IOT UX/UI Case Study</div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>Panasonic Smart Home</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Redefining IoT interactions — designing an intuitive ecosystem dashboard.</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ff5c2b' }}>98%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>SATISFACTION</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ff5c2b' }}>-35%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>SETUP TIME</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px', letterSpacing: '0.06em' }}>Read case study →</div>
      </div>
    </div>
  )
}

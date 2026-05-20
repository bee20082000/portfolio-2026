export default function HondaMobilityTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('honda_mobility')}
      style={{ cursor: 'pointer', minHeight: '280px', position: 'relative', overflow: 'hidden', background: '#00070d' }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18
      }} />
      {/* Cyan HUD glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0,178,254,0.15) 0%, transparent 70%), linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)'
      }} />
      {/* HUD grid lines decoration */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.06 }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${20 + i * 22}%`, height: '1px', background: '#00b2fe' }} />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${10 + i * 16}%`, width: '1px', background: '#00b2fe' }} />
        ))}
      </div>
      {/* Safety index arc */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', textAlign: 'right' }}>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#00b2fe', lineHeight: 1 }}>96%</div>
        <div style={{ fontSize: '9px', color: 'rgba(0,178,254,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>HMI Safety</div>
      </div>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00b2fe' }}>Autonomous UI Design</div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Honda Future<br/>Mobility</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Designing the HMI dashboard for next-gen autonomous urban commuter vehicles.</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#00b2fe' }}>-40%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>VISUAL LOAD</div>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#00b2fe' }}>99%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>COMFORT INDEX</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(0,178,254,0.35)', letterSpacing: '0.06em' }}>Read case study →</div>
      </div>
    </div>
  )
}

export default function UrbanFramesTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('urban_frames')}
      style={{ cursor: 'pointer', minHeight: '260px', position: 'relative', overflow: 'hidden', background: '#080808' }}
    >
      {/* Full bleed B&W photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'grayscale(100%)',
        opacity: 0.55
      }} />
      {/* Dark gradient bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.88) 100%)'
      }} />
      {/* White corner accent line */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '2px', background: 'rgba(255,255,255,0.6)' }} />
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '2px', height: '30px', background: 'rgba(255,255,255,0.6)' }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Visual Curation</div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Urban Frames<br/>Exhibition</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Curating a geometric B&amp;W photography exhibition mapping urban light and shadows.</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#e2e8f0' }}>25k+</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>VISITORS</div>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#e2e8f0' }}>100%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>ANALOGUE</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>Read case study →</div>
      </div>
    </div>
  )
}

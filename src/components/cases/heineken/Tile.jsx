export default function HeinekenTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('heineken')}
      style={{ cursor: 'pointer', minHeight: '280px', position: 'relative', overflow: 'hidden', background: '#030f07' }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.25
      }} />
      {/* Neon green glow vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(0,200,150,0.18) 0%, transparent 65%), linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)'
      }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#030f07', background: '#00c896', padding: '3px 8px', borderRadius: '4px' }}>Brand &amp; Digital</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Heineken<br/>Green Energy</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>Gamified sustainability campaign across three SEA markets.</div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '6px', paddingTop: '14px', borderTop: '1px solid rgba(0,200,150,0.2)' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#00c896', fontVariantNumeric: 'tabular-nums' }}>+45%</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>ENGAGEMENT</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#00c896' }}>2.4M</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>VISITORS</div>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(0,200,150,0.5)', letterSpacing: '0.06em' }}>Read case study →</div>
        </div>
      </div>
    </div>
  )
}

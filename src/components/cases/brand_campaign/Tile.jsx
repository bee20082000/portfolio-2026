export default function BrandCampaignTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('brand_campaign')}
      style={{ cursor: 'pointer', minHeight: '270px', position: 'relative', overflow: 'hidden', background: '#0d0005' }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.3
      }} />
      {/* Red saturated gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,33,86,0.25) 0%, rgba(10,0,5,0.9) 70%)'
      }} />
      {/* Large bold title as design element */}
      <div style={{
        position: 'absolute', top: '-10px', right: '-8px',
        fontSize: '90px', fontWeight: 900, color: 'rgba(255,33,86,0.07)',
        lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none'
      }}>NIKE</div>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff2156' }}>Creative Campaign</div>
        <div style={{ fontSize: '21px', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Nike Streetwise<br/>Campaign</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Hyper-localized digital campaign bridging street sports & Vietnamese youth identity.</div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff2156' }}>+62%</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>GEN-Z AFFINITY</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff2156' }}>10M+</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>VIEWS</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,33,86,0.4)', letterSpacing: '0.06em' }}>Read case study →</div>
      </div>
    </div>
  )
}

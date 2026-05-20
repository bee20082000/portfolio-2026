export default function PepsicoTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('pepsico')}
      style={{ cursor: 'pointer', minHeight: '290px', position: 'relative', overflow: 'hidden', background: '#000d1a' }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2
      }} />
      {/* Blue gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,75,147,0.35) 0%, rgba(0,20,60,0.9) 100%)'
      }} />
      {/* Bold diagonal accent stripe */}
      <div style={{
        position: 'absolute', top: 0, right: '30px',
        width: '4px', height: '100%',
        background: 'linear-gradient(180deg, #004b93 0%, transparent 100%)',
        opacity: 0.6
      }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4d9fff' }}>Campaign Design</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>2023</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>3M+</div>
          <div style={{ fontSize: '11px', color: 'rgba(77,159,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Social Reach</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '10px' }}>PepsiCo Refresh</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Activating Gen-Z summer vibes through high-energy dynamic visual identity.</div>
          <div style={{ fontSize: '11px', color: 'rgba(77,159,255,0.4)', letterSpacing: '0.06em', marginTop: '6px' }}>Read case study →</div>
        </div>
      </div>
    </div>
  )
}

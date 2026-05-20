export default function SpotifyRemixTile({ onSelect, index }) {
  return (
    <div
      className="tile tile-case"
      data-i={index}
      onClick={() => onSelect('spotify_remix')}
      style={{ cursor: 'pointer', minHeight: '260px', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}
    >
      {/* Spotify green background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 80%, rgba(29,185,84,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(29,185,84,0.08) 0%, transparent 60%)'
      }} />
      {/* Faint background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1614680376593-902f74fa0d41?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.12
      }} />
      {/* Equalizer bar decoration */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', alignItems: 'flex-end', gap: '3px', opacity: 0.3 }}>
        {[18, 28, 14, 32, 22, 12, 26].map((h, i) => (
          <div key={i} style={{ width: '3px', height: `${h}px`, background: '#1db954', borderRadius: '2px' }} />
        ))}
      </div>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1db954"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.65c-.2.2-.51.2-.71 0-1.79-1.77-4.39-2.16-6.8-1.29-.28.11-.59-.02-.7-.3-.11-.28.02-.59.3-.7 2.77-1 5.8-.56 7.92 1.57.18.2.18.52-.01.72zm1.23-2.82c-.25.25-.65.25-.9 0-2.05-2.05-5.16-2.65-7.58-1.45-.33.16-.73.02-.89-.31-.16-.33-.02-.73.31-.89 2.8-1.35 6.29-.68 8.65 1.68.25.25.25.65 0 .9zm.1-2.93c-.06.06-.14.09-.22.09-.09 0-.17-.03-.24-.09-2.38-2.38-6.09-3.07-9.04-1.72-.36.17-.79.01-.96-.35-.17-.36-.01-.79.35-.96 3.39-1.55 7.62-.77 10.38 2 .13.13.13.34-.27.47.03z"/></svg>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1db954' }}>Mobile UX/UI Case Study</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Spotify Remix Studio</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Empowering users to co-create, remix, and share music vibes in real-time.</div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#1db954' }}>+55%</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>SOCIAL SHARING</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#1db954' }}>4.2M</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>REMIXERS</div>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(29,185,84,0.4)', letterSpacing: '0.06em', marginTop: '4px' }}>Read case study →</div>
        </div>
      </div>
    </div>
  )
}

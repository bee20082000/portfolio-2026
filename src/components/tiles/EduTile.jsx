export default function EduTile() {
  return (
    <div className="tile tile-edu" data-i="3">
      <div className="inner">
        <div className="lbl">education</div>
        <div className="lang-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '10px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
            <span className="lang-name" style={{ display: 'block', fontSize: '14.5px', fontWeight: '800' }}>Marketing</span>
            <span className="body" style={{ fontSize: '11px', color: 'var(--text3)', margin: 0, padding: 0, lineHeight: '1.25', fontWeight: '600' }}>
              University of Economics<br />Ho Chi Minh City
            </span>
          </div>
          <span className="lang-lvl" style={{ flexShrink: 0, alignSelf: 'center', marginLeft: '12px' }}>2018–2021</span>
        </div>
      </div>
    </div>
  )
}

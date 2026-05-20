export default function PhotosTile({ onSelect }) {
  return (
    <div className="tile tile-photos" data-i="12" onClick={() => onSelect && onSelect('photos')} style={{ cursor: 'pointer' }}>
      <div className="inner">
        <div className="lbl">creative side</div>
        <div className="pgrid">
          <div className="pc p1">📸</div>
          <div className="pc p2">🎬</div>
          <div className="pc p3">🎨</div>
          <div className="pc p4">☕</div>
        </div>
      </div>
    </div>
  )
}

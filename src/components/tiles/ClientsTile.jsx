export default function ClientsTile({ onSelect }) {
  return (
    <div className="tile tile-clients c2" data-i="8" onClick={() => onSelect && onSelect('clients')}>
      <div className="inner">
        <div className="lbl">notable clients</div>
        <div className="client-grid-horizontal">
          {['Panasonic', 'Heineken', 'Tường An', 'Carlsberg', 'Mondelez', 'Lipton', 'Akzo Nobel'].map(c => (
            <span className="client-item" key={c}>{c}</span>
          ))}
        </div>
        <div className="view-more-badge badge-inline">
          <span>+2 more clients</span>
          <span className="arrow-icon">↗</span>
        </div>
      </div>
    </div>
  )
}

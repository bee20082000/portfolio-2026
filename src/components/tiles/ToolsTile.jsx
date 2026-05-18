export default function ToolsTile({ onSelect }) {

  // Standard JS comment here is perfectly safe! 
  // Changed from 'r2' / 'c2r2' to just 'c2' to make the box half the height.
  return (
    <div className="tile tile-tools c2" data-i="7" onClick={() => onSelect && onSelect('tools')}>
      <div className="inner">
        <div className="lbl">tools</div>

        <div className="tool-list-grid">
          {['Figma', 'Adobe CC', 'Balsamiq', 'HTML/CSS/JS', 'Principle', 'Prototyping'].map((n) => (
            <div className="tool-grid-item" key={n}>{n}</div>
          ))}
        </div>

        <div className="view-more-badge badge-inline">
          <span>+2 more tools</span>
          <span className="arrow-icon">↗</span>
        </div>
      </div>
    </div>
  )
}
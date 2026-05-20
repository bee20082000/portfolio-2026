export default function Marquee() {
  const items = [
    'UX/UI Design','Creative Strategy','Market Research','Campaign Execution',
    'Graphic Design','Photography','Filmmaking','Branding',
  ]
  
  // Double-rendered list to guarantee high screen coverage
  const list = [...items, ...items, ...items, ...items]

  return (
    <div className="marquee-footer">
      <div className="marquee-footer-track">
        {list.map((s, i) => (
          <span className="mqi" key={i}><em>✦</em>{s}</span>
        ))}
        {list.map((s, i) => (
          <span className="mqi" key={`dup-${i}`}><em>✦</em>{s}</span>
        ))}
      </div>
    </div>
  )
}

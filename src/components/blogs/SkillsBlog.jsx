export default function SkillsBlog({ data }) {
  const tools = [
    'Figma', 'Adobe CC', 'Balsamiq', 'HTML/CSS/JS', 'Principle', 'Prototyping', 'Git', 'React', 'GSAP', 'Lenis Scroll'
  ];

  return (
    <>
      {/* Cover / stacked header */}
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')` }}></div>
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: data.accent }}>{data.category}</div>
          <h1>{data.title}</h1>
          <p className="blog-cover-desc">{data.subtitle}</p>
          
          <div className="blog-meta-grid">
            {[
              ['Focus Area', data.client],
              ['My Approach', data.role],
              ['Quality Standard', data.timeline],
              ['Deliverables', data.services]
            ].map(([l, v]) => (
              <div key={l} className="blog-meta-item">
                <div className="blog-meta-lbl">{l}</div>
                <div className="blog-meta-val">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 01: Typographic Architecture */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">01</div>
        <h2>Typographic Architecture & Layout</h2>
        <p>{data.challenge}</p>
        <p>{data.strategy1}</p>
      </div>

      {/* Section 02: Tools of the Trade */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">02</div>
        <h2>Tools of the Trade</h2>
        <p>A modern selection of visual design, prototyping, and frontend software engineered to translate rapid mockups into pixel-perfect web and mobile experiences.</p>
        
        {/* Infinite Auto-Scrolling Tools Box */}
        <div className="auto-scroll-marquee">
          <div className="auto-scroll-track">
            {/* Render tools twice to ensure loop is completely seamless */}
            {[...tools, ...tools].map((t, i) => (
              <span className="marquee-item" key={i} style={{ borderLeftColor: data.accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 03: Modular Layout Standards */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">03</div>
        <h2>Modular Layout Standards</h2>
        <p>{data.strategy2}</p>
        <div className="blog-quote" style={{ borderLeftColor: data.accent, color: data.accent }}>
          "{data.quote}"
          <span>— {data.quoteSrc}</span>
        </div>
        <p>{data.solutionDesc}</p>
      </div>

      {/* Section 04: Metrics */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">04</div>
        <h2>Execution & Impact</h2>
        <p>{data.solution}</p>
        <div className="blog-metrics-grid">
          {data.metrics.map(m => (
            <div className="blog-metric" key={m.lbl}>
              <span className="blog-metric-val" style={{ color: data.accent }}>{m.val}</span>
              <span className="blog-metric-lbl">{m.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

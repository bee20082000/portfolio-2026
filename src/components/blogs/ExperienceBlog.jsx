export default function ExperienceBlog({ data }) {
  const filmProjects = [
    { name: 'iTVC', role: 'Director · 2020' },
    { name: 'BELL Short Film', role: 'Writer · 2019' },
    { name: 'Just Dream MV', role: 'Production · 2018' }
  ];

  const notableClients = [
    'Panasonic', 'Heineken', 'Tường An', 'Carlsberg', 'Mondelez', 'Lipton', 'Akzo Nobel', 'DDB', 'Ipsos'
  ];

  return (
    <>
      {/* Cover Slide / stacked header */}
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')` }}></div>
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: data.accent }}>{data.category}</div>
          <h1>{data.title}</h1>
          <p className="blog-cover-desc">{data.subtitle}</p>

          <div className="blog-meta-grid">
            {[
              ['Practice', data.client],
              ['My Core Role', data.role],
              ['Timeline', data.timeline],
              ['Methods', data.services]
            ].map(([l, v]) => (
              <div key={l} className="blog-meta-item">
                <div className="blog-meta-lbl">{l}</div>
                <div className="blog-meta-val">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 01: Foundational Philosophy */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">01</div>
        <h2>Foundational Philosophy</h2>
        <p>{data.challenge}</p>
        <p>{data.strategy1}</p>
      </div>

      {/* Section 02: Film Projects */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">02</div>
        <h2>Film Projects</h2>
        <p>A collection of creative storytelling work, bringing narrative direction and production standard into modern brand expression.</p>

        {/* Custom styled list box for film projects */}
        <div style={{
          background: 'var(--bg2)',
          border: 'var(--border)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '12px'
        }}>
          {filmProjects.map(f => (
            <div key={f.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '12px',
              borderBottom: 'var(--border)',
              lastChild: { borderBottom: 'none' }
            }} className="film-row-item">
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: data.accent,
                display: 'inline-block'
              }}></span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text)' }}>{f.name}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text3)', fontWeight: 600 }}>{f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 03: Notable Clients */}
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">03</div>
        <h2>Notable Clients</h2>
        <p>Proudly collaborated with leading global consumer brands, delivering award-winning digital experiences, products, and campaign strategies.</p>

        {/* Premium Horizontal Auto-Scrolling Box */}
        <div className="auto-scroll-marquee">
          <div className="auto-scroll-track">
            {/* Render items twice for infinite marquee effect loop */}
            {[...notableClients, ...notableClients].map((c, i) => (
              <span className="marquee-item" key={i} style={{ borderLeftColor: data.accent }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 04: Key Metrics */}
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

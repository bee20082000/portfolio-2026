export default function HeroBlog({ data }) {
  return (
    <>
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')` }}></div>
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: data.accent }}>{data.category}</div>
          <h1>{data.title}</h1>
          <p className="blog-cover-desc">{data.subtitle}</p>
          
          <div className="blog-meta-grid">
            {[
              ['Focus Area', data.client],
              ['Design Role', data.role],
              ['Current Status', data.timeline],
              ['My Services', data.services]
            ].map(([l, v]) => (
              <div key={l} className="blog-meta-item">
                <div className="blog-meta-lbl">{l}</div>
                <div className="blog-meta-val">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">01</div>
        <h2>Unifying Data & Aesthetics</h2>
        <p>{data.challenge}</p>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">02</div>
        <h2>Visual Alignment</h2>
        <p>{data.strategy1}</p>
        <div className="blog-quote" style={{ borderLeftColor: data.accent, color: data.accent }}>
          "{data.quote}"
          <span>— {data.quoteSrc}</span>
        </div>
        <p>{data.strategy2}</p>
      </div>

      <div className="blog-slide blog-design-slide">
        <div className="blog-slide-num">03</div>
        <h2>Motion Physics & Tokens</h2>
        <p>{data.solutionDesc}</p>
        <div className="blog-imgs-row">
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[1]}')` }}></div>
            <div className="blog-img-cap">Figma Visual Token Mapping</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }}></div>
            <div className="blog-img-cap">GSAP Motion Spring States</div>
          </div>
        </div>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">04</div>
        <h2>Core Standards</h2>
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

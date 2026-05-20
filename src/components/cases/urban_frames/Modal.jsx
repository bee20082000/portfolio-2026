const data = {
  title: 'Urban Frames Exhibition',
  category: 'Visual Curation & Identity',
  client: 'HCMC Photography Club',
  role: 'Creative Director',
  timeline: '2 Months · 2023',
  services: 'Brand Identity, Spatial Design, Digital Gallery',
  subtitle: 'Curating a geometric B&W photography exhibition mapping light and shadows of urban landscapes.',
  challenge: 'How do we translate physical, structural photography into a digital gallery that feels as tactile and spatial as a physical gallery?',
  strategy1: 'We organized photo structures by geographic margins. The digital portal mimics walking down HCMC streets, fading elements in and out based on user position.',
  quote: 'The street is my sandbox of layout grids. Shadows are the borders.',
  quoteSrc: 'Composition Rulebook',
  strategy2: 'We created an asymmetric 3D image grid that tilts based on mouse coordinates, matching the physical depth of camera lenses.',
  solutionDesc: 'A minimalist monochrome aesthetic combining high-contrast frames and beautiful, bold type scaling.',
  solution: 'Successfully launched both virtual and physical galleries, attracting over 25,000 unique visitors in under three weeks.',
  metrics: [{ val: '25k+', lbl: 'Gallery Visitors' }, { val: '100%', lbl: 'Analogue Focus' }, { val: '98%', lbl: 'Creative Affinity' }],
  images: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#e2e8f0',
}

export default function UrbanFramesModal() {
  return (
    <>
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')`, filter: 'grayscale(60%)' }} />
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: data.accent }}>{data.category}</div>
          <h1>{data.title}</h1>
          <p className="blog-cover-desc">{data.subtitle}</p>
          <div className="blog-meta-grid">
            {[['Client', data.client], ['My Role', data.role], ['Timeline', data.timeline], ['Scope', data.services]].map(([l, v]) => (
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
        <h2>The Challenge</h2>
        <p>{data.challenge}</p>
      </div>
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">02</div>
        <h2>Strategy &amp; Research</h2>
        <p>{data.strategy1}</p>
        <div className="blog-quote" style={{ borderLeftColor: data.accent, color: data.accent }}>
          "{data.quote}"
          <span>— {data.quoteSrc}</span>
        </div>
        <p>{data.strategy2}</p>
      </div>
      <div className="blog-slide blog-design-slide">
        <div className="blog-slide-num">03</div>
        <h2>Exhibition Design</h2>
        <p>{data.solutionDesc}</p>
        <div className="blog-imgs-row">
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[1]}')`, filter: 'grayscale(80%)' }} />
            <div className="blog-img-cap">{data.title} · Urban geometry</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')`, filter: 'grayscale(80%)' }} />
            <div className="blog-img-cap">{data.title} · Light & shadow</div>
          </div>
        </div>
      </div>
      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">04</div>
        <h2>Impact</h2>
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

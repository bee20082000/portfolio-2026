const data = {
  title: 'Honda Future Mobility',
  category: 'Autonomous UI Design Case Study',
  client: 'Honda R&D Asia',
  role: 'UX Researcher & Concept Designer',
  timeline: '5 Months · 2024',
  services: 'HMI Design, Gesture Control, Simulators',
  subtitle: 'Designing the dashboard HMI interface for next-gen autonomous urban commuter concept vehicles.',
  challenge: 'Creating an intuitive gesture and voice-controlled head-up-display (HUD) interface that guarantees driver safety and comfort while shifting between manual and autonomous modes.',
  strategy1: 'We ran simulation studies with 40 drivers in real-time rigs. We mapped natural ocular focus points and simplified the visual layers of navigation alerts.',
  quote: 'Technology should serve human focus, not distract it during high-speed decisions.',
  quoteSrc: 'Honda Lead Safety Engineer',
  strategy2: 'Designed a gesture-recognition steering wheel layout, using a clean curved widget panel displaying essential travel and environment diagnostics.',
  solutionDesc: 'A premium HUD concept combining high-contrast neon cyan indicators and fluid, light-based screen alerts.',
  solution: 'Approved by global R&D teams. Achieved a perfect 96% HMI safety index rating with a significant 40% reduction in visual load.',
  metrics: [{ val: '96%', lbl: 'HMI Safety Index' }, { val: '-40%', lbl: 'Visual Load' }, { val: '99%', lbl: 'Comfort Index' }],
  images: [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#00b2fe',
}

export default function HondaMobilityModal() {
  return (
    <>
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')` }} />
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
        <h2>HMI Design</h2>
        <p>{data.solutionDesc}</p>
        <div className="blog-imgs-row">
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[1]}')` }} />
            <div className="blog-img-cap">{data.title} · HUD interface</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Gesture control</div>
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

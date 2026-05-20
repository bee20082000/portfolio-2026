const data = {
  title: 'Panasonic Smart Home',
  category: 'IOT UX/UI Case Study',
  client: 'Panasonic Việt Nam',
  role: 'UX/UI Lead & Researcher',
  timeline: '4 Months · 2024',
  services: 'Context-Aware UI, Usability Labs, Design Tokens',
  subtitle: 'Redefining IoT interactions — designing an intuitive, accessible ecosystem dashboard for control and intelligence.',
  challenge: 'How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to seniors.',
  strategy1: 'We conducted 15 in-depth user interviews and observed how families interact with their homes. Users don\'t think about "devices"; they think about "moods" — Good Morning, Leaving Home, Movie Night.',
  quote: 'I don\'t want to adjust 10 different lights. I just want the living room to feel cozy for dinner.',
  quoteSrc: 'Interview Subject, Mother of two',
  strategy2: 'This insight led to a "Context-First" UI framework — a dashboard around atmosphere presets, with device controls layered one tap below.',
  solutionDesc: 'We established a warm glassmorphic design system blending digital tools into the physical warmth of modern interior styling.',
  solution: 'Deployed across premium smart apartments. Usability testing showed a 35% reduction in setup time and 98% user satisfaction.',
  metrics: [{ val: '98%', lbl: 'Satisfaction Rate' }, { val: '-35%', lbl: 'Setup Friction' }, { val: '+50%', lbl: 'Daily Active Use' }],
  images: [
    'https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#ff5c2b',
}

export default function PanasonicModal() {
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
        <h2>High-Fidelity Design</h2>
        <p>{data.solutionDesc}</p>
        <div className="blog-imgs-row">
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[1]}')` }} />
            <div className="blog-img-cap">{data.title} · UX workflow</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Interface iteration</div>
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

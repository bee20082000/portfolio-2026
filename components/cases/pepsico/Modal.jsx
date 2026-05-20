const data = {
  title: 'PepsiCo Refresh Campaign',
  category: 'Integrated Campaign Design',
  client: 'PepsiCo Việt Nam',
  role: 'Lead Visual Designer',
  timeline: '2 Months · 2023',
  services: 'Visual Direction, Social Content, Interactive Web',
  subtitle: 'Activating Gen-Z summer vibes through a vibrant, high-energy dynamic visual identity.',
  challenge: 'PepsiCo wanted to stand out in the crowded summer beverage market with a campaign that felt raw, energetic, and digital-first for Gen-Z.',
  strategy1: 'We focused on high-contrast colors, dynamic typography, and bold interactive web animations that feel alive and responsive.',
  quote: 'Design that does not move is design that does not exist for the new generation.',
  quoteSrc: 'PepsiCo Creative Lead',
  strategy2: 'We established a bold grid structure with interactive visual cards and fluid, liquid-smooth animations that elevate engagement.',
  solutionDesc: 'A premium grid layout showcasing energetic summer packaging and digital campaign assets.',
  solution: 'Achieved 3M+ active social media impressions and 95% positive feedback from Gen-Z audience testing.',
  metrics: [{ val: '+95%', lbl: 'Gen-Z Resonance' }, { val: '3M+', lbl: 'Social Reach' }, { val: '+24%', lbl: 'Sales Lift' }],
  images: [
    'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527960656366-ee2a999e3286?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#004b93',
}

export default function PepsicoModal() {
  return (
    <>
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-img" style={{ backgroundImage: `url('${data.images[0]}')` }} />
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: '#4d9fff' }}>{data.category}</div>
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
        <div className="blog-quote" style={{ borderLeftColor: '#4d9fff', color: '#4d9fff' }}>
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
            <div className="blog-img-cap">{data.title} · Merchant screen</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Prototyping flow</div>
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
              <span className="blog-metric-val" style={{ color: '#4d9fff' }}>{m.val}</span>
              <span className="blog-metric-lbl">{m.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

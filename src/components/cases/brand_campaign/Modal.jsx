const data = {
  title: 'Nike Streetwise Campaign',
  category: 'Creative Campaign Design',
  client: 'Nike Việt Nam',
  role: 'Creative Art Director',
  timeline: '3 Months · 2024',
  services: 'Visual Direction, Social Strategy, Storytelling',
  subtitle: 'Bridging street sports and local Vietnamese youth identity through a hyper-localized digital campaign.',
  challenge: 'Nike needed to build deep brand resonance with Gen-Z in Vietnam by celebrating local street sports culture in a way that feels organic and authentic rather than corporate.',
  strategy1: 'We embedded within local street skateboarding, football, and hip-hop communities, using raw photo snapshots and active street typography instead of studio mockups.',
  quote: 'Youth is not a demographic, it\'s an uncontainable movement of local expression.',
  quoteSrc: 'Nike Street Campaign Director',
  strategy2: 'We built a social-native campaign centered around user-submitted videos, showcasing dynamic local sport routines wrapped in bold brand assets.',
  solutionDesc: 'An extremely dynamic, saturated campaign system leveraging neon accents, raw street textures, and high-energy motion design.',
  solution: 'Generated massive online engagement with over 10M views and a massive 62% increase in regional brand affinity among Gen-Z.',
  metrics: [{ val: '+62%', lbl: 'Gen-Z Affinity' }, { val: '10M+', lbl: 'Campaign Views' }, { val: '+30%', lbl: 'Social Sharing' }],
  images: [
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#ff2156',
}

export default function BrandCampaignModal() {
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
        <h2>Campaign Design</h2>
        <p>{data.solutionDesc}</p>
        <div className="blog-imgs-row">
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[1]}')` }} />
            <div className="blog-img-cap">{data.title} · Street culture</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Youth movement</div>
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

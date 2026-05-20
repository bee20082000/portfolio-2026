const data = {
  title: 'Heineken Green Energy',
  category: 'Brand & Digital Strategy',
  client: 'Heineken Việt Nam',
  role: 'Creative Strategy & UX Lead',
  timeline: '3 Months · 2023',
  services: 'Concept Ideation, WebGL Experience, Copywriting',
  subtitle: 'Creating awareness for Heineken\'s sustainability via a gamified immersive web experience.',
  challenge: 'How do we make environmental sustainability engaging for young consumers? Heineken needed a high-impact, gamified campaign that felt social-first.',
  strategy1: 'Gen-Z and Millennials care deeply about sustainability but feel disconnected from corporate jargon. We gamified the ecological process, translating gigawatt-hours into relatable metaphors.',
  quote: 'Make it a game, make it fast, and show me the actual positive impact in a fun way.',
  quoteSrc: 'Gen-Z Focus Group Participant',
  strategy2: 'We designed a WebGL virtual wind-farm simulator where users cooperated to power a virtual brewery — every "green pint" contributed to Heineken\'s real carbon offset commitment.',
  solutionDesc: 'A vibrant neon green interface combined with fluid, springy physics created a rewarding gamified loop.',
  solution: 'Launched across three SEA markets achieving 2M+ unique visitors and a 45% lift in average brand engagement time.',
  metrics: [{ val: '+45%', lbl: 'Engagement Time' }, { val: '2.4M', lbl: 'Unique Visitors' }, { val: '+18%', lbl: 'Brand Affinity' }],
  images: [
    'https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#00c896',
}

export default function HeinekenModal() {
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
            <div className="blog-img-cap">{data.title} · Campaign mock</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Interactive design</div>
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

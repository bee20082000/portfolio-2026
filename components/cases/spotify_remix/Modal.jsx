const data = {
  title: 'Spotify Remix Studio',
  category: 'Mobile App UX/UI Case Study',
  client: 'Spotify Technology',
  role: 'Lead Product Designer',
  timeline: '3 Months · 2024',
  services: 'User Journeys, Prototyping, Motion Systems',
  subtitle: 'Empowering users to co-create, remix, and share their music vibes in real-time.',
  challenge: 'How do we make music listening a collaborative social experience without adding feature bloat? The client wanted a seamless, high-engagement feature allowing music lovers to group-mix playlists on the fly.',
  strategy1: 'We conducted research showing young listeners crave real-time dynamic co-creation. We designed a simplified cross-fade interface and soundbeat matching.',
  quote: 'Music is best when shared, and mixing should feel like play.',
  quoteSrc: 'Gen-Z Co-creation Study',
  strategy2: 'The resulting interface enables immediate springy physical slider manipulation to shift track balances on a shared audio canvas.',
  solutionDesc: 'A clean, dark interface featuring neon green fluid widgets, spring physics, and zero-friction audio overlays.',
  solution: 'Tested with 1,200 active playlist remixers. Interaction rates soared by 55%, with an average 18 minutes spent per session.',
  metrics: [{ val: '+55%', lbl: 'Social Sharing' }, { val: '4.2M', lbl: 'Remixers' }, { val: '96%', lbl: 'Ease of Use' }],
  images: [
    'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
  ],
  accent: '#1db954',
}

export default function SpotifyRemixModal() {
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
            <div className="blog-img-cap">{data.title} · Interface design</div>
          </div>
          <div className="blog-img-card">
            <div className="blog-img-mock" style={{ backgroundImage: `url('${data.images[2]}')` }} />
            <div className="blog-img-cap">{data.title} · Remix flow</div>
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

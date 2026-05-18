const scrollingImages = [
  '/asset/images/Tuong an/21 context/2 Hạ băng tình iu.jpg',
  '/asset/images/Tuong an/21 context/21 Phung tai loc.jpg',
  '/asset/images/Tuong an/21 context/3 Giang gia dinh.jpg',
  '/asset/images/Tuong an/21 context/4 Tuyet tai loc.jpg',
  '/asset/images/Tuong an/21 context/5 Hien su nghie[.jpg',
  '/asset/images/Tuong an/21 context/6 Hien suc khoe.jpg',
  '/asset/images/Tuong an/21 context/7 Phuong tai loc.jpg',
  '/asset/images/Tuong an/21 context/8 rita gia dinh.jpg',
  '/asset/images/Tuong an/21 context/9 Huyen su nghiep.jpg'
]

export default function TuonganBlog({ data }) {
  return (
    <>
      <div className="blog-slide blog-cover-slide">
        <div className="blog-cover-info">
          <div className="case-cat" style={{ color: data.accent }}>{data.category}</div>
          <h1>{data.title}</h1>
          <p className="blog-cover-desc">{data.subtitle}</p>

          <div className="blog-meta-grid">
            {[
              ['Client', data.client],
              ['My Role', data.role],
              ['Timeline', data.timeline],
              ['Scope', data.services]
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
        <h2>The Challenge</h2>
        <p>{data.challenge}</p>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">02</div>
        <h2>Strategy & Cultural Insight</h2>
        <p>{data.strategy1}</p>
        <div className="blog-quote" style={{ borderLeftColor: data.accent, color: data.accent }}>
          "{data.quote}"
          <span>— {data.quoteSrc}</span>
        </div>
        <p>{data.strategy2}</p>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">03</div>
        <h2>Creative Direction & Design System</h2>
        <p>{data.solutionDesc}</p>

        {/* Full-width Key Visual Banner */}
        <div style={{ marginTop: '24px' }}>
          <div className="blog-meta-lbl" style={{ marginBottom: '8px', color: 'var(--text3)' }}>Campaign Key Visual</div>
          <img src="/asset/images/Tuong an/KV-2023-lowres.jpg" className="blog-kv-img" alt="Tín Hiệu Cát Tường An Khang KV" />
        </div>

        {/* Infinite Auto-Scrolling Social Content Gallery */}
        <div style={{ marginTop: '36px' }}>
          <div className="blog-meta-lbl" style={{ marginBottom: '12px', color: 'var(--text3)' }}>Tín Hiệu Cát Tường An Khang · Social Visuals</div>
          <div className="image-marquee">
            <div className="image-marquee-track">
              {[...scrollingImages, ...scrollingImages].map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} className="image-marquee-img" alt={`Social Post ${idx + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">04</div>
        <h2>Execution</h2>
        <p>{data.solution}</p>
      </div>

      <div className="blog-slide blog-content-slide">
        <div className="blog-slide-num">05</div>
        <h2>Impact</h2>
        <p>{data.impact}</p>
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

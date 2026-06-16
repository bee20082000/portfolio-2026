import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Chivas Tet Catalog',
  category: 'Branding & Packaging Design',
  client: 'Pernod Ricard Vietnam',
  timeline: '2026',
  challenge: 'How do we translate the prestige of Chivas into a meaningful Tet gifting experience? For Tet 2026, we developed a commercial catalog and packaging system that celebrates premium craftsmanship and festive gifting culture.',
  strategy1: 'A refined visual direction combining premium materials, elegant composition, and elevated brand storytelling across both digital and physical touchpoints. The design system highlights curated gift sets through a sophisticated balance of product presentation, festive details, and luxury aesthetics.',

  metrics: [],
  images: [
    '/asset/images/chivas/1.jpg',
    '/asset/images/chivas/3.jpg',
    '/asset/images/chivas/4.jpg',
    '/asset/images/chivas/5.jpg',
    '/asset/images/chivas/6.jpg',
  ],
  accent: '#d5a153',
}

export default function ChivasModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Hero Visual */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22'
      }}>
        <video
          src="/asset/images/chivas/chivas cover.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Mockups */}
      {data.images.map((imgUrl, index) => (
        <div key={imgUrl} style={{
          gridColumn: 'span 12',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#1c1d22'
        }}>
          <img
            src={imgUrl}
            alt={`Chivas Tet Catalog Spread ${index + 1}`}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      ))}
    </WorkModalLayout>
  )
}

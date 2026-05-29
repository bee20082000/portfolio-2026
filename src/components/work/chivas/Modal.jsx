const data = {
  title: 'Chivas Tet Catalog',
  category: 'Branding & Packaging Design',
  client: 'Pernod Ricard Vietnam',
  role: 'Support Designer',
  timeline: '3 Months - 2025',
  services: 'Branding, Packaging Design, Catalog Layout',
  subtitle: 'Creating a premium Tết catalog for Chivas Premium Liquor.',
  challenge: 'How do we make Chivas Premium Liquor a meaningful gift for Tet 2026? We designed a premium physical and digital catalog showcasing the elegance, tradition, and prestige of the brand.',
  strategy1: 'We focused on modern luxury visual assets, custom typography, and highly elegant gold and dark blue themed layouts that resonate with Tet celebrations.',
  quote: 'Tradition meets luxury — crafting a visual experience worthy of the Chivas heritage.',
  quoteSrc: 'Tet Catalog Creative Director',
  strategy2: 'The layout highlights premium gift packages and historical blends in double-page catalog spreads.',
  solutionDesc: 'A rich visual layout blending metallic gold elements with deep dark background hues to elevate product presentation.',
  solution: 'Distributed across corporate partners and retail agents nationwide, setting a new benchmark for luxury corporate gifting campaigns.',
  metrics: [],
  images: [
    '/asset/images/chivas/1.jpg',
    '/asset/images/chivas/3.jpg',
    '/asset/images/chivas/4.jpg',
    '/asset/images/chivas/6.jpg',
  ],
  accent: '#d5a153',
}

import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

export default function ChivasModal() {
  return (
    <TwoColumnModalLayout
      data={data}
      leftContent={<ModalLeftContent data={data} />}
    >
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
        <div key={index} style={{
          gridColumn: 'span 12',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#1c1d22'
        }}>
          <img
            src={imgUrl}
            alt={`Chivas Tet Catalog Spread ${index + 1}`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      ))}
    </TwoColumnModalLayout>
  )
}

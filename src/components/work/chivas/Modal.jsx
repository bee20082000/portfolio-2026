import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Chivas Tet Catalog',
  category: 'Branding & Packaging Design',
  client: 'Pernod Ricard Vietnam',
  timeline: '2026',
  challenge: 'How do we translate the prestige of Chivas into a meaningful Tet gifting experience? For Tet 2026, we developed a commercial catalog and packaging system that celebrates premium craftsmanship and festive gifting culture.',
  strategy1: 'A refined visual direction combining premium materials, elegant composition, and elevated brand storytelling across both digital and physical touchpoints. The design system highlights curated gift sets through a sophisticated balance of product presentation, festive details, and luxury aesthetics.',
  metrics: [],
  accent: '#d5a153',
}

const img = (name) => `/asset/images/chivas/${name}`;
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  ...extra,
});

export default function ChivasModal() {
  return (
    <WorkModalLayout data={data}>



      {/* ══════════════════════════════════════════════
          COVER STILL — catalog cover spread
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('cover.jpg')} alt="Chivas Tet Catalog — Cover" loading="lazy" decoding="async" style={imgStyle} width={1900} height={1344} />
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — Gift Set Spreads
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('1.jpg')} alt="Chivas Tet Catalog — Gift Set Spread" loading="lazy" decoding="async" style={imgStyle} width={1191} height={842} />
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Product Presentation
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('3.jpg')} alt="Chivas Tet Catalog — Product Presentation" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('4.jpg')} alt="Chivas Tet Catalog — Luxury Detail" loading="lazy" decoding="async" style={imgStyle} width={1190} height={842} />
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 3 — Festive Packaging & Final Spreads
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('5.jpg')} alt="Chivas Tet Catalog — Festive Packaging" loading="lazy" decoding="async" style={imgStyle} width={1190} height={841} />
      </div>
      <div style={cell(12)}>
        <img src={img('6.jpg')} alt="Chivas Tet Catalog — Final Spread" loading="lazy" decoding="async" style={imgStyle} width={1191} height={842} />
      </div>

    </WorkModalLayout>
  )
}

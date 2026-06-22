import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Gia Lai Coffee Festival',
  category: 'Social Campaign, Branding',
  client: 'iCoffee',
  timeline: '2025',
  challenge: (
    <p>
      Gia Lai Coffee Festival 2025 was a celebration of everything behind the perfect cup - from the farmers growing the beans to the people brewing them.    </p>
  ),
  strategy1: (
    <p>
      Working alongside Lopcreative, we brewed a unified brand experience across publications, event collateral, and social media. Inspired by the festival's farm-to-cup story, the visual identity brought together stories, people, and coffee culture, helping Gia Lai's coffee ecosystem reach a wider audience.    </p>
  ),
  accent: '#8B5A2B', // Coffee brown
}

const img = (name) => `/asset/images/icoffee/web/${name}`;
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  backgroundColor: '#1c1d22',
  ...extra,
});

export default function ICoffeeModal() {

  return (
    <WorkModalLayout data={data}>

      {/* ══════════════════════════════════════════════
          HERO COVERS
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('glvf-logo.jpg')} alt="GLCF flag banner 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('Scene-1.jpg')} alt="GLCF flag banner 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('Scene-2.jpg')} alt="GLCF flag banner 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('SAIGON_VINHHOI_8.jpg')} alt="GLCF flag banner 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>


      <div style={cell(12)}>
        <img src={img('Banner_Mockup_v03.jpg')} alt="GLCF flag banner 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>


      {/* 2nd project */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'block',
        padding: '32px 4px 16px 4px',
      }}>
        <h1 className="work-modal-title" style={{
          fontFamily: "'Maroni Condensed'",
          fontSize: 'clamp(4rem, 6vw, 8rem)',
          fontWeight: '400',
          lineHeight: '0.9',
          letterSpacing: '0em',
          color: '#ffffff',
          textTransform: 'uppercase',
        }}>
          iCoffee New Packaging
        </h1>
      </div>
      {/* Row filler — completes the row so description lands on its own row below */}
      <div style={{ gridColumn: 'span 6' }} />

      {/* Wayfinding description — own row, starts at col 8, no bg, no border */}
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'justify',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          Great coffee deserves great packaging. With its previous design showing its age, iCoffee saw GLCF 2025 as an opportunity to give its packaging a fresh roast - more contemporary, memorable, and shelf-ready.        </p>
      </div>
      <div style={cell(8)}>
        <img src={img('Icoffee_Drip_2025_FA-1.jpg')} alt="iCoffee Campaign render 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <video src={img('coffee-pouring.mp4')} autoPlay loop muted playsInline style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('1.jpg')} alt="iCoffee Campaign render 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('2.jpg')} alt="iCoffee Campaign render 2" loading="lazy" decoding="async" style={imgStyle} />
      </div>

    </WorkModalLayout>
  )
}

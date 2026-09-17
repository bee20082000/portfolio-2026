import WorkModalLayout from '../shared/WorkModalLayout';
import ModalVideo from '../shared/ModalVideo';

const data = {
  title: 'Lipton Tet',
  category: 'Packaging, Social Campaign',
  client: 'Lipton Việt Nam',
  role: 'Lead Packaging Designer',
  timeline: '2024',
  services: 'Packaging Design, 3D Renderings, Creative Direction',
  subtitle: 'Crafting a festive, premium, and traditional packaging experience for Lipton Tet 2026.',
  challenge: 'How do we design a Tet tea packaging that stands out on crowded retail shelves while maintaining Lipton\'s iconic yellow color and heritage? We created a premium, ultra-realistic editorial package blending modern gold foils with traditional blossom patterns.',
  strategy1: 'We focused on creating an interactive brand campaign with dedicated motion clips and high-end editorial visuals that evoke warmth, premium gifting, and celebratory Tet values.',
  quote: 'Blending traditional Vietnamese Tet values with premium modern visual systems.',
  quoteSrc: 'Lipton Tet Campaign Lead',
  strategy2: 'The visual direction combines rich red and yellow festive tones with embossed gold textures to command retail shelf attention.',
  solutionDesc: 'A rich visual layout highlighting premium tea gift boxes, paired with high-energy digital activation videos.',
  solution: 'Distributed across major retail networks nationwide, receiving highly enthusiastic feedback from focus groups and trade partners.',
  accent: '#ffb703',
}

const img = (name) => `/asset/images/Lipton/tet/${name}`;
const cellStyle = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'var(--bg2, #F5F5F7)',
  height: '100%',
  ...extra,
});

export default function LiptonTet2024Modal() {
  return (
    <WorkModalLayout data={data}>

      {/* Hero cover photo */}

      <div style={cellStyle(12)}>
        <img
          src={img('Scene-13.jpg')}
          alt="Lipton Tet Cover"
          loading="lazy" decoding="async"
          style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }}
        width={1920} height={1280} />
      </div>
      <div style={cellStyle(12)}>
        <img
          src={img('Scene-14.jpg')}
          alt="Lipton Tet Cover"
          loading="lazy" decoding="async"
          style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }}
        width={1920} height={1281} />
      </div>

      <div style={cellStyle(12)}>
        <img
          src={img('Mockup.webp')}
          alt="Lipton Tet Cover"
          loading="lazy" decoding="async"
          style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }}
        width={1200} height={670} />
      </div>

      {/* Motion clips side by side */}
      <div style={{ gridColumn: 'span 6' }} />
      <div style={cellStyle(6)}>
        <ModalVideo src={img('Lipton-AOC-vid-3.mp4')} />
      </div>

    </WorkModalLayout >
  )
}

const data = {
  title: 'Lipton Tet Packaging',
  category: 'Packaging & Brand Experience',
  client: 'Lipton Việt Nam',
  role: 'Lead Packaging Designer',
  timeline: '3 Months · 2025',
  services: 'Packaging Design, 3D Renderings, Creative Direction',
  subtitle: 'Crafting a festive, premium, and traditional packaging experience for Lipton Tết 2026.',
  challenge: 'How do we design a Tết tea packaging that stands out on crowded retail shelves while maintaining Lipton\'s iconic yellow color and heritage? We created a premium, ultra-realistic editorial package blending modern gold foils with traditional blossom patterns.',
  strategy1: 'We focused on creating an interactive brand campaign with dedicated motion clips and high-end editorial visuals that evoke warmth, premium gifting, and celebratory Tết values.',
  quote: 'Blending traditional Vietnamese Tết values with premium modern visual systems.',
  quoteSrc: 'Lipton Tet Campaign Lead',
  strategy2: 'The visual direction combines rich red and yellow festive tones with embossed gold textures to command retail shelf attention.',
  solutionDesc: 'A rich visual layout highlighting premium tea gift boxes, paired with high-energy digital activation videos.',
  solution: 'Distributed across major retail networks nationwide, receiving highly enthusiastic feedback from focus groups and trade partners.',
  metrics: [{ val: '+45%', lbl: 'Shelf Attention' }, { val: '100%', lbl: 'Premium Focus' }, { val: '98%', lbl: 'Trade Affinity' }],
  images: [
    '/asset/images/Lipton/tet/Create_an_ultra-realistic,_premium_editorial_202605241507.jpg',
    '/asset/images/Lipton/tet/Lipton AOC vid 2.mp4',
    '/asset/images/Lipton/tet/Lipton AOC vid 3.mp4',
  ],
  accent: '#ffb703',
}

import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

export default function LiptonTet2024Modal() {
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
        backgroundColor: '#1c1d22',
        minHeight: '400px'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          backgroundImage: `url('${data.images[0]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      </div>

      {/* Motion Clip 1 */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '100%'
      }}>
        <video
          src={data.images[1]}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Motion Clip 2 */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '100%'
      }}>
        <video
          src={data.images[2]}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
    </TwoColumnModalLayout>
  )
}

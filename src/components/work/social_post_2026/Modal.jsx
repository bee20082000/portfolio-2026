import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Social Post',
  category: 'Interactive UI & Digital Art',
  client: 'Future Digital Projects',
  role: 'UI Designer & Digital Artist',
  timeline: '2026',
  services: 'Interactive Graphic Design, 3D Art Direction',
  subtitle: 'Exploring futuristic, neon-charged UI grids and high-impact digital social storytelling.',
  challenge: 'Pioneering next-generation design conventions for social platforms, incorporating 3D and holographic interface trends.',
  strategy1: 'Explored multi-layered glassmorphic frames and 3D glowing typography as primary design elements.',
  strategy2: 'Synthesized high-tech interfaces with readable, accessible content overlays.',
  solutionDesc: 'A visionary digital feed archetype optimized for maximum aesthetic impact.',
  solution: 'The 2026 series was highlighted as a top graphic inspiration showcase in design community galleries.',
  images: [
    '/asset/images/social_post_2026_cover.png',
  ],
  accent: '#18D5FF',
}

export default function SocialPost2026Modal() {
  return (
    <WorkModalLayout data={data}>
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '100%'
      }}>
        <img
          src={data.images[0]}
          alt="Social Post 2026 Cover"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </WorkModalLayout>
  )
}

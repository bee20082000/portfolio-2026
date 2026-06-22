import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Social Post',
  category: 'Digital Art & Typography',
  client: 'Social Media Collection',
  role: 'Graphic Designer & Typographer',
  timeline: '2025',
  services: 'Graphic Design, Layout Strategy, Digital Media',
  subtitle: 'A compilation of highly curated social media post graphics focused on bold design patterns.',
  challenge: 'Standing out in a crowded digital space while maintaining a highly professional, artistic, and uniform brand language.',
  strategy1: 'Implemented modern typography guidelines combined with vibrant neon color systems.',
  strategy2: 'Crafted structured overlay layouts to balance visual depth with crisp informational readability.',
  solutionDesc: 'A premium review of dynamic aesthetic posts tailored for social feeds.',
  solution: 'The 2025 feed layout established a signature style, resulting in increased organic reach and strong visual engagement.',
  accent: '#FF5C39',
}

const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

export default function SocialPost2025Modal() {
  return (
    <WorkModalLayout data={data}>
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '100%',
      }}>
        <img
          src="/asset/images/social_post_2025_cover.png"
          alt="Social Post 2025 Cover"
          loading="lazy" decoding="async"
          style={imgStyle}
        />
      </div>
    </WorkModalLayout>
  )
}

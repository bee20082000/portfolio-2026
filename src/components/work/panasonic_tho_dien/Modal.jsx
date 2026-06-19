import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Dien Pho Xuyen Viet',
  category: 'Thematic Seasonal Campaign',
  timeline: '2024',
  challenge: 'Panasonic needed to build deep brand resonance with modern families in Vietnam by celebrating sustainable and smart living in a way that feels organic, warm, and authentic.',
  strategy1: 'We embedded within local communities, showcasing real stories of energy efficiency and smart home solutions in contemporary homes using authentic family moments.',
}

const COVERS = [
  '/asset/images/Panasonic/pana cover.jpg',
  '/asset/images/Panasonic/pana-cover-2.jpg'
];

const SOCIAL_POSTS = [
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 1.png', alt: 'Pana - AOC post 1' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 2.png', alt: 'Pana - AOC post 2' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 3.png', alt: 'Pana - AOC post 3' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 4.png', alt: 'Pana - AOC post 4' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 5.png', alt: 'Pana - AOC post 5' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 6.png', alt: 'Pana - AOC post 6' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - AOC post 7.png', alt: 'Pana - AOC post 7' },
  { type: 'video', src: '/asset/images/Panasonic/Social/Pana - AOC post 8.mp4', alt: 'Pana - AOC post 8' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - Nam moi.png', alt: 'Pana - Nam moi' },
  { type: 'image', src: '/asset/images/Panasonic/Social/Pana - dai ly.png', alt: 'Pana - Dai ly' }
];

export default function PanasonicThoDienModal() {
  return (
    <WorkModalLayout data={data}>
      {/* 2 Covers on top, full span 12 */}
      {COVERS.map((src, index) => (
        <div
          key={src}
          style={{
            gridColumn: 'span 12',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1c1d22',
          }}
        >
          <img
            src={src}
            alt={`Panasonic Cover ${index + 1}`}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      ))}

      {/* Social posts, span 6 */}
      {SOCIAL_POSTS.map((post) => (
        <div
          key={post.src}
          style={{
            gridColumn: 'span 4',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1c1d22',
          }}
        >
          {post.type === 'video' ? (
            <video
              src={post.src}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          ) : (
            <img
              src={post.src}
              alt={post.alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          )}
        </div>
      ))}
    </WorkModalLayout>
  );
}


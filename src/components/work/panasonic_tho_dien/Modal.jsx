import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Dien Pho Xuyen Viet',
  category: 'Thematic Seasonal Campaign',
  timeline: '2024',
  challenge: 'In Vietnam’s electrical industry, many young electricians are motivated to improve their skills and increase their income through practical experience. However, real-world case studies and hands-on solutions are often hard to find online or within existing communities. As a result, learning remains fragmented and theoretical, making it difficult for them to grow confidently in their profession.',
  strategy1: 'We create a journey across Vietnam to connect with local electricians, capture their real stories, and share practical knowledge with the wider community. Through shared experiences and authentic solutions, we strengthen the industry and support the growth of every Electric Citizen',
}

const img = (name) => `/asset/images/Panasonic/${name}`;
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  backgroundColor: '#1c1d22',
  ...extra,
});

export default function PanasonicThoDienModal() {
  return (
    <WorkModalLayout data={data}>

      {/* ══════════════════════════════════════════════
          HERO COVERS
      ══════════════════════════════════════════════ */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <img
          src={img('SAIGON_SAIGON_7.jpg')} style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        width={2048} height={1366} />
        <div style={{
          fontFamily: 'Install Rounded',
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          zIndex: 2,
          fontSize: 'clamp(50px, 7.5vw, 70px)',
          fontWeight: '300',
          color: '#EFCF26',
          textAlign: 'justify',
          textAlignLast: 'justify',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          Panasonic KV 2023
        </div>
      </div>

      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <img
          src={img('SAIGON_ANKHANH_7.jpg')} style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        width={2048} height={1365} />
        <div style={{
          fontFamily: 'Install Rounded',
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          zIndex: 2,
          fontSize: 'clamp(50px, 7.5vw, 70px)',
          fontWeight: '300',
          color: '#EFCF26',
          textAlign: 'justify',
          textAlignLast: 'justify',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          Panasonic KV 2024
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SOCIAL POSTS
      ══════════════════════════════════════════════ */}
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-1.webp')} alt="Pana - AOC post 1" loading="lazy" decoding="async" style={imgStyle} width={1500} height={1500} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-2.webp')} alt="Pana - AOC post 2" loading="lazy" decoding="async" style={imgStyle} width={1200} height={1200} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-3.webp')} alt="Pana - AOC post 3" loading="lazy" decoding="async" style={imgStyle} width={1722} height={1500} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-4.webp')} alt="Pana - AOC post 4" loading="lazy" decoding="async" style={imgStyle} width={1500} height={1500} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-5.webp')} alt="Pana - AOC post 5" loading="lazy" decoding="async" style={imgStyle} width={1500} height={1500} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-6.webp')} alt="Pana - AOC post 6" loading="lazy" decoding="async" style={imgStyle} width={1500} height={1500} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-7.webp')} alt="Pana - AOC post 7" loading="lazy" decoding="async" style={imgStyle} width={1200} height={1200} />
      </div>
      <div style={cell(4)}>
        <video src={img('Social/Pana-AOC-post-8.mp4')} autoPlay loop muted playsInline style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-Nam-moi.webp')} alt="Pana - Nam moi" loading="lazy" decoding="async" style={imgStyle} width={1200} height={1200} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-dai-ly.webp')} alt="Pana - Dai ly" loading="lazy" decoding="async" style={imgStyle} width={1500} height={1500} />
      </div>

    </WorkModalLayout >
  )
}

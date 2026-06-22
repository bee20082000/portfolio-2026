import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Dien Pho Xuyen Viet',
  category: 'Thematic Seasonal Campaign',
  timeline: '2024',
  challenge: 'Panasonic needed to build deep brand resonance with modern families in Vietnam by celebrating sustainable and smart living in a way that feels organic, warm, and authentic.',
  strategy1: 'We embedded within local communities, showcasing real stories of energy efficiency and smart home solutions in contemporary homes using authentic family moments.',
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
        />
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
        />
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
        <img src={img('Social/Pana-AOC-post-1.png')} alt="Pana - AOC post 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-2.png')} alt="Pana - AOC post 2" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-3.png')} alt="Pana - AOC post 3" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-4.png')} alt="Pana - AOC post 4" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-5.png')} alt="Pana - AOC post 5" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-6.png')} alt="Pana - AOC post 6" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-AOC-post-7.png')} alt="Pana - AOC post 7" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <video src={img('Social/Pana-AOC-post-8.mp4')} autoPlay loop muted playsInline style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('Social/Pana-Nam-moi.png')} alt="Pana - Nam moi" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      <div style={cell(4)}>
        <img src={img('Social/Pana-dai-ly.png')} alt="Pana - Dai ly" loading="lazy" decoding="async" style={imgStyle} />
      </div>

    </WorkModalLayout >
  )
}

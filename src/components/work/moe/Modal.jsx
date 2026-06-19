import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Gori Coffee',
  category: 'Branding, Packaging',
  timeline: '2026',
  subtitle: 'Designing a warm, premium, and highly memorable visual identity and packaging system for Moe Cafe.',
  challenge: (
    <p>
      Gori Coffee was founded by Suzuki-san, a Japanese coffee enthusiast living in Vietnam who wanted to make Vietnamese specialty coffee easier for Japanese consumers to discover, enjoy, and bring home.
      <br />
      <br />
      The challenge wasn't the coffee, it was already great, it was the first impression, since the previous design felt dated and visually busy, making it difficult to stand out on crowded shelves or communicate the brand's unique personality at a glance.
    </p>
  ),
  strategy1: (
    <p>
      Instead of looking for something that didn't exist, I focused on finding something that was already present but hadn't yet received attention.
    </p>
  ), strategy2: 'Implemented customized typographic grids and subtle logo marks across retail packaging boxes, cups, and visual assets.',
  solutionDesc: 'A premium package design balancing modern cozy layouts, tactile paper components, and clean modern styling.',
  solution: 'Successfully launched across all retail locations, significantly enhancing consumer unboxing experiences and brand affinity.',
  metrics: [],
  accent: '#c8b195',
  usePillMetadata: true,
}

const img = (name) => `/asset/images/Moe Cafe/${name}`;
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  ...extra,
});

export default function MoeModal() {
  return (
    <WorkModalLayout data={data}>

      {/* Gori Logo — full width */}
      <div style={cell(6)}>
        <img src={img('gori-logo.jpg')} alt="Gori Logo" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      {/* Old identity + KV video side by side */}
      <div style={cell(6)}>
        <video
          src={img('gori kv - 12fps.mp4')}
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      {/* Row filler + description */}
      <div style={{
        gridColumn: '1 / 5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 4px',
      }}>

        <p className="work-modal-body-text">
          For years, Gori Coffee's logo featured the gorilla, but the gorilla itself was just a placeholder within the packagings' design.
        </p>
      </div>

      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 4px',
      }}>

        <p className="work-modal-body-text">
          By elevating the gorilla within the branding, I helped transform a silent player into a central figure in the brand experience—a memorable mascot that would help distinguish the packaging, establish immediate recognition, and create lasting memories within the consumer's mind.
        </p>
      </div>

      {/* Old identity + KV video side by side */}
      <div style={cell(6)}>
        <img src={img('gori-old-2.jpg')} alt="Gori Old Identity" loading="lazy" decoding="async" style={imgStyle} />
        <div style={{
          fontFamily: "Install Rounded",
          position: 'absolute',
          bottom: '20px',
          zIndex: 2,
          fontSize: 'clamp(30px, 7.5vw, 55px)',
          fontWeight: '300',
          color: '#ffffffff',
          textAlign: 'left',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          Before
        </div>
      </div>
      <div style={cell(6)}>
        <video
          src={img('new-gori-pack.mp4')}
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          fontFamily: "Install Rounded",
          position: 'absolute',
          bottom: '20px',
          zIndex: 2,
          fontSize: 'clamp(30px, 7.5vw, 55px)',
          fontWeight: '300',
          color: '#ffffffff',
          textAlign: 'left',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          After
        </div>
      </div>
      {/* Row filler + description */}
      <div style={{ gridColumn: 'span 6' }} />
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          One banh mi, one cup of coffee
          <br />
          Two things that perfectly capture Vietnamese morning culture.
        </p>
      </div>

      {/* Cover — full width */}
      <div style={cell(6)}>
        <img src={img('moe cover.jpeg')} alt="Moe Packaging Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>


      {/* Photo 3 — full width */}
      <div style={cell(12)}>
        <img src={img('photo-3.jpg')} alt="Moe Packaging Photo 3" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Photo 2 + Photo 1 */}
      <div style={cell(12)}>
        <img src={img('photo-1.jpg')} alt="Moe Packaging Photo 1" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Row filler + description */}
      <div style={{ gridColumn: 'span 6' }} />
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          MOE COFFEE AND GIFT SHOP
        </p>
      </div>

      {/* GIF cover — full width with overlay text */}
      <div style={{ ...cell(12), position: 'relative' }}>
        <img src={img('moe cover.gif')} alt="Moe Animated Cover" loading="lazy" decoding="async" style={imgStyle} />
        <div style={{
          position: 'absolute',
          fontFamily: 'Dela Gothic One',
          bottom: '20px',
          left: '40px',
          right: '40px',
          zIndex: 2,
          fontSize: 'clamp(30px, 7.5vw, 55px)',
          fontWeight: '300',
          color: '#EFCF26',
          textAlign: 'justify',
          textAlignLast: 'justify',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          2 Phùng Khắc Khoan
        </div>
        <div style={{
          fontFamily: 'Dela Gothic One',
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          zIndex: 2,
          fontSize: 'clamp(30px, 7.5vw, 55px)',
          fontWeight: '300',
          color: '#EFCF26',
          textAlign: 'justify',
          textAlignLast: 'justify',
          pointerEvents: 'none',
          lineHeight: '0.9',
        }}>
          MOEカフェ＆ギフトショップ
        </div>
      </div>


      {/* Photo 4 + Photo 5 */}
      <div style={cell(4)}>
        <img src={img('photo-4.jpg')} alt="Moe Packaging Photo 4" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(4)}>
        <img src={img('photo 5.jpeg')} alt="Moe Packaging Photo 5" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Photo 6 + new pack video */}
      <div style={cell(4)}>
        <img src={img('photo 6.jpeg')} alt="Moe Packaging Photo 6" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Moe-2 full width */}
      <div style={cell(12)}>
        <img src={img('moe-2.jpg')} alt="Moe Interior" loading="lazy" decoding="async" style={imgStyle} />
      </div>

    </WorkModalLayout>
  )
}

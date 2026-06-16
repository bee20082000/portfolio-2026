import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Moe.',
  category: 'Shop & Packaging Design',
  timeline: '2026',
  subtitle: 'Designing a warm, premium, and highly memorable visual identity and packaging system for Moe Cafe.',
  challenge: 'Creating a cohesive packaging system that perfectly represents the curated aesthetic and cozy atmosphere of Moe Cafe.',
  strategy1: 'Developed a comprehensive branding palette using minimal layout systems, warm earth colors, and tactile organic papers.',
  strategy2: 'Implemented customized typographic grids and subtle logo marks across retail packaging boxes, cups, and visual assets.',
  solutionDesc: 'A premium package design balancing modern cozy layouts, tactile paper components, and clean modern styling.',
  solution: 'Successfully launched across all retail locations, significantly enhancing consumer unboxing experiences and brand affinity.',
  metrics: [],
  images: [
    '/asset/images/Moe Cafe/moe cover.jpeg',
    '/asset/images/Moe Cafe/photo 1.jpeg',
    '/asset/images/Moe Cafe/photo 2.jpeg',
    '/asset/images/Moe Cafe/photo-3.jpg',
    '/asset/images/Moe Cafe/photo-4.jpg',
    '/asset/images/Moe Cafe/photo 5.jpeg',
    '/asset/images/Moe Cafe/photo 6.jpeg',
    '/asset/images/Moe Cafe/moe cover.gif',
    '/asset/images/Moe Cafe/moe-2.jpg',

  ],
  accent: '#c8b195',
  usePillMetadata: true,
}

export default function MoeModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Mockup 7 */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
        position: 'relative'
      }}>
        {data.images[7] ? (
          <img src={data.images[7]} alt="Moe Packaging Mockup 6" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 6 Placeholder</div>
        )}
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
          lineHeight: '0.9'
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
          lineHeight: '0.9'
        }}>
          MOEカフェ＆ギフトショップ

        </div>
      </div>

      {/* Mockup 3 */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[3] ? (
          <img src={data.images[3]} alt="Moe Packaging Mockup 3" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 3 Placeholder</div>
        )}
      </div>

      {/* Hero Visual */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[0] ? (
          <img src={data.images[0]} alt="Moe Packaging Cover" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Hero Image Placeholder</div>
        )}
      </div>

      {/* Mockup 2 */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[2] ? (
          <img src={data.images[2]} alt="Moe Packaging Mockup 2" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 2 Placeholder</div>
        )}
      </div>

      {/* Mockup 1 */}
      <div style={{
        gridColumn: 'span 8',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[1] ? (
          <img src={data.images[1]} alt="Moe Packaging Mockup 1" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 1 Placeholder</div>
        )}
      </div>

      {/* Mockup 4 */}
      <div style={{
        gridColumn: 'span 4',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[4] ? (
          <img src={data.images[4]} alt="Moe Packaging Mockup 4" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 4 Placeholder</div>
        )}
      </div>

      {/* Mockup 5 */}
      <div style={{
        gridColumn: 'span 4',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[5] ? (
          <img src={data.images[5]} alt="Moe Packaging Mockup 5" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 5 Placeholder</div>
        )}
      </div>

      {/* Mockup 6 */}
      <div style={{
        gridColumn: 'span 8',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[6] ? (
          <img src={data.images[6]} alt="Moe Packaging Mockup 6" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 6 Placeholder</div>
        )}
      </div>

      {/* Mockup 9 */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
      }}>
        {data.images[8] ? (
          <img src={data.images[8]} alt="Moe Packaging Mockup 9" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Mockup 9 Placeholder</div>
        )}
      </div>

    </WorkModalLayout>
  )
}

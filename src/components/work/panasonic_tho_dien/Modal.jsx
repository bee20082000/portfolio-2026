const data = {
  title: 'Panasonic Tho Dien',
  category: 'Thematic Seasonal Campaign',
  client: 'Panasonic Việt Nam',
  role: 'Creative Art Director',
  timeline: '3 Months · 2024',
  services: 'Visual Direction, Social Strategy, Storytelling',
  subtitle: 'Bridging eco-friendly technology and Vietnamese lifestyle through a hyper-localized digital campaign.',
  challenge: 'Panasonic needed to build deep brand resonance with modern families in Vietnam by celebrating sustainable and smart living in a way that feels organic, warm, and authentic.',
  strategy1: 'We embedded within local communities, showcasing real stories of energy efficiency and smart home solutions in contemporary homes using authentic family moments.',
  quote: 'Smart living is not about technology, it is about enhancing the warmth of local family connections.',
  quoteSrc: 'Panasonic Campaign Director',
  strategy2: 'We built a social-native campaign centered around user-submitted stories of smart daily life, showcasing dynamic household routines wrapped in bold brand assets.',
  solutionDesc: 'An extremely elegant, premium campaign system leveraging clean accents, modern tech textures, and high-energy motion design.',
  solution: 'Generated massive online engagement with over 10M views and a massive 62% increase in regional brand affinity among young families.',
  metrics: [{ val: '+62%', lbl: 'Brand Affinity' }, { val: '10M+', lbl: 'Campaign Views' }, { val: '+30%', lbl: 'Social Sharing' }],
  images: [
    '',
    '',
    '',
  ],
  accent: '#006cb7',
}

import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

export default function PanasonicThoDienModal() {
  return (
    <TwoColumnModalLayout
      data={data}
      leftContent={<ModalLeftContent data={data} />}
    >
      {/* Hero Visual */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        minHeight: '400px'
      }}>
        {data.images[0] ? (
          <div style={{ width: '100%', height: '100%', minHeight: '400px', backgroundImage: `url('${data.images[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368' }}>Hero Image Placeholder</div>
        )}
      </div>

      {/* Quote Bento */}
      <div style={{
        gridColumn: 'span 6',
        backgroundColor: '#1c1d22',
        borderRadius: '24px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderLeft: `4px solid ${data.accent}`
      }}>
        <div style={{ fontSize: '18px', fontStyle: 'italic', color: data.accent, marginBottom: '16px', lineHeight: '1.5' }}>
          "{data.quote}"
        </div>
        <div style={{ fontSize: '13px', color: '#9aa0a6' }}>— {data.quoteSrc}</div>
      </div>

      {/* Metrics Bento */}
      <div style={{
        gridColumn: 'span 6',
        backgroundColor: '#1c1d22',
        borderRadius: '24px',
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        alignItems: 'center'
      }}>
        {data.metrics.map(m => (
          <div key={m.lbl}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: data.accent, marginBottom: '4px' }}>{m.val}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9aa0a6' }}>{m.lbl}</div>
          </div>
        ))}
      </div>

      {/* Mockups */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '24px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '360px'
      }}>
        {data.images[1] ? (
          <div style={{ width: '100%', height: '100%', backgroundImage: `url('${data.images[1]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', fontSize: '13px' }}>Mockup 1 Placeholder</div>
        )}
      </div>

      <div style={{
        gridColumn: 'span 6',
        borderRadius: '24px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '360px'
      }}>
        {data.images[2] ? (
          <div style={{ width: '100%', height: '100%', backgroundImage: `url('${data.images[2]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', fontSize: '13px' }}>Mockup 2 Placeholder</div>
        )}
      </div>
    </TwoColumnModalLayout>
  )
}

const data = {
  title: 'Lipton 2023 summer campaign',
  category: 'IOT UX/UI Case Study',
  client: 'Lipton Việt Nam',
  role: 'UX/UI Lead & Researcher',
  timeline: '4 Months · 2024',
  services: 'Context-Aware UI, Usability Labs, Design Tokens',
  subtitle: 'Redefining IoT interactions — designing an intuitive, accessible ecosystem dashboard for control and intelligence.',
  challenge: 'How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to seniors.',
  strategy1: 'We conducted 15 in-depth user interviews and observed how families interact with their homes. Users don\'t think about "devices"; they think about "moods" — Good Morning, Leaving Home, Movie Night.',
  quote: 'I don\'t want to adjust 10 different lights. I just want the living room to feel cozy for dinner.',
  quoteSrc: 'Interview Subject, Mother of two',
  strategy2: 'This insight led to a "Context-First" UI framework — a dashboard around atmosphere presets, with device controls layered one tap below.',
  solutionDesc: 'We established a warm glassmorphic design system blending digital tools into the physical warmth of modern interior styling.',
  solution: 'Deployed across premium smart apartments. Usability testing showed a 35% reduction in setup time and 98% user satisfaction.',
  metrics: [{ val: '98%', lbl: 'Satisfaction Rate' }, { val: '-35%', lbl: 'Setup Friction' }, { val: '+50%', lbl: 'Daily Active Use' }],
  images: [
    '',
    '/asset/images/Lipton/Man_laughing_with_friends_Vespa_202605231759.jpeg',
    '',
  ],
  accent: '#ff5c2b',
}

import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

export default function LiptonModal() {
  return (
    <TwoColumnModalLayout
      data={data}
      leftContent={<ModalLeftContent data={data} />}
    >
      {/* Hero Visual */}
      <div className="hw-accel-container" style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        backgroundColor: '#1c1d22',
        minHeight: '400px'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 'inherit'
          }}
        >
          <source src="/asset/images/Lipton/Lipton_logo_in_tropical_scene_202605232158.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mockups */}
      <div style={{
        gridColumn: 'span 8',
        borderRadius: '8px',
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
        gridColumn: 'span 4',
        borderRadius: '8px',
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

import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Lipton summer',
  category: 'Branding Asset',
  client: 'Lipton Việt Nam',
  timeline: '2023',
  challenge: 'How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to seniors.',
  strategy1: 'We conducted 15 in-depth user interviews and observed how families interact with their homes. Users don\'t think about "devices"; they think about "moods" — Good Morning, Leaving Home, Movie Night.',
  images: [
    '/asset/images/Lipton/summer/Lipton_logo_in_tropical_scene_202605232158.mp4',
    '/asset/images/Lipton/Man_laughing_with_friends_Vespa_202605231759.jpeg',
    '/asset/images/Lipton/summer/Lipton_post2_FA.mp4',
    '/asset/images/Lipton/summer/Lipton Post 4 video FA.mp4',
  ],
  accent: '#ff5c2b',
}

export default function LiptonModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Hero Visual */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
      }}>
        <video
          src={data.images[0]}
          autoPlay
          loop
          muted
          playsInline
          title="Lipton — Summer Campaign showcase video"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Vespa Image (Full Width) */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
      }}>
        <img
          src={data.images[1]}
          alt="Lipton Summer Campaign Vespa Scene"
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Summer Video 1 */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
      }}>
        <video
          src={data.images[2]}
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
      </div>

      {/* Summer Video 2 */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
      }}>
        <video
          src={data.images[3]}
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
      </div>
    </WorkModalLayout>
  )
}


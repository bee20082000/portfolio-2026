import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Lipton summer',
  category: 'Branding Asset',
  client: 'Lipton Việt Nam',
  timeline: '2023',
  challenge: 'How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to seniors.',
  strategy1: 'We conducted 15 in-depth user interviews and observed how families interact with their homes. Users don\'t think about "devices"; they think about "moods" — Good Morning, Leaving Home, Movie Night.',
  accent: '#ff5c2b',
}

const img = (name) => `/asset/images/Lipton/${name}`;
const cellStyle = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#1c1d22',
  ...extra,
});
const videoStyle = { width: '100%', height: 'auto', display: 'block' };
const imgStyle = { width: '100%', height: 'auto', display: 'block' };

export default function LiptonModal() {
  return (
    <WorkModalLayout data={data}>

      {/* Hero — summer KV video */}
      <div style={cellStyle(12)}>
        <img
          src={img('summer/KV.jpeg')}
          title="Lipton - KV"
          loading="lazy" decoding="async"
          style={imgStyle}
        />
      </div>

      {/* Vespa lifestyle photo */}
      <div style={cellStyle(4)}>
        <img
          src={img('Man_laughing_with_friends_Vespa_202605231759.jpeg')}
          alt="Lipton Summer Campaign Vespa Scene"
          loading="lazy" decoding="async"
          style={imgStyle}
        />
      </div>

      {/* Social post videos side by side */}
      <div style={cellStyle(4)}>
        <video src={img('summer/Lipton_post2_FA.mp4')} autoPlay loop muted playsInline style={videoStyle} />
      </div>
      <div style={cellStyle(4)}>
        <video src={img('summer/Lipton-Post-4-video-FA.mp4')} autoPlay loop muted playsInline style={videoStyle} />
      </div>

    </WorkModalLayout>
  )
}

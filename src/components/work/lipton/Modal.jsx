import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Lipton summer',
  category: 'Branding Asset',
  client: 'Lipton Việt Nam',
  timeline: '2023',
  challenge: 'Summer is peak beach season - a time when people naturally reach for something refreshing, light, and easy to share. For Lipton, this is a chance to own those “sunny moments” with a more vibrant tropical expression. The challenge is to refresh the brand’s social presence and key visuals so it feels naturally part of summer lifestyle, not just a product in it.',
  strategy1: 'We developed a set of new social assets and a refreshed Key Visual system inspired by tropical energy - bright sunlight, coastal textures, and juicy, refreshing moments. The visual direction leans into a more playful summer rhythm: lighter compositions, warmer tones, and lifestyle-driven storytelling that captures tea as part of beach days, chill gatherings, and spontaneous refreshment breaks. The result is a seasonal system that makes Lipton feel like a natural companion to summer, not just a drink of the season.',
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
        width={3280} height={1440} />
      </div>

      {/* Vespa lifestyle photo */}
      <div style={cellStyle(4)}>
        <img
          src={img('Man_laughing_with_friends_Vespa_202605231759.jpeg')}
          alt="Lipton Summer Campaign Vespa Scene"
          loading="lazy" decoding="async"
          style={imgStyle}
        width={1200} height={896} />
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

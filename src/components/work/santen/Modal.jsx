import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Santen',
  category: 'Thematic Campaign',
  client: 'Santen Pharmaceutical',
  role: 'Creative Art Director',
  timeline: '2023',
  services: 'Visual Strategy, Campaign Design, Digital Assets',
  subtitle: 'Engaging digital thematic campaigns promoting healthy eye care practices across target demographics.',
  challenge: 'Santen needed to raise awareness about eye health and strain prevention in an engaging, relatable way on digital media.',
  strategy1: 'Created highly contextual visual formats, integrating popular lifestyle trends and expert advice posts to maximize readability.',
  strategy2: 'Used crisp, informative layouts and educational color schemas to build credibility and high brand recall.',
  solutionDesc: 'A series of vibrant, eye-catching social posts and animations designed to capture feed attention and deliver health insights.',
  solution: 'Achieved high organic share rates and successfully educated audiences on daily digital eye strain relief.',
  metrics: [{ val: '+48%', lbl: 'Audience Reach' }, { val: '5M+', lbl: 'Campaign Views' }, { val: '+35%', lbl: 'Engagement Rate' }],
  images: [
    '/asset/images/santen/ST_DramaTrend_Post1_220914.gif',
    '/asset/images/santen/ST_KARI-UNI_230221_FA.webp',
    '/asset/images/santen/ST_Sancoba_230203.FA.webp',
    '/asset/images/santen/ST_Sancoba_230210.webp',
    '/asset/images/santen/ST_Sancoba_Trend_post-7.webp',
    '/asset/images/santen/Sancoba-Post-school-life.webp',
    '/asset/images/santen/Sancoba-This-that.webp',
    '/asset/images/santen/Sancoba-expert-advice-post-8.webp',
    '/asset/images/santen/Sancoba-Moment-Post2-1801.webp',
    '/asset/images/santen/Santen-HA-post.webp',
    '/asset/images/santen/Santen-Nam-Nu-post.webp',
    '/asset/images/santen/Santen-trend-post5-opt-2.mp4',
    '/asset/images/santen/sancoba-product-post-8.webp',
    '/asset/images/santen/sancoba-product-post-4.webp'
  ],
  accent: '#00a896',
}

export default function SantenModal() {
  return (
    <WorkModalLayout data={data}>
      {data.images.map((src, index) => {
        const isVideo = src.endsWith('.mp4');
        return (
          <div
            key={src}
            style={{
              gridColumn: 'span 3',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1c1d22',
            }}
          >
            {isVideo ? (
              <video
                src={src}
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
                src={src}
                alt={`Santen Campaign ${index + 1}`}
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
        );
      })}
    </WorkModalLayout>
  );
}

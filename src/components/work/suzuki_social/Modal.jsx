import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Suzuki Social Project',
  category: 'Social Media Campaign',
  client: 'Suzuki Vietnam',
  timeline: '2025',
  challenge: 'Suzuki Vietnam needed to revitalize their digital presence, shifting from standard, product-focused updates to a highly engaging, community-driven social campaign that celebrates the lifestyle and passion of riders across Vietnam.',
  strategy1: 'We crafted a dynamic social media strategy centering on emotional brand storytelling and user-generated content. By integrating striking, custom-designed graphic layouts with lifestyle photography and real rider stories, we transformed their official channels into a lively community hub. The campaign successfully elevated audience engagement and fostered a deeper, more personal connection with the Suzuki brand.',
  images: [
    '/asset/images/suzuki/web/1.jpg',
    '/asset/images/suzuki/web/2.jpg',
    '/asset/images/suzuki/web/3.jpg',
    '/asset/images/suzuki/web/4.jpg',
    '/asset/images/suzuki/web/5.jpg',
    '/asset/images/suzuki/web/6.jpg',
    '/asset/images/suzuki/web/7.jpg',
    '/asset/images/suzuki/web/8.jpg',
    '/asset/images/suzuki/web/9.jpg',
    '/asset/images/suzuki/web/10.jpg',
    '/asset/images/suzuki/web/11.jpg',
    '/asset/images/suzuki/web/12.jpg',
    '/asset/images/suzuki/web/13.jpg',
    '/asset/images/suzuki/web/14.jpg',
    '/asset/images/suzuki/web/15.jpg',
    '/asset/images/suzuki/web/16.jpg',
    '/asset/images/suzuki/web/17.jpg',
    '/asset/images/suzuki/web/18.mp4',
    '/asset/images/suzuki/web/19.mp4',
    '/asset/images/suzuki/web/20.mp4'
  ],
  accent: '#00318D', // Suzuki Blue
}

export default function SuzukiSocialModal() {
  return (
    <WorkModalLayout data={data}>
      {data.images.map((src, index) => {
        return (
          <div
            key={index}
            style={{
              gridColumn: 'span 3',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1c1d22'
            }}
          >
            {src.endsWith('.mp4') ? (
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            ) : (
              <img
                src={src}
                alt={`Suzuki Social Project render ${index + 1}`}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </div>
        );
      })}
    </WorkModalLayout>
  )
}

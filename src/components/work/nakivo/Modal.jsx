import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Nakivo Calendar',
  category: 'Graphic Design',
  client: 'Nakivo',
  timeline: '2024',
  challenge: 'In preparation for the Year of the Dragon in 2024, NAKIVO intended to develop an appreciation calendar for their staff and partner community. The intention was to produce a distinct piece with the festive spirit of Lunar New Year and the identity of the brand.',
  strategy1: 'As the main layout and calendar designer, I crafted the visual structure, editorial flow, and monthly compositions to create an engaging calendar experience. The project combined layout with character-led storytelling, featuring a playful dragon mascot illustrated by Truc Dang. The result was a playful design that felt celebratory, branded, and uniquely Nakivo.',
  images: [
    '/asset/images/nakivo/1.jpg',
    '/asset/images/nakivo/2.jpg',
    '/asset/images/nakivo/3.jpg',
    '/asset/images/nakivo/4.jpg'
  ],
  accent: '#ffffffff', // Example Nakivo blue
}

export default function NakivoModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Images */}
      {data.images.map((src, index) => {
        const span = (index === 2 || index === 3) ? 6 : 12;
        return (
          <div
            key={index}
            style={{
              gridColumn: `span ${span}`,
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1c1d22'
            }}
          >
            <img
              src={src}
              alt={`Nakivo Calendar render ${index + 1}`}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        );
      })}

      {/* Video Sequence */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22'
      }}>
        <video
          src="/asset/images/nakivo/Sequence-01.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
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
          Illustration by Truc Dang
        </div>
        <div style={{
          fontFamily: 'Install Rounded',
          position: 'absolute',
          bottom: '20px',
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
          Layout by Huy Nguyen
        </div>
      </div>

    </WorkModalLayout>
  )
}

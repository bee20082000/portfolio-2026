import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'iCoffee Campaign',
  category: 'Social Campaign, Branding',
  client: 'iCoffee',
  timeline: '2025',
  challenge: (
    <p>
      In 2025, iCoffee launched a new premium drip coffee line.
      The challenge was to create a modern digital campaign that translates the sensory ritual of drip coffee into a visual experience, appealing to urban professionals seeking convenience without sacrificing quality.
    </p>
  ),
  strategy1: (
    <p>
      We developed a clean, minimalist campaign aesthetic focused on "The Art of Slow Drip".
      <br></br>
      <br></br>
      Using organic layout design, rich lifestyle photography, and educational carousel post templates, we highlighted the ease of brewing at home/work
      <br></br>
      <br></br>
      The strategy combined aesthetic product renders with structured content pillars to increase brand trust and social engagement.
    </p>
  ),
  images: [
    '/asset/images/icoffee/web/1.jpg',
    '/asset/images/icoffee/web/2.jpg'
  ],
  accent: '#8B5A2B', // Coffee brown
}

export default function ICoffeeModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Mockup Images */}
      {data.images.map((src, index) => {
        return (
          <div
            key={index}
            style={{
              gridColumn: 'span 12',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1c1d22'
            }}
          >
            <img
              src={src}
              alt={`iCoffee Campaign render ${index + 1}`}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        );
      })}
    </WorkModalLayout>
  )
}

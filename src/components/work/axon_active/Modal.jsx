import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Axon Active New Office',
  category: 'Workspace & Architecture Design',
  client: 'Axon Active',
  timeline: '2025',
  challenge: 'How do we shape a hybrid workplace that balances focus and collaboration in an agile environment? For Axon Active’s new office in Thu Duc City, the goal was to create a contemporary workspace that supports dynamic teamwork while maintaining clarity, calm, and flexibility.',
  strategy1: 'Inspired by Swiss workplace principles, the spatial approach focused on precision, adaptability, and human-centered flow. I supported the design of selected workplace experiences, helping shape collaborative zones, quiet focus areas, and flexible touchpoints that encourage seamless interaction. A restrained material palette, acoustic comfort, natural textures, and subtle biophilic elements created a calm yet efficient environment tailored to an IT-driven, agile culture.',

  images: [
    '/asset/images/axon active/TDC/cover.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-4.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-7.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-20.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-31.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-33.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-34.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-39.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-40.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-43.jpg',
    '/asset/images/axon active/TDC/Lesonphoto.com-Axon Active-2048px-46.jpg',
  ],
  accent: '#0088ff',
}

export default function AxonActiveModal() {
  return (
    <WorkModalLayout data={data}>
      {/* Hero Visual (Cover) */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1d22',
        height: '100%'
      }}>
        <img
          src={data.images[0]}
          alt="Axon Active Office Cover"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Grid of All Other Photos */}
      {data.images.slice(1).map((imgUrl, i) => (
        <div
          key={imgUrl}
          style={{
            gridColumn: 'span 12',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1c1d22',
            height: '100%'
          }}
        >
          <img
            src={imgUrl}
            alt={`Axon Active Office Design Detail ${i + 1}`}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </WorkModalLayout>
  )
}

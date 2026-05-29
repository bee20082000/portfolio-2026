const data = {
  title: 'New office design',
  category: 'Workspace & Architecture Design',
  client: 'Axon Active',
  role: 'Lead Interior Architect & Spatial Strategist',
  timeline: '3 Months · 2024',
  services: 'Spatial Layout, Concept Ideation, 3D Visualization',
  subtitle: 'Redefining the modern tech workspace for maximum creativity, community, and productivity.',
  challenge: 'How do we design a hybrid-ready, energetic workspace that inspires collaboration while providing focused, quiet zones? Axon Active needed a state-of-the-art office redesign that blends their agile software development philosophy with physical space.',
  strategy1: 'Agile development requires continuous interaction, quick huddles, and focus. We researched engineer workflow patterns to create custom modular zones instead of standard cubicles or fully open plans.',
  strategy2: 'We created open collaboration loops paired with soundproof acoustic cabins and flexible standing workspaces, creating a healthy, versatile layout.',
  solutionDesc: 'A sleek modern minimal aesthetic blended with organic textures, biophilic landscaping, and vibrant brand elements.',
  solution: 'Implemented across the corporate office resulting in a 30% increase in cross-team spontaneous collaboration and 94% positive employee feedback.',
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

import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

export default function AxonActiveModal() {
  return (
    <TwoColumnModalLayout
      data={data}
      leftContent={<ModalLeftContent data={data} />}
    >
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </TwoColumnModalLayout>
  )
}

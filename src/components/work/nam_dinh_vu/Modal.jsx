import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Nam Dinh Vu Concept',
  category: 'Exterior Concept Design',
  timeline: '2024',
  challenge: 'Creating a high-end conceptual visual for a massive logistics zone that harmonizes ecological zones, automated shipping ports, and clean architectural warehouses.',
  strategy1: 'Developed a comprehensive layout design using clean, organic grids integrated with tech-focused visual lines.',
  images: [
    '/asset/images/Nam Dinh Vu/Cong/JPEG/Cong.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamaynuoc1_topview.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamaynuoc1_high view.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamaynuoc1_gate.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamaynuoc1_wall.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamay1_front.jpg',
    '/asset/images/Nam Dinh Vu/nha may nuoc/JPEG/nhamay1_back.jpg',
    '/asset/images/Nam Dinh Vu/tram bom tang ap/JPEG/trambomtangap_frontview.jpg',
    '/asset/images/Nam Dinh Vu/tram bom tang ap/JPEG/trambomtangap_topview.jpg',
    '/asset/images/Nam Dinh Vu/Nha may nuoc thai/JPEG/Nhamaynuocthai2_topview.jpg',
    '/asset/images/Nam Dinh Vu/Nha may nuoc thai/JPEG/Nhamaynuocthai2_front.jpg',
    '/asset/images/Nam Dinh Vu/Nha may nuoc thai/JPEG/Nhamaynuocthai2_leftview.jpg',
    '/asset/images/Nam Dinh Vu/Nha may nuoc thai/JPEG/Nhamaynuocthai2_fronthigh.jpg',
    '/asset/images/Nam Dinh Vu/Tram dien/JPEG/tramdien_backview.jpg',
    '/asset/images/Nam Dinh Vu/Tram dien/JPEG/tramcatdien.jpg',
    '/asset/images/Nam Dinh Vu/Tram dien/JPEG/tramcatdien2.jpg',
  ],
  accent: '#00D8A5',
}

export default function NamDinhVuModal() {
  return (
    <WorkModalLayout data={data}>
      {data.images.map((src, index) => {
        // Index 9 (trambomtangap_topview.jpg, vertical) and Index 10 (Nhamaynuocthai2_topview.jpg, square-ish) span 6.
        // All other landscape renders span 12.
        const span = (index === 9 || index === 10) ? 6 : 12;
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
              alt={`Nam Dinh Vu Concept render ${index + 1}`}
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

import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Tet Gift Box',
  category: 'Branding Asset',
  client: 'Thuyen Xua Foods',
  timeline: '2024',
  challenge: 'Thuyền Xưa Food sought to elevate its premium spice collection through a gift box experience that celebrates heritage, craftsmanship, and authentic Vietnamese flavors.',
  strategy1: 'We designed a refined packaging direction that blends traditional warmth with a premium aesthetic. Through thoughtful composition, tactile details, and a restrained visual language, the gift box was crafted to feel both authentic and elevated — transforming local culinary heritage into a contemporary gifting experience.',
  images: [
    '/asset/images/Thuyen xua/Man_holding_Thuyen_Xua_gift_202605240057.jpeg',
    '/asset/images/Thuyen xua/Thuyen_Xua_gift_box_on_202605240109.jpeg',
    '/asset/images/Thuyen xua/Refine_shadow_lighting_photoshoot_202605240113.jpg',
  ],
  accent: '#c82027',
}

export default function ThuyenXuaFoodModal() {
  return (
    <WorkModalLayout data={data}>
      {/* First Photo */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {data.images[0] ? (
          <img src={data.images[0]} alt="Thuyen Xua Product" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Hero Image Placeholder</div>
        )}
      </div>

      {/* Second Photo */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {data.images[1] ? (
          <img src={data.images[1]} alt="Thuyen Xua Photoshoot" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Image Placeholder</div>
        )}
      </div>

      {/* Third Photo */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {data.images[2] ? (
          <img src={data.images[2]} alt="Thuyen Xua Gift Box" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Image Placeholder</div>
        )}
      </div>
    </WorkModalLayout>
  )
}

import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Tet Gift Box',
  category: 'Branding Asset',
  client: 'Thuyen Xua Foods',
  timeline: '2024',
  challenge: 'Thuyền Xưa Food sought to elevate its premium spice collection through a gift box experience that celebrates heritage, craftsmanship, and authentic Vietnamese flavors.',
  strategy1: 'We designed a refined packaging direction that blends traditional warmth with a premium aesthetic. Through thoughtful composition, tactile details, and a restrained visual language, the gift box was crafted to feel both authentic and elevated — transforming local culinary heritage into a contemporary gifting experience.',
  accent: '#c82027',
}

const img = (name) => `/asset/images/Thuyen-xua/${name}`;
const imgStyle = { width: '100%', height: 'auto', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  ...extra,
});

export default function ThuyenXuaFoodModal() {
  return (
    <WorkModalLayout data={data}>

      {/* Hero — man holding gift box */}
      <div style={cell(12)}>
        <img src={img('Man_holding_Thuyen_Xua_gift_202605240057.jpeg')} alt="Thuyen Xua Product" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Two detail shots side by side */}
      <div style={cell(6)}>
        <img src={img('Thuyen_Xua_gift_box_on_202605240109.jpeg')} alt="Thuyen Xua Photoshoot" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('Refine_shadow_lighting_photoshoot_202605240113.jpg')} alt="Thuyen Xua Gift Box" loading="lazy" decoding="async" style={imgStyle} />
      </div>

    </WorkModalLayout>
  )
}

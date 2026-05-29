import TwoColumnModalLayout from '../../shared/TwoColumnModalLayout'
import ModalLeftContent from '../shared/ModalLeftContent'

const data = {
  title: 'Thuyen Xua Food',
  category: 'Brand Gift Box',
  client: 'Thuyen Xua Food Việt Nam',
  role: 'Lead Visual Designer',
  timeline: '2 Months · 2023',
  services: 'Visual Direction, Social Content, Interactive Web',
  subtitle: 'Re-imagining traditional spices and premium foods for modern Vietnamese kitchens through a warm, authentic visual identity.',
  challenge: 'Thuyen Xua Food wanted to stand out in the competitive premium spices and gift-box market with a campaign celebrating natural ingredients, family heritage, and authentic culinary connections.',
  strategy1: 'We focused on warm organic tones, high-fidelity lifestyle photography, and a heritage storytelling journey that highlights pure traditional methods.',
  quote: 'Authentic taste is a bridge between generations, bringing premium heritage to the modern dining table.',
  quoteSrc: 'Thuyen Xua Art Director',
  strategy2: 'We built a social-native campaign centered around authentic family dining moments and high-end packaging designs that elevate digital engagement.',
  solutionDesc: 'A premium layout showcasing exquisite product designs, traditional gift box sets, and rich lifestyle imagery.',
  solution: 'Successfully achieved 3M+ active social media impressions and 95% positive feedback from target consumer testing.',
  metrics: [{ val: '+95%', lbl: 'Brand Resonance' }, { val: '3M%', lbl: 'Campaign Reach' }, { val: '+24%', lbl: 'Sales Lift' }],
  images: [
    '/asset/images/Thuyen xua/Man_holding_Thuyền_Xưa_gift_202605240057.jpeg',
    '/asset/images/Thuyen xua/Thuyền_Xưa_gift_box_on_202605240109.jpeg',
    '/asset/images/Thuyen xua/Refine_shadow_lighting_photoshoo…_202605240113.jpg',
  ],
  accent: '#c82027',
}

export default function ThuyenXuaFoodModal() {
  return (
    <TwoColumnModalLayout
      data={data}
      leftContent={<ModalLeftContent data={data} />}
    >
      {/* First Photo */}
      <div style={{
        gridColumn: 'span 12',
        borderRadius: '24px',
        overflow: 'hidden',
      }}>
        {data.images[0] ? (
          <img src={data.images[0]} alt="Thuyen Xua Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Hero Image Placeholder</div>
        )}
      </div>

      {/* Second Photo */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '24px',
        overflow: 'hidden',
      }}>
        {data.images[1] ? (
          <img src={data.images[1]} alt="Thuyen Xua Photoshoot" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Image Placeholder</div>
        )}
      </div>

      {/* Third Photo */}
      <div style={{
        gridColumn: 'span 6',
        borderRadius: '24px',
        overflow: 'hidden',
      }}>
        {data.images[2] ? (
          <img src={data.images[2]} alt="Thuyen Xua Gift Box" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368', backgroundColor: '#1c1d22' }}>Image Placeholder</div>
        )}
      </div>
    </TwoColumnModalLayout>
  )
}

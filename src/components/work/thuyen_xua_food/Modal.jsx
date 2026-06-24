import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkModalLayout from '../shared/WorkModalLayout';

gsap.registerPlugin(ScrollTrigger);

const data = {
  title: 'Tet Gift Box',
  category: 'Branding Asset',
  client: 'Thuyen Xua Foods',
  timeline: '2024',
  challenge: 'Thuyen Xua Foods sought to elevate its premium spice collection through a gift box experience that celebrates heritage, craftsmanship, and authentic Vietnamese flavors.',
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
  const polaroidRef = useRef(null);

  useEffect(() => {
    const el = polaroidRef.current;
    if (!el) return;

    let rafId;
    let isActive = true;

    // A robust, native parallax loop that relies only on physical screen coordinates.
    // It is 100% immune to GSAP's resize/refresh glitching during modal exit animations!
    const updateParallax = () => {
      if (!isActive) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate how far into the viewport the element is.
      // 0 = entering from bottom, 1 = reaching the center
      let progress = (vh - rect.top) / (vh / 2);

      // Clamp between 0 and 1 so it stops moving once it reaches the center
      progress = Math.max(0, Math.min(1, progress));

      // Map progress to translate Y and Rotation
      const y = 150 - (200 * progress);
      const rotate = -2 + (5 * progress);

      el.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <WorkModalLayout data={data}>

      {/* Hero — man holding gift box */}
      <div style={cell(12)}>
        <img src={img('mockup-1.jpg')} alt="Thuyen Xua Product" loading="lazy" decoding="async" style={imgStyle} width={2400} height={1792} />
      </div>

      {/* Two detail shots side by side */}
      <div style={cell(12)}>
        <img src={img('social.jpg')} alt="Thuyen Xua Photoshoot" loading="lazy" decoding="async" style={imgStyle} width={4500} height={3128} />
      </div>

      {/* Flowing Parallax Polaroid */}
      <div style={{
        ...cell(12),
        overflow: 'visible', // allow it to break bounds during parallax
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '80px',
      }}>
        <div
          ref={polaroidRef}
          style={{
            width: '60%',
            maxWidth: '300px',
            borderRadius: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            backgroundColor: '#fff',
            padding: '12px 12px 80px 12px', // Polaroid frame effect
            position: 'relative'
          }}
        >
          <img
            src={img('polaroid.jpg')}
            alt="Thuyen Xua Polaroid"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
            width={960} height={1280} />
          {/* Handwritten text at the bottom of the polaroid */}
          <div style={{
            position: 'absolute',
            bottom: '22px',
            left: '0',
            width: '100%',
            textAlign: 'center',
            fontFamily: "'Belmonte Ballpoint'",
            fontSize: '1.8rem',
            color: '#1a1a1a',
            transform: 'rotate(-2deg)' // slight slant for handwriting realism
          }}>
            Huy, Neomi, Son
          </div>
        </div>
      </div>

    </WorkModalLayout>
  )
}

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { audioManager } from '../../../utils/audio';
import WorkModalLayout from '../shared/WorkModalLayout';

const scrollingImages = [
  '/asset/images/Tuong-an/21-context/2-Ha-bang.jpg',
  '/asset/images/Tuong-an/21-context/21-Phung-tai-loc.jpg',
  '/asset/images/Tuong-an/21-context/3-Giang-gia-dinh.jpg',
  '/asset/images/Tuong-an/21-context/4-Tuyet-tai-loc.jpg',
  '/asset/images/Tuong-an/21-context/5-Hien-su-nghiep.jpg',
  '/asset/images/Tuong-an/21-context/6-Hien-suc-khoe.jpg',
  '/asset/images/Tuong-an/21-context/7-Phuong-tai-loc.jpg',
  '/asset/images/Tuong-an/21-context/8-rita-gia-dinh.jpg',
  '/asset/images/Tuong-an/21-context/9-Huyen-su-nghiep.jpg',
]

const data = {
  title: 'Tuong An Tet',
  category: 'Thematic Seasonal Campaign',
  client: 'Tuong An',
  role: 'Creative Designer',
  services: 'Campaign Ideation & Visual Development',
  timeline: '2023',
  challenge: 'A social-first campaign designed to reimagine “Cat Tuong An Khang” as a youth-friendly cultural movement through interactive content, digital storytelling, and community engagement.',
  strategy1: 'Young audiences rarely engage with traditional festive messaging unless it feels social, participatory, or worth sharing. As part of the creative team at DDB, I contributed through creative ideation, visual design, and execution, helping explore ways to make the campaign feel more native to online communities — turning a traditional New Year blessing into something younger audiences would actively join, remix, and talk about.'
}

const img = (name) => `/asset/images/Tuong-an/${name}`;
const imgStyle = { width: '100%', height: 'auto', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  ...extra,
});

export default function TuonganModal() {
  // States and refs for the integrated interactive phone layout
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(1);
  const phoneContainerRef = useRef(null);
  const phoneImageRef = useRef(null);

  const phoneImages = [
    '/asset/images/Tuong-an/Phone/phone-1.png',
    '/asset/images/Tuong-an/Phone/phone-2.png',
    '/asset/images/Tuong-an/Phone/phone-3.png'
  ];

  // GSAP Hover Pipeline: Animates the container coordinates smoothly
  useEffect(() => {
    gsap.to(phoneContainerRef.current, {
      y: isPhoneHovered ? '0%' : '30%',
      x: isPhoneHovered ? '0%' : '0%',
      rotate: isPhoneHovered ? 0 : 0,
      scale: isPhoneHovered ? 1.02 : 1.3,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [isPhoneHovered]);

  // Tactile Squeeze & Audio Click Handler
  const handlePhoneClick = (e) => {
    e.stopPropagation();

    setTimeout(() => {
      audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4);
    }, 0);

    gsap.timeline()
      .to(phoneImageRef.current, {
        scale: 0.98,
        duration: 0.08,
        ease: 'power2.out',
        onComplete: () => {
          setPhoneIndex((prev) => (prev === 3 ? 1 : prev + 1));
        }
      })
      .to(phoneImageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)'
      });
  };

  return (
    <WorkModalLayout data={data}>
      {/* Hero Visual */}
      <div style={cell(12)}>
        <img
          src={img('Billboard.jpg')}
          alt="Main Hero Key Visual"
          loading="lazy"
          decoding="async"
          style={imgStyle}
        />
      </div>

      {/* Bento 1: Carousel Gallery */}
      <div style={cell(8, {
        height: '540px',
        backgroundColor: '#1c1d22',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      })}>
        <div style={{ overflow: 'hidden', width: '100%', display: 'flex' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingRight: '12px',
            alignItems: 'center',
            animation: 'bentoMarquee 25s linear infinite',
            flexShrink: 0
          }}>
            {scrollingImages.map((imgSrc, idx) => (
              <img
                key={`${imgSrc}-${idx}`}
                src={encodeURI(imgSrc)}
                alt="Social Media Asset Thumbnail"
                loading="lazy"
                decoding="async"
                style={{ height: '350px', width: 'auto', objectFit: 'cover', borderRadius: '14px', flexShrink: 0 }}
              />
            ))}
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingRight: '12px',
            alignItems: 'center',
            animation: 'bentoMarquee 25s linear infinite',
            flexShrink: 0
          }}>
            {scrollingImages.map((imgSrc, idx) => (
              <img
                key={`${imgSrc}-${idx}-dup`}
                src={encodeURI(imgSrc)}
                alt="Social Media Asset Thumbnail"
                loading="lazy"
                decoding="async"
                style={{ height: '350px', width: 'auto', objectFit: 'cover', borderRadius: '14px', flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bento 2: Interactive GSAP Phone Mockup Slot */}
      <div
        onMouseEnter={() => setIsPhoneHovered(true)}
        onMouseLeave={() => setIsPhoneHovered(false)}
        style={cell(4, {
          gridRow: 'span 2', // Allows the phone to take up 2 rows in the grid
          height: '540px', // Roughly 260px * 2 + 20px gap
          backgroundColor: '#1c1d22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        })}
      >
        <div
          ref={phoneContainerRef}
          onClick={handlePhoneClick}
          style={{
            height: '110%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            willChange: 'transform',
            transformOrigin: 'center center',
          }}
        >
          <img
            ref={phoneImageRef}
            src={encodeURI(phoneImages[phoneIndex - 1])}
            alt={`Interactive App Mockup Screen ${phoneIndex}`}
            style={{
              height: '80%',
              objectFit: 'contain',
              willChange: 'transform',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))'
            }}
          />
        </div>
        {/* Small "click around" visual cue */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: isPhoneHovered ? 'translate(-50%, -4px)' : 'translate(-50%, 0)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: '#ffffffff',
          letterSpacing: '0.06em',
          pointerEvents: 'none',
          opacity: isPhoneHovered ? 0 : 0.6,
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: 'max-content'
        }}>
          <span>Click on the phone</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.13 3.13a1.44 1.44 0 0 0-1 2.44l7.15 14.85a1.45 1.45 0 0 0 2.65-.25l2-5.75 5.75-2a1.45 1.45 0 0 0 .25-2.65L6.08 2.62a1.44 1.44 0 0 0-1.95.51z" />
            <path d="M14.5 14.5c-.5-.5-1.5-1-2.5-1s-2 .5-2.5 1l-1 1" />
          </svg>
        </div>
      </div>

    </WorkModalLayout>
  );
}

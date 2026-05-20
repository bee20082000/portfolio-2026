import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const scrollingImages = [
  '/asset/images/Tuong an/21 context/2 Hạ băng tình iu.jpg',
  '/asset/images/Tuong an/21 context/21 Phung tai loc.jpg',
  '/asset/images/Tuong an/21 context/3 Giang gia dinh.jpg',
  '/asset/images/Tuong an/21 context/4 Tuyet tai loc.jpg',
  '/asset/images/Tuong an/21 context/5 Hien su nghie[.jpg',
  '/asset/images/Tuong an/21 context/6 Hien suc khoe.jpg',
  '/asset/images/Tuong an/21 context/7 Phuong tai loc.jpg',
  '/asset/images/Tuong an/21 context/8 rita gia dinh.jpg',
  '/asset/images/Tuong an/21 context/9 Huyen su nghiep.jpg',
]

const data = {
  title: 'Tết có Tường An, Cát Tường An Khang',
  category: 'Tet Campaign',
  client: 'Tuong An',
  role: 'Creative Designer',
  services: 'Campaign Ideation & Visual Development',
  timeline: '2022–2023',
  description: 'A social-first campaign designed to reimagine “Cát Tường An Khang” as a youth-friendly cultural movement through interactive content, digital storytelling, and community engagement.',
  context: 'Young audiences rarely engage with traditional festive messaging unless it feels social, participatory, or worth sharing. As part of the creative team at DDB, I contributed through creative ideation, visual design, and execution, helping explore ways to make the campaign feel more native to online communities — turning a traditional New Year blessing into something younger audiences would actively join, remix, and talk about.'
}

export default function TuonganModal() {
  // States and refs for the integrated interactive phone layout
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [phoneIndex, setPhoneIndex] = useState(1);
  const phoneContainerRef = useRef(null);
  const phoneImageRef = useRef(null);

  const phoneImages = [
    '/asset/images/Tuong an/Phone/phone 1.png',
    '/asset/images/Tuong an/Phone/phone 2.png',
    '/asset/images/Tuong an/Phone/phone 3.png'
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

    const audio = new Audio('/asset/audio/scrollwheel.mp3');
    audio.volume = 0.4;
    audio.play().catch(err => console.log("Audio play blocked:", err));

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
    <div style={{
      margin: '0 auto',
      padding: '40px 24px 60px 24px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>

      {/* Infinite Horizontal Marquee Styles */}
      <style>{`
        @keyframes bentoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* --- SECTION 0: FULL HERO VISUAL (TOP BANNER) --- */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        height: '480px',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '50px',
      }}>
        <img
          src="/asset/images/Tuong an/KV-2023-lowres.jpg"
          alt="Main Hero Key Visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* --- SECTION 1: HEADER & META DATA --- */}
      <div style={{ width: '100%', maxWidth: '840px', textAlign: 'left', marginBottom: '12px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
            {data.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#9aa0a6', margin: '10px 0 0 0', fontWeight: '400' }}>
            {data.category}
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #2d2e33', margin: '40px 0' }} />

        {/* --- SECTION 2: TWO-COLUMN EXPLANATION GRID --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '48px',
          marginBottom: '60px',
          lineHeight: '1.6',
          textAlign: 'left'
        }}>
          {/* Left Column: Role Details */}
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', gap: '28px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9aa0a6', letterSpacing: '0.05em', marginBottom: '6px' }}>My Role</div>
              <div style={{ fontSize: '15px', color: '#ffffff', fontWeight: '500' }}>{data.role}</div>
              <div style={{ fontSize: '14px', color: '#9aa0a6', marginTop: '2px' }}>{data.services}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9aa0a6', letterSpacing: '0.05em', marginBottom: '6px' }}>Client</div>
              <div style={{ fontSize: '15px', color: '#ffffff', fontWeight: '500' }}>{data.client}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9aa0a6', letterSpacing: '0.05em', marginBottom: '6px' }}>Timeline</div>
              <div style={{ fontSize: '15px', color: '#ffffff', fontWeight: '500' }}>{data.timeline}</div>
            </div>
          </div>

          {/* Right Column: Descriptions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9aa0a6', letterSpacing: '0.05em', marginBottom: '8px' }}>Description</div>
              <p style={{ fontSize: '18px', color: '#ffffff', margin: 0, fontWeight: '400' }}>{data.description}</p>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#9aa0a6', letterSpacing: '0.05em', marginBottom: '8px' }}>Context</div>
              <p style={{ fontSize: '15px', color: '#cfd4da', margin: 0 }}>{data.context}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: RE-CONFIGURED BENTO GRID --- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: '260px',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px'
      }}>

        {/* Bento 1: Carousel Gallery */}
        <div style={{
          gridColumn: 'span 8',
          gridRow: 'span 1',
          backgroundColor: '#1c1d22',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex' }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              width: 'max-content',
              alignItems: 'center',
              animation: 'bentoMarquee 25s linear infinite',
              padding: '0 6px'
            }}>
              {[...scrollingImages, ...scrollingImages].map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt="Social Media Asset Thumbnail"
                  style={{ height: '70%', width: 'auto', objectFit: 'cover', borderRadius: '14px', flexShrink: 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bento 2: REVISED - Interactive GSAP Phone Mockup Slot */}
        <div
          onMouseEnter={() => setIsPhoneHovered(true)}
          onMouseLeave={() => setIsPhoneHovered(false)}
          style={{
            gridColumn: 'span 4',
            gridRow: 'span 2',
            backgroundColor: '#1c1d22',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}

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
              transformOrigin: 'center center'
            }}
          >
            <img
              ref={phoneImageRef}
              src={phoneImages[phoneIndex - 1]}
              alt={`Interactive App Mockup Screen ${phoneIndex}`}
              style={{
                height: '80%',
                objectFit: 'contain',
                willChange: 'transform',
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))'
              }}
            />
          </div>
          {/* Small "click around" visual cue that fades out completely on hover */}
          <div style={{
            position: 'absolute',
            top: '12%',
            right: '25%',
            fontSize: '13px',
            fontWeight: 500,
            color: '#ffffffff',
            letterSpacing: '0.06em',
            pointerEvents: 'none', // Prevents mouse blocking
            opacity: isPhoneHovered ? 0 : 0.6,
            transform: isPhoneHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
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

        {/* Bento 3: Dynamic Content Slot B */}
        <div style={{
          gridColumn: 'span 4',
          gridRow: 'span 1',
          backgroundColor: '#1c1d22',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#5f6368',
          fontSize: '13px',
          border: '1px dashed #2d2e33'
        }}>
          + Long Secondary Showcase Block (Content Box B)
        </div>

      </div>

    </div>
  );
}
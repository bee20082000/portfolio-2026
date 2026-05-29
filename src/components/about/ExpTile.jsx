import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './ExpTile.module.css';
import { audioManager } from '../../utils/audio';

// EASILY ADJUST TILE SETTINGS HERE:
const TILE_WIDTH = "span 5";
const TILE_HEIGHT = "span 5";
const TILE_BG_COLOR = "#EDE2CF";
const TILE_TEXT_COLOR = "#13131A";
const TILE_RADIUS = "5px";

// DOT NAV COLORS
const DOT_INACTIVE_COLOR = "rgba(19, 19, 26, 0.15)";
const DOT_ACTIVE_COLOR = "rgba(19, 19, 26, 0.85)";

export default function ExpTile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const tileRef = useRef(null);

  const expData = [
    { r: 'Designer', c: 'Axon Active', y: '2024–now', bg: '#EFBEEB', fg: '#000000', img: '/asset/img/exp/1.svg' },
    { r: 'Freelance Designer', c: 'Lop Creative', y: '2023-now', bg: '#FEFB54', fg: '#000000', img: '/asset/img/exp/2.svg' },
    { r: 'Creative Junior', c: 'DDB Việt Nam', y: '2022–24', bg: '#F19737', fg: '#000000', img: '/asset/img/exp/3.svg' },
    { r: 'Research Assistant', c: 'Ipsos', y: '2021–22', bg: '#1AAEFC', fg: '#000000', img: '/asset/img/exp/4.svg' },
    { r: 'Marketing Assistant', c: 'SEA Education', y: '2020–21', bg: '#6ACD4F', fg: '#000000', img: '/asset/img/exp/5.svg' }
  ];

  const playClickSound = () => {
    audioManager.play('/asset/audio/oxidvideos-taking-playing-card-522520.mp3', 0.4);
  };

  const handleCardClick = (idx, e) => {
    if (e) e.stopPropagation();
    if (idx !== activeIndex) {
      playClickSound();
      setActiveIndex(idx);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeIndex === 0) return;
    playClickSound();
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIndex === expData.length - 1) return;
    playClickSound();
    setActiveIndex((prev) => prev + 1);
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    expData.forEach((_, i) => {
      const diff = i - activeIndex;

      let xOffset = 0;
      let yOffset = 0;
      let scale = 1;
      let rotateVal = 0;
      let opacityVal = 1;
      let zIndex = 50;

      if (diff === 0) {
        // Active Card: Featured front and center
        xOffset = 0;
        yOffset = 0;
        scale = 1.05;
        rotateVal = 0;
        opacityVal = 1;
        zIndex = 50;
      } else if (diff > 0) {
        // Upcoming Cards: Gorgeous cascading stack shifted to the right with extra breathing room
        xOffset = diff * 34; // Shifted right for a layered preview stack
        yOffset = diff * 0; // Gentle upward shift for a 2.5D cascade
        scale = 1 - (diff * 0.045); // Scale down slightly to imply physical depth
        rotateVal = diff * 1.5; // Dynamic subtle twist to the right to make the stack organic
        opacityVal = 1;
        zIndex = 50 - diff; // Layered sequentially underneath
      } else {
        // Viewed Cards: Swept away cleanly to the left (extended past -220px to clear the new 190px width!)
        xOffset = -220;
        yOffset = 15; // Natural gravity drop on swipe
        scale = 0.92;
        rotateVal = -10; // Hand-tossed rotation
        opacityVal = 0; // Seamless fade
        zIndex = 50 + diff; // Keep exit slide on top of previous cards
      }

      gsap.to(`.card-${i}`, {
        x: xOffset,
        y: yOffset,
        rotate: rotateVal,
        scale: scale,
        opacity: opacityVal,
        zIndex: zIndex,
        duration: 0.65, // Responsive, premium transition duration
        ease: 'power3.out', // Silk-smooth deceleration
        overwrite: 'auto',
      });
    });
  }, { dependencies: [activeIndex], scope: containerRef });

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === expData.length - 1;

  return (
    <div
      ref={tileRef}
      className={`tile ${styles['tile-exp']} r3`}
      id="exp"
      data-i="4"
      style={{ gridColumn: TILE_WIDTH, gridRow: TILE_HEIGHT, height: '100%', backgroundColor: TILE_BG_COLOR, color: TILE_TEXT_COLOR, "--tile-radius": TILE_RADIUS, position: 'relative', overflow: 'hidden' }}
    >
      {/* Darkened and blurred background photo layer */}
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/asset/img/DSC1593.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px) brightness(0.35)', // blurred and darkened perfectly
          transform: 'scale(1.1)', // scale up slightly to hide blur boundary clipping at the edges
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />    
      */}

      <div className="inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px', position: 'relative', zIndex: 1 }}>

        {/* Absolute Stacking Container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div ref={containerRef} style={{ width: '190px', height: '250px', position: 'relative' }}>

            {expData.map((e, i) => (
              <div
                className={`card-${i}`}
                key={i}
                onClick={(event) => handleCardClick(i, event)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '190px',
                  height: '250px',
                  backgroundColor: e.bg,
                  color: e.fg,
                  borderRadius: TILE_RADIUS,
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: i >= activeIndex ? 'auto' : 'none', // Discarded past cards don't intercept clicks
                }}
              >
                {/* Custom Image Area */}
                <div style={{
                  flex: 1,
                  borderRadius: TILE_RADIUS,
                  overflow: 'hidden', // Clips the image to the border radius
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px', // breathing room for beautiful vector graphics
                }}>
                  <img
                    src={e.img}
                    alt={`${e.r} at ${e.c}`}
                    draggable="false" // Prevents weird dragging behavior on images
                    style={{
                      width: '120%',
                      height: '120%',
                      objectFit: 'contain', // Keep SVG vector graphics fully contained without cropping
                      display: 'block'
                    }}
                  />
                </div>

                {/* Content Bottom Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {e.r}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: 400 }}>
                    <span>{e.y}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}>{e.c}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Dot Navigation & Arrows Area */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          height: '32px',
          marginTop: '8px'
        }}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              color: 'inherit',
              opacity: isAtStart ? 0.2 : 0.6,
              cursor: isAtStart ? 'default' : 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => { if (!isAtStart) e.currentTarget.style.opacity = 1; }}
            onMouseLeave={(e) => { if (!isAtStart) e.currentTarget.style.opacity = 0.6; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {expData.map((_, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(idx, null);
                }}
                style={{
                  width: activeIndex === idx ? '16px' : '6px',
                  height: '6px',
                  borderRadius: TILE_RADIUS,
                  backgroundColor: activeIndex === idx ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              color: 'inherit',
              opacity: isAtEnd ? 0.2 : 0.6,
              cursor: isAtEnd ? 'default' : 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => { if (!isAtEnd) e.currentTarget.style.opacity = 1; }}
            onMouseLeave={(e) => { if (!isAtEnd) e.currentTarget.style.opacity = 0.6; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

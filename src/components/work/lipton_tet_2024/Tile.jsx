import { useRef } from 'react';
import gsap from 'gsap';
import styles from '../shared/CaseShared.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 20";
const TILE_RADIUS = "5px";
const TILE_HEIGHT = "span 12";

export default function LiptonTet2024Tile({ onSelect, index }) {
  // Refs for elements we want GSAP to animate
  const imageContainerRef = useRef(null);
  const myTileRef = useRef(null);
  const visualWrapRef = useRef(null);
  const labelBarRef = useRef(null);

  // Audio instances declared inside the component scope (lazy-initialized to avoid recreation on every render)
  const clickSound = useRef(null);
  if (!clickSound.current) {
    clickSound.current = new Audio('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3');
    clickSound.current.preload = 'auto';
  }

  const handleClick = (e) => {
    e.stopPropagation();

    if (typeof onSelect === 'function') {
      onSelect('lipton_tet_2024');
    }

    if (clickSound.current) {
      clickSound.current.volume = 0.4;
      clickSound.current.currentTime = 0; // Rewind to start for zero latency on rapid clicks
      clickSound.current.play().catch(err => console.log("Audio playback blocked:", err));
    }

    const tl = gsap.timeline();
    tl.to(myTileRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: 'power2.out'
    })
      .to(myTileRef.current, {
        scale: 1,
        duration: 0.35,
        ease: 'back.out(2)'
      });
  };

  const handleMouseEnter = () => {
    import('./Modal').catch(() => { });

    
    // GSAP Butter-Smooth Height Compression
    gsap.to(visualWrapRef.current, {
      bottom: 26,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
    // GSAP Pure Opacity Fade-in
    gsap.to(labelBarRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: "power1.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    
    // GSAP Butter-Smooth Restoration
    gsap.to(visualWrapRef.current, {
      bottom: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
    // GSAP Pure Opacity Fade-out
    gsap.to(labelBarRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      overwrite: "auto"
    });
  };

  return (
    <div
      ref={myTileRef}
      className={`tile tile-case ${styles['tile-case']} tile-liptontet2024`}
      data-i={index}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: 'pointer',
        height: '100%',
        alignSelf: 'stretch',
        position: 'relative',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        overflow: 'visible',
        borderRadius: TILE_RADIUS,
        transformOrigin: 'center center',
        gridColumn: TILE_WIDTH,
        gridRow: TILE_HEIGHT,
      }}
    >
      <div
        ref={visualWrapRef}
        className="tile-visual-wrap"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: TILE_RADIUS,
          overflow: 'hidden',
          background: '#080808'
        }}
      >
        {/* Background Image Container */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/asset/images/Lipton/tet/Create_an_ultra-realistic,_premium_editorial_202605241507.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
            willChange: 'transform',
          }}
        />
      </div>

      {/* Brand & Project Bottom Label Bar */}
      <div ref={labelBarRef} className="tile-label-bar">
        <span className="brand-name">Lipton</span>
        <span className="project-name">Tet Packaging</span>
      </div>
    </div>
  );
}

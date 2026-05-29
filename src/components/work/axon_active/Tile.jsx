import { useRef } from 'react';
import gsap from 'gsap';
import styles from '../shared/CaseShared.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 12";
const TILE_RADIUS = "5px";
const TILE_HEIGHT = "span 7";

export default function AxonActiveTile({ onSelect, index }) {
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
      onSelect('axon_active');
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

    
    // GSAP Pure Opacity Fade-in
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
    // Scale up the image slightly on hover
    gsap.to(imageContainerRef.current, {
      scale: 1.08,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    
    // GSAP Pure Opacity Fade-out
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
    // Reset image scale
    gsap.to(imageContainerRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <div
      ref={myTileRef}
      className={`tile tile-case ${styles['tile-case']} tile-axon-active`}
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
        willChange: 'transform',
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
          background: '#030f1e'
        }}
      >
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/asset/images/axon active/TDC/cover.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Brand & Project Bottom Label Bar */}
      <div ref={labelBarRef} className="tile-label-bar">
        <span className="brand-name">Axon Active</span>
        <span className="project-name">New office design</span>
      </div>
    </div>
  );
}

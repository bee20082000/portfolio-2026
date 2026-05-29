import { useRef } from 'react';
import gsap from 'gsap';
import { audioManager } from '../../../utils/audio';
import styles from '../shared/CaseShared.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 6";
const TILE_RADIUS = "5px";
const TILE_HEIGHT = "span 7";

export default function ThuyenXuaFoodTile({ onSelect, index }) {
  // Refs for elements we want GSAP to animate
  const imageContainerRef = useRef(null);
  const myTileRef = useRef(null);
  const visualWrapRef = useRef(null);
  const labelBarRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    if (typeof onSelect === 'function') {
      onSelect('thuyen_xua_food');
    }

    audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4);

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
      className={`tile tile-case ${styles['tile-case']} tile-thuyen-xua-food`}
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
          background: '#000d1a'
        }}
      >
        {/* Background Image Container */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/asset/images/Thuyen xua/TX-cover.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
            willChange: 'transform',
          }}
        />


      </div>

      {/* Brand & Project Bottom Label Bar */}
      <div ref={labelBarRef} className="tile-label-bar">
        <span className="brand-name">Thuyen Xua Food</span>
        <span className="project-name">Gift Packaging</span>
      </div>
    </div>
  );
}

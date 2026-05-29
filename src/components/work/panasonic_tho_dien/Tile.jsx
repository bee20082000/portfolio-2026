import { useRef } from 'react';
import gsap from 'gsap';
import { audioManager } from '../../../utils/audio';
import styles from '../shared/CaseShared.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 15";
const TILE_RADIUS = "5px";
const TILE_HEIGHT = "span 7";

export default function PanasonicThoDienTile({ onSelect, index }) {
  const myTileRef = useRef(null);
  const visualWrapRef = useRef(null);
  const labelBarRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    if (typeof onSelect === 'function') {
      onSelect('panasonic_tho_dien');
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
      className={`tile tile-case ${styles['tile-case']} tile-panasonicthodien`}
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
          background: '#000b18'
        }}
      >
        {/* Background Image Container */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/asset/images/Panasonic/Panasonic_2022_KV_ngang.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
            willChange: 'transform',
          }}
        />
        {/* Large bold brand design graphic background element (aesthetic detail) */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '-10px',
          fontSize: '55px',
          fontWeight: 900,
          color: 'rgba(255,33,86,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 2,
        }}>
          PANASONIC
        </div>
      </div>

      {/* Brand & Project Bottom Label Bar */}
      <div ref={labelBarRef} className="tile-label-bar">
        <span className="brand-name">Panasonic</span>
        <span className="project-name">Tho Dien Thoi Hien Dai</span>
      </div>
    </div>
  );
}

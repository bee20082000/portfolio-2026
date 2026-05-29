import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { audioManager } from '../../../utils/audio';
import styles from '../shared/CaseShared.module.css';

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 5";
const TILE_RADIUS = "5px";
const TILE_HEIGHT = "span 7";

export default function TuonganTile({ onSelect, index }) {
  // Ref to track hover state without triggering re-renders
  const isHoveringRef = useRef(false);
  const activeTweensRef = useRef([]);

  // Refs for elements we want GSAP to animate
  const imageContainerRef = useRef(null);
  const visualcue = useRef(null);
  const buttonRef = useRef(null);
  const firework1Ref = useRef(null);
  const firework2Ref = useRef(null);
  const myTileRef = useRef(null);

  // Isolated tactile click handler function
  const handleClick = (e) => {
    e.stopPropagation();

    // Trigger modal immediately to prevent UX blocking
    if (typeof onSelect === 'function') {
      onSelect('tuongan');
    }

    audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4);

    // Bouncy scale-down micro-interaction
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

  const triggerRandomBurst = (element, delayTime = 0) => {
    if (!isHoveringRef.current || !element) return;

    const randomX = gsap.utils.random(5, 75);
    const randomY = gsap.utils.random(20, 300);
    const randomScale = gsap.utils.random(0.5, 0.9);
    const randomRotate = gsap.utils.random(-35, 35);

    const tl = gsap.timeline({
      delay: delayTime,
      onComplete: () => {
        activeTweensRef.current = activeTweensRef.current.filter(t => t !== tl);
        triggerRandomBurst(element, gsap.utils.random(0.2, 0.8));
      }
    });

    tl.set(element, {
      left: `${randomX}%`,
      top: `${randomY}px`,
      scale: randomScale,
      rotate: randomRotate,
      opacity: 0
    })
      .to(element, {
        opacity: 1,
        scale: randomScale * 1.15,
        duration: 0.35,
        ease: 'power2.out'
      })
      .to(element, {
        opacity: 0,
        scale: randomScale * 1.2,
        duration: 0.5,
        ease: 'power1.in',
        delay: 0.2
      });

    activeTweensRef.current.push(tl);
  };

  const visualWrapRef = useRef(null);
  const labelBarRef = useRef(null);

  // Dedicated clean entry/exit wrapper handlers for hover mechanics
  const handleMouseEnter = () => {
    isHoveringRef.current = true;

    // Animate the text/visual cue layer on hover
    gsap.to(visualcue.current, {
      scale: 1.05,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Animate the heavy oil bottle layout properties on hover
    gsap.to(imageContainerRef.current, {
      y: 600,
      x: 120,
      scale: 1.05,
      rotate: -50,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Start fireworks
    triggerRandomBurst(firework1Ref.current, 0);
    triggerRandomBurst(firework2Ref.current, 0.4);

    // Eagerly preload the modal chunk on hover
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
    isHoveringRef.current = false;

    // Reset visual cue layer
    gsap.to(visualcue.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Reset oil bottle
    gsap.to(imageContainerRef.current, {
      y: 0,
      x: 0,
      scale: 0.5,
      rotate: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Stop fireworks
    activeTweensRef.current.forEach(tween => tween.kill());
    activeTweensRef.current = [];
    gsap.to([firework1Ref.current, firework2Ref.current], { opacity: 0, duration: 0.2, overwrite: 'auto' });

    
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

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      activeTweensRef.current.forEach(tween => tween.kill());
    };
  }, []);

  return (
    <div
      ref={myTileRef}
      className={`tile tile-case ${styles['tile-case']} tile-tuongan`}
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
          background: '#EF2227'
        }}
      >
        {/* Dynamic Random Fireworks Layers */}
        <img
          ref={firework1Ref}
          src="/asset/images/Tuong an/Phao hoa 1.png"
          alt="Firework Burst 1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '160px',
            height: '160px',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 3,
          }}
        />
        <img
          ref={firework2Ref}
          src="/asset/images/Tuong an/Phao hoa 2.png"
          alt="Firework Burst 2"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '130px',
            height: '130px',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 3,
          }}
        />

        {/* Visual Cue Layer Container */}
        <div
          ref={visualcue}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            willChange: 'transform',
            transform: 'scale(0.95)',
            opacity: 0,
          }}
        >
          <img
            src="/asset/images/Tuong an/VISUAL CUE.png"
            alt="Tuong An Visual Cue"
            style={{
              maxHeight: '20%',
              objectFit: 'contain',
              borderRadius: TILE_RADIUS,
            }}
          />
        </div>

        {/* Main Hero Asset (Oil Bottle) */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            willChange: 'transform',
            transform: 'scale(0.5)',
          }}
        >
          <img
            src="/asset/images/tuongan oil.png"
            alt="Tuong An Oil Bottle"
            style={{
              maxHeight: '120%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: TILE_RADIUS,
            }}
          />
        </div>
      </div>

      {/* Brand & Project Bottom Label Bar */}
      <div ref={labelBarRef} className="tile-label-bar">
        <span className="brand-name">Tuong An Cooking Oil</span>
        <span className="project-name">Tet Campaign</span>
      </div>
    </div>
  );
}

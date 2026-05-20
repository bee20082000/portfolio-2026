import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function TuonganTile({ onSelect, index }) {
  const [isHovered, setIsHovered] = useState(false);

  // Refs for elements we want GSAP to animate
  const imageContainerRef = useRef(null);
  const visualcue = useRef(null);
  const buttonRef = useRef(null);
  const firework1Ref = useRef(null);
  const firework2Ref = useRef(null);
  const myTileRef = useRef(null);

  // Custom Typography Push Refs
  const subtextRef = useRef(null);

  // Audio instances declared inside the component scope
  const clickSound = useRef(new Audio('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3'));
  const hoverSound = useRef(new Audio('/asset/audio/mixkit-arrow-whoosh-1491 (online-video-cutter.com).mp3'));

  // Isolated tactile click handler function
  const handleClick = (e) => {
    e.stopPropagation();

    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof onSelect === 'function') {
          onSelect('tuongan');
        }
      }
    });

    clickSound.current.volume = 0.4;
    clickSound.current.play().catch(err => console.log("Audio playback blocked until user interaction:", err));

    // Bouncy scale-down micro-interaction
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

  // Dedicated clean entry/exit wrapper handlers for hover mechanics
  const handleMouseEnter = () => {
    setIsHovered(true);

    // Play the hover sound seamlessly
    if (hoverSound.current) {
      hoverSound.current.volume = 0.3; // Muted volume fits subtle UI hovers beautifully
      hoverSound.current.currentTime = 0; // Rewind to start in case user rapid-hovers
      hoverSound.current.play().catch(err => console.log("Hover sound deferred:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Animate the text/visual cue layer on hover
    gsap.to(visualcue.current, {
      scale: isHovered ? 1.05 : 0.95,
      opacity: isHovered ? 1 : 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      overwrite: 'auto'
    });

    // Animate the heavy oil bottle layout properties on hover
    gsap.to(imageContainerRef.current, {
      y: isHovered ? 600 : 0,
      x: isHovered ? 120 : 0,
      scale: isHovered ? 1.05 : 0.5,
      rotate: isHovered ? -50 : 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      overwrite: 'auto'
    });

    // ── Ultra-Smooth GSAP Typography Push Effect ──
    gsap.to(subtextRef.current, {
      height: isHovered ? "auto" : 0,
      opacity: isHovered ? 1 : 0,
      marginTop: isHovered ? 8 : 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto"
    });
  }, [isHovered]);

  useEffect(() => {
    const fw1 = firework1Ref.current;
    const fw2 = firework2Ref.current;
    let activeTweens = [];

    const triggerRandomBurst = (element, delayTime = 0) => {
      if (!isHovered || !element) return;

      const randomX = gsap.utils.random(5, 75);
      const randomY = gsap.utils.random(20, 300);
      const randomScale = gsap.utils.random(0.5, 0.9);
      const randomRotate = gsap.utils.random(-35, 35);

      const tl = gsap.timeline({
        delay: delayTime,
        onComplete: () => {
          activeTweens = activeTweens.filter(t => t !== tl);
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

      activeTweens.push(tl);
    };

    if (isHovered) {
      triggerRandomBurst(fw1, 0);
      triggerRandomBurst(fw2, 0.4);
    } else {
      activeTweens.forEach(tween => tween.kill());
      activeTweens = [];
      gsap.to([fw1, fw2], { opacity: 0, duration: 0.2, overwrite: 'auto' });
    }

    return () => {
      activeTweens.forEach(tween => tween.kill());
    };
  }, [isHovered]);

  return (
    <div
      ref={myTileRef}
      className="tile tile-case"
      data-i={index}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: 'pointer',
        height: '560px',
        position: 'relative',
        overflow: 'hidden',
        background: '#ee0b0bff',
        borderRadius: '24px',
        transformOrigin: 'center center',
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
        }}
      >
        <img
          src="/asset/images/Tuong an/VISUAL CUE.png"
          alt="Tuong An Visual Cue"
          style={{
            maxHeight: '20%',
            objectFit: 'contain',
            borderRadius: '12px',
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
        }}
      >
        <img
          src="/asset/images/tuongan oil.png"
          alt="Tuong An Oil Bottle"
          style={{
            maxHeight: '120%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Bottom Footer Area pinned explicitly to the base */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '32px 24px', // Slightly deeper container padding for better typography breathing room
        zIndex: 10,
      }}>
        {/* Container wrapping elements sequentially in a vertical column layout */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          {/* Case Name */}
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            lineHeight: '1.2'
          }}>
            Tuong An Tet Campaign
          </div>

          {/* Subtext Paragraph Area Description (Driven smoothly by GSAP height engine) */}
          <div
            ref={subtextRef}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffffff', // High contrast readable system grey
              letterSpacing: '-0.01em',
              lineHeight: '1.4',
              overflow: 'hidden',
              height: 0, // Initial state setup
              opacity: 0  // Initial state setup
            }}
          >
            Turning traditional Tet blessings into a social movement for younger audiences to join.
          </div>

        </div>
      </div>

    </div>
  );
}
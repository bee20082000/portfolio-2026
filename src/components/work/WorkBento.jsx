import { forwardRef, useState, useEffect, memo, useTransition, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './WorkBento.module.css';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    id: 'moe',
    name: 'Gori Coffee',
    cover: '/asset/images/Moe-Cafe/cover.mp4'
  },
  {
    id: 'chivas',
    name: 'Chivas Tet Catalog',
    cover: '/asset/images/chivas/chivas-cover.mp4'
  },
  {
    id: 'axon_active',
    name: 'Axon Active New Office',
    cover: '/asset/images/axon-active/TDC/cover.jpg'
  },
  {
    id: 'icoffee',
    name: 'GLCF & iCoffee',
    cover: '/asset/images/icoffee/cover.mp4'
  },
  {
    id: 'suzuki_social',
    name: 'Suzuki Social',
    cover: '/asset/images/suzuki/web/cover.mp4'
  },
  {
    id: 'panasonic_tho_dien',
    name: 'Panasonic ElectRI"CITY"',
    cover: '/asset/images/Panasonic/cover.mp4'
  },
  {
    id: 'lipton_tet_2024',
    name: 'Lipton Tet',
    cover: '/asset/images/Lipton/tet/Mockup.jpg'
  },
  {
    id: 'thuyen_xua_food',
    name: 'Thuyen Xua Food',
    cover: '/asset/images/Thuyen-xua/cover-1.jpg'
  },
  {
    id: 'nakivo',
    name: 'Nakivo Calendar',
    cover: '/asset/images/nakivo/cover.mp4'
  },
  {
    id: 'nam_dinh_vu',
    name: 'Nam Dinh Vu Concept',
    cover: '/asset/images/Nam-Dinh-Vu/Cong/JPEG/Cong.jpg'
  },
  {
    id: 'lipton',
    name: 'Lipton Summer',
    cover: '/asset/images/Lipton/summer/Lipton_logo_in_tropical_scene_202605232158.mp4'
  },
  {
    id: 'tuongan',
    name: 'Tuong An Cooking Oil',
    cover: '/asset/images/Tuong-an/tuong-an-cover.jpg'
  },
  {
    id: 'santen',
    name: 'Santen Social',
    cover: '/asset/images/santen/cover.webp'
  }
];

const CoverPreviewItem = memo(({ work, isActive }) => {
  const videoRef = useRef(null);
  const isVideo = work.cover.endsWith('.mp4');

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (isActive) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video playback was interrupted or blocked:", err);
        });
      }
    } else {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch (err) { }
    }
  }, [isActive, isVideo]);

  return (
    <div className={`${styles['cover-item']} ${isActive ? styles['visible'] : ''}`}>
      {isVideo ? (
        <video
          ref={videoRef}
          src={work.cover}
          loop
          muted
          playsInline
          preload="auto"
          className={styles['cover-image']}
        />
      ) : (
        <img
          src={work.cover}
          alt={work.name}
          loading="eager"
          className={styles['cover-image']}
        />
      )}
    </div>
  );
});

CoverPreviewItem.displayName = 'CoverPreviewItem';

const WorkBento = memo(forwardRef(({ onSelect, className, style, id, scroller }, ref) => {
  const [hoveredCover, setHoveredCover] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [shouldRenderPool, setShouldRenderPool] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Lazy render the pool to not block critical resources on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderPool(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (cover) => {
    setShouldRenderPool(true);
    startTransition(() => {
      setHoveredCover(cover);
    });
  };

  const handleMouseLeave = () => {
    startTransition(() => {
      setHoveredCover(null);
    });
  };

  // Track mouse position globally
  const mousePos = useRef({ x: -1, y: -1 });
  const isRestoringFocus = useRef(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleGlobalMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
    };
    const handleWindowFocus = () => {
      // Browsers often restore focus to the last element when a tab is revived,
      // which triggers onFocus. We ignore focus events for a brief window.
      isRestoringFocus.current = true;
      setTimeout(() => { isRestoringFocus.current = false; }, 150);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, []);

  // Reset hovered cover if the bento grid becomes hidden, or on tab switch / window blur
  // Dynamically update hover target based on cursor position during scroll
  useEffect(() => {
    const clearHover = () => {
      startTransition(() => {
        setHoveredCover(null);
      });
    };

    if (style?.visibility === 'hidden') {
      clearHover();
      mousePos.current = { x: -1, y: -1 };
    }

    const handleVisibilityOrBlur = () => {
      clearHover();
      mousePos.current = { x: -1, y: -1 };
    };

    const handleScroll = () => {
      if (style?.visibility === 'hidden') return;
      const { x, y } = mousePos.current;
      if (x === -1 && y === -1) return;

      const el = document.elementFromPoint(x, y);
      const item = el?.closest(`.${styles['work-list-item']}`);

      if (item) {
        const cover = item.getAttribute('data-cover');
        if (cover) {
          setHoveredCover((prev) => (prev !== cover ? cover : prev));
        }
      } else {
        // If the mouse is still inside the work list container, clear it.
        // If it's outside completely, clear it as well.
        setHoveredCover((prev) => (prev !== null ? null : prev));
      }
    };

    window.addEventListener('blur', handleVisibilityOrBlur);
    document.addEventListener('visibilitychange', handleVisibilityOrBlur);

    const target = scroller?.current || window;
    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('blur', handleVisibilityOrBlur);
      document.removeEventListener('visibilitychange', handleVisibilityOrBlur);
      target.removeEventListener('scroll', handleScroll);
    };
  }, [style?.visibility, scroller]);

  // High-performance Scroll-Skew Animation
  useGSAP(() => {
    if (typeof window === 'undefined') return;

    let proxy = { skew: 0 };
    // quickSetter for high-performance updates on all wrapper divs
    let skewSetter = gsap.quickSetter(`.${styles['work-list-item-wrap']}`, "skewY", "deg");
    let clamp = gsap.utils.clamp(-6, 6); // clamp skew between -6 and 6 degrees

    const resetSkew = () => {
      // Kill any in-flight skew tweens and hard-reset to 0 immediately.
      // This prevents the residual skew flash when the modal closes and
      // Lenis jumps back to the saved scroll position.
      gsap.killTweensOf(proxy);
      proxy.skew = 0;
      skewSetter(0);
    };

    const trigger = ScrollTrigger.create({
      trigger: `.${styles['work-list-container']}`,
      scroller: scroller?.current || window,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Ignore extremely high velocities from instant scrollTo jumps
        if (Math.abs(velocity) > 8000) return;
        let skew = clamp(velocity / -450);
        // smoothly transition to the velocity skew
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    const handleModalClose = () => {
      resetSkew();
      setClickedId(null);
    };

    // When modal closes, immediately reset skew before the scroll jump
    // fires and before ScrollTrigger processes the velocity spike
    window.addEventListener('modalScrollClose', handleModalClose);

    return () => {
      trigger.kill();
      window.removeEventListener('modalScrollClose', handleModalClose);
    };
  }, { dependencies: [scroller], scope: ref });

  return (
    <div
      id={id}
      ref={ref}
      className={`${styles['work-wrapper']} ${className || ''}`}
      style={style}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background cover photo preview pool */}
      {shouldRenderPool && createPortal(
        <div className={`${styles['cover-preview']} ${hoveredCover ? styles['visible'] : ''}`}>
          {WORKS.map((work) => (
            <CoverPreviewItem
              key={work.id}
              work={work}
              isActive={hoveredCover === work.cover}
            />
          ))}
        </div>,
        document.body
      )}

      <div className={styles['work-list-container']} data-work-list="true">
        {WORKS.map((work) => (
          <div key={work.id} className={styles['work-list-item-wrap']}>
            <button
              className={`work-list-item ${styles['work-list-item']} ${hoveredCover === work.cover ? styles['hovered'] : ''} ${clickedId === work.id ? styles['clicked'] : ''}`}
              data-cover={work.cover}
              onClick={() => {
                handleMouseLeave();
                setClickedId(work.id);
                onSelect(work.id);
              }}
              onMouseEnter={() => handleMouseEnter(work.cover)}
              onMouseMove={() => {
                if (hoveredCover !== work.cover) {
                  handleMouseEnter(work.cover);
                }
              }}
              onMouseLeave={handleMouseLeave}
              onFocus={(e) => {
                if (!isRestoringFocus.current && e.target.matches(':focus-visible')) {
                  handleMouseEnter(work.cover);
                }
              }}
              onBlur={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleMouseLeave();
                  setClickedId(work.id);
                  onSelect(work.id);
                }
              }}
            >
              {work.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}));

WorkBento.displayName = 'WorkBento';

export default WorkBento;

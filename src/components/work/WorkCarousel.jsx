import {
  forwardRef,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { gsap } from 'gsap';
import styles from './WorkCarousel.module.css';

/* ─── CARD DATA ─────────────────────────────────────────────── */

export const WORKS = [
  { id: 'moe',                name: 'Gori Coffee',               cover: '/asset/images/Moe-Cafe/cover.mp4',                                            category: 'Brand Identity', year: '2024' },
  { id: 'chivas',             name: 'Chivas Tet Catalog',        cover: '/asset/images/chivas/chivas-cover.mp4',                                        category: 'Campaign',       year: '2024' },
  { id: 'axon_active',        name: 'Axon Active New Office',    cover: '/asset/images/axon-active/TDC/cover.webp',                                     category: 'Environmental',  year: '2024' },
  { id: 'icoffee',            name: 'GLCF & iCoffee',           cover: '/asset/images/icoffee/cover.mp4',                                              category: 'Brand Film',     year: '2024' },
  { id: 'suzuki_social',      name: 'Suzuki Social',             cover: '/asset/images/suzuki/web/cover.mp4',                                           category: 'Social Media',   year: '2024' },
  { id: 'panasonic_tho_dien', name: 'Panasonic ElectRI"CITY"',  cover: '/asset/images/Panasonic/cover.mp4',                                            category: 'Campaign',       year: '2023' },
  { id: 'lipton_tet_2024',    name: 'Lipton Tet',                cover: '/asset/images/Lipton/tet/Mockup.jpg',                                          category: 'Campaign',       year: '2024' },
  { id: 'thuyen_xua_food',    name: 'Thuyen Xua Food',           cover: '/asset/images/Thuyen-xua/cover-1.webp',                                        category: 'Brand Identity', year: '2024' },
  { id: 'nakivo',             name: 'Nakivo Calendar',           cover: '/asset/images/nakivo/cover.mp4',                                               category: 'Print Design',   year: '2023' },
  { id: 'nam_dinh_vu',        name: 'Nam Dinh Vu Concept',       cover: '/asset/images/Nam-Dinh-Vu/Cong/JPEG/Cong.webp',                                category: 'Concept',        year: '2023' },
  { id: 'lipton',             name: 'Lipton Summer',             cover: '/asset/images/Lipton/summer/Lipton_logo_in_tropical_scene_202605232158.mp4',  category: 'Campaign',       year: '2025' },
  { id: 'tuongan',            name: 'Tuong An Cooking Oil',      cover: '/asset/images/Tuong-an/tuong-an-cover.webp',                                   category: 'Brand Identity', year: '2023' },
  { id: 'santen',             name: 'Santen Social',             cover: '/asset/images/santen/cover.webp',                                              category: 'Social Media',   year: '2024' },
];

/* ─── COVER MEDIA ─────────────────────────────────────────────── */
const CardCoverMedia = memo(({ work, isActive }) => {
  const videoRef = useRef(null);
  const isVideo  = work.cover.endsWith('.mp4');

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (isActive) {
      const p = videoRef.current.play();
      if (p) p.catch(() => {});
    } else {
      videoRef.current.pause();
      try { videoRef.current.currentTime = 0; } catch (_) {}
    }
  }, [isActive, isVideo]);

  return isVideo ? (
    <video ref={videoRef} src={work.cover} loop muted playsInline preload="none"
      className={styles['card-cover-media']} />
  ) : (
    <img src={work.cover} alt={work.name} loading="lazy" width="480" height="300"
      className={styles['card-cover-media']} />
  );
});
CardCoverMedia.displayName = 'CardCoverMedia';

/* ─── SINGLE CARD ─────────────────────────────────────────────── */
const WorkCard = memo(({ work, index, isActive, onClick }) => {
  const slotRef  = useRef(null);
  const innerRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!slotRef.current || !innerRef.current) return;
    
    // Slide up on hover, keeping the uniform 3D deck angle
    gsap.to(innerRef.current, {
      y: -40,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    gsap.timeline()
      .to(innerRef.current, { scale: 0.93, duration: 0.05,  ease: 'power2.in' })
      .to(innerRef.current, { scale: 1,    duration: 0.35, ease: 'elastic.out(1, 0.5)' });
    setTimeout(() => { setIsClicked(false); onClick(work.id); }, 100);
  }, [work.id, onClick]);

  return (
    <div
      ref={slotRef}
      className={
        `${styles['card-slot']} work-card` +
        (isActive  ? ` ${styles['is-active']}`  : '') +
        (isClicked ? ` ${styles['is-clicked']}` : '')
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${work.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
      }}
    >
      <div ref={innerRef} className={styles['card-inner']}>
        <div className={styles['card-face']}>
          <div className={styles['card-cover']}>
            <CardCoverMedia work={work} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
});
WorkCard.displayName = 'WorkCard';

/* ─── CAROUSEL ─────────────────────────────────────────────────── */
const WorkCarousel = forwardRef(({ onSelect, style, id, className }, ref) => {
  const wrapperRef = useRef(null);
  const trackRef   = useRef(null);
  const dealTlRef  = useRef(null);
  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, scrollX: 0 });

  // Scroll-stack animation state
  const scrollEndTimer  = useRef(null);
  const stackAmountObj  = useRef({ value: 0 });
  const stackTween      = useRef(null);
  const isScrolling     = useRef(false);
  const cardsData       = useRef([]); // Cache for layout thrashing prevention

  const [activeIndex, setActiveIndex] = useState(0);

  /* ── CACHE CARD POSITIONS ON MOUNT / RESIZE ─────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateCache = () => {
      cardsData.current = Array.from(track.querySelectorAll('.work-card')).map(card => ({
        card,
        inner: card.querySelector(`.${styles['card-inner']}`),
        cx: card.offsetLeft + card.offsetWidth / 2,
      }));
    };
    // Need to wait slightly for layout to settle (e.g. images loading)
    const t = setTimeout(updateCache, 100);
    window.addEventListener('resize', updateCache);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateCache);
    };
  }, []);

  /* ── Forward DOM ref (HomeGrid needs the real DOM node for GSAP) ── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  });

  /* ── DEAL ANIMATION ─────────────────────────────────────────────── */
  const dealCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slots = Array.from(track.querySelectorAll('.work-card'));
    if (!slots.length) return;

    if (dealTlRef.current) dealTlRef.current.kill();

    // Start from stacked "deck" state
    gsap.set(slots, { opacity: 0, y: 80, scale: 0.75, rotation: 0 });

    const tl = gsap.timeline();
    dealTlRef.current = tl;

    // Brief deck pulse before dealing
    if (slots[0]) {
      tl.to(slots[0], { scale: 0.82, duration: 0.08, ease: 'power2.out' }, 0)
        .to(slots[0], { scale: 0.75, duration: 0.05, ease: 'power2.in'  }, 0.08);
    }

    // Deal each card with spring physics
    const mid = (slots.length - 1) / 2;
    slots.forEach((slot, i) => {
      const restRot = mid === 0 ? 0 : ((i - mid) / mid) * 3.5;
      tl.to(slot, {
        opacity: 1, y: 0, scale: 1, rotation: restRot,
        duration: 0.45, ease: 'elastic.out(1, 0.7)',
      }, 0.03 + i * 0.03);
    });
    return tl;
  }, []);

  /* ── Event: HomeGrid dispatches 'workCarouselDeal' on tab switch ── */
  useEffect(() => {
    const onDeal = () => dealCards();
    window.addEventListener('workCarouselDeal', onDeal);
    return () => window.removeEventListener('workCarouselDeal', onDeal);
  }, [dealCards]);

  /* ── Fallback: MutationObserver fires deal when GSAP makes wrapper visible ── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      if (el.style.visibility !== 'hidden' && el.style.opacity !== '0') {
        dealCards();
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [dealCards]);

  /* ── SCROLL STACK ANIMATION ─────────────────────────────────────
     Cards smoothly translate towards the center (overlap heavily)
     while scrolling to simulate a playing card deck shuffle.
     Uses a generic 0..1 proxy so animations are never abruptly cut. */
  const renderStack = useCallback(() => {
    const track = trackRef.current;
    if (!track || !cardsData.current.length) return;
    
    const amt = stackAmountObj.current.value;
    const scrollX = track.scrollLeft;
    const trackW = track.clientWidth;
    const trackCX = scrollX + trackW / 2;

    cardsData.current.forEach(({ card, inner, cx }) => {
      if (!inner) return;

      const offset = cx - trackCX; 

      // Fluid and correct same-side stacking
      // Pull almost entirely to center (0.97) to tightly pack like a deck
      const pullX = -offset * 0.97 * amt;
      // Reduce Z pushback so the deck is physically thinner
      const pushZ = -Math.abs(offset) * 0.15 * amt;
      const rotateY = -28 * amt; // All cards face the same side
      
      // Smooth wave slide-up for the center card
      const dist = Math.abs(offset);
      // Creates a smooth peak exactly at the center
      const slideUpFactor = Math.max(0, 1 - (dist / 280)); 
      const pullY = -60 * Math.pow(slideUpFactor, 1.5) * amt;
      
      // Dynamically compute zIndex so the center-most card is ALWAYS on top.
      // This prevents clipping when scrolling quickly before the active class updates.
      const zIndex = Math.round(1000 - Math.abs(offset));

      gsap.set(card, { zIndex });
      gsap.set(inner, {
        x: pullX,
        y: pullY,
        z: pushZ,
        rotateY: rotateY,
      });
    });
  }, []);

  const startStacking = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    if (stackTween.current) stackTween.current.kill();
    stackTween.current = gsap.to(stackAmountObj.current, {
      value: 1,
      duration: 0.15,
      ease: 'power2.out',
      onUpdate: renderStack
    });
  }, [renderStack]);

  const stopStacking = useCallback(() => {
    if (!isScrolling.current) return;
    isScrolling.current = false;
    if (stackTween.current) stackTween.current.kill();
    stackTween.current = gsap.to(stackAmountObj.current, {
      value: 0,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: renderStack
    });
  }, [renderStack]);

  /* ── ACTIVE CARD INDEX SYNC ─────────────────────────────────── */
  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || !cardsData.current.length) return;
    
    const scrollX = track.scrollLeft;
    const trackW = track.clientWidth;
    const trackCX = scrollX + trackW / 2;
    
    let closestIdx = 0;
    let closestDist = Infinity;
    
    cardsData.current.forEach(({ cx }, i) => {
      const dist = Math.abs(cx - trackCX);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });
    setActiveIndex(closestIdx);
  }, []);

  /* ── SCROLL EVENT: drive stack + index sync ─────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf;

    const onScroll = () => {
      startStacking();
      // Ensure positions instantly map to current scroll even if tween hasn't ticked
      renderStack();

      // Debounced sync for active index
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncActiveIndex);

      // Stop stack after scrolling ceases
      clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(stopStacking, 80);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(scrollEndTimer.current);
      if (stackTween.current) stackTween.current.kill();
    };
  }, [syncActiveIndex, startStacking, stopStacking, renderStack]);

  /* ── SCROLL TO CARD ─────────────────────────────────────────── */
  const scrollToCard = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const slot = track.querySelectorAll('.work-card')[index];
    if (!slot) return;
    track.scrollTo({ left: slot.offsetLeft - (track.clientWidth - slot.offsetWidth) / 2, behavior: 'smooth' });
  }, []);

  /* ── KEYBOARD NAVIGATION ────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || wrapper.style.visibility === 'hidden') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(Math.min(activeIndex + 1, WORKS.length - 1)); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToCard(Math.max(activeIndex - 1, 0)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, scrollToCard]);

  /* ── DRAG-TO-SCROLL ─────────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const down = (e) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      dragStart.current  = { x: e.clientX, scrollX: track.scrollLeft };
      track.setPointerCapture(e.pointerId);
    };
    const move = (e) => { if (!isDragging.current) return; track.scrollLeft = dragStart.current.scrollX - (e.clientX - dragStart.current.x); };
    const up   = ()  => { isDragging.current = false; };
    track.addEventListener('pointerdown',   down);
    track.addEventListener('pointermove',   move);
    track.addEventListener('pointerup',     up);
    track.addEventListener('pointercancel', up);
    return () => {
      track.removeEventListener('pointerdown',   down);
      track.removeEventListener('pointermove',   move);
      track.removeEventListener('pointerup',     up);
      track.removeEventListener('pointercancel', up);
    };
  }, []);

  /* ── WHEEL → HORIZONTAL ─────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.8;
    };
    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, []);

  /* ── CENTER FIRST CARD ON MOUNT ─────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    requestAnimationFrame(() => {
      const first = track.querySelectorAll('.work-card')[0];
      if (!first) return;
      track.scrollLeft = first.offsetLeft - (track.clientWidth - first.offsetWidth) / 2;
    });
  }, []);

  return (
    <div
      id={id}
      ref={wrapperRef}
      className={`${styles['carousel-wrapper']} ${className || ''}`}
      style={style}
    >
      {/* Header */}
      <div className={styles['carousel-header']}>
        <span className={styles['carousel-label']}>Selected Work</span>
        <span className={styles['carousel-counter']}>
          <span className={styles['counter-active']}>{String(activeIndex + 1).padStart(2, '0')}</span>
          &thinsp;/&thinsp;{String(WORKS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll track */}
      <div ref={trackRef} className={styles['carousel-track']}>
        {WORKS.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            index={i}
            isActive={i === activeIndex}
            onClick={onSelect}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className={styles['carousel-dots']}>
        {WORKS.map((_, i) => (
          <div key={i}
            className={`${styles['carousel-dot']}${i === activeIndex ? ' ' + styles['is-active'] : ''}`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div className={styles['carousel-nav-hint']}>
        <span className={styles['nav-key']}>←</span>
        <span className={styles['nav-key']}>→</span>
        <span>navigate</span>
      </div>
    </div>
  );
});

WorkCarousel.displayName = 'WorkCarousel';
export default WorkCarousel;

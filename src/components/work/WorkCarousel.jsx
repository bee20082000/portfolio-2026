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

const SUITS = ['♠', '♥', '♦', '♣'];
const SUIT_COLORS = {
  '♠': 'rgba(140,180,255,0.8)',
  '♥': 'rgba(255,90,110,0.9)',
  '♦': 'rgba(255,170,70,0.9)',
  '♣': 'rgba(100,220,160,0.8)',
};

/* ─── PARTICLE BURST ────────────────────────────────────────── */
const burstParticles = (originEl, count = 10) => {
  if (!originEl) return;
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  const glyphs = ['★', '✦', '◆', '♠', '♥', '·'];
  const colors = ['#ffd700', '#ff6b8a', '#a78bfa', '#34d399'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    Object.assign(p.style, {
      position:       'fixed',
      left:           `${cx}px`,
      top:            `${cy}px`,
      pointerEvents:  'none',
      zIndex:         '9999',
      fontSize:       `${8 + Math.random() * 12}px`,
      color:          colors[Math.floor(Math.random() * colors.length)],
      transform:      'translate(-50%,-50%)',
      willChange:     'transform,opacity',
    });
    document.body.appendChild(p);
    const angle = (360 / count) * i + Math.random() * 30;
    const dist  = 50 + Math.random() * 80;
    const rad   = (angle * Math.PI) / 180;
    gsap.to(p, {
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist - 30,
      opacity: 0,
      scale: 0.2,
      duration: 0.5 + Math.random() * 0.35,
      ease: 'power2.out',
      onComplete: () => p.remove(),
    });
  }
};

/* ─── COVER MEDIA — always plays ───────────────────────────── */
const CardCoverMedia = memo(({ work }) => {
  const videoRef = useRef(null);
  const isVideo  = work.cover.endsWith('.mp4');

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const p = videoRef.current.play();
    if (p) p.catch(() => {});
  }, [isVideo]);

  return isVideo ? (
    <video
      ref={videoRef}
      src={work.cover}
      loop muted playsInline autoPlay
      className={styles['card-cover-media']}
    />
  ) : (
    <img
      src={work.cover}
      alt={work.name}
      loading="lazy"
      width="480" height="300"
      className={styles['card-cover-media']}
    />
  );
});
CardCoverMedia.displayName = 'CardCoverMedia';

/* ─── SINGLE CARD ─────────────────────────────────────────────── */
const WorkCard = memo(({ work, isActive, onClick, suit }) => {
  const slotRef  = useRef(null);
  const innerRef = useRef(null);
  const foilRef  = useRef(null);
  const shineRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const suitColor = SUIT_COLORS[suit];

  /* ── Full 3D tilt — hover moves mouse, inner follows ─────── */
  const handleMouseMove = useCallback((e) => {
    if (!slotRef.current || !innerRef.current) return;
    const rect = slotRef.current.getBoundingClientRect();
    const mx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 .. 0.5
    const my   = (e.clientY - rect.top)  / rect.height - 0.5;

    // 3D tilt — rotateX/Y on inner (slot owns scroll transforms separately)
    gsap.to(innerRef.current, {
      rotateX:  -my * 24,
      rotateY:   mx * 24,
      duration:  0.08,
      ease:      'power2.out',
      overwrite: 'auto',
    });

    // ── Holographic foil ──────────────────────────────────────
    // FIX: use CSS custom properties so background is declarative (no
    // raw style.background assignment which caused the glitch).
    // Only GSAP animates opacity; CSS handles the gradient itself.
    if (foilRef.current) {
      const hue = Math.round((mx + 0.5) * 300); // 0..300 as mouse sweeps left→right
      foilRef.current.style.setProperty('--fx',  `${Math.round((mx + 0.5) * 100)}%`);
      foilRef.current.style.setProperty('--fy',  `${Math.round((my + 0.5) * 100)}%`);
      foilRef.current.style.setProperty('--fh1', hue);
      foilRef.current.style.setProperty('--fh2', hue + 90);
      foilRef.current.style.setProperty('--fh3', hue + 180);
      gsap.to(foilRef.current, { opacity: 0.55, duration: 0.08, overwrite: 'auto' });
    }

    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0.12,
        x: `${mx * 110}%`,
        y: `${my * 50}%`,
        duration: 0.08,
        overwrite: 'auto',
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Spring back to neutral
    gsap.to(innerRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    });
    if (foilRef.current)  gsap.to(foilRef.current,  { opacity: 0, duration: 0.3, overwrite: 'auto' });
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.25, overwrite: 'auto' });
  }, []);

  const handleClick = useCallback(() => {
    setIsClicked(true);

    gsap.timeline()
      .to(innerRef.current, { scale: 0.93, rotateX: 4,  duration: 0.07, ease: 'power3.in'           })
      .to(innerRef.current, { scale: 1.06, rotateX: 0,  duration: 0.13, ease: 'power3.out'          })
      .to(innerRef.current, { scale: 1,                  duration: 0.55, ease: 'elastic.out(1, 0.45)' });

    if (shineRef.current) {
      gsap.timeline()
        .set(shineRef.current, { x: '-80%', y: '0%' })
        .to(shineRef.current,  { opacity: 0.65, x: '0%',  duration: 0.1 })
        .to(shineRef.current,  { opacity: 0,    x: '80%', duration: 0.22, ease: 'power2.in' });
    }

    burstParticles(slotRef.current, 10);
    setTimeout(() => { setIsClicked(false); onClick(work.id); }, 140);
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
      {/* card-inner owns hover tilt — slot owns scroll depth transforms */}
      <div ref={innerRef} className={styles['card-inner']}>
        <div className={styles['card-face']}>
          <div className={styles['card-cover']}>
            <CardCoverMedia work={work} />
          </div>
          {/* Floating meta at bottom */}
          <div className={styles['card-meta-overlay']}>
            <span className={styles['card-suit-mark']} style={{ color: suitColor }}>{suit}</span>
            <div className={styles['card-meta-text']}>
              <span className={styles['card-name']}>{work.name}</span>
              <span className={styles['card-category']}>{work.category} · {work.year}</span>
            </div>
          </div>
        </div>

        {/* Holographic foil — gradient driven by CSS custom properties */}
        <div ref={foilRef} className={styles['card-foil']} />
        {/* Diagonal shine sweep on click */}
        <div ref={shineRef} className={styles['card-shine']} />
      </div>
    </div>
  );
});
WorkCard.displayName = 'WorkCard';

/* ─── CAROUSEL ─────────────────────────────────────────────────── */
const WorkCarousel = forwardRef(({ onSelect, style, id, className }, ref) => {
  const wrapperRef    = useRef(null);
  const trackRef      = useRef(null);
  const dealTlRef     = useRef(null);
  const isDragging    = useRef(false);
  const dragStart     = useRef({ x: 0, scrollX: 0 });
  const isVisible     = useRef(false); // tracks work-tab visibility for Lenis control

  /* ── Smooth-scroll state ─────────────────────────────────── */
  const targetScrollX  = useRef(0);
  const rafRef         = useRef(null);
  const isRafRunning   = useRef(false);

  /* ── Card cache — filled once on mount / resize ──────────── */
  const cardCache      = useRef([]); // { el, inner, cx }

  /* ── Active-index ref — only calls setActiveIndex when changed ── */
  const activeIdxRef   = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ─── clampScroll helper ─────────────────────────────────── */
  const clampScroll = useCallback((v) => {
    const track = trackRef.current;
    if (!track) return v;
    return Math.max(0, Math.min(v, track.scrollWidth - track.clientWidth));
  }, []);

  /* ─── Build card cache ────────────────────────────────────── */
  const buildCache = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slots = Array.from(track.querySelectorAll('.work-card'));
    cardCache.current = slots.map((el) => ({
      el,
      inner: el.querySelector(`.${styles['card-inner']}`),
      cx: el.offsetLeft + el.offsetWidth / 2,
    }));
    targetScrollX.current = clampScroll(targetScrollX.current);
  }, [clampScroll]);

  useEffect(() => {
    const t = setTimeout(buildCache, 150);
    window.addEventListener('resize', buildCache);
    return () => { clearTimeout(t); window.removeEventListener('resize', buildCache); };
  }, [buildCache]);

  /* ─── Forward DOM ref ─────────────────────────────────────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  });

  /* ════════════════════════════════════════════════════════════
     RAF RENDER LOOP
     "Curved Depth Stage": center card is large + bright, side cards
     progressively shrink and sink down, creating a cinema-arc feel.

     Key architecture:
       - gsap.set(slot, { scale, y, opacity }) → scroll depth effect
       - gsap.to(inner, { rotateX, rotateY })  → hover tilt (in WorkCard)
       These write to DIFFERENT elements so they NEVER interfere.
     ════════════════════════════════════════════════════════════ */
  const renderFrame = useCallback(() => {
    const track = trackRef.current;

    if (track) {
      /* ── Lerp scrollLeft → targetScrollX (momentum scroll) ── */
      const diff = targetScrollX.current - track.scrollLeft;
      // Threshold: skip tiny diffs that would cause visual jitter
      if (Math.abs(diff) > 0.15) {
        track.scrollLeft += diff * 0.1; // 10% per frame = ~100ms settle time
      } else if (diff !== 0) {
        track.scrollLeft = targetScrollX.current; // snap exactly when very close
      }

      if (cardCache.current.length) {
        const scrollX = track.scrollLeft;
        const trackCX = scrollX + track.clientWidth / 2;
        // Normalize: half the visible width = 1.0 on our t scale
        const maxDist = track.clientWidth * 0.58;

        let closestIdx  = activeIdxRef.current;
        let closestDist = Infinity;

        cardCache.current.forEach(({ el, inner, cx }, i) => {
          if (!inner) return;

          const offset  = cx - trackCX;
          const absDist = Math.abs(offset);
          const t       = Math.min(absDist / maxDist, 1);
          const tEased  = t * t; // quadratic — gentle near center, steeper at edges

          /*
           * Depth Stage:
           * - scale  : 1.0 at center → 0.70 at far edge (smooth perspective feel)
           * - sinkY  : 0px at center → 75px down at far edge (arc of a stage)
           * - opacity: 1.0 at center → 0.40 at far edge (atmosphere/distance)
           */
          const scale   = 1 - tEased * 0.30;
          const sinkY   = tEased * 75;
          const opacity = 1 - t    * 0.60;
          const zIndex  = Math.round(1000 - absDist);

          if (absDist < closestDist) { closestDist = absDist; closestIdx = i; }

          gsap.set(el, { zIndex, scale, y: sinkY, opacity });
        });

        // Only trigger a React re-render when the active card actually changes
        if (closestIdx !== activeIdxRef.current) {
          activeIdxRef.current = closestIdx;
          setActiveIndex(closestIdx);
        }
      }
    }

    rafRef.current = requestAnimationFrame(renderFrame);
  }, []);

  /* ─── Start / stop RAF ────────────────────────────────────── */
  const startRaf = useCallback(() => {
    if (isRafRunning.current) return;
    isRafRunning.current = true;
    rafRef.current = requestAnimationFrame(renderFrame);
  }, [renderFrame]);

  const stopRaf = useCallback(() => {
    isRafRunning.current = false;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }, []);

  // RAF runs only while the section is on screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startRaf(); else stopRaf();
    }, { threshold: 0 });
    obs.observe(el);
    return () => { obs.disconnect(); stopRaf(); };
  }, [startRaf, stopRaf]);

  /* ════════════════════════════════════════════════════════════
     DEAL ANIMATION — face-flip reveal, no spinning
     ════════════════════════════════════════════════════════════ */
  const dealCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slots = Array.from(track.querySelectorAll('.work-card'));
    if (!slots.length) return;

    if (dealTlRef.current) dealTlRef.current.kill();

    // Reset everything to a single stacked deck below viewport
    gsap.set(slots, { opacity: 0, y: 200, scale: 0.65 });
    slots.forEach(slot => {
      const inner = slot.querySelector(`.${styles['card-inner']}`);
      if (inner) gsap.set(inner, { rotateX: 0, rotateY: 0, scale: 1 });
    });

    const tl = gsap.timeline();
    dealTlRef.current = tl;

    /* Phase 1 — deck rises + pulses 3× to build tension */
    tl.to(slots, { opacity: 1, y: 88,  scale: 0.70, duration: 0.18, ease: 'power3.out' }, 0.00);
    tl.to(slots, {              y: 96,  scale: 0.67, duration: 0.07, ease: 'power2.in'  }, 0.18);
    tl.to(slots, {              y: 82,  scale: 0.73, duration: 0.09, ease: 'power2.out' }, 0.25);
    tl.to(slots, {              y: 90,  scale: 0.69, duration: 0.06, ease: 'power2.in'  }, 0.34);
    tl.to(slots, {              y: 76,  scale: 0.75, duration: 0.10, ease: 'power3.out' }, 0.40);
    tl.to(slots, {              y: 84,  scale: 0.71, duration: 0.07, ease: 'power2.in'  }, 0.50);

    /* Phase 2 — deal each card left-to-right with face-flip reveal */
    slots.forEach((slot, i) => {
      const delay = 0.54 + i * 0.068;
      const inner = slot.querySelector(`.${styles['card-inner']}`);

      // Card shoots up from deck
      tl.to(slot, { y: -36, scale: 1.04, duration: 0.20, ease: 'power2.out' }, delay);
      // Settles into stage position
      tl.to(slot, { y: 0,   scale: 1,    duration: 0.52, ease: 'elastic.out(1, 0.52)' }, delay + 0.17);
      // Landing thud
      tl.to(slot, { y: 6,   duration: 0.04, ease: 'power2.in', yoyo: true, repeat: 1 }, delay + 0.65);

      // Face-flip: card starts face-down (rotateY 75°) and flips open
      if (inner) {
        gsap.set(inner, { rotateY: 72 });
        tl.to(inner, { rotateY: 0, duration: 0.38, ease: 'power2.out' }, delay + 0.05);
      }
    });

    return tl;
  }, []);

  /* Deal on tab switch event */
  useEffect(() => {
    const onDeal = () => dealCards();
    window.addEventListener('workCarouselDeal', onDeal);
    return () => window.removeEventListener('workCarouselDeal', onDeal);
  }, [dealCards]);

  /* Deal when GSAP makes the wrapper visible (MutationObserver) */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      const nowVisible = el.style.visibility !== 'hidden' && el.style.opacity !== '0';
      if (nowVisible && !isVisible.current) {
        isVisible.current = true;
        // Pause Lenis while work section is active so vertical scroll
        // doesn't leak through to the main page
        window.lenis?.stop();
        dealCards();
      } else if (!nowVisible && isVisible.current) {
        isVisible.current = false;
        window.lenis?.start();
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['style'] });
    return () => {
      observer.disconnect();
      // Always restore Lenis on unmount
      window.lenis?.start();
    };
  }, [dealCards]);

  /* ─── WHEEL — vertical scroll drives horizontal card movement ──
     FIX: stopPropagation prevents Lenis from also receiving this
     event (Lenis listens at document/window level via bubbling).   */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation(); // ← Critical: prevents Lenis from seeing this event
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetScrollX.current = clampScroll(targetScrollX.current + delta * 2.8);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [clampScroll]);

  /* ─── DRAG-TO-SCROLL ─────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onDown = (e) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      dragStart.current  = { x: e.clientX, scrollX: targetScrollX.current };
      track.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      targetScrollX.current = clampScroll(
        dragStart.current.scrollX - (e.clientX - dragStart.current.x)
      );
    };
    const onUp = () => { isDragging.current = false; };
    track.addEventListener('pointerdown',   onDown);
    track.addEventListener('pointermove',   onMove);
    track.addEventListener('pointerup',     onUp);
    track.addEventListener('pointercancel', onUp);
    return () => {
      track.removeEventListener('pointerdown',   onDown);
      track.removeEventListener('pointermove',   onMove);
      track.removeEventListener('pointerup',     onUp);
      track.removeEventListener('pointercancel', onUp);
    };
  }, [clampScroll]);

  /* ─── Keyboard navigation ─────────────────────────────────── */
  const scrollToCard = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const slot = track.querySelectorAll('.work-card')[index];
    if (!slot) return;
    targetScrollX.current = clampScroll(
      slot.offsetLeft - (track.clientWidth - slot.offsetWidth) / 2
    );
  }, [clampScroll]);

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

  /* ─── Centre first card on mount ─────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Double-rAF ensures layout is fully settled before reading offsetLeft
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const first = track.querySelector('.work-card');
        if (!first) return;
        const pos = first.offsetLeft - (track.clientWidth - first.offsetWidth) / 2;
        track.scrollLeft      = pos;
        targetScrollX.current = pos;
        buildCache();
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [buildCache]);

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
            suit={SUITS[i % SUITS.length]}
          />
        ))}
      </div>

      {/* Progress dots */}
      <div className={styles['carousel-dots']}>
        {WORKS.map((_, i) => (
          <div
            key={i}
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

import { forwardRef, useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import './AboutBento.css';

// ─── Card Data ───────────────────────────────────────────────────────────────
const CARDS = [
  { id: 0, rotation: -3 },
  { id: 1, rotation: 2.5 },
  { id: 2, rotation: -1.5 },
];

// Rotation & depth offsets for each stack slot (0 = top, 1 = one behind, 2 = furthest behind)
const SLOT_OFFSETS = [
  { extraRotation: 0, yOffset: 0, scale: 1.00, zIndex: 10 },
  { extraRotation: 0, yOffset: 10, scale: 0.97, zIndex: 9 },
  { extraRotation: 0, yOffset: 18, scale: 0.94, zIndex: 8 },
];

function getSlotForCard(cardIndex, activeIndex) {
  const dist = (cardIndex - activeIndex + CARDS.length) % CARDS.length;
  const slot = SLOT_OFFSETS[dist];
  return {
    x: 0,
    y: slot.yOffset,
    rotation: CARDS[cardIndex].rotation + slot.extraRotation,
    scale: slot.scale,
    zIndex: slot.zIndex,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const AboutBento = memo(forwardRef(({ className, style, id, activeTab }, ref) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const counterRef = useRef(null);

  const [activeCard, setActiveCard] = useState(0);
  const activeCardRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const setContainerRef = (el) => {
    containerRef.current = el;
    if (ref) { typeof ref === 'function' ? ref(el) : (ref.current = el); }
  };

  // ── Snap all cards to their current stack slot (instant) ──────────────────
  const snapDeck = useCallback((activeIdx) => {
    CARDS.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (el) gsap.set(el, getSlotForCard(i, activeIdx));
    });
  }, []);

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'about') {
      window.lenis?.start?.();
      return;
    }

    window.lenis?.scrollTo?.(0, { immediate: true });
    window.lenis?.stop?.();
    window.scrollTo(0, 0);

    // Reset to card 0
    activeCardRef.current = 0;
    setActiveCard(0);

    const nav = navRef.current;
    const pill = pillRef.current;
    const counter = counterRef.current;

    // Kill any leftover tweens
    cardRefs.current.forEach(el => el && gsap.killTweensOf(el));
    gsap.killTweensOf([nav, pill, counter].filter(Boolean));

    // Position cards: start above viewport, in their final rotation/scale
    CARDS.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const slot = getSlotForCard(i, 0);
      gsap.set(el, {
        ...slot,
        y: '-130%',
        rotation: slot.rotation,
        opacity: 1,
      });
    });
    gsap.set([nav, pill, counter].filter(Boolean), { y: '20vh', opacity: 1 });

    const tl = gsap.timeline();

    // Stagger cards in from above (back of deck lands first so top card lands on top)
    const landOrder = [CARDS.length - 1, CARDS.length - 2, 0]; // back, middle, front
    landOrder.forEach((cardIdx, step) => {
      const el = cardRefs.current[cardIdx];
      if (!el) return;
      const slot = getSlotForCard(cardIdx, 0);
      tl.to(el, {
        y: slot.y,
        duration: 0.65,
        ease: 'power3.out',
      }, step * 0.08);
    });

    // Slide in UI chrome from bottom off-screen
    tl.to([nav, pill, counter].filter(Boolean), {
      y: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power3.out',
    }, 0.2);

    // ── Key events ──────────────────────────────────────────────────────────
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('switchTab', { detail: 'home' }));
      }
      if (e.key === 'ArrowRight') { navigateCard(1); }
      if (e.key === 'ArrowLeft') { navigateCard(-1); }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.lenis?.start?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);



  // ── Navigate cards ────────────────────────────────────────────────────────
  const navigateTo = useCallback((targetIdx, direction) => {
    const curIdx = activeCardRef.current;
    if (curIdx === targetIdx) return;

    let flingDir = direction;
    if (flingDir === undefined) {
      const diff = (targetIdx - curIdx + CARDS.length) % CARDS.length;
      flingDir = diff === 1 ? 1 : -1;
    }

    activeCardRef.current = targetIdx;
    setActiveCard(targetIdx);

    const currentActive = targetIdx;
    const curEl = cardRefs.current[curIdx];
    const targetEl = cardRefs.current[targetIdx];

    const tl = gsap.timeline({ overwrite: true });

    const isForward = flingDir > 0;

    if (isForward) {
      // ─── FORWARD NAVIGATION (Fling top card OUT) ───────────────────────────
      // Set target z-indices instantly at start to prevent mid-tween flashing/crossing
      CARDS.forEach((_, i) => {
        if (i === curIdx) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const slot = getSlotForCard(i, currentActive);
        tl.set(el, { zIndex: slot.zIndex }, 0);
      });

      if (curEl) {
        const flyX = '120vw';
        const targetSlot = getSlotForCard(curIdx, currentActive);

        // Keep flinging card on top (zIndex: 12) during fling animation
        tl.set(curEl, { zIndex: 12 }, 0);

        // 1. Snappy fling out
        tl.to(curEl, {
          x: flyX,
          scale: 0.9,
          duration: 0.2,
          ease: 'power2.in',
        }, 0);

        // 2. Instantly move behind the stack
        tl.set(curEl, {
          x: 0,
          y: targetSlot.y + 40,
          scale: targetSlot.scale - 0.05,
          zIndex: targetSlot.zIndex
        }, 0.2);

        // 3. Slide up into its new slot
        tl.to(curEl, {
          y: targetSlot.y,
          scale: targetSlot.scale,
          duration: 0.35,
          ease: 'power3.out',
        }, 0.25);
      }

      // Move the other cards into their new positions
      CARDS.forEach((_, i) => {
        if (i === curIdx) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const slot = getSlotForCard(i, currentActive);

        tl.to(el, {
          x: 0,
          y: slot.y,
          scale: slot.scale,
          duration: 0.4,
          ease: 'power3.out',
        }, 0.1);
      });

    } else {
      // ─── BACKWARD NAVIGATION (Fly new card IN from the side) ───────────────
      const targetSlot = getSlotForCard(targetIdx, currentActive);

      // 1. Position targetEl off-screen instantly at start
      if (targetEl) {
        const startX = '120vw';
        tl.set(targetEl, {
          x: startX,
          y: targetSlot.y,
          scale: 0.9,
          zIndex: 12 // Keep it on top of everything during fly-in
        }, 0);

        // Fly in to top slot
        tl.to(targetEl, {
          x: 0,
          scale: targetSlot.scale,
          duration: 0.35,
          ease: 'power3.out',
        }, 0);

        // Snap targetEl zIndex to its slot value once it lands
        tl.set(targetEl, { zIndex: targetSlot.zIndex }, 0.35);
      }

      // Move other cards down into their slots
      CARDS.forEach((_, i) => {
        if (i === targetIdx) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const slot = getSlotForCard(i, currentActive);

        // Set target zIndex immediately at start
        tl.set(el, { zIndex: slot.zIndex }, 0);

        tl.to(el, {
          x: 0,
          y: slot.y,
          scale: slot.scale,
          duration: 0.4,
          ease: 'power3.out',
        }, 0);
      });
    }
  }, []);

  const navigateCard = useCallback((direction) => {
    const curIdx = activeCardRef.current;
    const nextIdx = (curIdx + direction + CARDS.length) % CARDS.length;
    navigateTo(nextIdx, direction);
  }, [navigateTo]);

  // ── Exit sweep (about → anywhere) ────────────────────────────────────────
  const triggerExit = useCallback((onDone) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    const counter = counterRef.current;

    const tl = gsap.timeline({ onComplete: onDone, overwrite: true });

    tl.to([nav, pill, counter].filter(Boolean), {
      y: '10vh',
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    }, 0);

    CARDS.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      tl.to(el, {
        y: '120vh',
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      }, i * 0.05);
    });
  }, []);

  // ── Tab Exit Watcher ───────────────────────────────────────────────────────
  const prevTabRef = useRef(activeTab);
  useEffect(() => {
    if (prevTabRef.current === 'about' && activeTab !== 'about') {
      triggerExit();
    }
    prevTabRef.current = activeTab;
  }, [activeTab, triggerExit]);


  const handleBackdropClick = useCallback((e) => {
    const clickedPostcard = e.target.closest('.about-postcard');
    const clickedControls = e.target.closest('.about-controls-container');
    if (!clickedPostcard && !clickedControls) {
      window.dispatchEvent(new CustomEvent('switchTab', { detail: 'home' }));
    }
  }, []);

  return (
    <div
      id={id}
      ref={setContainerRef}
      className={`about-page-root ${className || ''}`}
      style={style}
      onClick={handleBackdropClick}
    >
      {/* Card Deck Wrapper — this is what gets centered in the flex root */}
      <div className="about-deck">
        {/* Card 1 */}
        <div
          className={`about-postcard ${activeCard === 0 ? 'is-top' : ''}`}
          ref={(el) => { cardRefs.current[0] = el; }}
        >
          <img
            src="/asset/images/Bio/intro-card.jpg"
            alt=""
            className="about-video-bg"
          />
          <div className="about-grid-content">
            <div
              className="about-bio-panel"
              style={{ gridColumn: '1 / -1', justifyContent: 'flex-start' }}
            >
              <p
                className="about-bio-text"
                style={{
                  fontFamily: "'Pardon 4x4'",
                  paddingBottom: '5%',
                  paddingLeft: '5%',
                  fontSize: 'clamp(100px, 5vw, 130px)',
                  lineHeight: '1.1em',
                  color: '#ff48b0',
                  fontWeight: 400,
                  letterSpacing: '0em',
                  textTransform: 'uppercase'
                }}
              >
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className={`about-postcard ${activeCard === 1 ? 'is-top' : ''}`}
          ref={(el) => { cardRefs.current[1] = el; }}
        >
          <img
            src="/asset/images/Bio/exp-card.jpg"
            alt=""
            className="about-video-bg"
          />

        </div>

        {/* Card 3 */}
        <div
          className={`about-postcard ${activeCard === 2 ? 'is-top' : ''}`}
          ref={(el) => { cardRefs.current[2] = el; }}
        >
          <img
            src="/asset/images/Bio/working-card.jpg"
            alt=""
            className="about-video-bg"
          />

        </div>
      </div>

      {/* Controls Container */}
      <div className="about-controls-container">
        {/* Card Counter */}
        <div className="about-card-counter" ref={counterRef}>
          <span className="about-counter-current">{activeCard + 1}</span>
          <span className="about-counter-sep"> / </span>
          <span className="about-counter-total">{CARDS.length}</span>
        </div>

        {/* Navigation */}
        <div className="about-nav-arrows" ref={navRef}>
          <button className="about-arrow-btn" onClick={() => navigateCard(-1)} aria-label="Previous card">&lt;</button>
          <div className="about-nav-dots">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`about-nav-dot${i === activeCard ? ' active' : ''}`}
                onClick={() => navigateTo(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
          <button className="about-arrow-btn" onClick={() => navigateCard(1)} aria-label="Next card">&gt;</button>
        </div>

        {/* ESC Indicator */}
        <div className="about-esc-indicator" ref={pillRef}>
          press ESC to back to homepage
        </div>
      </div>
    </div >
  );
}));

AboutBento.displayName = 'AboutBento';
export default AboutBento;

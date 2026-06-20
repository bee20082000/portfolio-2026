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
  { extraRotation: 3.5, yOffset: 10, scale: 0.97, zIndex: 9 },
  { extraRotation: -4.5, yOffset: 18, scale: 0.94, zIndex: 8 },
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
        rotation: slot.rotation - 15,
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
        rotation: slot.rotation,
        duration: 0.65,
        ease: 'back.out(1.1)',
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
        triggerExit(); 
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
  const navigateCard = useCallback((direction) => {
    const curIdx = activeCardRef.current;
    const nextIdx = (curIdx + direction + CARDS.length) % CARDS.length;

    activeCardRef.current = nextIdx;
    setActiveCard(nextIdx);

    const isForward = direction > 0;
    const currentActive = nextIdx;

    if (isForward) {
      // ── FORWARD: Top card flings right, then slips under the deck. Others slide up.
      const curEl = cardRefs.current[curIdx];
      if (curEl) {
        const flyX = '140vw';
        const flyRot = 24;
        const targetSlot = getSlotForCard(curIdx, currentActive);
        
        const tl = gsap.timeline({ overwrite: true });
        
        // 1. Lightning-fast fling out
        tl.to(curEl, {
          x: flyX,
          rotation: CARDS[curIdx].rotation + flyRot,
          scale: 0.92,
          duration: 0.15,
          ease: 'power2.in',
        });
        
        // 2. Instantly snap below deck & update zIndex so it goes behind
        tl.set(curEl, {
          x: 0,
          y: targetSlot.y + 60,
          scale: targetSlot.scale - 0.05,
          rotation: targetSlot.rotation,
          zIndex: targetSlot.zIndex
        });
        
        // 3. Slide up seamlessly into the bottom slot
        tl.to(curEl, {
          y: targetSlot.y,
          scale: targetSlot.scale,
          duration: 0.3,
          ease: 'power3.out',
        });
      }

      CARDS.forEach((_, i) => {
        if (i === curIdx) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const slot = getSlotForCard(i, currentActive);
        gsap.to(el, {
          x: 0,
          y: slot.y,
          rotation: slot.rotation,
          scale: slot.scale,
          zIndex: slot.zIndex,
          duration: 0.45,
          ease: 'expo.out',
          delay: 0.02,
          overwrite: true,
        });
      });
    } else {
      // ── BACKWARD: Bottom card (nextIdx) flies IN from left. Others slide down.
      const nextEl = cardRefs.current[nextIdx];
      if (nextEl) {
        const flyX = '-140vw';
        const flyRot = -24;
        const targetSlot = getSlotForCard(nextIdx, currentActive); // The new Top slot
        
        const tl = gsap.timeline({ overwrite: true });
        
        // 1. Instantly move the bottom card off-screen left and bring to front
        tl.set(nextEl, {
          x: flyX,
          y: targetSlot.y,
          scale: 0.92,
          rotation: CARDS[nextIdx].rotation + flyRot,
          zIndex: targetSlot.zIndex
        });
        
        // 2. Fly it in
        tl.to(nextEl, {
          x: 0,
          rotation: targetSlot.rotation,
          scale: targetSlot.scale,
          duration: 0.45,
          ease: 'expo.out',
        });
      }

      CARDS.forEach((_, i) => {
        if (i === nextIdx) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const slot = getSlotForCard(i, currentActive);
        gsap.to(el, {
          x: 0,
          y: slot.y,
          rotation: slot.rotation,
          scale: slot.scale,
          zIndex: slot.zIndex,
          duration: 0.45,
          ease: 'expo.out',
          overwrite: true,
        });
      });
    }
  }, []);

  // ── Exit sweep (about → anywhere) ────────────────────────────────────────
  const triggerExit = useCallback((onDone) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    const counter = counterRef.current;

    const tl = gsap.timeline({ onComplete: onDone });

    tl.to([nav, pill, counter].filter(Boolean), {
      y: '20vh',
      duration: 0.3, ease: 'power3.in',
    }, 0);

    CARDS.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      tl.to(el, {
        y: '-130%',
        rotation: getSlotForCard(i, activeCardRef.current).rotation + 15,
        scale: 0.82,
        duration: 0.4,
        ease: 'power3.in',
      }, i * 0.04);
    });
  }, []);



  return (
    <div
      id={id}
      ref={setContainerRef}
      className={`about-page-root ${className || ''}`}
      style={style}
    >
      {/* Card Deck Wrapper — this is what gets centered in the flex root */}
      <div className="about-deck">
        {/* Card 1 */}
        <div
          className={`about-postcard ${activeCard === 0 ? 'is-top' : ''}`}
          ref={(el) => { cardRefs.current[0] = el; }}
        >
          <img
            src="/asset/images/Bio/pouring-card.jpg"
            alt=""
            className="about-video-bg"
          />
          <div className="about-grid-content">
            <div
              className="about-bio-panel"
              style={{ gridColumn: '8 / 13', justifyContent: 'flex-start' }}
            >
              <p className="about-bio-text">
                I was born and raised in Vietnam — a country where coffee is great, traffic is wild, and your relatives apparently need to know your salary, love life and future profession before they even ask how are you. Maybe that explains why I became interested in people in the first place: how they think, what they perceive, how they make decisions, and why certain things just feel emotionally right or painfully wrong.
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
            src="/asset/images/Bio/pouring-card.jpg"
            alt=""
            className="about-video-bg"
          />
          <div className="about-grid-content">
            <div
              className="about-bio-panel"
              style={{ gridColumn: '1 / 7', justifyContent: 'flex-end' }}
            >
              <p className="about-bio-text">
                I make things feel right. Not just look good — feel intentional. I care about the micro-moment where someone taps a button and thinks: "yes, exactly." That one millisecond is worth obsessing over.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className={`about-postcard ${activeCard === 2 ? 'is-top' : ''}`}
          ref={(el) => { cardRefs.current[2] = el; }}
        >
          <img
            src="/asset/images/Bio/pouring-card.jpg"
            alt=""
            className="about-video-bg"
          />
          <div className="about-grid-content">
            <div
              className="about-bio-panel"
              style={{ gridColumn: '2 / 8', justifyContent: 'flex-start' }}
            >
              <p className="about-bio-text">
                Let's work together. I'm currently open to new collaborations, weird ideas and honest conversations. Drop me a message — I promise I won't reply with a calendar link.
              </p>
            </div>
          </div>
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
          <button className="about-arrow-btn" onClick={() => navigateCard(-1)} aria-label="Previous card">←</button>
          <div className="about-nav-dots">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`about-nav-dot${i === activeCard ? ' active' : ''}`}
                onClick={() => { if (i !== activeCardRef.current) navigateCard(i > activeCardRef.current ? 1 : -1); }}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
          <button className="about-arrow-btn" onClick={() => navigateCard(1)} aria-label="Next card">→</button>
        </div>

        {/* ESC Indicator */}
        <div className="about-esc-indicator" ref={pillRef}>
          press ESC to back to homepage
        </div>
      </div>
    </div>
  );
}));

AboutBento.displayName = 'AboutBento';
export default AboutBento;

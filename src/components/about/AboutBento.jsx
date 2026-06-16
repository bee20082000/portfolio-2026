import { forwardRef, useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProfileTile from './ProfileTile';
import ExpTile from './ExpTile';
import EduTile from './EduTile';
import ContactTile from './ContactTile';
import './AboutBento.css';

gsap.registerPlugin(ScrollTrigger);

// ── CARD PALETTE ──────────────────────────────────────────────────────────────
const CARDS = [
  { id: 'about-sec-profile', index: '01', label: 'profile', bg: '#0A0A0A', fg: '#FFFFFF', accent: '#C3FB50' },
  { id: 'about-sec-experience', index: '02', label: 'experience', bg: '#C3FB50', fg: '#0A0A0A', accent: '#0A0A0A' },
  { id: 'about-sec-education', index: '03', label: 'education', bg: '#A8D8FF', fg: '#0A0A0A', accent: '#0A0A0A' },
];

const SECTIONS = CARDS.map(c => ({ id: c.id, label: c.label }));

// ── SLIDE-UP CARD CONTAINER ──────────────────────────────────────────────────
function SlideCard({ card, children }) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <section
      ref={cardRef}
      id={card.id}
      className="about-card-sec"
    >
      <div
        ref={contentRef}
        className="about-card-content"
        style={{
          backgroundColor: card.bg,
          color: card.fg,
        }}
      >
        {/* Top Header Row */}
        <div className="swiss-grid card-header-row">
          <div className="col-span-2">
            <span className="card-index">
              {card.index}
            </span>
          </div>
          <div className="col-span-10">
            <span className="card-label">
              {card.label}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="card-main-content">
          {children}
        </div>
      </div>
    </section>
  );
}

// ── ROOT ABOUT BENTO PAGE ──────────────────────────────────────────────────────
const AboutBento = memo(forwardRef(({ className, style, id, onSelect, activeTab }, ref) => {
  const bentoRef = useRef(null);
  const triggerRef = useRef(null);
  // Track whether we've actually entered the about tab at least once,
  // so the "leaving" cleanup doesn't fire incorrectly on initial mount.
  const hasInitRef = useRef(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    if (!bentoRef.current) return;

    const root = bentoRef.current;

    // ── CLEANUP: leaving about tab ────────────────────────────────────────────
    if (activeTab !== 'about') {
      // Only run cleanup if we actually entered the about tab before.
      // Skipping on initial mount avoids calling lenis before it is ready.
      if (!hasInitRef.current) return;
      window.lenis?.start?.();
      if (triggerRef.current) { triggerRef.current.kill(); triggerRef.current = null; }
      setActiveSection('profile');
      return;
    }

    // Mark that we've entered the about tab at least once.
    hasInitRef.current = true;

    // ── ENTERING about tab ───────────────────────────────────────────────────
    window.lenis?.scrollTo?.(0, { immediate: true });
    window.lenis?.stop?.();
    window.scrollTo(0, 0);

    let tl;
    let refreshTimer;

    const timer = setTimeout(() => {
      const sections = root.querySelectorAll('.about-card-sec');
      const nav      = root.querySelector('.about-nav-pill');
      if (sections.length < 3) return;

      gsap.killTweensOf(sections);
      if (triggerRef.current) { triggerRef.current.kill(); triggerRef.current = null; }

      // ── STEP 1: Set initial DOM states for all cards ──────────────────────
      gsap.set(sections[0], { x: 0, scale: 1, opacity: 0 });
      gsap.set([sections[1], sections[2]], { x: '100vw', scale: 1, opacity: 1 });

      // ── STEP 2: Build the scroll timeline (paused, complete) ─────────────
      tl = gsap.timeline({ paused: true });

      // Phase 1 (tl 0→1): card 1 sweeps in; card 0 nudges left
      tl.to(sections[1], { x: 0,       ease: 'none', duration: 1 }, 0);
      tl.to(sections[0], { x: '-8vw',  ease: 'none', duration: 1 }, 0);

      // Phase 2 (tl 1→2): card 2 sweeps in; stack shifts
      tl.to(sections[2], { x: 0,       ease: 'none', duration: 1 }, 1);
      tl.to(sections[1], { x: '-8vw',  ease: 'none', duration: 1 }, 1);
      tl.to(sections[0], { x: '-14vw', ease: 'none', duration: 1 }, 1);

      // Determine target scroll section
      const nextSec = window.nextAboutSection;
      window.nextAboutSection = null;
      const targetIndex = nextSec ? CARDS.findIndex(c => c.label === nextSec) : 0;
      const initialProgress = targetIndex !== -1 ? targetIndex / (CARDS.length - 1) : 0;

      // seek to the correct initial progress position
      tl.progress(initialProgress);

      if (initialProgress > 0) {
        // Direct fade in all cards when deep-linking to an internal card, bypassing swoosh
        gsap.set(sections, { opacity: 0 });
        gsap.to(sections, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete() {
            const scrollTarget = root.offsetTop + targetIndex * window.innerHeight;
            window.lenis?.scrollTo?.(scrollTarget, { immediate: true });
            window.scrollTo(0, scrollTarget);
            window.lenis?.start?.();

            let isInit = true;
            const st = ScrollTrigger.create({
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              onUpdate(self) {
                const targetProgress = isInit ? initialProgress : self.progress;
                gsap.to(tl, { progress: targetProgress, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
                const time  = targetProgress * 2;
                const index = time < 0.5 ? 0 : time < 1.5 ? 1 : 2;
                setActiveSection(CARDS[index].label);
              },
            });

            setTimeout(() => {
              isInit = false;
            }, 200);

            triggerRef.current = st;

            refreshTimer = setTimeout(() => {
              window.lenis?.resize?.();
              ScrollTrigger.refresh();
            }, 50);
          }
        });
      } else {
        // Entrance swoosh — shift card 0 back to scale 0.95 for entrance
        gsap.set(sections[0], { x: 0, scale: 0.95, opacity: 0 });

        // ── STEP 3: Entrance — only card 0 animates ───────────────────────────
        gsap.to(sections[0], {
          scale: 1, opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          onComplete() {
            // Force scroll position to 0 and re-enable scroll right before creating ScrollTrigger
            window.lenis?.scrollTo?.(0, { immediate: true });
            window.lenis?.start?.();
            window.scrollTo(0, 0);

            // ── STEP 4: Attach ScrollTrigger to the complete, pre-positioned timeline
            let isInit = true;
            const st = ScrollTrigger.create({
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              onUpdate(self) {
                const targetProgress = isInit ? 0 : self.progress;
                gsap.to(tl, { progress: targetProgress, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
                const time  = targetProgress * 2;
                const index = time < 0.5 ? 0 : time < 1.5 ? 1 : 2;
                setActiveSection(CARDS[index].label);
              },
            });

            // Keep isInit = true for 200ms to ignore any queued browser scroll events from the entrance transition
            setTimeout(() => {
              isInit = false;
            }, 200);

            triggerRef.current = st;

            refreshTimer = setTimeout(() => {
              window.lenis?.resize?.();
              ScrollTrigger.refresh();
            }, 50);
          },
        });
      }

      // Nav items slide down into view, slightly after card 0 lands
      if (nav) {
        const navItems = nav.querySelectorAll('.about-nav-item');
        // Kill any lingering tweens so the 2nd-visit entrance starts clean
        gsap.killTweensOf(navItems);
        gsap.killTweensOf(nav);
        gsap.fromTo(navItems,
          { y: -14, opacity: 0 },
          {
            y: 0,
            opacity: (i, el) => el.classList.contains('active') ? 1 : 0.2,
            duration: 0.4, delay: 0.3, stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'opacity,transform'
          }
        );
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      window.lenis?.start?.();
      if (tl) {
        gsap.killTweensOf(tl);
        tl.kill();
      }
      if (triggerRef.current) { triggerRef.current.kill(); triggerRef.current = null; }
    };
  }, [activeTab]);

  const setRefs = (el) => {
    bentoRef.current = el;
    if (ref) { typeof ref === 'function' ? ref(el) : (ref.current = el); }
  };

  return (
    <div
      id={id}
      ref={setRefs}
      className={`about-page-root ${className || ''}`}
      style={style}
    >


      {/* ── 01 PROFILE ─────────────────────────────────────────────────── */}
      <SlideCard card={CARDS[0]}>
        <ProfileTile />
      </SlideCard>

      {/* ── 02 EXPERIENCE ──────────────────────────────────────────────── */}
      <SlideCard card={CARDS[1]}>
        <ExpTile />
      </SlideCard>

      {/* ── 03 EDUCATION ───────────────────────────────────────────────── */}
      <SlideCard card={CARDS[2]}>
        <EduTile />
      </SlideCard>

      <div className="about-home-wrapper">
        <a
          href="#home"
          className="global-home-pill"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('switchTab', { detail: 'home' }));
          }}
        >
          home
        </a>
      </div>
    </div>
  );
}));

AboutBento.displayName = 'AboutBento';
export default AboutBento;

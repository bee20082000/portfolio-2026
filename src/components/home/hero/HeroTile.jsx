import { useEffect, useRef, useCallback, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useSmoothScroll from "../../../hooks/useSmoothScroll";
import "./HeroTile.css";
import WorkBento from "../../work/WorkBento";
import { audioManager } from "../../../utils/audio";

gsap.registerPlugin(ScrollTrigger);

const HeroTile = memo(function HeroTile({ activeTab, onSelect, bentoClassName, loaded, introReady }) {
  const tileRef = useRef(null);
  const scrollRef = useRef(null);
  const h1Ref = useRef(null);
  const measureRef = useRef(null);
  const namePlaceholderRef = useRef(null);
  const entranceAnimated = useRef(false);
  const baselineHelperRef = useRef(null);

  const [copiedType, setCopiedType] = useState(null);
  const timeoutRef = useRef(null);

  const animClick = (el) => {
    gsap.timeline()
      .to(el, { scale: 0.85, duration: 0.05, ease: 'power2.out' })
      .to(el, { scale: 1, duration: 0.25, ease: 'back.out(3)', clearProps: 'transform' });
  };

  const animNameClick = (el) => {
    // The name text is actively being transformed by ScrollTrigger.
    // We cannot use clearProps: 'transform' here, or it will lose its Y position!
    // We also need to bounce relative to its current scale (since it shrinks when scrolled).
    const currentScale = gsap.getProperty(el, "scale") || 1;
    gsap.timeline()
      .to(el, { scale: currentScale * 0.85, duration: 0.05, ease: 'power2.out', overwrite: "auto" })
      .to(el, { scale: currentScale, duration: 0.25, ease: 'back.out(3)' });
  };

  const handleCopy = (text, type, e) => {
    e.stopPropagation();
    animClick(e.currentTarget);
    try {
      audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4).catch(() => { });
    } catch (err) { }
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedType(null), 2000);
    }).catch(() => { });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ─── Bottom Contact Cards Scroll Slide-up & Playful Rotation deck ────────────────
  useGSAP(() => {
    const scroller = tileRef.current;
    if (!scroller) return;

    const cardEmail = scroller.querySelector('.hero-card-email');
    const cardLinkedin = scroller.querySelector('.hero-card-linkedin');

    if (!cardEmail || !cardLinkedin) return;

    // Set initial off-screen states
    gsap.set(cardEmail, { y: 500, rotation: 0, x: 0, transformOrigin: "center center" });
    gsap.set(cardLinkedin, { y: 340, rotation: 0, x: 0, transformOrigin: "center center" });

    ScrollTrigger.create({
      trigger: scroller.querySelector('.hero-contact-section'),
      scroller: scroller,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      animation: gsap.timeline()
        .fromTo(cardEmail,
          { y: 500, rotation: 600, x: 0 },
          { y: 0, rotation: -14, x: -70, ease: "none", force3D: true },
          0
        )
        .fromTo(cardLinkedin,
          { y: 340, rotation: 500, x: 0 },
          { y: 70, rotation: 8, x: 260, ease: "none", force3D: true },
          0
        ),
      invalidateOnRefresh: true
    });
  }, { scope: tileRef });

  // Dynamic ScrollTrigger refresh on content resize
  useEffect(() => {
    const content = scrollRef.current;
    if (!content || activeTab !== 'home') return;

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  // ─── Scroll back to top on "home" pill click ──────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'home' && activeTab === 'home') {
        if (localLenisRef.current) {
          localLenisRef.current.scrollTo(0);
        } else if (tileRef.current) {
          tileRef.current.scrollTop = 0;
        }
      }
    };
    window.addEventListener('switchTab', handler);
    return () => window.removeEventListener('switchTab', handler);
  }, [activeTab]);

  // ─── Work tile scroll-reveal via IntersectionObserver ─────────────────────
  useGSAP(() => {
    const container = tileRef.current;
    if (!container || activeTab !== 'home') return;

    const tiles = container.querySelectorAll('.tile-case');

    // Set initial off-screen states for un-animated tiles
    tiles.forEach((tile) => {
      if (!tile._hasAnimated) {
        gsap.set(tile, { opacity: 0, y: 100 });
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tile = entry.target;
          if (!tile._hasAnimated) {
            tile._hasAnimated = true;
            gsap.fromTo(tile,
              { opacity: 0, y: 100 },
              { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" }
            );
            observer.unobserve(tile);
          }
        }
      });
    }, {
      root: container,
      rootMargin: "0px 0px -2% 0px",
      threshold: 0
    });

    tiles.forEach((tile) => {
      if (!tile._hasAnimated) {
        observer.observe(tile);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, { dependencies: [activeTab], scope: tileRef });

  // ─── Dynamic Scale & ScrollTrigger Collapse Animation ─────────────────────
  useGSAP(() => {
    let scrollTriggerInstance = null;

    const scaleAndAnimateNameText = () => {
      if (activeTab !== 'home') return;

      const textEl = h1Ref.current;
      const measureEl = measureRef.current;
      const tileEl = tileRef.current;
      const placeholderEl = namePlaceholderRef.current;

      if (!textEl || !measureEl || !tileEl || !placeholderEl) return;

      // 1. Calculate optimal font size to fit viewport width
      const sidePad = Math.min(Math.max(window.innerWidth * 0.04, 20), 48);
      const targetWidth = window.innerWidth - sidePad * 2;
      const BASE = 200;
      measureEl.style.fontSize = `${BASE}px`;
      const naturalWidth = measureEl.offsetWidth || measureEl.getBoundingClientRect().width;

      let optimalPx = 16 * (window.innerWidth / 100);
      if (naturalWidth > 0) {
        optimalPx = (targetWidth / naturalWidth) * BASE;
        textEl.style.fontSize = `${optimalPx}px`;
      }

      // 2. Kill existing ScrollTrigger
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }

      // 3. Measure coordinates under reset styles (clear any GSAP y/scale first)
      gsap.set(textEl, { clearProps: "all" });
      textEl.style.fontSize = `${optimalPx}px`;
      textEl.style.visibility = 'hidden';
      textEl.style.opacity = '0';

      // Measure text element's natural top inside the tile (it lives in the sticky topbar)
      const textRect = textEl.getBoundingClientRect();
      const tileRect = tileEl.getBoundingClientRect();
      const scaleY = tileRect.height / (tileEl.offsetHeight || 1);
      const textTop = (textRect.top - tileRect.top) / scaleY;   // unscaled local distance from tile top to text top

      const viewportHeight = window.innerHeight; // local offsetHeight is also viewportHeight

      // Measure height using the ghost element's unscaled layout height
      const measureHeight = measureEl.offsetHeight;
      const textHeight = (measureHeight / BASE) * optimalPx;

      // Measure baseline offset using the helper span inside the ghost element.
      // This dynamically determines the exact distance from the top of the text block to the baseline
      // based on the browser's font rendering, making it robust across different fonts.
      const baselineHelperEl = baselineHelperRef.current;
      let baselineOffset = textHeight; // fallback
      if (baselineHelperEl) {
        const baselineOffsetInBASE = baselineHelperEl.offsetTop;
        baselineOffset = (baselineOffsetInBASE / BASE) * optimalPx;
      }

      // Scale factor to hit 36px size
      const smallScale = 36 / optimalPx;

      // How far down to push the text so its BASELINE aligns with viewport bottom minus padding
      const bottomPad = sidePad;
      const transY = viewportHeight - textTop - baselineOffset - bottomPad;

      // Initial state — apply y offset, keep visible
      gsap.set(textEl, { y: transY, scale: 1, autoAlpha: 1 });

      // 4. Create scrub timeline
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: tileEl,
        scroller: tileEl,
        start: "top top",
        end: `+=${transY}px`,
        scrub: true, // Bind directly to scroll position to prevent delay-induced lag
        animation: gsap.fromTo(textEl,
          { y: transY, scale: 1 },
          { y: 0, scale: smallScale, ease: "none", force3D: true }
        ),
        invalidateOnRefresh: true,
      });

      const chars = textEl.querySelectorAll('.hero-char');
      // 5. Entrance Animation for Characters (only run once per mount and when introReady is true)
      if (introReady && !entranceAnimated.current) {
        entranceAnimated.current = true;
        if (chars.length > 0) {
          gsap.fromTo(chars,
            { y: -150, opacity: 0, scale: 0.5, rotation: () => Math.random() * 40 - 20 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.025,
              ease: "elastic.out(1, 0.4)",
              delay: 0.1
            }
          );
        }
      } else if (!entranceAnimated.current && chars.length > 0) {
        // Keep them hidden initially until introReady is true
        gsap.set(chars, { opacity: 0 });
      }

      // Defer ScrollTrigger refresh
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(() => ScrollTrigger.refresh(), { timeout: 300 });
      } else {
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    };

    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      // Debounce window resize to 150ms to prevent thrashing
      resizeTimeout = setTimeout(scaleAndAnimateNameText, 150);
    };

    // Run once immediately
    scaleAndAnimateNameText();

    // Ensure it runs after fonts are loaded to get correct measurements
    if (document.fonts) document.fonts.ready.then(scaleAndAnimateNameText);

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill(false);
      }
    };
  }, { dependencies: [activeTab, loaded, introReady], scope: tileRef });

  const localLenisRef = useSmoothScroll({
    wrapperRef: tileRef,
    contentRef: scrollRef,
    options: {
      syncTouch: true,
      touchMultiplier: 1.5,
    },
    onScroll: () => {
      ScrollTrigger.update();
    }
  });

  return (
    <>


      {/* Off-screen ghost — same font/weight/letter-spacing as the real name */}
      <div ref={measureRef} className="hero-name-measure" aria-hidden="true">
        {"Hi, I am Huy".split('').map((char, i) => (
          <span key={i} className="hero-char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span ref={baselineHelperRef} style={{ display: 'inline-block', width: 0, height: 0, verticalAlign: 'baseline' }} />
      </div>

      <div
        ref={tileRef}
        className={`tile tile-hero c2r2 tile-hero-scroll-container`}
        data-i="0"
        style={{
          cursor: "default",
          gridColumn: "1 / -1",
          gridRow: "1 / -1",
          height: '100%',
          backgroundColor: "transparent",
          color: "#FFFFFF",
          "--text": "#FFFFFF", "--text2": "#FFFFFF", "--text3": "#FFFFFF",
          "--tile-radius": "0px",
          borderRadius: "0px",
          overflowY: 'auto',
          willChange: 'transform'
        }}
      >
        <div ref={scrollRef} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Sticky Top Bar Overlay */}
          <div className="hero-topbar">
            <div className="hero-topbar-item hero-topbar-name">
              <div ref={namePlaceholderRef} className="hero-name-placeholder" style={{ visibility: 'hidden' }}>Hi, I am Huy</div>
              <a
                href="#top"
                ref={h1Ref}
                className="hero-name-text"
                onClick={(e) => {
                  e.preventDefault();
                  if (localLenisRef.current) {
                    localLenisRef.current.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  } else if (tileRef.current) {
                    tileRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {"Hi, I am Huy".split('').map((char, i) => (
                  <span key={i} className="hero-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </a>
            </div>
            <div className="hero-topbar-item hero-topbar-about">
              <a
                href="#about"
                className="hero-topbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  animClick(e.currentTarget);
                  window.nextAboutSection = 'profile';
                  window.dispatchEvent(new CustomEvent('switchTab', { detail: 'about' }));
                }}
              >
                About
                <svg className="doodle-circle" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                  <path className="doodle-path" pathLength="100" d="M15,35 C10,20 25,8 60,5 C95,2 115,15 115,30 C115,45 90,58 60,58 C25,58 5,45 15,25" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </a>
            </div>
            <div className="hero-topbar-item hero-topbar-contact">
              <a
                href="#contact-section"
                className="hero-topbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  animClick(e.currentTarget);
                  if (localLenisRef.current) {
                    localLenisRef.current.scrollTo('#contact-section', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  }
                }}
              >
                Contact
                <svg className="doodle-circle" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                  <path className="doodle-path" pathLength="100" d="M15,35 C10,20 25,8 60,5 C95,2 115,15 115,30 C115,45 90,58 60,58 C25,58 5,45 15,25" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Section 1: Hero intro viewport ── */}
          <div className="hero-intro-grid">

            {/* Bio — row 2, columns 4–8 */}
            <div className="hero-bio-container">
              <div className="hero-bio-text">
                I'm a creative designer. <br />
                I've worked on many projects, <br />
                mainly making brands more memorable <br />
                and campaigns less forgettable.
              </div>
            </div>

          </div>

          {/* ── Section 2: Work grid ── */}
          <div className="hero-work-section">
            <WorkBento onSelect={onSelect} scroller={tileRef} />
          </div>

          {/* Bottom Contact Section */}
          <div id="contact-section" className="hero-contact-section">
            <div className="hero-contact-deck">

              {/* Card 1: Email & Phone */}
              <div className="hero-contact-card hero-card-email">
                <div className="hero-contact-container">
                  <h2 className="hero-contact-title">Get in touch Now!!</h2>

                  <div className="hero-contact-rows-group">
                    {/* Email contact row */}
                    <div className="hero-contact-wrapper">
                      <div
                        className="hero-circle-icon-wrapper"
                        onClick={(e) => handleCopy('huy.nguyen20800@gmail.com', 'email', e)}
                      >
                        <div className="hero-icon-swap">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`hero-copy-svg hero-icon-copy ${copiedType === 'email' ? 'icon-hidden' : 'icon-visible'}`}
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`hero-copy-svg hero-icon-tick ${copiedType === 'email' ? 'icon-visible' : 'icon-hidden'}`}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>

                      <div className="hero-text-block">
                        <span className="hero-contact-label">Write to me at</span>
                        <span className="hero-contact-value">huy.nguyen20800@gmail.com</span>
                      </div>
                    </div>

                    {/* Phone contact row */}
                    <div className="hero-contact-wrapper">
                      <div
                        className="hero-circle-icon-wrapper"
                        onClick={(e) => handleCopy('0793736688', 'phone', e)}
                      >
                        <div className="hero-icon-swap">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`hero-copy-svg hero-icon-copy ${copiedType === 'phone' ? 'icon-hidden' : 'icon-visible'}`}
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`hero-copy-svg hero-icon-tick ${copiedType === 'phone' ? 'icon-visible' : 'icon-hidden'}`}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>

                      <div className="hero-text-block">
                        <span className="hero-contact-label">Call me at</span>
                        <span className="hero-contact-value">079 373 6688</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: LinkedIn */}
              <div className="hero-contact-card hero-card-linkedin">
                <div className="hero-contact-container">
                  <h2 className="hero-contact-title">My Linkedin!!</h2>
                  <div className="hero-contact-wrapper">
                    <a
                      href="https://www.linkedin.com/in/huy-nguyen-20820/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-circle-icon-wrapper"
                      onClick={(e) => {
                        animClick(e.currentTarget);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="hero-copy-svg"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>

                    <div className="hero-text-block">
                      <span className="hero-contact-label">My LinkedIn</span>
                      <span className="hero-contact-value">Huy Nguyen</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* End Note Footer */}
            <div className="hero-footer">
              <div>
                Fonts : Install &amp; Maroni by <a href="https://www.arthurcalame.com/" target="_blank" rel="noopener noreferrer">Arthur Calame</a>.
                <br></br>
                Website made with Google Antigravity.
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
});

export default HeroTile;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import styles from "./HeroTile.module.css";

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "1 / -1";
const TILE_HEIGHT = "1 / -1";
const TILE_BG_COLOR = "#01CF6A";
const TILE_TEXT_COLOR = "#000";
const TILE_RADIUS = "0px";

export default function HeroTile() {
  const tileRef = useRef(null);
  const scrollRef = useRef(null);
  const h1Ref = useRef(null);
  const breathRef = useRef(null); // holds the looping breathing tween

  // ─── Idle Breathing helpers ───────────────────────────────────────────────
  const startBreathing = () => {
    const tile = tileRef.current;
    if (!tile) return;
    const typography = tile.querySelector('.hero-tile-title');
    if (!typography) return;
    if (breathRef.current) return; // already running
    breathRef.current = gsap.to(typography, {
      y: -10,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      overwrite: 'auto'
    });
  };

  const stopBreathing = () => {
    if (breathRef.current) {
      breathRef.current.kill();
      breathRef.current = null;
    }
  };

  // ─── Mount: simple fade-in + start breathing ─────────────────────────────
  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;
    const typography = tile.querySelector('.hero-tile-title');
    if (typography) {
      gsap.fromTo(typography,
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1, scale: 1, duration: 1.1, delay: 0.2, ease: 'power3.out',
          onComplete: () => setTimeout(() => startBreathing(), 200)
        }
      );
    }
    return () => stopBreathing();
  }, []);

  // ─── Mouse Parallax Interaction ──────────────────────────────────────────
  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const magneticElements = Array.from(tile.querySelectorAll('.magnetic-target, .hover-bold-target'));
    const scatterElements = Array.from(tile.querySelectorAll('.scatter-letter'));

    const onMouseMove = (e) => {
      const scrollTop = tile.scrollTop;

      // 1. Foreground magnetic words
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;

        const distX = e.clientX - elX;
        const distY = e.clientY - elY;
        const dist = Math.hypot(distX, distY);

        const MAX_DIST = 140;

        if (dist < MAX_DIST) {
          const strength = (MAX_DIST - dist) / MAX_DIST;
          const pullX = distX * strength * 0.22;
          const pullY = distY * strength * 0.22;

          gsap.to(el, {
            x: pullX,
            y: pullY,
            duration: 0.15,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.5)',
            overwrite: 'auto'
          });
        }
      });

      // 2. Background parallax scattered letters (unified 3D space!)
      const tileRect = tile.getBoundingClientRect();
      const tileCenterX = tileRect.left + tileRect.width / 2;
      const tileCenterY = tileRect.top + tileRect.height / 2;

      // Mouse offset relative to the tile's visual center
      const offsetX = e.clientX - tileCenterX;
      const offsetY = e.clientY - tileCenterY;

      scatterElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.15;

        // Shift is proportional to mouse offset from tile center and depth factor
        const pullX = offsetX * depth * 0.35;
        const pullY = offsetY * depth * 0.35;

        // Cache the mouse parallax values
        el._mouseX = pullX;
        el._mouseY = pullY;

        // Combine with scroll parallax (highly visible 3D retro depth)
        let scrollParallaxY = scrollTop * depth * 1.5;

        // Narrative text blocks get MORE parallax (react faster), but are mathematically bounded based on local viewport center to prevent overlays!
        if (el.classList.contains('block-justified')) {
          const rect = el.getBoundingClientRect();
          const viewportCenter = tileRect.height / 2;
          const elementCenter = rect.top - tileRect.top + rect.height / 2;
          const distFromCenter = elementCenter - viewportCenter;

          const maxScrollParallax = 110; // strictly calculated zone boundaries
          scrollParallaxY = distFromCenter * depth * 0.9;
          scrollParallaxY = Math.max(-maxScrollParallax, Math.min(maxScrollParallax, scrollParallaxY));
        }

        gsap.to(el, {
          x: pullX,
          y: pullY + scrollParallaxY,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      stopBreathing();
    };

    const onMouseEnter = () => {
      stopBreathing();
    };

    const onMouseLeave = () => {
      // Spring all foreground items back
      magneticElements.forEach((el) => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'elastic.out(1.5, 0.42)',
          overwrite: 'auto'
        });
      });

      // Spring all background parallax letters back, maintaining scroll parallax
      const scrollTop = tile.scrollTop;
      scatterElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.15;
        el._mouseX = 0;
        el._mouseY = 0;

        let scrollParallaxY = scrollTop * depth * 1.5;

        // Narrative text blocks get MORE parallax (react faster), but are mathematically bounded based on local viewport center to prevent overlays!
        if (el.classList.contains('block-justified')) {
          const rect = el.getBoundingClientRect();
          const tileRect = tile.getBoundingClientRect();
          const viewportCenter = tileRect.height / 2;
          const elementCenter = rect.top - tileRect.top + rect.height / 2;
          const distFromCenter = elementCenter - viewportCenter;

          const maxScrollParallax = 110; // strictly calculated zone boundaries
          scrollParallaxY = distFromCenter * depth * 0.9;
          scrollParallaxY = Math.max(-maxScrollParallax, Math.min(maxScrollParallax, scrollParallaxY));
        }

        gsap.to(el, {
          x: 0,
          y: scrollParallaxY,
          duration: 1.1,
          ease: 'elastic.out(1.2, 0.5)',
          overwrite: 'auto'
        });
      });

      if (scrollTop <= 50) {
        startBreathing();
      }
    };

    tile.addEventListener('mousemove', onMouseMove);
    tile.addEventListener('mouseenter', onMouseEnter);
    tile.addEventListener('mouseleave', onMouseLeave);

    return () => {
      tile.removeEventListener('mousemove', onMouseMove);
      tile.removeEventListener('mouseenter', onMouseEnter);
      tile.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // ─── Lenis Scroll Integration & Scroll-Driven Parallax ───────────────────
  useEffect(() => {
    const wrapper = tileRef.current;
    const content = scrollRef.current;
    if (!wrapper || !content) return;

    const scatterElements = Array.from(wrapper.querySelectorAll('.scatter-letter'));

    const lenis = new Lenis({
      wrapper, content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical', gestureOrientation: 'vertical',
      smoothWheel: true, wheelMultiplier: 1.0
    });

    lenis.on('scroll', (e) => {
      const scrollTop = e.scroll;

      // 1. Breathing dynamic toggle
      if (scrollTop > 50) {
        stopBreathing();
      } else {
        startBreathing();
      }

      // 2. Foreground Typography scroll drift
      if (h1Ref.current) {
        gsap.to(h1Ref.current, {
          y: -scrollTop * 0.25,
          duration: 0.1,
          overwrite: 'auto'
        });
      }

      // 3. Background Parallax for scattered letters
      scatterElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.15;
        let scrollParallaxY = scrollTop * depth * 1.5;

        // Narrative text blocks get MORE parallax (react faster), but are mathematically bounded based on local viewport center to prevent overlays!
        if (el.classList.contains('block-justified')) {
          const rect = el.getBoundingClientRect();
          const tileRect = wrapper.getBoundingClientRect();
          const viewportCenter = tileRect.height / 2;
          const elementCenter = rect.top - tileRect.top + rect.height / 2;
          const distFromCenter = elementCenter - viewportCenter;

          const maxScrollParallax = 110; // strictly calculated zone boundaries
          scrollParallaxY = distFromCenter * depth * 0.9;
          scrollParallaxY = Math.max(-maxScrollParallax, Math.min(maxScrollParallax, scrollParallaxY));
        }

        const mouseX = el._mouseX || 0;
        const mouseY = el._mouseY || 0;

        gsap.to(el, {
          x: mouseX,
          y: mouseY + scrollParallaxY,
          duration: 0.15,
          overwrite: 'auto'
        });
      });
    });

    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { if (rafId) cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <>
      <style>{`
        /* Hide scrollbars for the hero tile scroll container */
        .tile-hero-scroll-container::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        .tile-hero-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* ── SWISS PRINT EDITORIAL CANVAS ── */
        .asymmetric-canvas {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 36px;
          row-gap: 160px; /* Generous, premium editorial whitespace */
          width: 100%;
          font-family: 'Akkurat Mono LL', monospace;
          color: #000;
        }

        .canvas-row {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 36px;
          row-gap: 80px;
          align-items: start;
          position: relative;
        }

        .block-justified {
          font-size: clamp(16px, 1.8vw, 24px) !important;
          letter-spacing: -0.03em !important;
          line-height: 1.1 !important;
          text-transform: none !important;
          text-align: justify;
          hyphens: auto;
          font-weight: 700;
          color: #000;
          will-change: transform;
        }

        /* Technical crop/registration marks */
        .registration-mark {
          position: absolute;
          font-family: system-ui, sans-serif;
          font-size: 24px;
          font-weight: 100;
          color: rgba(0, 0, 0, 0.25);
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .asymmetric-canvas {
            row-gap: 80px;
          }
          .canvas-row {
            grid-template-columns: 1fr;
            row-gap: 40px;
          }
          .block-justified {
            grid-column: 1 / -1 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: justify;
          }
        }
      `}</style>

      <div
        ref={tileRef}
        className={`tile tile-hero ${styles['tile-hero']} c2r2 tile-hero-scroll-container`}
        data-i="0"
        style={{
          cursor: "default",
          gridColumn: TILE_WIDTH,
          gridRow: TILE_HEIGHT,
          height: '100%',
          backgroundColor: TILE_BG_COLOR,
          color: TILE_TEXT_COLOR,
          "--text": TILE_TEXT_COLOR, "--text2": TILE_TEXT_COLOR, "--text3": TILE_TEXT_COLOR,
          "--tile-radius": TILE_RADIUS,
          borderRadius: TILE_RADIUS,
          overflowY: 'auto',
          willChange: 'transform'
        }}
      >
        <div ref={scrollRef} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Section 1: The Screen-Size Splash (Splash visual) */}
          <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
            {/* Scattered Background Typography (H U Y 2 0 2 6) using Akkurat Mono LL */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
              <div className="scatter-letter" data-depth="0.26" style={{ position: 'absolute', top: '22%', left: '8%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(100px, 14vw, 240px)', color: '#0066FF', opacity: 0.8, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>H</div>
              <div className="scatter-letter" data-depth="0.10" style={{ filter: 'blur(3px)', position: 'absolute', top: '8%', left: '42%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(70px, 10vw, 180px)', color: '#0052CC', opacity: 0.85, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>U</div>
              <div className="scatter-letter" data-depth="0.16" style={{ position: 'absolute', top: '5%', right: '15%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(80px, 12vw, 200px)', color: '#0052CC', opacity: 0.85, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>Y</div>
              <div className="scatter-letter" data-depth="0.12" style={{ position: 'absolute', bottom: '8%', right: '22%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(90px, 13vw, 220px)', color: '#0052CC', opacity: 0.85, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>2</div>
              <div className="scatter-letter" data-depth="0.20" style={{ position: 'absolute', bottom: '25%', left: '35%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(100px, 14vw, 240px)', color: '#0066FF', opacity: 0.8, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>0</div>
              <div className="scatter-letter" data-depth="0.18" style={{ position: 'absolute', bottom: '5%', left: '6%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(80px, 12vw, 200px)', color: '#0052CC', opacity: 0.85, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>2</div>
              <div className="scatter-letter" data-depth="0.22" style={{ position: 'absolute', top: '48%', right: '5%', fontFamily: "'Akkurat Mono LL', monospace", fontSize: 'clamp(110px, 15vw, 260px)', color: '#0066FF', opacity: 0.8, fontWeight: 900, userSelect: 'none', lineHeight: 1 }}>6</div>
            </div>

            <div className="inner" style={{ height: 'auto', marginTop: '5vh', width: '40%', boxSizing: 'border-box', position: 'relative', zIndex: 2 }}>
              <div
                ref={h1Ref}
                className="h1 hero-tile-title"
                style={{
                  textAlign: 'justify', textAlignLast: 'left',
                  fontFamily: 'var(--font-family), sans-serif',
                  fontSize: 'clamp(25px, 2vw, 40px)',
                  lineHeight: '1',
                  letterSpacing: '-0.03em',
                  opacity: 0,
                  willChange: 'transform, opacity',
                  color: TILE_TEXT_COLOR,
                  "--text": TILE_TEXT_COLOR, "--text2": TILE_TEXT_COLOR, "--text3": TILE_TEXT_COLOR,
                  width: '100%', fontWeight: 700
                }}
              >
                <span className="magnetic-target" style={{ display: 'inline-block' }}>Hey!</span>{' '}
                <span className="magnetic-target" style={{ display: 'inline-block' }}>I'm</span>{' '}
                <span className="magnetic-target" style={{ display: 'inline-block' }}>Huy</span>
                <span className="brand-name"></span>.<br />
                <span
                  className="hero-body-text"
                  style={{ color: TILE_TEXT_COLOR, "--text": TILE_TEXT_COLOR, "--text2": TILE_TEXT_COLOR, "--text3": TILE_TEXT_COLOR, fontWeight: 700 }}
                >
                  I design <span className="hover-bold-target">brands</span>, <span className="hover-bold-target">campaigns</span>, and <span className="hover-bold-target">digital things</span> that hopefully make people <span className="hover-bold-target">stop scrolling</span>.
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: The Blog Content */}
          <div
            style={{
              marginTop: '40vh',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 1,
              pointerEvents: 'auto',
              padding: '0 5% 120px 5%',
            }}
          >
            <article style={{ width: '100%', position: 'relative' }}>
              <div style={{ padding: '160px 4% 200px 4%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>


                <div className="asymmetric-canvas">

                  {/* THE SCATTERED PARALLAXING NARRATIVE BLOCKS */}

                  {/* Heading Block */}
                  <div className="scatter-letter block-justified" data-depth="0.04" style={{ gridColumn: '2 / 6' }}>
                    about me
                  </div>

                  {/* Vietnam Origins */}
                  <div className="scatter-letter block-justified" data-depth="0.12" style={{ gridColumn: '4 / 10', marginTop: '130px' }}>
                    I was born and raised in Vietnam — a country where coffee is great, traffic is wild, and your relatives apparently need to know your salary, marriage plans, and future profession before they even ask what you do for fun. Maybe that explains why I became interested in people in the first place: how they think, what they perceive, how they make decisions, and why certain things just feel emotionally right or painfully wrong.
                  </div>

                  {/* Over-analyzing Superpower */}
                  <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '2 / 8', marginTop: '160px' }}>
                    Growing up, I spent an unreasonable amount of time watching TV commercials, MTV music videos, movie trailers, and playing video games. What fascinated me was not just the entertainment itself, but the strange magic behind it. Why did certain ads become unforgettable? Why did some music videos feel so cool for no explainable reason? Why could a game menu, soundtrack, or visual style completely pull someone into another world? I became obsessed with understanding how people create things that feel so catchy, memorable, and emotionally convincing.
                  </div>

                  {/* Marketing Study */}
                  <div className="scatter-letter block-justified" data-depth="0.16" style={{ gridColumn: '7 / 13', marginTop: '180px' }}>
                    Then came the terrifying “choose your future” phase. Like many teenagers trying to become adults as quickly as possible, I decided to study marketing at university. It sounded professional, business-like, and modern enough to confuse most Vietnamese adults in their 50s and 60s.
                  </div>

                  {/* Business Quote */}
                  <div className="scatter-letter block-justified" data-depth="0.22" style={{ gridColumn: '3 / 11', marginTop: '180px' }}>
                    "Marketing? ...So what exactly do you do?"
                  </div>

                  {/* Marketing Study */}
                  <div className="scatter-letter block-justified" data-depth="0.16" style={{ gridColumn: '7 / 13', marginTop: '180px' }}>
                    There was also a concern that my future might involve standing outside supermarkets handing out flyers.
                  </div>

                  {/* University Lesson */}
                  <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '5 / 11', marginTop: '160px' }}>
                    University taught me many useful things: economics, business, creativity, communication, teamwork, and how brands influence their consumers behavior. But somehow, it also taught me another mysterious phenomenon of adult life — group projects always contain one completely invisible individual who magically appears on presentation day like a seasonal character unlock. Weird.
                  </div>

                  {/* Ipsos Research */}
                  <div className="scatter-letter block-justified" data-depth="0.14" style={{ gridColumn: '2 / 8', marginTop: '180px' }}>
                    after graduating from university, I became a market researcher at Ipsos — an agency that can best be explained by spending lots of time trying to figure out the reason why millions of complete strangers make weird choices on a daily basis. I actually loved this job.
                  </div>

                  {/* Brands & Consumer Behavior */}
                  <div className="scatter-letter block-justified" data-depth="0.06" style={{ gridColumn: '6 / 12', marginTop: '150px' }}>
                    I was working on research projects for a range of brands, exploring consumer behavior, market trends, drivers of their choice and motivation, frustration, pain points, and the psychological background that influences their decision-making process.
                  </div>

                  {/* Humans Confusing */}
                  <div className="scatter-letter block-justified" data-depth="0.18" style={{ gridColumn: '4 / 10', marginTop: '180px' }}>
                    it turns out that humans are fascinating creatures. or, at least, the reasons they make are completely confusing. some people buy things because they need them. others because their friends bought them. yet others because the package looks reliable or because, for some unknown reason, some color looked premium. human behavior is one of the most bizarre phenomena out there.
                  </div>

                  {/* Creative Side Quests */}
                  <div className="scatter-letter block-justified" data-depth="0.12" style={{ gridColumn: '7 / 13', marginTop: '160px' }}>
                    at a certain point in time, though, i discovered the mild inconvenience that i quite enjoy creative tasks. not only did i continue researching, i ended up accumulating different side quests: photography, filmmaking, design, content production, websites, campaign ideas, social media presence, and random creative experiments.
                  </div>

                  {/* Try That Quote */}
                  <div className="scatter-letter block-justified" data-depth="0.20" style={{ gridColumn: '2 / 9', marginTop: '180px' }}>
                    "yeah... let's try that."
                  </div>

                  {/* Moving to Advertising */}
                  <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '4 / 11', marginTop: '160px' }}>
                    obviously, this led to my move into advertising. a field combining brainstorming, telling stories, solving problems, changing ideas, changing ideas again, surviving deadlines, and hearing the sentence:
                  </div>

                  {/* Premium Quote */}
                  <div className="scatter-letter block-justified" data-depth="0.24" style={{ gridColumn: '5 / 13', marginTop: '180px', textAlign: 'right' }}>
                    "can we make this feel more premium?"
                  </div>

                  {/* DDB Campaigns */}
                  <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '2 / 8', marginTop: '150px' }}>
                    at ddb vietnam, i found myself working on various advertising campaigns, social media content, websites, and creative ideas and concepts for such brands as panasonic, tường an, lipton, bobby, and santen.
                  </div>

                  {/* Survival & Details */}
                  <div className="scatter-letter block-justified" data-depth="0.16" style={{ gridColumn: '6 / 12', marginTop: '180px' }}>
                    sometimes, it required having a reasonable discussion on customer behavior. other times, it meant spending several hours on discussing just one sentence as the team couldn't agree. but the coolest part of advertising is creating solutions to invisible problems people encounter but do not notice. and these small details are the ones that make everything completely different.
                  </div>

                  {/* Figuring People Out */}
                  <div className="scatter-letter block-justified" data-depth="0.14" style={{ gridColumn: '3 / 9', marginTop: '160px' }}>
                    slowly but surely, i started to realize that i really enjoy the process of figuring people out. not just how to make something look nice, but why people care, what will be memorable, what will make people stop scrolling, and why something is upsetting for no apparent reason.
                  </div>

                  {/* Brain Refuses to Shut Down */}
                  <div className="scatter-letter block-justified" data-depth="0.22" style={{ gridColumn: '7 / 13', marginTop: '180px' }}>
                    unfortunately, this perspective accompanied me everywhere else, too. i sincerely try to relax. believe me. but somehow a coffee break leads to thinking questions about how to make a menu nicer. going out — noticing that this billboard could've been better. starting to open pinterest "just for 5 minutes" and ending with three lost hours. it seems that now, my brain refuses to shut down.
                  </div>

                  {/* Still Reading / Respect */}
                  <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '2 / 8', marginTop: '200px' }}>
                    wait. you are still reading this? seriously? wow. respect!! recruiters might be skimming through hundreds of portfolios on a regular basis, and the fact that you got this far in my random story means a lot.
                  </div>

                  {/* Social Profile */}
                  <div className="scatter-letter block-justified" data-depth="0.18" style={{ gridColumn: '5 / 11', marginTop: '160px' }}>
                    socially, i tend to be quite reserved at first. people usually think that i'm reserved and mysterious. it's partly true. there is just one problem. whenever something becomes interesting (branding, consumer behavior, internet culture, storytelling, human psychology, random observations, bad design of some restaurant, or, even worse, a specific topic nobody ever expected), something just clicks.
                  </div>

                  {/* acc detail analyzer character */}
                  <div className="scatter-letter block-justified" data-depth="0.12" style={{ gridColumn: '3 / 9', marginTop: '160px' }}>
                    and suddenly, the reserved person who hasn't talked in the last hour ends up having too many ideas. the mechanism is completely unclear. including for me. if i needed to characterize myself in a brief way, i would say: quiet observer, accidental detail analyzer, a person who loves making ideas human, and somebody whose talks get out of control whenever curiosity wins.
                  </div>

                  {/* Coffee Outro */}
                  <div className="scatter-letter block-justified" data-depth="0.26" style={{ gridColumn: '4 / 12', marginTop: '220px' }}>
                    oh. also. in case you managed to read all of this...<br />
                    you deserve a cup of coffee ☕ from me.
                  </div>

                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

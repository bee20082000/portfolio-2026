import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Lenis from "lenis";
import HeroBlog from "../blogs/HeroBlog";
import CloseButton from "../CloseButton";

export default function HeroTile() {
  const catImg = "asset/images/help_me_create_a_fat_202605190030.png";
  const catRef = useRef(null);
  const tileRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const h1Ref = useRef(null);

  const [bioPhase, setBioPhase] = useState("closed");
  const isBioOpen = bioPhase !== "closed";
  const hideTileContent = bioPhase !== "closed" && bioPhase !== "fading_in";
  const [zoomStyles, setZoomStyles] = useState({});

  useEffect(() => {
    const el = h1Ref.current;
    const tile = tileRef.current;
    if (!el || !tile) return;
    const tileH = tile.offsetHeight;
    const tileW = tile.offsetWidth;
    const elH = el.offsetHeight;
    const elW = el.offsetWidth;
    const centerOffsetY = tileH / 2 - elH / 2 - 28;
    const centerOffsetX = tileW / 2 - elW / 2 - 28;
    gsap.fromTo(el, { x: centerOffsetX, y: centerOffsetY, opacity: 0, scale: 1.08 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.1, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    window.isBioOpen = isBioOpen;
    window.dispatchEvent(new CustomEvent("toggleBioScrollLock", { detail: isBioOpen }));
    if (isBioOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBioOpen]);

  const openBio = (e) => {
    if (e) e.stopPropagation();
    const bioAudio = new Audio('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3');
    bioAudio.volume = 0.65;
    bioAudio.play().catch(() => { });

    setBioPhase("fading_out");
    setTimeout(() => {
      if (tileRef.current) {
        const rect = tileRef.current.getBoundingClientRect();
        setZoomStyles({
          "--zoom-x": `${rect.left}px`,
          "--zoom-y": `${rect.top}px`,
          "--zoom-w": `${rect.width}px`,
          "--zoom-h": `${rect.height}px`
        });
      }
      setBioPhase("mounted");

      // Fix: Double RAF ensures the browser paints the mounted position before expanding
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBioPhase("expanding");
          setTimeout(() => setBioPhase("open"), 450); // Increased buffer
        });
      });
    }, 150);
  };

  const closeBio = () => {
    const content = scrollRef.current;
    const closeBtn = document.querySelector('.blog-close');

    const tl = gsap.timeline({
      onComplete: () => {
        setBioPhase('expanding');
        // Fix: Double RAF for the shrink phase transition as well
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setBioPhase('mounted');
            setTimeout(() => {
              setBioPhase('fading_in');
              setTimeout(() => setBioPhase('closed'), 180);
            }, 450); // Increased buffer to match open phase
          });
        });
      }
    });

    if (closeBtn) tl.to(closeBtn, { opacity: 0, pointerEvents: 'none', y: 16, duration: 0.25, ease: 'power2.in' }, 0);
    if (content) tl.to(content, { opacity: 0, y: 30, duration: 0.35, ease: 'power2.in' }, 0);
  };

  useEffect(() => {
    if (bioPhase === 'open') {
      const content = scrollRef.current;
      const closeBtn = document.querySelector('.blog-close');
      // Fix: Use .to() since initial state is handled natively in JSX style below
      if (content) gsap.to(content, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' });
      if (closeBtn) gsap.fromTo(closeBtn, { opacity: 0, y: 16, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.55, delay: 0.35, ease: 'power3.out' });
    }
  }, [bioPhase]);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const targets = tile.querySelectorAll(".hover-bold-target");
    const onMouseEnter = () => gsap.to(targets, { fontWeight: "700", duration: 0.3, ease: "power2.out" });
    const onMouseLeave = () => gsap.to(targets, { fontWeight: "400", duration: 0.25, ease: "power2.inOut" });

    tile.addEventListener("mouseenter", onMouseEnter);
    tile.addEventListener("mouseleave", onMouseLeave);

    return () => {
      tile.removeEventListener("mouseenter", onMouseEnter);
      tile.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [bioPhase]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isBioOpen && e.key === "Escape") closeBio();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBioOpen]);

  useEffect(() => {
    const wrapper = containerRef.current;
    const content = scrollRef.current;
    if (!wrapper || !content || bioPhase !== "open") return;

    const lenis = new Lenis({
      wrapper: wrapper,
      content: content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [bioPhase]);

  return (
    <div className="hero-tile-wrapper">
      <style>{`
        .bio-modal-overlay::-webkit-scrollbar,
        .bio-blog-scroll-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>

      <div ref={tileRef} className={`tile tile-hero c2r2 ${hideTileContent ? "content-hidden" : ""}`} data-i="0" onClick={openBio} style={{ cursor: "pointer" }}>
        <div className="inner" style={{ height: '100%', position: 'relative' }}>
          <div ref={h1Ref} className="h1 hero-tile-title" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: '400', lineHeight: '1.15', marginTop: '0px', marginBottom: '20px', opacity: 0, willChange: 'transform, opacity' }}>
            Hey! I'm <span className="brand-name">Huy</span>.<br />
            <span className="hero-body-text">I design <span className="hover-bold-target">brands</span>, <span className="hover-bold-target">campaigns</span>, and <span className="hover-bold-target">digital things</span> that hopefully make people <span className="hover-bold-target">stop scrolling</span>.</span>
          </div>
          <img ref={catRef} src={catImg} alt="fatcat" width={400} style={{ opacity: 0, position: "absolute", right: -90, bottom: -40, transformOrigin: "bottom right", pointerEvents: "none" }} />
          <div className="hero-readmore-container">
            <button className="hero-expand-btn" onClick={openBio} aria-label="Expand bio" title="Click to view bio">⤢</button>
            <span className="hero-readmore-text">Read more</span>
          </div>
        </div>
      </div>

      {
        bioPhase !== "closed" && bioPhase !== "fading_out" && createPortal(
          <>
            <CloseButton className="blog-close" onClick={closeBio} label="Close" />
            <div
              ref={containerRef}
              className={`bio-modal-overlay ${bioPhase}`}
              data-lenis-prevent
              style={{
                ...zoomStyles,
                display: 'block',
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onClick={closeBio}
            >
              <div
                ref={scrollRef}
                className="bio-blog-scroll-container"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '80%',
                  margin: '0 auto',
                  padding: '8vh 24px 120px 24px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  pointerEvents: 'auto',
                  // Fix: Claude's FOUC fix. Pre-hide element natively before GSAP manipulates it
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                <HeroBlog onClose={closeBio} />
              </div>
            </div>
          </>,
          document.body
        )
      }
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export default function HeroTile() {
  const catImg = "asset/images/help_me_create_a_fat_202605190030.png";
  const catRef = useRef(null);
  const tileRef = useRef(null);
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);

  const [isBioOpen, setIsBioOpen] = useState(false);
  const [zoomStyles, setZoomStyles] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // 1. Create a GSAP timeline for the sliding fat cat easter egg
    const tl = gsap.timeline();

    // 2. The Slide In (Matches original bounce animation)
    tl.fromTo(
      catRef.current,
      {
        opacity: 1,
        y: 500
      },
      {
        y: 0,
        duration: 3,
        delay: 2, // Initial wait before jumping up
        ease: "bounce.inOut"
      }
    )
      // 3. The Slide Out (Chains automatically after the first one finishes)
      .to(
        catRef.current,
        {
          y: 500, // Slides back down
          duration: 1.5, // Faster exit
          delay: 3, // Waits exactly 3 seconds after the bounce finishes
          ease: "power3.in" // Accelerates smoothly on the way out
        }
      );

    // Cleanup timeline if the component unmounts mid-animation
    return () => {
      tl.kill();
    };
  }, []);

  // Prevent scroll-chaining on the background page when modal is open
  useEffect(() => {
    window.isBioOpen = isBioOpen;
    window.dispatchEvent(new CustomEvent("toggleBioScrollLock", { detail: isBioOpen }));

    if (isBioOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      setActiveIndex(0);
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isBioOpen]);

  // Smoothly translate vertical mouse scroll adjustments into custom slide deck state changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isBioOpen) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < 450) return; // 450ms debounce

      if (e.deltaY > 15) {
        lastWheelTime.current = now;
        setActiveIndex((prev) => Math.min(prev + 1, 2));
      } else if (e.deltaY < -15) {
        lastWheelTime.current = now;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isBioOpen]);

  const getCardStyles = (cardIndex) => {
    const diff = cardIndex - activeIndex;
    // Overlap offset distance: 270px
    const offsetX = diff * 270;
    const offsetY = Math.abs(diff) * 12;
    const scale = diff === 0 ? 1 : 0.85;
    const zIndex = diff === 0 ? 10 : 5 - Math.abs(diff);
    const opacity = diff === 0 ? 1 : 0.35;
    const blur = diff === 0 ? 0 : 12;

    return {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      pointerEvents: diff === 0 ? "auto" : "none"
    };
  };

  // Freeze background portfolio page scroll ONLY when clicking/scrolling outside of active popup cards
  useEffect(() => {
    const handleWindowScrollLock = (e) => {
      if (!isBioOpen) return;
      // If mouse scroll occurs outside the horizontal scrollable card container, freeze background page scroll
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    if (isBioOpen) {
      window.addEventListener("wheel", handleWindowScrollLock, { passive: false });
      window.addEventListener("touchmove", handleWindowScrollLock, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", handleWindowScrollLock);
      window.removeEventListener("touchmove", handleWindowScrollLock);
    };
  }, [isBioOpen]);

  const openBio = (e) => {
    if (e) e.stopPropagation();
    if (tileRef.current) {
      const rect = tileRef.current.getBoundingClientRect();
      const tx = rect.left + rect.width / 2;
      const ty = rect.top + rect.height / 2;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = tx - cx;
      const dy = ty - cy;
      setZoomStyles({
        "--zoom-dx": `${dx}px`,
        "--zoom-dy": `${dy}px`
      });
    }
    setIsBioOpen(true);
  };

  const closeBio = (e) => {
    if (e) e.stopPropagation();
    setIsBioOpen(false);
  };

  const scrollToCard = (index) => {
    setActiveIndex(index);
  };

  // Dynamic 3D tilt interaction on mousemove over the container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    // Rotation degree caps (max 6deg for smooth, aesthetic 3D response)
    const tiltX = (dy / yc) * -6;
    const tiltY = (dx / xc) * 6;

    gsap.to(containerRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    // Bouncy elastic spring reset back to standard flat values
    gsap.to(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.85,
      ease: "elastic.out(1.2, 0.6)",
      overwrite: "auto"
    });
  };

  // Close bio modal on Escape key press and enable left/right Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isBioOpen) return;

      if (e.key === "Escape") {
        setIsBioOpen(false);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = Math.min(activeIndex + 1, 2);
        scrollToCard(nextIdx);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIdx = Math.max(activeIndex - 1, 0);
        scrollToCard(prevIdx);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBioOpen, activeIndex]);

  return (
    <div className="hero-tile-wrapper">
      <div
        ref={tileRef}
        className={`tile tile-hero c2r2 ${isBioOpen ? "hidden-active" : ""}`}
        data-i="0"
        onClick={openBio}
        style={{ cursor: "pointer" }}
      >
        <div className="inner">
          <div className="hero-avail">
            <span className="dot-live"></span>
            Senior Designer
          </div>
          <div className="h1">
            Huy <em>Nguyen</em>
          </div>
          <div className="hero-sub">
            A creative with a research background — transforming ideas into seamless digital experiences.
          </div>
          <img
            ref={catRef}
            src={catImg}
            alt="fatcat"
            width={400}
            style={{ opacity: 0, position: "absolute", right: -90, bottom: -40, transformOrigin: "bottom right" }}
          />
        </div>

        {/* Expand Button in Corner */}
        <button
          className="hero-expand-btn"
          onClick={openBio}
          aria-label="Expand bio"
          title="Click to view bio"
        >
          ⤢
        </button>
      </div>

      {/* FIXED BIO POPUP MODAL (Portal to escape bento transform perspectives) */}
      {createPortal(
        <div
          className={`bio-modal-overlay ${isBioOpen ? "open" : ""}`}
          onClick={closeBio}
        >
          {/* Global Close Button in top right */}
          <button
            className="bio-modal-close-global"
            onClick={closeBio}
            aria-label="Close biography"
          >
            ✕
          </button>

          <div
            ref={containerRef}
            className="bio-modal-scroll-container"
            style={zoomStyles}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()} // Prevent clicking scroll container from closing modal
          >
            {/* Card 1: Identity */}
            <div className={`bio-scroll-card ${activeIndex === 0 ? "active" : "inactive-blur"}`} style={getCardStyles(0)}>
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 01 / Identity</span>
                  <h2 className="bio-modal-title">Huy Nguyen</h2>
                </div>
              </div>

              <div className="bio-modal-body">
                <p>
                  I am a <em>Creative Designer & UX Researcher</em> based in Ho Chi Minh City, bridging the gap between analytical consumer data and high-fidelity UI.
                </p>
                <p>
                  Leveraging a marketing background from UEH and agency practice, I build visual solutions that optimize conversions.
                </p>
              </div>
            </div>

            {/* Card 2: Core Philosophy */}
            <div className={`bio-scroll-card ${activeIndex === 1 ? "active" : "inactive-blur"}`} style={getCardStyles(1)}>
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 02 / Philosophy</span>
                  <h2 className="bio-modal-title">Creative Focus</h2>
                </div>
              </div>

              <div className="bio-modal-body">
                <p>
                  My design system focus emphasizes <em>exact typography proportions</em> and <em>spring-based animation loops</em>.
                </p>
                <p>
                  Applying agency practice at <em>DDB</em> and <em>Ipsos</em>, I ensure layout structures are mathematically perfect.
                </p>
              </div>
            </div>

            {/* Card 3: Metrics & Impact */}
            <div className={`bio-scroll-card ${activeIndex === 2 ? "active" : "inactive-blur"}`} style={getCardStyles(2)}>
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 03 / Metrics</span>
                  <h2 className="bio-modal-title">Stats & Impact</h2>
                </div>
              </div>

              <div className="bio-modal-body">
                <p>
                  Proven commitment to design quality and technical execution across creative web platforms.
                </p>
                <div className="bio-modal-footer" style={{ borderTop: "none", paddingTop: 0, marginTop: "10px" }}>
                  <div className="bio-stat-box">
                    <span className="bio-stat-val">4+</span>
                    <span className="bio-stat-lbl">Years Design</span>
                  </div>
                  <div className="bio-stat-box">
                    <span className="bio-stat-val">98%</span>
                    <span className="bio-stat-lbl">Satisfaction</span>
                  </div>
                  <div className="bio-stat-box">
                    <span className="bio-stat-val">930</span>
                    <span className="bio-stat-lbl">TOEIC English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Scrolling Tutorial Sign */}
          <div className="bio-modal-scroll-tutorial" onClick={(e) => e.stopPropagation()}>
            ← Use Keyboard Arrow Keys [← / →] or Click Dots to Navigate →
          </div>

          {/* Dots Pagination indicators under the cards container */}
          <div className="bio-modal-dots-container" onClick={(e) => e.stopPropagation()}>
            <button
              className={`bio-modal-dot ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => scrollToCard(0)}
              aria-label="Go to card 1"
            />
            <button
              className={`bio-modal-dot ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => scrollToCard(1)}
              aria-label="Go to card 2"
            />
            <button
              className={`bio-modal-dot ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => scrollToCard(2)}
              aria-label="Go to card 3"
            />
          </div>
        </div>,
        document.body
      )}

      {/* Jigging tutorial arrow and helper text (Positioned outside tile-hero under overflow:visible wrapper) */}
      {!isBioOpen && (
        <div className="hero-tutorial">
          <span className="hero-tutorial-arrow">←</span>
          <span className="hero-tutorial-text">Click here to view more</span>
        </div>
      )}
    </div>
  );
}
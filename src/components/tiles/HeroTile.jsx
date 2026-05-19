import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import CloseButton from "../CloseButton";

export default function HeroTile() {
  const catImg = "asset/images/help_me_create_a_fat_202605190030.png";
  const catRef = useRef(null);
  const tileRef = useRef(null);
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);

  // Expanded animation states: closed -> fading_out -> mounted -> expanding -> open -> expanding -> mounted -> fading_in -> closed
  const [bioPhase, setBioPhase] = useState("closed");
  const isBioOpen = bioPhase !== "closed";

  // Specific toggles for CSS classes
  const hideTileContent = bioPhase !== "closed" && bioPhase !== "fading_in";

  const [zoomStyles, setZoomStyles] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      catRef.current,
      { opacity: 1, y: 500 },
      { y: 0, duration: 3, delay: 2, ease: "bounce.inOut" }
    ).to(
      catRef.current,
      { y: 500, duration: 1.5, delay: 3, ease: "power3.in" }
    );

    return () => {
      tl.kill();
    };
  }, []);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isBioOpen) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // If swipe is horizontal and prominent
      if (Math.abs(diffX) > 40 && Math.abs(diffY) < 60) {
        if (diffX < 0) {
          // Swiped left -> next card
          setActiveIndex((prev) => Math.min(prev + 1, 2));
        } else {
          // Swiped right -> prev card
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < 450) return;

      if (e.deltaY > 15 || e.deltaX > 15) {
        lastWheelTime.current = now;
        setActiveIndex((prev) => Math.min(prev + 1, 2));
      } else if (e.deltaY < -15 || e.deltaX < -15) {
        lastWheelTime.current = now;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isBioOpen, bioPhase]);

  const getCardStyles = (cardIndex) => {
    const diff = cardIndex - activeIndex;
    const offsetX = diff * 270;
    const offsetY = Math.abs(diff) * 12;
    const scale = diff === 0 ? 1 : 0.85;
    const zIndex = diff === 0 ? 10 : 5 - Math.abs(diff);
    const opacity = diff === 0 ? 1 : 0.35;
    const blur = diff === 0 ? 0 : 12;

    if (bioPhase === "open") {
      return {
        zIndex: zIndex,
        pointerEvents: "auto"
      };
    }

    return {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      pointerEvents: "auto"
    };
  };

  useEffect(() => {
    const handleWindowScrollLock = (e) => {
      if (!isBioOpen) return;
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

    // 1. Fade out the original content box smoothly
    setBioPhase("fading_out");

    setTimeout(() => {
      // 2. Measure coordinates and mount transparent portal over the empty box
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

      // 3. Trigger physical expansion (0.38s CSS morph duration)
      setTimeout(() => {
        setBioPhase("expanding");

        // 4. Trigger dark background and card deck entrance
        setTimeout(() => {
          setBioPhase("open");
        }, 380);
      }, 20);
    }, 150); // Snappy fade-out transition wait
  };

  const closeBio = (e) => {
    if (e) e.stopPropagation();

    // 1. Slide cards container back to the right side of the screen with a playful anticipation bounce!
    gsap.killTweensOf([
      ".bio-modal-scroll-container",
      ".bio-modal-bottom-wrapper"
    ]);

    gsap.to(".bio-modal-scroll-container", {
      x: "100vw",
      opacity: 0,
      scale: 0.92,
      rotateY: -30,
      duration: 0.45,
      ease: "back.in(1.2)"
    });

    gsap.to(".bio-modal-bottom-wrapper", {
      y: 50,
      opacity: 0,
      pointerEvents: "none",
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        // 2. Shrink portal back to grid Snappy 0.38s morph transition
        setBioPhase("expanding");

        setTimeout(() => {
          setBioPhase("mounted");

          setTimeout(() => {
            // 3. Unmount portal, trigger original tile content fade-in
            setBioPhase("fading_in");

            setTimeout(() => {
              // 4. Fully reset
              setBioPhase("closed");
            }, 180);
          }, 380); // 380ms for physical CSS morph shrink
        }, 20);
      }
    });
  };

  useEffect(() => {
    if (bioPhase === "open") {
      gsap.killTweensOf([
        ".bio-modal-scroll-container",
        ".bio-modal-bottom-wrapper"
      ]);

      // 1. Slide the inner card deck from the right with a stunning, high-energy 3D bouncy overshoot
      gsap.fromTo(
        ".bio-modal-scroll-container",
        { x: "100vw", opacity: 0, scale: 0.92, rotateY: 30, transformPerspective: 1000 },
        { x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.75, ease: "power3.out" }
      );

      // 2. Float unified bottom wrapper up centered with a satisfying bounce (waits for full expansion to settle)
      gsap.fromTo(
        ".bio-modal-bottom-wrapper",
        { y: 50, opacity: 0, pointerEvents: "none" },
        { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.55, delay: 0.65, ease: "back.out(1.8)" }
      );
    }
  }, [bioPhase]);

  useEffect(() => {
    if (!isBioOpen || bioPhase !== "open") return;

    const cards = document.querySelectorAll(".bio-scroll-card");
    cards.forEach((card, index) => {
      const diff = index - activeIndex;
      const offsetX = diff * 270;
      const offsetY = Math.abs(diff) * 12;
      const scale = diff === 0 ? 1 : 0.85;
      const zIndex = diff === 0 ? 10 : 5 - Math.abs(diff);
      const opacity = diff === 0 ? 1 : 0.35;
      const blur = diff === 0 ? 0 : 12;

      // Animate each card with the gorgeous "back.out(1.8)" ease curve!
      gsap.to(card, {
        x: offsetX,
        y: offsetY,
        scale: scale,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        duration: 0.75,
        ease: "power3.out",
        overwrite: "auto"
      });

      // Structural layout styles updated cleanly
      card.style.zIndex = zIndex;
      card.style.pointerEvents = "auto";
    });
  }, [activeIndex, isBioOpen, bioPhase]);

  const scrollToCard = (index) => {
    setActiveIndex(index);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

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
    gsap.to(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.85,
      ease: "elastic.out(1,0.3)",
      overwrite: "auto"
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isBioOpen) return;

      if (e.key === "Escape") {
        closeBio();
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
        className={`tile tile-hero c2r2 ${hideTileContent ? "content-hidden" : ""}`}
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

        <button
          className="hero-expand-btn"
          onClick={openBio}
          aria-label="Expand bio"
          title="Click to view bio"
        >
          ⤢
        </button>
      </div>

      {bioPhase !== "closed" && bioPhase !== "fading_out" && createPortal(
        <div
          className={`bio-modal-overlay ${bioPhase}`}
          style={zoomStyles}
          onClick={closeBio}
        >
          <div
            ref={containerRef}
            className="bio-modal-scroll-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card 1: Identity */}
            <div
              className={`bio-scroll-card ${activeIndex === 0 ? "active" : "inactive-blur"}`}
              style={{ ...getCardStyles(0), cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); scrollToCard(0); }}
            >
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 01 / Identity</span>
                  <h2 className="bio-modal-title">Huy Nguyen</h2>
                </div>
              </div>
              <div className="bio-modal-body">
                <p>I am a <em>Creative Designer & UX Researcher</em> based in Ho Chi Minh City, bridging the gap between analytical consumer data and high-fidelity UI.</p>
                <p>Leveraging a marketing background from UEH and agency practice, I build visual solutions that optimize conversions.</p>
              </div>
            </div>

            {/* Card 2: Core Philosophy */}
            <div
              className={`bio-scroll-card ${activeIndex === 1 ? "active" : "inactive-blur"}`}
              style={{ ...getCardStyles(1), cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); scrollToCard(1); }}
            >
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 02 / Philosophy</span>
                  <h2 className="bio-modal-title">Creative Focus</h2>
                </div>
              </div>
              <div className="bio-modal-body">
                <p>My design system focus emphasizes <em>exact typography proportions</em> and <em>spring-based animation loops</em>.</p>
                <p>Applying agency practice at <em>DDB</em> and <em>Ipsos</em>, I ensure layout structures are mathematically perfect.</p>
              </div>
            </div>

            {/* Card 3: Metrics & Impact */}
            <div
              className={`bio-scroll-card ${activeIndex === 2 ? "active" : "inactive-blur"}`}
              style={{ ...getCardStyles(2), cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); scrollToCard(2); }}
            >
              <div className="bio-modal-header">
                <div className="bio-modal-header-left">
                  <span className="bio-modal-subtitle">Card 03 / Metrics</span>
                  <h2 className="bio-modal-title">Stats & Impact</h2>
                </div>
              </div>
              <div className="bio-modal-body">
                <p>Proven commitment to design quality and technical execution across creative web platforms.</p>
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

          {/* Unified Centered Bottom Navigation & Action wrapper */}
          <div className="bio-modal-bottom-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="bio-modal-dots-container">
              <button className={`bio-modal-dot ${activeIndex === 0 ? "active" : ""}`} onClick={() => scrollToCard(0)} />
              <button className={`bio-modal-dot ${activeIndex === 1 ? "active" : ""}`} onClick={() => scrollToCard(1)} />
              <button className={`bio-modal-dot ${activeIndex === 2 ? "active" : ""}`} onClick={() => scrollToCard(2)} />
            </div>

            <CloseButton
              className="bio-modal-close-global"
              onClick={closeBio}
              label="Close"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
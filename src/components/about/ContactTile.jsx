import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { audioManager } from "../../utils/audio";
import styles from "./ContactTile.module.css";

// EASILY ADJUST TILE SIZE HERE:
const TILE_WIDTH = "span 5";
const TILE_HEIGHT = "span 3";
const TILE_BG_COLOR = "#4FADF5"; // Stark white background
const TILE_RADIUS = "5px";

// Premium copy SVG icon component
const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, opacity: 0.8 }}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);


export default function ContactTile() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  const bottomPillRef = useRef(null);
  const middlePillRef = useRef(null);
  const topPillRef = useRef(null);

  useEffect(() => {
    // Create an independent, infinite floating loop for each pill
    const bottomFloat = gsap.to(bottomPillRef.current, {
      y: "+=6",
      rotation: "+=1",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const middleFloat = gsap.to(middlePillRef.current, {
      y: "-=8",
      rotation: "-=1.5",
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2 // Offset to prevent syncing
    });

    const topFloat = gsap.to(topPillRef.current, {
      y: "+=7",
      rotation: "+=1.2",
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.4 // Offset to prevent syncing
    });

    // Clean up animations on component unmount
    return () => {
      bottomFloat.kill();
      middleFloat.kill();
      topFloat.kill();
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Satisfying tactile pop-click elastic compression animation
  const animateClick = (element, baseHoverScale) => {
    gsap.timeline()
      .to(element, {
        scale: 0.92,
        duration: 0.06,
        ease: "power2.out"
      })
      .to(element, {
        scale: baseHoverScale,
        duration: 0.15,
        ease: "back.out(2.5)"
      });
  };

  // Copies text to clipboard and triggers a sleek bottom toast alert
  const handleCopy = (text, type) => {
    // Play satisfying tactile click sound
    audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4);

    navigator.clipboard.writeText(text)
      .then(() => {
        setToastMessage(`${type} copied!`);
        setShowToast(true);

        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
          setShowToast(false);
        }, 1800);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div
      className={`tile ${styles['tile-contact']}`}
      id="contact"
      style={{
        gridColumn: TILE_WIDTH,
        gridRow: TILE_HEIGHT,
        height: '100%',
        backgroundColor: TILE_BG_COLOR,
        borderRadius: TILE_RADIUS,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Absolute centering wrapper so the stickers fit perfectly within the tile boundaries */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'scale(0.72)', // Adjusted scale slightly from 0.78 to 0.72 to accommodate the fourth pill beautifully
          transformOrigin: 'center center',
          pointerEvents: 'none'
        }}
      >
        {/* 1. BOTTOM LAYER - Magenta (Call me now!) */}
        <div
          ref={bottomPillRef}
          style={{
            backgroundColor: '#FBFBFB',
            color: '#000000ff',
            padding: '12px 34px',
            borderRadius: TILE_RADIUS,
            fontSize: '32px',
            fontWeight: '900', transform: 'rotate(0deg)', // Mild upward tilt matching "We deliver it!"
            zIndex: 2, // Sits at the absolute bottom
            marginBottom: '0px',
            marginLeft: '-35px',
            whiteSpace: 'nowrap',
            willChange: 'transform'
          }}
        >
          Contact me now!
        </div>

        {/* 2. MIDDLE LAYER - Lime Green (Email) */}
        <div
          ref={middlePillRef}
          onClick={(e) => {
            animateClick(e.currentTarget, 1.05);
            handleCopy("Huy.nguyen20800@gmail.com", "Email");
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, overwrite: 'auto' });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }}
          style={{
            backgroundColor: '#C3FB50',
            color: '#000000ff',
            padding: '10px 24px',
            borderRadius: TILE_RADIUS,
            fontSize: '18px',
            fontWeight: '900',
            transform: 'rotate(0deg)', // Sharp downward angle matching "You crave it"
            zIndex: 3, // Overlaps Magenta, but sits under Lavender
            marginLeft: '20px',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontWeight: 'inherit' }}>Huy.nguyen20800@gmail.com</span>
          <CopyIcon />
        </div>

        {/* 3. TOP LAYER - Lavender (Phone Number - Biggest Visual Weight) */}
        <div
          ref={topPillRef}
          onClick={(e) => {
            animateClick(e.currentTarget, 1.05);
            handleCopy("0938051535", "Phone number");
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, overwrite: 'auto' });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }}
          style={{
            backgroundColor: '#4FADF5',
            color: '#000000ff',
            padding: '16px 36px', // Oversized padding to emphasize dominance
            borderRadius: TILE_RADIUS,
            fontSize: '24px',
            fontWeight: '900',
            transform: 'rotate(3deg)', // Gentle down-angle matching the main "Grubby" logo pill
            zIndex: 1, // Safely sits on the very top of the pile
            marginTop: '-12px',
            marginLeft: '100px',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ fontWeight: 'inherit' }}>0938051535</span>
          <CopyIcon />
        </div>

        {/* 4. LINKEDIN PILL - Brand Blue, fully clickable target link */}
        <a
          href="https://www.linkedin.com/in/huy-nguyen-20820/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#8455EA', // LinkedIn Brand Blue
            color: '#ffffff',
            padding: '12px 34px',
            borderRadius: TILE_RADIUS,
            fontSize: '24px',
            fontWeight: '900',
            transform: 'rotate(-2deg)',
            zIndex: 1, // Renders on the very top layer for clicks
            marginTop: '2px',
            marginLeft: '-55px',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            display: 'inline-block',
            pointerEvents: 'auto', // Overrides container parent click-blocking
            willChange: 'transform',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.06, duration: 0.2, overwrite: 'auto' });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }}
        >
          Linkedin
        </a>
      </div>

      {/* Copy Success Toast Alert (Slides up from the bottom center of the tile) */}
      <div
        style={{
          position: 'absolute',
          bottom: showToast ? '16px' : '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: showToast ? 1 : 0,
          backgroundColor: '#1E1F22',
          color: '#ffffff',
          padding: '8px 18px',
          borderRadius: TILE_RADIUS,
          fontSize: '12.5px',
          fontWeight: '700',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 10,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Small success checkmark */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22C55E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './EduTile.module.css';

// ================= CONFIGURATION =================
const TILE_WIDTH = "span 5";
const TILE_HEIGHT = "span 3";
const TILE_BG_COLOR = "#4FADF5";
const TILE_TEXT_COLOR = "#000000"; // Color of all text and shapes inside the tile
const TILE_HOVER_BORDER_COLOR = "#3B82F6"; // Border color on hover
const TILE_RADIUS = "5px";
// =================================================

export default function EduTile() {

  // ── GSAP Refs ──
  const spinnerRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    // Don't run animations if elements are missing
    if (!spinnerRef.current || shapesRef.current.length === 0) return;

    const spinner = spinnerRef.current;
    const shapes = shapesRef.current;

    // 1. The Continuous Spin
    // A linear, infinite rotation applied to the parent container
    const spinTween = gsap.to(spinner, {
      rotation: 360,
      duration: 8, // Slower base spin so the pop morphing stands out more
      ease: "none",
      repeat: -1
    });

    // 2. The Morphing Sequence
    // A timeline that perfectly synchronizes the fade/scale/rotate of the SVGs
    const tl = gsap.timeline({ repeat: -1 });

    // Initial State: Shape 1 is fully visible, Shapes 2 & 3 are hidden, shrunk, and rotated
    gsap.set(shapes[0], { opacity: 1, scale: 1, rotation: 0 });
    gsap.set([shapes[1], shapes[2]], { opacity: 0, scale: 0, rotation: -90 });

    const hold = 1.6;  // How long a shape stays visible before morphing
    const morphOut = 0.4; // Fast snap out
    const morphIn = 0.6;  // Bouncy snap in

    // Transition 1: Shape 0 out -> Shape 1 in
    tl.to(shapes[0], { scale: 0, rotation: 90, duration: morphOut, ease: "back.in(1.5)" }, `+=${hold}`)
      .to(shapes[0], { opacity: 0, duration: morphOut, ease: "power1.inOut" }, "<")

      .set(shapes[1], { rotation: -90 }, "<") // Ensure it starts from -90
      .to(shapes[1], { scale: 1, rotation: 0, duration: morphIn, ease: "back.out(1.7)" }, "-=0.15")
      .to(shapes[1], { opacity: 1, duration: morphIn, ease: "power1.inOut" }, "<")

      // Transition 2: Shape 1 out -> Shape 2 in
      .to(shapes[1], { scale: 0, rotation: 90, duration: morphOut, ease: "back.in(1.5)" }, `+=${hold}`)
      .to(shapes[1], { opacity: 0, duration: morphOut, ease: "power1.inOut" }, "<")

      .set(shapes[2], { rotation: -90 }, "<") // Ensure it starts from -90
      .to(shapes[2], { scale: 1, rotation: 0, duration: morphIn, ease: "back.out(1.7)" }, "-=0.15")
      .to(shapes[2], { opacity: 1, duration: morphIn, ease: "power1.inOut" }, "<")

      // Transition 3: Shape 2 out -> Shape 0 in
      .to(shapes[2], { scale: 0, rotation: 90, duration: morphOut, ease: "back.in(1.5)" }, `+=${hold}`)
      .to(shapes[2], { opacity: 0, duration: morphOut, ease: "power1.inOut" }, "<")

      .set(shapes[0], { rotation: -90 }, "<") // CRITICAL: Fixes the backward spin stutter!
      .to(shapes[0], { scale: 1, rotation: 0, duration: morphIn, ease: "back.out(1.7)" }, "-=0.15")
      .to(shapes[0], { opacity: 1, duration: morphIn, ease: "power1.inOut" }, "<");

    // Interactive Hover Effect on the tile to make the spinner "pop"
    const tileElement = spinner.closest('.tile');
    let hoverTween;

    if (tileElement) {
      const handleMouseEnter = () => {
        hoverTween = gsap.to(spinner, { scale: 1.25, duration: 0.4, ease: "back.out(2)" });
      };
      const handleMouseLeave = () => {
        if (hoverTween) hoverTween.kill();
        gsap.to(spinner, { scale: 1, duration: 0.4, ease: "back.out(1.5)" });
      };

      tileElement.addEventListener('mouseenter', handleMouseEnter);
      tileElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        spinTween.kill();
        tl.kill();
        tileElement.removeEventListener('mouseenter', handleMouseEnter);
        tileElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Cleanup on unmount (fallback if tileElement not found)
    return () => {
      spinTween.kill();
      tl.kill();
    };
  }, []);


  return (
    <div
      className="tile tile-edu"
      data-i="3"
      style={{
        gridColumn: TILE_WIDTH,
        gridRow: TILE_HEIGHT,
        height: '100%',
        backgroundColor: TILE_BG_COLOR,
        color: TILE_TEXT_COLOR,

        boxSizing: 'border-box',
        "--tile-radius": TILE_RADIUS,
        "--tile-hover-border-color": TILE_HOVER_BORDER_COLOR,
        position: 'relative'
      }}
    >
      <div className={styles['stat-tile-container']}>

        <h1 className={styles['stat-hero-number']} style={{ fontFamily: 'DynaPuff' }}>
          2018—22
        </h1>

        <div className={styles['stat-bottom-row']}>
          {/* ── Morphing & Spinning SVG Shapes ── */}
          <div className={styles['shape-spinner']} ref={spinnerRef}>

            {/* Shape 1: 4-Point Star */}
            <svg
              ref={(el) => (shapesRef.current[0] = el)}
              viewBox="0 0 24 24"
              className={styles['shape-img']}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 1C12 7.075 7.075 12 1 12C7.075 12 12 16.925 12 23C12 16.925 16.925 12 23 12C16.925 12 12 7.075 12 1Z" />
            </svg>

            {/* Shape 2: 4-Leaf Clover */}
            <svg
              ref={(el) => (shapesRef.current[1] = el)}
              viewBox="0 0 24 24"
              className={styles['shape-img']}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="5.5" />
              <circle cx="16" cy="8" r="5.5" />
              <circle cx="8" cy="16" r="5.5" />
              <circle cx="16" cy="16" r="5.5" />
            </svg>

            {/* Shape 3: 8-Point Asterisk */}
            <svg
              ref={(el) => (shapesRef.current[2] = el)}
              viewBox="0 0 24 24"
              className={styles['shape-img']}
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="square"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
              <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
            </svg>

          </div>

          <div className={styles['stat-details-block']}>
            <p className={styles['stat-line']} style={{ fontWeight: '800' }}>Marketing</p>
            <p className={`${styles['stat-line']} sub`} style={{ fontWeight: '800', opacity: 0.75 }}>UEH University</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Topbar.module.css';

export default function Topbar({ activeTab, setActiveTab }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  const pillRef = useRef(null);
  const indicatorRef = useRef(null);

  // Position indicator based on hover state if present, otherwise default to active tab
  const displayTab = hoveredTab || activeTab;

  // 1. Sliding indicator animation (Super pop elastic spring!)
  useGSAP(() => {
    gsap.to(indicatorRef.current, {
      x: displayTab === 'home' ? 0 : (displayTab === 'about' ? 86 : 172),
      duration: 0.45,
      ease: "elastic.out(1, 0.78)", // Premium bouncy elastic pop overshoot
      overwrite: "auto"
    });
  }, { dependencies: [displayTab], scope: pillRef });

  // 2. Pill float up and scale on hover
  const handlePillEnter = () => {
    gsap.to(pillRef.current, {
      y: -4,
      scale: 1.035,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handlePillLeave = () => {
    gsap.to(pillRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
    setHoveredTab(null);
  };

  // 3. Tactile button squash compression on click
  const handlePillDown = () => {
    gsap.to(pillRef.current, {
      y: -1, // Moves down slightly
      scale: 0.94, // Squeezes down
      duration: 0.12,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handlePillUp = () => {
    // Spring release back to hover state
    gsap.to(pillRef.current, {
      y: -4,
      scale: 1.035,
      duration: 0.25,
      ease: "back.out(2)", // Bouncy pop spring release
      overwrite: "auto"
    });
  };

  return (
    <nav className={styles.topbar}>
      <div
        ref={pillRef}
        className={styles['topbar-nav-pill']}
        onMouseEnter={handlePillEnter}
        onMouseLeave={handlePillLeave}
        onMouseDown={handlePillDown}
        onMouseUp={handlePillUp}
      >
        <div
          ref={indicatorRef}
          className={styles['topbar-nav-indicator']}
          style={{ transform: 'translateX(0)' }} // Handled dynamically by GSAP
        />
        <button
          className={`${styles['topbar-nav-item']} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => setActiveTab('home')}
          onMouseEnter={() => setHoveredTab('home')}
        >
          Home
        </button>
        <button
          className={`${styles['topbar-nav-item']} ${activeTab === 'about' ? styles.active : ''}`}
          onClick={() => setActiveTab('about')}
          onMouseEnter={() => setHoveredTab('about')}
        >
          About
        </button>
        <button
          className={`${styles['topbar-nav-item']} ${activeTab === 'work' ? styles.active : ''}`}
          onClick={() => setActiveTab('work')}
          onMouseEnter={() => setHoveredTab('work')}
        >
          Work
        </button>
      </div>
    </nav>
  );
}
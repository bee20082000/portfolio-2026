import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onReveal, onDone }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const [windowLoaded, setWindowLoaded] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")

  const steps = [
    "fixing spacing nobody noticed...",
    "making sure to remove all the memes...",
    "okay, ready."
  ]

  // The exact math distribution for your 15 units of width
  const initialWidths = [5, 4, 3, 2, 1]
  const targetWidths = [1, 2, 3, 4, 5]

  // ── Block All Mouse Interactions on Mount ──
  useEffect(() => {
    document.body.style.pointerEvents = "none";
    return () => { document.body.style.pointerEvents = ""; };
  }, []);

  // ── Cycle Text ──
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(prev => {
        if (prev < steps.length - 1) return prev + 1
        clearInterval(timer)
        return prev
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  // ── Typing Animation Effect ──
  useEffect(() => {
    const fullText = steps[textIndex]
    setDisplayedText("")
    let i = 0

    // Speed: type the full string in ~1500ms, capped between 40ms and 70ms per character for an organic typing pace
    const speed = Math.max(40, Math.min(70, 1500 / fullText.length))

    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, speed)

    return () => clearInterval(typeTimer)
  }, [textIndex])

  // ── Window Load Listener ──
  useEffect(() => {
    if (document.readyState === 'complete') {
      setWindowLoaded(true)
    } else {
      const handleLoad = () => setWindowLoaded(true)
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  // ── Extreme Bouncy Mathematical Blob Animation ──
  // ── Perfectly Consistent, Non-Bouncy Blob Animation ──
  useEffect(() => {
    const blobs = gsap.utils.toArray(`.${styles.blob}`);

    // The strict 1/30th scale targets [0.5, 1.5, 3, 4.5, 5.5]
    const consistentTargets = [0.5, 1.5, 3, 4.5, 5.5];

    blobs.forEach((blob, index) => {
      gsap.to(blob, {
        flexGrow: consistentTargets[index],
        duration: 1.2, // Uniform speed across both directions
        repeat: -1,
        yoyo: true,
        // power3.inOut ensures the ease-in and ease-out match perfectly,
        // keeping the loop rhythm completely consistent.
        ease: "power3.inOut"
      });
    });


    return () => gsap.killTweensOf(blobs);
  }, []);

  // ── Exit Animation ──
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || !windowLoaded) return

    const exitTimer = setTimeout(() => {
      if (onReveal) onReveal();

      setTimeout(() => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
          onComplete: () => {
            document.body.style.pointerEvents = "";
            if (onDone) onDone()
          }
        })
      }, 100);
    }, 8000);

    return () => clearTimeout(exitTimer)
  }, [windowLoaded, onReveal, onDone])

  return (
    <div
      className={styles['loading-overlay']}
      ref={overlayRef}
      style={{ cursor: 'none' }}
    >
      <div className={styles['loading-inner']}>

        {/* ── Seamless Full-Screen Background ── */}
        <div className={styles['blob-container']}>
          {initialWidths.map((startWidth, i) => (
            <div
              key={i}
              className={styles.blob}
              // Set the exact starting width mathematically
              style={{ flexGrow: startWidth }}
            ></div>
          ))}
        </div>

        {/* ── Big Center Text Overlay ── */}
        <div
          className={styles['loading-text-big']}
          ref={textRef}
        >
          {displayedText}
          <span className={styles['loading-cursor']}>|</span>
        </div>

      </div>
    </div>
  )
}
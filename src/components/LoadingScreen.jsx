import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onDone }) {
  const overlayRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const [windowLoaded, setWindowLoaded] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  const steps = [
    "making up stories...",
    "fixing spacing nobody noticed...",
    "making sure to remove all the meme...",
    "okay, ready."
  ]

  // ── Block All Mouse Interactions on Mount ──
  useEffect(() => {
    // Disable clicks, hovers, and pointer interactions globally
    document.body.style.pointerEvents = "none";

    return () => {
      // Re-enable everything once the component unmounts
      document.body.style.pointerEvents = "";
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!textRef.current) return
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 8, filter: "blur(2px)" },
      { opacity: 0.85, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    )
  }, [textIndex])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setWindowLoaded(true)
    } else {
      const handleLoad = () => setWindowLoaded(true)
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const bar = barRef.current
    if (!overlay || !bar) return

    let activeTween

    if (!windowLoaded) {
      activeTween = gsap.to(bar, {
        scaleX: 0.9,
        duration: 4.5,
        ease: 'power1.out',
        transformOrigin: 'left center'
      })
    } else {
      activeTween = gsap.to(bar, {
        scaleX: 1,
        duration: 3.5,
        ease: 'power1.out',
        transformOrigin: 'left center',
        onComplete: () => {
          gsap.to(overlay, {
            yPercent: -100,
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: () => {
              // Re-enable pointer events exactly when the loading screen animation fully clears
              document.body.style.pointerEvents = "";
              if (onDone) onDone()
            }
          })
        }
      })
    }

    return () => {
      if (activeTween) activeTween.kill()
    }
  }, [windowLoaded, onDone])

  return (
    <div
      className="loading-overlay"
      ref={overlayRef}
      style={{ cursor: 'none' }}
    >
      <div className="loading-inner" style={{ gap: '20px', textAlign: 'center', maxWidth: '380px', padding: '0 24px' }}>

        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto' }}>
          <img
            src="/asset/img/b79e60987fbefee0a7af.jpg"
            alt="A fat cat"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              objectFit: 'cover',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
          />
        </div>

        <div className="loading-bar-track" style={{ marginTop: '8px' }}>
          <div className="loading-bar-fill" ref={barRef}></div>
        </div>

        <div
          className="loading-hint"
          ref={textRef}
          style={{
            marginTop: '4px',
            fontSize: '15px',
            lineHeight: '1.6',
            color: 'var(--text2)',
            fontWeight: '600',
            textTransform: 'none',
            letterSpacing: '0.02em',
            opacity: 1
          }}
        >
          {steps[textIndex]}
        </div>

      </div>
    </div>
  )
}
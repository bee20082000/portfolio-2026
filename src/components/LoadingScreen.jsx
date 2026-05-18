import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onDone }) {
  const overlayRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const bar = barRef.current

    // Animate the progress bar from 0 → 100%
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the overlay up + fade out when complete
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          onComplete: () => {
            if (onDone) onDone()
          }
        })
      }
    })

    tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut', transformOrigin: 'left center' })

    return () => tl.kill()
  }, [onDone])

  return (
    <div className="loading-overlay" ref={overlayRef}>
      <div className="loading-inner">
        <div className="loading-bar-track">
          <div className="loading-bar-fill" ref={barRef}></div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onReveal, onDone }) {
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  
  const onRevealRef = useRef(onReveal)
  const onDoneRef = useRef(onDone)
  const exitFiredRef = useRef(false)

  // Keep callbacks current
  useEffect(() => { onRevealRef.current = onReveal }, [onReveal])
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  // Block pointer-events while loading
  useEffect(() => {
    document.body.style.pointerEvents = 'none'
    return () => { document.body.style.pointerEvents = '' }
  }, [])

  useEffect(() => {
    if (!overlayRef.current) return
    
    gsap.set(overlayRef.current, { clipPath: 'circle(150% at 50% 50%)' })
    
    const counter = { val: 1 }
    
    const tl = gsap.timeline({
      onComplete: () => {
        if (exitFiredRef.current) return
        exitFiredRef.current = true

        if (onRevealRef.current) onRevealRef.current()

        // 1. Shrink the number into the center
        gsap.to(counterRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.15,
          ease: 'expo.in'
        })

        // Trigger the hero text explosion exactly when the iris starts wiping
        setTimeout(() => {
          if (onDoneRef.current) onDoneRef.current()
        }, 100)

        // 2. Iris wipe the background
        gsap.to(overlayRef.current, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.4,
          ease: 'expo.inOut',
          delay: 0.1, // wait briefly for number to vanish
          onComplete: () => {
            document.body.style.pointerEvents = ''
          }
        })
      }
    })

    // Animate from 1 to 100 in 0.4 seconds to step many numbers quickly
    tl.to(counter, {
      val: 100,
      duration: 0.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.val)
        }
      }
    })

    return () => tl.kill()
  }, [])

  return (
    <div className={styles['loading-overlay']} ref={overlayRef}>
      <div className={styles['loading-inner']}>
        <div className={styles['counter-container']}>
          <span ref={counterRef} className={styles['counter-number']}>1</span>
        </div>
      </div>
    </div>
  )
}
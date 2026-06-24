import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onReveal, onDone }) {
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  
  const onRevealRef = useRef(onReveal)
  const onDoneRef = useRef(onDone)

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
        document.body.style.pointerEvents = ''
      }
    })

    // 1. Count from 1 to 100 quickly
    tl.to(counter, {
      val: 100,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.val)
        }
      }
    })

    // 2. Unified reveal transition sequence
    tl.addLabel('reveal')

    // Call onReveal instantly so background grid starts preparing
    tl.call(() => {
      if (onRevealRef.current) onRevealRef.current()
    }, null, 'reveal')

    // Fade and scale down the counter number
    tl.to(counterRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 'reveal')

    // Iris wipe the black background
    tl.to(overlayRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.55,
      ease: 'power3.inOut'
    }, 'reveal')

    // Trigger the hero text burst 0.15s into the wipe, creating a layered, fluid overlap
    tl.call(() => {
      if (onDoneRef.current) onDoneRef.current()
    }, null, 'reveal+=0.15')

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
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onReveal, onDone }) {
  const overlayRef = useRef(null)
  
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
    
    // We start with the full circle, then immediately wipe it out.
    gsap.set(overlayRef.current, { clipPath: 'circle(150% at 50% 50%)' })
    
    // Call onReveal instantly so the background grid knows to render
    if (onRevealRef.current) onRevealRef.current()

    // Trigger the hero text explosion shortly after
    const doneTimer = setTimeout(() => {
      if (onDoneRef.current) onDoneRef.current()
    }, 50)

    // Iris wipe the background super fast
    const wipeTween = gsap.to(overlayRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.5,
      ease: 'expo.inOut',
      onComplete: () => {
        document.body.style.pointerEvents = ''
      }
    })

    return () => {
      wipeTween.kill()
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className={styles['loading-overlay']} ref={overlayRef}>
      {/* Skipping number counter for faster initial load */}
    </div>
  )
}
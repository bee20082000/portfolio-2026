import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './LoadingScreen.module.css'

const STEPS = [
  "be patients",
  "almost there%",
  "okay, ready.",
]

// Total minimum display time in ms before the overlay slides away
const EXIT_DELAY_MS = 1000

export default function LoadingScreen({ onReveal, onDone }) {
  const overlayRef = useRef(null)
  const onRevealRef = useRef(onReveal)
  const onDoneRef = useRef(onDone)
  const exitFiredRef = useRef(false)          // guard: run exit exactly once
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')

  // Keep callbacks current without resetting timers
  useEffect(() => { onRevealRef.current = onReveal }, [onReveal])
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  // Block pointer-events while loading
  useEffect(() => {
    document.body.style.pointerEvents = 'none'
    return () => { document.body.style.pointerEvents = '' }
  }, [])

  // Cycle through text steps
  useEffect(() => {
    let idx = 0
    const id = setInterval(() => {
      idx += 1
      if (idx < STEPS.length) {
        setTextIndex(idx)
      } else {
        clearInterval(id)
      }
    }, EXIT_DELAY_MS / STEPS.length)
    return () => clearInterval(id)
  }, [])

  // Typewriter effect for the current step
  useEffect(() => {
    const fullText = STEPS[textIndex]
    setDisplayedText('')
    let i = 0
    const speed = Math.max(30, Math.min(70, 1200 / fullText.length))
    const id = setInterval(() => {
      i += 1
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i))
      } else {
        clearInterval(id)
      }
    }, speed)
    return () => clearInterval(id)
  }, [textIndex])

  // Blob animation
  useEffect(() => {
    const blobs = gsap.utils.toArray(`.${styles.blob}`)
    const targets = [0.5, 1.5, 3, 4.5, 5.5]
    blobs.forEach((blob, i) => {
      gsap.to(blob, { flexGrow: targets[i], duration: 1.2, repeat: -1, yoyo: true, ease: 'power3.inOut' })
    })
    return () => gsap.killTweensOf(blobs)
  }, [])

  // Exit — unconditionally schedules exit upon mounting
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Prevent double-fire
    if (exitFiredRef.current) return
    exitFiredRef.current = true

    // Reveal page content while overlay is still visible
    if (onRevealRef.current) onRevealRef.current()

    // Short pause then slide overlay away
    const id = setTimeout(() => {
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.8,
        ease: 'expo.inOut',
        onComplete: () => {
          document.body.style.pointerEvents = ''
          if (onDoneRef.current) onDoneRef.current()
        },
      })
    }, EXIT_DELAY_MS)

    return () => {
      clearTimeout(id)
      exitFiredRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles['loading-overlay']} ref={overlayRef}>
      <div className={styles['loading-inner']}>

        {/* Animated blob strips */}
        <div className={styles['blob-container']}>
          {[5, 4, 3, 2, 1].map((w, i) => (
            <div key={i} className={styles.blob} style={{ flexGrow: w }} />
          ))}
        </div>

        {/* Typewriter text */}
        <div className={styles['loading-text-big']}>
          {displayedText}
          <span className={styles['loading-cursor']}>|</span>
        </div>

      </div>
    </div>
  )
}
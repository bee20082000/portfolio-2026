import React, { useEffect, useState, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import CloseButton from '../ui/CloseButton'
import styles from './BlogModal.module.css'

// Lazy-load each case's modal from its own folder
const COMPONENTS = {
  lipton: lazy(() => import('../work/lipton/Modal')),
  axon_active: lazy(() => import('../work/axon_active/Modal')),
  tuongan: lazy(() => import('../work/tuongan/Modal')),
  thuyen_xua_food: lazy(() => import('../work/thuyen_xua_food/Modal')),
  chivas: lazy(() => import('../work/chivas/Modal')),
  lipton_tet_2024: lazy(() => import('../work/lipton_tet_2024/Modal')),
  panasonic_tho_dien: lazy(() => import('../work/panasonic_tho_dien/Modal')),
  moe: lazy(() => import('../work/moe/Modal')),
}

export default function BlogModal({ activeCase, onClose }) {
  const [localCase, setLocalCase] = useState(null)
  const modalRef = useRef(null)
  const containerRef = useRef(null)
  const scrollRef = useRef(null)

  // Sync activeCase to localCase immediately when activeCase is active
  useEffect(() => {
    if (activeCase) setLocalCase(activeCase)
  }, [activeCase])

  // GSAP Entry Animation
  useGSAP(() => {
    if (localCase && containerRef.current) {
      const tl = gsap.timeline()
      // 1. Smoothly fade in the black overlay background
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      )
      // 2. Elegantly slide the content body up from the bottom
      if (scrollRef.current) {
        tl.fromTo(scrollRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          "-=0.35" // Overlap with overlay fade
        )
      }
      // 3. Bounce close button in from below
      tl.fromTo('.blog-close',
        { y: 60, opacity: 0, pointerEvents: "none", xPercent: -50 },
        { y: 0, opacity: 1, pointerEvents: "auto", xPercent: -50, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.55"
      )
    }
  }, { dependencies: [localCase], scope: modalRef })

  // Smooth scrolling for the blog overlay with safe RAF tracking
  useEffect(() => {
    const wrapper = containerRef.current
    const content = scrollRef.current
    if (!wrapper || !content || !localCase) return

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0
    })

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [localCase])

  const handleClose = () => {
    if (!containerRef.current) return
    const tl = gsap.timeline({
      onComplete: () => { setLocalCase(null); onClose() }
    })
    // 1. Retract close button
    tl.to('.blog-close', { y: 40, opacity: 0, pointerEvents: "none", xPercent: -50, duration: 0.3, ease: "power2.in" }, 0)
    // 2. Smoothly dissolve and sink individual content cards
    tl.to('.modal-bento-item, .modal-animate-el', { y: 30, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.in" }, 0)
    // 3. Slide the body container down slightly
    if (scrollRef.current) {
      tl.to(scrollRef.current, { y: 80, opacity: 0, duration: 0.4, ease: "power3.in" }, 0)
    }
    // 4. Fade overlay background out
    tl.to(containerRef.current, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, "-=0.25")
  }

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [localCase])

  if (!localCase) return null

  const ContentComponent = COMPONENTS[localCase]

  return (
    <div ref={modalRef}>
      <CloseButton className="blog-close" onClick={handleClose} label="Close" />
      <div className={`${styles['blog-overlay']} ${activeCase ? styles.open : ''}`} ref={containerRef} data-lenis-prevent>
        <div className={styles['blog-body']} ref={scrollRef}>
          {ContentComponent ? (
            <Suspense fallback={<div style={{ padding: '60px', color: 'var(--text3)', textAlign: 'center' }}>Loading…</div>}>
              <ContentComponent />
            </Suspense>
          ) : (
            <div style={{ padding: '60px', color: 'var(--text3)' }}>Case not found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
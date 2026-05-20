import React, { useEffect, useState, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import CloseButton from './CloseButton'

// Lazy-load each case's modal from its own folder
const COMPONENTS = {
  panasonic:      lazy(() => import('./cases/panasonic/Modal')),
  heineken:       lazy(() => import('./cases/heineken/Modal')),
  tuongan:        lazy(() => import('./cases/tuongan/Modal')),
  pepsico:        lazy(() => import('./cases/pepsico/Modal')),
  spotify_remix:  lazy(() => import('./cases/spotify_remix/Modal')),
  urban_frames:   lazy(() => import('./cases/urban_frames/Modal')),
  brand_campaign: lazy(() => import('./cases/brand_campaign/Modal')),
  honda_mobility: lazy(() => import('./cases/honda_mobility/Modal')),
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
      gsap.set(containerRef.current, { yPercent: 0, y: 0 })
      tl.fromTo(containerRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power4.out" }
      )
      tl.fromTo('.blog-close',
        { y: 50, opacity: 0, pointerEvents: "none", xPercent: -50 },
        { y: 0, opacity: 1, pointerEvents: "auto", xPercent: -50, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.55"
      )
      tl.fromTo('.blog-slide',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.45"
      )
    }
  }, { dependencies: [localCase], scope: modalRef })

  // Smooth scrolling for the blog overlay
  useEffect(() => {
    const wrapper = containerRef.current
    const content = scrollRef.current
    if (!wrapper || !content || !localCase) return
    const lenis = new Lenis({
      wrapper, content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [localCase])

  const handleClose = () => {
    if (!containerRef.current) return
    const tl = gsap.timeline({
      onComplete: () => { setLocalCase(null); onClose() }
    })
    tl.to('.blog-close', { y: 35, opacity: 0, pointerEvents: "none", xPercent: -50, duration: 0.25, ease: "power2.in" }, 0)
    tl.to('.blog-slide', { y: 30, opacity: 0, duration: 0.25, stagger: 0.04, ease: "power2.in" }, 0)
    tl.to(containerRef.current, { y: 120, opacity: 0, duration: 0.55, ease: "power3.in" }, "-=0.15")
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
      <div className={`blog-overlay ${activeCase ? 'open' : ''}`} ref={containerRef} data-lenis-prevent>
        <div className="blog-body" ref={scrollRef}>
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

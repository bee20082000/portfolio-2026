import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CloseButton from '../ui/CloseButton'
import useSmoothScroll from '../../hooks/useSmoothScroll'
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
  nam_dinh_vu: lazy(() => import('../work/nam_dinh_vu/Modal')),
  social_post_2025: lazy(() => import('../work/social_post_2025/Modal')),
  social_post_2026: lazy(() => import('../work/social_post_2026/Modal')),
  santen: lazy(() => import('../work/santen/Modal')),
  nakivo: lazy(() => import('../work/nakivo/Modal')),
  suzuki_social: lazy(() => import('../work/suzuki_social/Modal')),
  icoffee: lazy(() => import('../work/icoffee/Modal')),
}

export default function BlogModal({ activeCase, onClose }) {
  const [localCase, setLocalCase] = useState(null)
  const modalRef = useRef(null)
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const closeRef = useRef(null)

  // Sync activeCase → localCase on open
  useEffect(() => {
    if (activeCase) {
      setLocalCase(activeCase)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
    }
  }, [activeCase])

  // Dedicated container-level Lenis instance for silky smooth modal scrolling
  // without mutating transform: translateY on the DOM every frame.
  const modalLenisRef = useSmoothScroll({
    wrapperRef: containerRef,
    contentRef: scrollRef,
    enabled: !!localCase,
  })

  // GSAP Entry Animation
  useGSAP(() => {
    if (localCase && containerRef.current) {
      containerRef.current.scrollTop = 0
      const tl = gsap.timeline()
      // 1. Fade in the overlay background
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      // 2. Slide the content body up snappily
      if (scrollRef.current) {
        tl.fromTo(scrollRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power4.out', clearProps: 'transform' },
          '-=0.15'
        )
      }
      // 3. Bounce close button in fast
      if (closeRef.current) {
        tl.fromTo(closeRef.current,
          { y: 60, opacity: 0, pointerEvents: 'none' },
          { y: 0, opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'back.out(1.5)' },
          '-=0.35'
        )
      }
    }
  }, { dependencies: [localCase], scope: modalRef })

  const handleClose = () => {
    if (!containerRef.current) return

    // Disable pointer-events immediately
    containerRef.current.style.pointerEvents = 'none'

    // Stop modal scroll during exit transition
    if (modalLenisRef.current) {
      modalLenisRef.current.stop()
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setLocalCase(null)
        onClose()
      }
    })

    // ── STEP 1: Close button playfully pops out ──
    if (closeRef.current) {
      tl.to(closeRef.current, {
        y: -20,
        opacity: 0,
        scale: 0.8,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'back.in(1.5)',
      }, 0)
    }

    // ── STEP 2: Content body playfully scales down and drops out ──
    if (scrollRef.current) {
      tl.to(scrollRef.current, {
        y: 60,
        scale: 0.98,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      }, 0.05)
    }

    // ── STEP 3: Overlay background dissolves quickly ──
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    }, 0.15)
  }

  // Close on Escape
  useEffect(() => {
    if (!localCase) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localCase])

  if (!localCase) return null

  const ContentComponent = COMPONENTS[localCase]

  return (
    <div ref={modalRef}>
      <div className="blog-close" ref={closeRef}>
        <CloseButton onClick={handleClose} label="Close" />
      </div>
      {/* Overlay clips content — overflow: hidden, Lenis drives scrollY externally */}
      <div
        className={`${styles['blog-overlay']} ${activeCase ? styles.open : ''}`}
        ref={containerRef}
      >
        {/* Content slides up via transform driven by global Lenis */}
        <div className={styles['blog-body']} ref={scrollRef}>
          {ContentComponent ? (
            <Suspense fallback={<div style={{ padding: '60px', color: 'var(--text3)', textAlign: 'center' }}>Loading…</div>}>
              <ContentComponent />
            </Suspense>
          ) : (
            <div style={{ padding: '60px', color: 'var(--text3)' }}>Case not found.</div>
          )}
          {/* Bottom spacer so content doesn't end flush at the Lenis scroll limit */}
          <div style={{ height: '32px', width: '100%', flexShrink: 0 }} aria-hidden="true"></div>
        </div>
      </div>
    </div>
  )
}
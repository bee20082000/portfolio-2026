import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
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
  const modalRef     = useRef(null)
  const containerRef = useRef(null)
  const scrollRef    = useRef(null)
  const closeRef     = useRef(null)

  // These refs give handleClose synchronous access to cleanup resources
  // without needing to wait for React's useEffect cleanup to run.
  const lenisHandlerRef = useRef(null)  // the active Lenis 'scroll' listener
  const savedScrollRef  = useRef(0)     // background page scroll position at modal open
  const spacerRef       = useRef(null)  // the document-height spacer element
  const roRef           = useRef(null)  // ResizeObserver instance

  // Sync activeCase → localCase on open
  useEffect(() => {
    if (activeCase) setLocalCase(activeCase)
  }, [activeCase])

  // ── PAGE-SWAP: Single global Lenis drives the modal scroll ──
  // When modal opens:
  //   1. Save window scroll position
  //   2. Scroll window to 0 (so Lenis starts from 0 for the modal)
  //   3. Global Lenis KEEPS running — it drives window.scrollY
  //   4. We listen to Lenis scroll events and translate modal content via transform
  //   5. Sync document height to modal content height so Lenis limit is correct
  // When modal closes (via handleClose or React cleanup):
  //   6. Detach listener, remove spacer, restore background scroll
  useEffect(() => {
    if (!localCase) return

    // Save where the background page was
    savedScrollRef.current = window.lenis?.scroll ?? window.scrollY ?? 0

    // A hidden spacer div appended to <body> that forces the document
    // to be tall enough for the modal content. This gives global Lenis
    // the correct scroll limit without touching the real page layout.
    const spacer = document.createElement('div')
    spacer.id = 'modal-scroll-spacer'
    spacer.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden;'
    document.body.appendChild(spacer)
    spacerRef.current = spacer

    // Update document scroll height to match modal content
    const syncScrollHeight = () => {
      if (!scrollRef.current) return
      const modalHeight = scrollRef.current.scrollHeight
      spacer.style.height = `${modalHeight}px`
      spacer.style.position = 'absolute'
      spacer.style.top = '0'
      // Force Lenis to re-read dimensions
      if (window.lenis) window.lenis.resize()
    }

    // Watch for modal content size changes (lazy loading, images)
    const ro = new ResizeObserver(syncScrollHeight)
    if (scrollRef.current) ro.observe(scrollRef.current)
    roRef.current = ro

    // Jump to top so the modal content starts at the beginning
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Run initial sync after a frame (let Suspense content mount)
    requestAnimationFrame(syncScrollHeight)

    // Translate modal content as global Lenis scrolls the window
    const handleLenisScroll = ({ scroll }) => {
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(-${scroll}px)`
      }
    }
    lenisHandlerRef.current = handleLenisScroll
    window.lenis?.on('scroll', handleLenisScroll)

    // Notify App.jsx to freeze the background and keep Lenis running
    window.dispatchEvent(new CustomEvent('modalScrollOpen', { detail: savedScrollRef.current }))

    return () => {
      // Detach Lenis listener (may already be null if handleClose ran first — safe)
      if (lenisHandlerRef.current) {
        window.lenis?.off('scroll', lenisHandlerRef.current)
        lenisHandlerRef.current = null
      }
      roRef.current?.disconnect()
      roRef.current = null
      spacerRef.current?.remove()
      spacerRef.current = null

      // Reset the modal content translation
      if (scrollRef.current) {
        scrollRef.current.style.transform = ''
      }

      // Restore the saved scroll position
      window.dispatchEvent(new CustomEvent('modalScrollClose', { detail: savedScrollRef.current }))
    }
  }, [localCase])

  // GSAP Entry Animation
  useGSAP(() => {
    if (localCase && containerRef.current) {
      const tl = gsap.timeline()
      // 1. Fade in the overlay background
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
      // 2. Slide the content body up
      if (scrollRef.current) {
        tl.fromTo(scrollRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.35'
        )
      }
      // 3. Bounce close button in
      if (closeRef.current) {
        tl.fromTo(closeRef.current,
          { y: 60, opacity: 0, pointerEvents: 'none' },
          { y: 0, opacity: 1, pointerEvents: 'auto', duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.55'
        )
      }
    }
  }, { dependencies: [localCase], scope: modalRef })

  const handleClose = () => {
    if (!containerRef.current) return

    // Disable pointer-events on the overlay instantly so the user can hover the background page
    containerRef.current.style.pointerEvents = 'none';

    // Capture the exact modal scroll position before we reset Lenis.
    // This fixes a GSAP cache mismatch: Lenis updates style.transform manually,
    // so GSAP thinks 'y' is still 0 from the entry animation. We force the starting y.
    const modalScrollY = window.lenis?.scroll ?? 0

    // ── STEP 0 (Critical): Detach Lenis listener BEFORE starting any animation ──
    if (lenisHandlerRef.current) {
      window.lenis?.off('scroll', lenisHandlerRef.current)
      lenisHandlerRef.current = null
    }

    // ── STEP 0b: Restore background scroll while overlay is still FULLY OPAQUE ──
    roRef.current?.disconnect()
    roRef.current = null
    spacerRef.current?.remove()
    spacerRef.current = null
    window.dispatchEvent(new CustomEvent('modalScrollClose', { detail: savedScrollRef.current }))

    const tl = gsap.timeline({
      onComplete: () => { setLocalCase(null); onClose() }
    })

    // ── STEP 1: Close button exits first (it triggered the action, it leaves first) ──
    if (closeRef.current) {
      tl.to(closeRef.current, {
        y: 24,
        opacity: 0,
        scale: 0.9,
        pointerEvents: 'none',
        duration: 0.28,
        ease: 'power3.in',
      }, 0)
    }

    // ── STEP 2: Content body slides down and fades ──
    if (scrollRef.current) {
      tl.fromTo(scrollRef.current,
        { y: -modalScrollY },
        {
          y: -modalScrollY + 60,
          opacity: 0,
          duration: 0.42,
          ease: 'power3.in',
        }, 0.06)
    }

    // ── STEP 3: Overlay background dissolves last ──
    // The "room" disappears after the content has already left
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    }, 0.28)
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
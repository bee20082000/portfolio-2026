import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './HomeGrid.module.css'

import HomeBento from './HomeBento'
import AboutBento from '../about/AboutBento'
import WorkBento from '../work/WorkBento'

export default function HomeGrid({ onSelect, loaded, activeTab }) {
  const bentoRef = useRef(null)       // Home bento grid
  const bentoAboutRef = useRef(null)  // About bento grid
  const bentoWorkRef = useRef(null)   // Work bento grid
  const bentoParentRef = useRef(null) // Wrapping container
  const hasRevealedRef = useRef(false)
  const isInitialMount = useRef(true)

  // BUG FIX #1: Store prevTab as a ref that we update MANUALLY at the end of each
  // transition, not via a useEffect. This prevents the race condition where the
  // useEffect would update prevTabRef.current to the new activeTab BEFORE the
  // GSAP transition hook had a chance to read the old value, causing the
  // `if (prevTab === activeTab) return` guard to bail out incorrectly.
  const prevTabRef = useRef(activeTab)
  const activeTabRef = useRef(activeTab)
  activeTabRef.current = activeTab



  // 1. Initial Load Reveal and Hover Repulsion Logic
  useGSAP(() => {
    if (!loaded) return
    const bentoHome = bentoRef.current
    const bentoAbout = bentoAboutRef.current
    const bentoWork = bentoWorkRef.current
    if (!bentoHome || !bentoAbout || !bentoWork) return

    const homeTiles = bentoHome.querySelectorAll('.tile')
    const aboutTiles = bentoAbout.querySelectorAll('.tile')
    const workTiles = bentoWork.querySelectorAll('.tile')
    const allTiles = [...homeTiles, ...aboutTiles, ...workTiles]

    if (!hasRevealedRef.current) {
      hasRevealedRef.current = true

      // BUG FIX #2: Use GSAP to set ALL visibility/height/overflow state.
      // We must NOT let React's inline `style` props race against GSAP.
      // The JSX renders all three grids permanently in the DOM; GSAP alone
      // controls what is shown or hidden.
      gsap.set(bentoHome, {
        height: activeTab === 'home' ? '100vh' : 0,
        overflow: activeTab === 'home' ? 'visible' : 'hidden',
        visibility: activeTab === 'home' ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'home' ? 'auto' : 'none'
      })
      gsap.set(bentoAbout, {
        height: activeTab === 'about' ? 'auto' : 0,
        overflow: activeTab === 'about' ? 'visible' : 'hidden',
        visibility: activeTab === 'about' ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'about' ? 'auto' : 'none'
      })
      gsap.set(bentoWork, {
        height: activeTab === 'work' ? 'auto' : 0,
        overflow: activeTab === 'work' ? 'visible' : 'hidden',
        visibility: activeTab === 'work' ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'work' ? 'auto' : 'none'
      })

      if (activeTab === 'home') {
        gsap.set(homeTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
        gsap.set([...aboutTiles, ...workTiles], { opacity: 0 })
      } else if (activeTab === 'about') {
        gsap.set(aboutTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
        gsap.set([...homeTiles, ...workTiles], { opacity: 0 })
      } else {
        gsap.set([...homeTiles, ...aboutTiles], { opacity: 0 })
        gsap.set(workTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
      }
    }

    // Hardware-Accelerated Progress Bars Filling
    setTimeout(() => {
      allTiles.forEach(el => {
        const fills = el.querySelectorAll('.tool-bar-fill')
        fills.forEach(fill => fill.style.width = fill.dataset.w + '%')
      })
    }, 600)

    // Sibling dimming interaction (applied only to Work tiles)
    workTiles.forEach((tile) => {
      const handleEnter = () => {
        if (window.innerWidth <= 1024) return
        if (activeTabRef.current !== 'work') return
        const siblings = Array.from(tile.parentNode.children)
        siblings.forEach((sibling) => {
          if (sibling === tile || !sibling.classList.contains('tile')) return
          gsap.to(sibling, { opacity: 0.45, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
        })
      }
      const handleLeave = () => {
        if (window.innerWidth <= 1024) return
        if (activeTabRef.current !== 'work') return
        const siblings = Array.from(tile.parentNode.children)
        siblings.forEach((sibling) => {
          if (sibling === tile || !sibling.classList.contains('tile')) return
          gsap.to(sibling, { opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto', clearProps: 'opacity' })
        })
      }
      tile.addEventListener('mouseenter', handleEnter, { passive: true })
      tile.addEventListener('mouseleave', handleLeave, { passive: true })
    })
  }, { dependencies: [loaded], scope: bentoParentRef })

  // 2. Tab Transition Logic
  useGSAP(() => {
    // Skip the very first mount — initial state is already set by the load hook above
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!loaded) return

    const bentoHome = bentoRef.current
    const bentoAbout = bentoAboutRef.current
    const bentoWork = bentoWorkRef.current
    if (!bentoHome || !bentoAbout || !bentoWork) return

    const prevTab = prevTabRef.current

    // Don't animate if tab hasn't actually changed
    if (prevTab === activeTab) return

    // IMMEDIATELY update prevTabRef so rapid clicks use the correct source.
    prevTabRef.current = activeTab

    // Only reset scroll when Home tab is involved. Home is position:fixed so its
    // scroll position is irrelevant. Work & About are in normal document flow —
    // calling scrollTo(0) while their content is visible causes the visible jump.
    if (prevTab === 'home' || activeTab === 'home') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    const homeTiles = bentoHome.querySelectorAll('.tile')
    const aboutTiles = bentoAbout.querySelectorAll('.tile')
    const workTiles = bentoWork.querySelectorAll('.tile')

    const getGridAndTiles = (tab) => {
      if (tab === 'home') return { grid: bentoHome, tiles: homeTiles }
      if (tab === 'about') return { grid: bentoAbout, tiles: aboutTiles }
      return { grid: bentoWork, tiles: workTiles }
    }

    const source = getGridAndTiles(prevTab)
    const dest = getGridAndTiles(activeTab)

    // Kill any in-progress tweens to prevent overlapping animations on rapid clicks
    gsap.killTweensOf([
      bentoHome, bentoAbout, bentoWork,
      ...homeTiles, ...aboutTiles, ...workTiles
    ])

    // Synchronously restore the source grid to visible so it doesn't vanish before its fade-out animation plays
    if (prevTab === 'home') {
      gsap.set(source.grid, { visibility: 'visible', height: '100vh', overflow: 'visible', pointerEvents: 'none' })
    } else {
      gsap.set(source.grid, { visibility: 'visible', height: 'auto', overflow: 'visible', pointerEvents: 'none' })
    }

    // Synchronously setup initial states for the destination grid to prevent visible flash
    if (activeTab === 'home') {
      gsap.set(dest.grid, { visibility: 'visible', pointerEvents: 'none', height: '100vh', overflow: 'visible', scale: 0.98, opacity: 0 })
    } else {
      // Prevent FOUC: Set grid opacity to 0 instantly, then reveal it right before tile animation
      gsap.set(dest.grid, { visibility: 'visible', pointerEvents: 'none', height: 'auto', overflow: 'visible', opacity: 0 })
      gsap.set(dest.tiles, { opacity: 0, scale: 0.97, y: 15 })
    }

    const tl = gsap.timeline()

    // ── STEP 1: Snappy Fade Out ──────────────────────────────────────────
    if (prevTab === 'home') {
      tl.to(source.grid, {
        opacity: 0, scale: 0.98,
        duration: 0.15, ease: 'power2.in', overwrite: 'auto'
      }, 0)
    } else {
      tl.to(source.tiles, {
        opacity: 0, scale: 0.97, y: -10,
        duration: 0.15,
        stagger: { grid: 'auto', from: 'start', amount: 0.05 },
        ease: 'power2.in', overwrite: 'auto'
      }, 0)
    }

    // ── STEP 2: Hide Outgoing Grid Synchronously ──────────────────────────
    tl.set(source.grid, {
      visibility: 'hidden', pointerEvents: 'none', height: 0, overflow: 'hidden',
      clearProps: 'scale,opacity,transform'
    }, 0.16)
    if (prevTab !== 'home') {
      tl.set(source.tiles, { clearProps: 'transform,opacity' }, 0.16)
    }

    // ── STEP 3: Snappy Fade In & Card Appear ──────────────────────────────
    if (activeTab === 'home') {
      tl.to(dest.grid, {
        scale: 1, opacity: 1,
        duration: 0.28, ease: 'power2.out', overwrite: 'auto'
      }, 0.12)
    } else {
      tl.set(dest.grid, { opacity: 1 }, 0.12) // Un-hide the grid container before stagger
      tl.to(dest.tiles, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.28,
        stagger: { grid: 'auto', from: 'start', amount: 0.06 },
        ease: 'power2.out', overwrite: 'auto', clearProps: 'transform,opacity'
      }, 0.12)
    }

    tl.set(dest.grid, { pointerEvents: 'auto', clearProps: 'scale,opacity' })
  }, { dependencies: [activeTab], scope: bentoParentRef })

  // BUG FIX #2: The JSX NO LONGER uses activeTab/renderedTab to set
  // height/visibility/overflow inline. GSAP fully owns those properties.
  // React only sets the STRUCTURAL/STATIC styles (position, gridArea, margins).
  // This eliminates the React-vs-GSAP style collision that caused stutters.
  return (
    <div className="bento-parent-wrapper" ref={bentoParentRef} style={{ display: 'grid', gridTemplateColumns: '100%', width: '100%' }}>
      <HomeBento
        className={styles['bento-masonry']}
        id="bento"
        ref={bentoRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: '100%',
          zIndex: 5,
          display: 'block', // Override .bento-masonry's grid layout — HomeBento fills 100vh as a block
          margin: 0,
          padding: 0,
          // visibility/overflow managed by GSAP
        }}
      />

      <AboutBento
        className={styles['bento-masonry']}
        id="bento-about"
        ref={bentoAboutRef}
        style={{
          gridArea: '1 / 1',
          marginTop: '64px',
          visibility: 'hidden', // Static default hidden prevents FOUC on initial paint before GSAP runs
        }}
      />

      <WorkBento
        className={styles['bento-masonry']}
        id="bento-work"
        ref={bentoWorkRef}
        style={{
          gridArea: '1 / 1',
          marginTop: '64px',
          visibility: 'hidden', // Static default hidden prevents FOUC on initial paint before GSAP runs
        }}
        onSelect={onSelect}
      />
    </div>
  )
}
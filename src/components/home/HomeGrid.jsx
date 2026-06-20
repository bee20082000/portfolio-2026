import { useRef, useEffect, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)
import styles from './HomeGrid.module.css'

import HomeBento from './HomeBento'
import AboutBento from '../about/AboutBento'
import WorkBento from '../work/WorkBento'

const HomeGrid = memo(function HomeGrid({ onSelect, loaded, activeTab }) {
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

  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  // 1. Initial Load Reveal and Hover Repulsion Logic
  useGSAP(() => {
    if (!loaded) return
    const bentoHome = bentoRef.current
    const bentoAbout = bentoAboutRef.current
    const bentoWork = bentoWorkRef.current
    if (!bentoHome || !bentoAbout || !bentoWork) return

    const homeTiles = bentoHome.querySelectorAll('.tile')
    const workTiles = bentoWork.querySelectorAll('.tile')
    const workHeader = bentoWork.querySelector('.work-header')
    const allTiles = [...homeTiles, ...workTiles]

    if (!hasRevealedRef.current) {
      hasRevealedRef.current = true

      // BUG FIX #2: Use GSAP to set ALL visibility/height/overflow state.
      // We must NOT let React's inline `style` props race against GSAP.
      // The JSX renders all three grids permanently in the DOM; GSAP alone
      // controls what is shown or hidden.
      gsap.set(bentoHome, {
        height: (activeTab === 'home' || activeTab === 'about') ? '100vh' : 0,
        overflow: (activeTab === 'home' || activeTab === 'about') ? 'visible' : 'hidden',
        visibility: (activeTab === 'home' || activeTab === 'about') ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'home' ? 'auto' : 'none',
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      })
      gsap.set(bentoAbout, {
        height: (activeTab === 'about') ? '100vh' : 0,
        overflow: (activeTab === 'about') ? 'visible' : 'hidden',
        visibility: (activeTab === 'about') ? 'visible' : 'hidden',
        pointerEvents: (activeTab === 'about') ? 'auto' : 'none',
        opacity: 1,
      })
      // Blur home grid when about is initially active
      if (activeTab === 'about') {
        gsap.set(bentoHome, { filter: 'blur(10px)', opacity: 0.25, scale: 1.02 })
      }
      gsap.set(bentoWork, {
        height: activeTab === 'work' ? 'auto' : 0,
        overflow: activeTab === 'work' ? 'visible' : 'hidden',
        visibility: activeTab === 'work' ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'work' ? 'auto' : 'none'
      })

      if (activeTab === 'home') {
        gsap.set(homeTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
        gsap.set(workTiles, { opacity: 0 })
        if (workHeader) gsap.set(workHeader, { opacity: 0, y: 15 })
      } else if (activeTab === 'about') {
        // Home stays fully visible behind the postcard
        gsap.set(homeTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
        gsap.set(workTiles, { opacity: 0 })
        if (workHeader) gsap.set(workHeader, { opacity: 0, y: 15 })
      } else {
        gsap.set(homeTiles, { opacity: 0 })
        gsap.set(workTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
        if (workHeader) gsap.set(workHeader, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
      }
    }

    // Hardware-Accelerated Progress Bars Filling (deterministic & auto-cleaned by useGSAP)
    gsap.delayedCall(0.6, () => {
      allTiles.forEach(el => {
        const fills = el.querySelectorAll('.tool-bar-fill')
        fills.forEach(fill => fill.style.width = fill.dataset.w + '%')
      })
    })

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

    const homeTiles = bentoHome.querySelectorAll('.tile')
    const workTiles = bentoWork.querySelectorAll('.tile')
    const workHeader = bentoWork.querySelector('.work-header')
    const aboutTiles = bentoAbout.querySelectorAll('.about-postcard')

    const getGridAndTiles = (tab) => {
      if (tab === 'home') return { grid: bentoHome, tiles: homeTiles }
      if (tab === 'about') return { grid: bentoAbout, tiles: aboutTiles }
      return { grid: bentoWork, tiles: workTiles }
    }

    const source = getGridAndTiles(prevTab)
    const dest = getGridAndTiles(activeTab)

    // Kill any in-progress tweens to prevent overlapping animations on rapid clicks
    const elementsToKill = [
      bentoHome, bentoAbout, bentoWork,
      ...homeTiles, ...workTiles
    ]
    if (workHeader) elementsToKill.push(workHeader)
    gsap.killTweensOf(elementsToKill)

    // Synchronously restore the source grid to visible so it doesn't vanish before its fade-out animation plays
    if (prevTab === 'home') {
      gsap.set(source.grid, { visibility: 'visible', height: '100vh', overflow: 'visible', pointerEvents: 'none' })
    } else if (prevTab === 'about') {
      gsap.set(source.grid, { visibility: 'visible', height: '100vh', overflow: 'visible', pointerEvents: 'none' })
    } else {
      gsap.set(source.grid, { visibility: 'visible', height: 'auto', overflow: 'visible', pointerEvents: 'none' })
    }

    // Synchronously setup initial states for the destination grid to prevent visible flash
    if (activeTab === 'home') {
      if (prevTab !== 'about') {
        gsap.set(dest.grid, { visibility: 'visible', pointerEvents: 'none', height: '100vh', overflow: 'visible', scale: 0.98, opacity: 0 })
      } else {
        gsap.set(dest.grid, { pointerEvents: 'none' })
      }
    } else if (activeTab === 'about') {
      gsap.set(dest.grid, { visibility: 'visible', pointerEvents: 'none', height: '100vh', overflow: 'visible', opacity: 1 })
    } else {
      // Prevent FOUC: Set grid opacity to 0 instantly, then reveal it right before tile animation
      gsap.set(dest.grid, { visibility: 'visible', pointerEvents: 'none', height: 'auto', overflow: 'visible', opacity: 0 })

      if (activeTab === 'work') {
        gsap.set(dest.tiles, { opacity: 0, y: 120 })
        if (workHeader) {
          gsap.set(workHeader, { opacity: 0, y: 80 })
        }
      } else {
        // About tab
        gsap.set(dest.tiles, { opacity: 0, y: 80 })
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    })

    // ── STEP 1: Fade Out / Blur ────────────────────────────────────────────────
    if (prevTab === 'home') {
      if (activeTab === 'about') {
        // Home stays visible but blurred/faded under the postcard overlay
        tl.to(bentoHome, {
          opacity: 0.25, scale: 1.02, filter: 'blur(10px)',
          duration: 0.55, ease: 'power2.out', overwrite: 'auto'
        }, 0)
      } else {
        tl.to(bentoHome, {
          opacity: 0, scale: 0.98,
          duration: 0.2, ease: 'power2.in', overwrite: 'auto'
        }, 0)
      }
    } else if (prevTab === 'about') {
      // AboutBento.triggerExit() already animates the cards out.
      // HomeGrid only hides the about container at hideTime.
      // If going back to home, also restore home from blur:
      if (activeTab === 'home') {
        tl.to(bentoHome, {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 0.5, ease: 'power2.out', overwrite: 'auto'
        }, 0)
      }
    } else {
      tl.to(source.tiles, {
        opacity: 0, y: -40,
        duration: 0.2,
        stagger: { grid: 'auto', from: 'start', amount: 0.05 },
        ease: 'power2.in', overwrite: 'auto'
      }, 0)
      if (prevTab === 'work' && workHeader) {
        tl.to(workHeader, {
          opacity: 0, y: -30,
          duration: 0.2, ease: 'power2.in', overwrite: 'auto'
        }, 0)
      }
    }

    // ── STEP 2: Hide Outgoing Grid & Reset Scroll ──────────────────────────
    // home→about: keep home grid visible (postcard sits on top), about grid appears
    const hideTime = prevTab === 'about' ? 0.55 : 0.15

    if (prevTab === 'home' && activeTab === 'about') {
      // Don't hide home — it stays visible under the flying postcard
    } else {
      tl.set(source.grid, {
        visibility: 'hidden', pointerEvents: 'none', height: 0, overflow: 'hidden',
        clearProps: 'scale,opacity,transform,filter'
      }, hideTime)
      if (prevTab !== 'home') {
        tl.set(source.tiles, { clearProps: 'transform,opacity' }, hideTime)
      }
    }

    if (prevTab === 'about' && activeTab === 'work') {
      tl.set(bentoHome, {
        visibility: 'hidden', pointerEvents: 'none', height: 0, overflow: 'hidden',
        clearProps: 'scale,opacity,transform,filter'
      }, hideTime)
    }

    tl.call(() => {
      if (activeTab === 'work' || activeTab === 'home') {
        if (window.lenis?.scrollTo) {
          window.lenis.scrollTo(0, { immediate: true })
          if (activeTab !== 'about') {
            window.lenis.resize?.()
          }
        } else {
          window.scrollTo(0, 0)
        }
      }
    }, null, hideTime)

    // ── STEP 3: Fade In Destination ────────────────────────────────────────────
    if (activeTab === 'home') {
      // Home already visible behind about, GSAP unblur is already in STEP 1
      gsap.set(bentoHome, { visibility: 'visible', height: '100vh', overflow: 'visible', pointerEvents: 'auto' })
    } else if (activeTab === 'about') {
      // About bento becomes visible; AboutBento's entrance GSAP handles card fly-in
      tl.set(dest.grid, { opacity: 1, visibility: 'visible' }, 0)

      if (prevTab === 'work') {
        // Restore + blur home behind the postcard overlay
        gsap.set(bentoHome, { visibility: 'visible', height: '100vh', overflow: 'visible', pointerEvents: 'none' })
        tl.to(bentoHome, { opacity: 0.25, scale: 1.02, filter: 'blur(10px)', duration: 0.5, ease: 'power2.out', overwrite: 'auto' }, 0.15)
      }
    } else if (activeTab === 'work') {
      tl.set(dest.grid, { opacity: 1 }, 0.15)
      tl.to(dest.tiles, {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: { grid: 'auto', from: 'start', amount: 0.15 },
        ease: 'power3.out', overwrite: 'auto', clearProps: 'transform,opacity'
      }, 0.15)
      if (workHeader) {
        tl.to(workHeader, {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power3.out', overwrite: 'auto',
          clearProps: 'transform,opacity'
        }, 0.15)
      }
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
          display: 'block',
          margin: 0,
          padding: 0,
        }}
        activeTab={activeTab}
        onSelect={onSelect}
        loaded={loaded}
      />
      <AboutBento
        id="bento-about"
        ref={bentoAboutRef}
        onSelect={onSelect}
        activeTab={activeTab}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: '100%',
          zIndex: 20,
          margin: 0,
          padding: 0,
          /* visibility intentionally OMITTED — CSS sets initial hidden state,
             GSAP overrides it. Avoid React inline style collision. */
        }}
      />
      <WorkBento
        className={styles['bento-masonry']}
        id="bento-work"
        ref={bentoWorkRef}
        style={{
          gridArea: '1 / 1',
          marginTop: '0px',
          visibility: 'hidden',
          contentVisibility: activeTab === 'work' ? 'visible' : 'auto',
          containIntrinsicSize: '0 100vh',
        }}
        onSelect={onSelect}
      />
    </div>
  )
});

export default HomeGrid;
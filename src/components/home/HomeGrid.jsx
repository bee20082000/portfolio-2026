import { useRef, useEffect, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)
import styles from './HomeGrid.module.css'

import HomeBento from './HomeBento'
import AboutBento from '../about/AboutBento'

const HomeGrid = memo(function HomeGrid({ onSelect, loaded, introReady, activeTab, activeCase }) {
  const bentoRef = useRef(null)       // Home bento grid
  const bentoAboutRef = useRef(null)  // About bento grid
  const bentoParentRef = useRef(null) // Wrapping container
  const hasRevealedRef = useRef(false)
  const isInitialMount = useRef(true)

  const prevTabRef = useRef(activeTab)
  const activeTabRef = useRef(activeTab)

  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  // 1. Initial Load Reveal Logic
  useGSAP(() => {
    if (!loaded) return
    const bentoHome = bentoRef.current
    const bentoAbout = bentoAboutRef.current
    if (!bentoHome || !bentoAbout) return

    const homeTiles = bentoHome.querySelectorAll('.tile')

    if (!hasRevealedRef.current) {
      hasRevealedRef.current = true

      gsap.set(bentoHome, {
        height: '100vh',
        overflow: 'visible',
        visibility: 'visible',
        pointerEvents: activeTab === 'home' ? 'auto' : 'none',
        opacity: activeTab === 'about' ? 0.25 : 1,
        scale: 1,
        filter: activeTab === 'about' ? 'blur(10px)' : 'blur(0px)',
      })
      gsap.set(bentoAbout, {
        height: '100vh',
        overflow: 'visible',
        visibility: activeTab === 'about' ? 'visible' : 'hidden',
        pointerEvents: activeTab === 'about' ? 'auto' : 'none',
        opacity: activeTab === 'about' ? 1 : 0,
      })

      gsap.set(homeTiles, { opacity: 1, scale: 1, y: 0, clearProps: 'transform,opacity' })
    }

    // Hardware-Accelerated Progress Bars Filling
    gsap.delayedCall(0.6, () => {
      homeTiles.forEach(el => {
        const fills = el.querySelectorAll('.tool-bar-fill')
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-fill-width')
          if (targetWidth) fill.style.width = targetWidth
        })
      })
    })
  }, { dependencies: [loaded], scope: bentoParentRef })

  // 2. Optimized Tab Transition Logic
  useGSAP(() => {
    if (!loaded || isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (prevTab === activeTab) return
    prevTabRef.current = activeTab

    gsap.killTweensOf([bentoHome, bentoAbout])

    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(() => ScrollTrigger.refresh(), { timeout: 500 })
        } else {
          setTimeout(() => ScrollTrigger.refresh(), 50)
        }
      }
    })

    if (activeTab === 'about') {
      // Switching Home -> About: Postcard sits on top of blurred home grid
      gsap.set(bentoAbout, { visibility: 'visible', pointerEvents: 'auto', height: '100vh', overflow: 'visible', opacity: 1 })
      tl.to(bentoHome, {
        opacity: 0.25,
        filter: 'blur(10px)',
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto'
      }, 0)
      tl.set(bentoHome, { pointerEvents: 'none' })
    } else {
      // Switching About -> Home: Postcard animates out, restore home grid
      tl.to(bentoHome, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      }, 0.2)
      tl.set(bentoAbout, {
        visibility: 'hidden',
        pointerEvents: 'none',
        clearProps: 'filter'
      }, 0.55)
      tl.set(bentoHome, { pointerEvents: 'auto' })
    }
  }, { dependencies: [activeTab], scope: bentoParentRef })

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
        activeCase={activeCase}
        onSelect={onSelect}
        loaded={loaded}
        introReady={introReady}
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
        }}
      />
    </div>
  )
});

export default HomeGrid;
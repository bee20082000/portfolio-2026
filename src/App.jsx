import { useState, useEffect, startTransition } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/ui/Cursor'
import HomeGrid from './components/home/HomeGrid'
import BlogModal from './components/modals/BlogModal'
import LoadingScreen from './components/ui/LoadingScreen'
import MobileBlocker from './components/layout/MobileBlocker'
import useSmoothScroll from './hooks/useSmoothScroll'
import { audioManager } from './utils/audio'
import styles from './App.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [activeTab,      setActiveTab]      = useState('home')
  const [activeCase,     setActiveCase]     = useState(null)
  const [loaded,         setLoaded]         = useState(false)
  const [screenUnmounted,setScreenUnmounted]= useState(false)
  const [isBioOpen,      setIsBioOpen]      = useState(false)


  // Lock dark mode & disable browser scroll restoration
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Track mouse position globally (needed even during loading screen)
  useEffect(() => {
    const onMove = (e) => {
      window.lastMouseX = e.clientX
      window.lastMouseY = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Play click sound on interactive elements — deferred to idle time so it
  // doesn't compete with post-click rendering work (INP improvement).
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target.closest(
        'button, a, .tile-clock, .tile-skills, .tile-contact, .tile-photos, ' +
        '.tile-case, .exp-card-item, .view-more-badge, .unified-close-btn'
      )
      if (target) {
        const playAudio = () =>
          audioManager
            .play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.5)
            .catch(() => {})
        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(playAudio, { timeout: 300 })
        } else {
          setTimeout(playAudio, 0)
        }
      }
    }
    window.addEventListener('click', onClick, { passive: true })
    return () => window.removeEventListener('click', onClick)
  }, [])

  // ── Global smooth scroll (starts only after the page is revealed) ──
  const lenisRef = useSmoothScroll({ enabled: loaded })

  // ── Page-swap freeze: freeze background when modal is open ──
  // Instead of stopping Lenis, we freeze the page visually and let
  // Lenis continue driving window.scrollY for the modal content.
  useEffect(() => {
    const pageWrapper = document.querySelector('[data-page-wrapper]')

    const handleModalOpen = (e) => {
      const savedScroll = e.detail ?? 0
      if (pageWrapper) {
        // Freeze background visually at its current position
        pageWrapper.style.position = 'fixed'
        pageWrapper.style.top = `-${savedScroll}px`
        pageWrapper.style.left = '0'
        pageWrapper.style.right = '0'
      }
    }

    const handleModalClose = (e) => {
      const savedScroll = e.detail ?? 0
      if (pageWrapper) {
        // Unfreeze background
        pageWrapper.style.position = ''
        pageWrapper.style.top = ''
        pageWrapper.style.left = ''
        pageWrapper.style.right = ''
      }
      // Restore background scroll position instantly
      if (window.lenis) {
        window.lenis.resize()
        window.lenis.scrollTo(savedScroll, { immediate: true })
      } else {
        window.scrollTo(0, savedScroll)
      }
      // Synchronously recalculate layout measurements for ScrollTriggers
      // to prevent stale measurement jumps in the next frames
      ScrollTrigger.refresh()
    }

    window.addEventListener('modalScrollOpen', handleModalOpen)
    window.addEventListener('modalScrollClose', handleModalClose)
    return () => {
      window.removeEventListener('modalScrollOpen', handleModalOpen)
      window.removeEventListener('modalScrollClose', handleModalClose)
    }
  }, [])

  // Pause Lenis for bio panel and home tab (but NOT for modal — modal uses page-swap)
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if ((isBioOpen || activeTab === 'home') && !activeCase) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [isBioOpen, activeTab, activeCase]) // intentionally exclude lenisRef – it's a stable ref

  // Bio scroll-lock events dispatched from HeroTile
  useEffect(() => {
    const handler = (e) => setIsBioOpen(!!e.detail)
    window.addEventListener('toggleBioScrollLock', handler)
    return () => window.removeEventListener('toggleBioScrollLock', handler)
  }, [])

  // Tab-switch events dispatched from child components
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) {
        startTransition(() => {
          setActiveTab(e.detail);
        });
      }
    }
    window.addEventListener('switchTab', handler)
    return () => window.removeEventListener('switchTab', handler)
  }, [])

  return (
    <>
      <MobileBlocker />
      {!screenUnmounted && (
        <LoadingScreen
          onReveal={() => setLoaded(true)}
          onDone={()   => setScreenUnmounted(true)}
        />
      )}
      {loaded && <Cursor key="cursor-v2" />}

      <div
        className={`${styles['page-wrapper']} ${loaded ? styles['page-visible'] : styles['page-hidden']}`}
        data-page-wrapper
      >
        <div className={isBioOpen ? 'bio-active' : ''}>
          <div className={styles['page-content']}>
            <HomeGrid onSelect={setActiveCase} loaded={loaded} introReady={screenUnmounted} activeTab={activeTab} />
          </div>
        </div>
      </div>

      <BlogModal activeCase={activeCase} onClose={() => setActiveCase(null)} />
    </>
  )
}
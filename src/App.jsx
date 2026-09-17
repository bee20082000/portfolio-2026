import { useState, useEffect, startTransition, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/ui/Cursor'
import HomeGrid from './components/home/HomeGrid'
import LoadingScreen from './components/ui/LoadingScreen'
import MobileBlocker from './components/layout/MobileBlocker'
import useSmoothScroll from './hooks/useSmoothScroll'
import { audioManager } from './utils/audio'
import styles from './App.module.css'

const BlogModal = lazy(() => import('./components/modals/BlogModal'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [activeTab,      setActiveTab]      = useState('home')
  const [activeCase,     setActiveCase]     = useState(null)
  const [loaded,         setLoaded]         = useState(false)
  const [screenUnmounted,setScreenUnmounted]= useState(false)
  const [isBioOpen,      setIsBioOpen]      = useState(false)
  const [modalEverOpened,setModalEverOpened]= useState(false)

  // Track if a project modal has ever been opened to defer bundle loading
  useEffect(() => {
    if (activeCase) {
      setModalEverOpened(true)
    }
  }, [activeCase])


  // Lock light mode & disable browser scroll restoration
  useEffect(() => {
    document.documentElement.dataset.theme = 'light'
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

  const isScrollLocked = isBioOpen || activeTab === 'home' || !!activeCase
  // ── Global smooth scroll (starts only after the page is revealed) ──
  const lenisRef = useSmoothScroll({ enabled: loaded, isLocked: isScrollLocked })

  // Lock body scroll when modal is open, and refresh ScrollTrigger on close
  useEffect(() => {
    if (activeCase) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      ScrollTrigger.refresh()
    }
  }, [activeCase])

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
            <HomeGrid onSelect={setActiveCase} loaded={loaded} introReady={screenUnmounted} activeTab={activeTab} activeCase={activeCase} />
          </div>
        </div>
      </div>

      {modalEverOpened && (
        <Suspense fallback={null}>
          <BlogModal activeCase={activeCase} onClose={() => setActiveCase(null)} />
        </Suspense>
      )}
    </>
  )
}
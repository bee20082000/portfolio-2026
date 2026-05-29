import { useState, useEffect, useRef } from 'react'
import Cursor from './components/ui/Cursor'
import Topbar from './components/layout/Topbar'
import HomeGrid from './components/home/HomeGrid'
import BlogModal from './components/modals/BlogModal'
import LoadingScreen from './components/ui/LoadingScreen'
import MobileBlocker from './components/layout/MobileBlocker'
import Lenis from 'lenis'
import { audioManager } from './utils/audio'
import styles from './App.module.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [activeCase, setActiveCase] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [screenUnmounted, setScreenUnmounted] = useState(false)
  const [isBioOpen, setIsBioOpen] = useState(false)
  const lenisRef = useRef(null)
  const pageRef = useRef(null)

  // Hardcode and lock system data-theme strictly to dark mode on initialization
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
  }, [])

  // Capture mouse coordinates globally on mount (even while loading screen is active)
  useEffect(() => {
    const handleInitialMove = (e) => {
      window.lastMouseX = e.clientX;
      window.lastMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleInitialMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleInitialMove);
  }, []);

  // Play satisfying mechanical click sound on all clickable element interactions
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, .tile-hero, .tile-clock, .tile-skills, .tile-contact, .tile-photos, .tile-case, .exp-card-item, .view-more-badge, .unified-close-btn, .spotify-btn, .spotify-track, .spotify-progress, .bio-modal-dot');
      if (target) {
        audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.5).catch(() => { });
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Initialize buttery-smooth Lenis scroll (only after content is loaded)
  useEffect(() => {
    if (!loaded) return

    let isDestroyed = false
    let rafId

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0
    })

    lenisRef.current = lenis
    window.lenis = lenis

    function raf(time) {
      if (isDestroyed) return
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Listen to Lenis scroll
    lenis.on('scroll', (e) => {
      // scroll logic here if needed
    })

    return () => {
      isDestroyed = true
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      window.lenis = null
    }
  }, [loaded])

  // Unified Scroll Execution State Controller for Modal & Bio overlays
  useEffect(() => {
    if (!lenisRef.current) return

    if (activeCase || isBioOpen || window.isBioOpen) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [activeCase, isBioOpen])

  // Simple event listener mapping for the custom Hero bio toggle action hooks
  useEffect(() => {
    const handleScrollLockEvent = (e) => {
      setIsBioOpen(!!e.detail)
    }

    window.addEventListener("toggleBioScrollLock", handleScrollLockEvent)
    return () => window.removeEventListener("toggleBioScrollLock", handleScrollLockEvent)
  }, [])

  return (
    <>
      <MobileBlocker />
      {!screenUnmounted && <LoadingScreen onReveal={() => setLoaded(true)} onDone={() => setScreenUnmounted(true)} />}
      {loaded && <Cursor />}

      <div className={`${styles['page-wrapper']} ${loaded ? styles['page-visible'] : styles['page-hidden']}`}>
        <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={`${styles.page} ${isBioOpen ? 'bio-active' : ''}`} ref={pageRef}>
          <div className={styles['page-content']}>
            <HomeGrid onSelect={setActiveCase} loaded={loaded} activeTab={activeTab} />
          </div>
        </div>

      </div>

      <BlogModal activeCase={activeCase} onClose={() => setActiveCase(null)} />
    </>
  )
}
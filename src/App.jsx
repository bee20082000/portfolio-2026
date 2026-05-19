import { useState, useEffect, useRef } from 'react'
import Cursor from './components/Cursor'
import Topbar from './components/Topbar'
import BentoGrid from './components/BentoGrid'
import CasesGrid from './components/CasesGrid'
import BlogModal from './components/BlogModal'
import Marquee from './components/Marquee'
import LoadingScreen from './components/LoadingScreen'
import Lenis from 'lenis'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [activeCase, setActiveCase] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [isBioOpen, setIsBioOpen] = useState(false)
  const lenisRef = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Initialize buttery-smooth Lenis scroll (only after content is loaded)
  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [loaded])

  // Pause Lenis scrolling when blog modal or biography modal is open
  useEffect(() => {
    if (!lenisRef.current) return
    if (activeCase || window.isBioOpen) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [activeCase])

  useEffect(() => {
    const handleScrollLockEvent = (e) => {
      setIsBioOpen(!!e.detail)
      if (!lenisRef.current) return
      if (e.detail || activeCase) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }

    window.addEventListener("toggleBioScrollLock", handleScrollLockEvent)
    return () => window.removeEventListener("toggleBioScrollLock", handleScrollLockEvent)
  }, [activeCase])

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <Cursor />
      <div className={`page-wrapper ${loaded ? 'page-visible' : 'page-hidden'}`}>
        <Topbar theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <div className={`page ${isBioOpen ? 'bio-active' : ''}`} ref={pageRef}>
          <div className="page-content">
            <BentoGrid onSelect={setActiveCase} loaded={loaded} />
            <CasesGrid onSelect={setActiveCase} loaded={loaded} />
          </div>
        </div>
        <Marquee />
      </div>
      <BlogModal activeCase={activeCase} onClose={() => setActiveCase(null)} />
    </>
  )
}

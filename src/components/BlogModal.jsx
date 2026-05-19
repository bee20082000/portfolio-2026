import { useEffect, useState, useRef } from 'react'
import { blogData } from '../data/blogData'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

// Import all separated component tiles
import PanasonicBlog from './blogs/PanasonicBlog'
import HeinekenBlog from './blogs/HeinekenBlog'
import TuonganBlog from './blogs/TuonganBlog'
import ExperienceBlog from './blogs/ExperienceBlog'
import SkillsBlog from './blogs/SkillsBlog'
import ToolsBlog from './blogs/ToolsBlog'
import ClientsBlog from './blogs/ClientsBlog'
import SpotifyBlog from './blogs/SpotifyBlog'
import PhotosBlog from './blogs/PhotosBlog'
import ContactBlog from './blogs/ContactBlog'

const COMPONENTS = {
  panasonic: PanasonicBlog,
  heineken: HeinekenBlog,
  tuongan: TuonganBlog,
  experience: ExperienceBlog,
  skills: SkillsBlog,
  tools: ToolsBlog,
  clients: ClientsBlog,
  spotify: SpotifyBlog,
  photos: PhotosBlog,
  contact: ContactBlog,
}

export default function BlogModal({ activeCase, onClose }) {
  const [localCase, setLocalCase] = useState(null)
  const modalRef = useRef(null)
  const containerRef = useRef(null)
  const scrollRef = useRef(null)

  // Sync activeCase to localCase immediately when activeCase is active
  useEffect(() => {
    if (activeCase) {
      setLocalCase(activeCase)
    }
  }, [activeCase])

  // GSAP Entry Animation
  useGSAP(() => {
    if (localCase && containerRef.current) {
      const tl = gsap.timeline()

      // Slide up overlay container smoothly from the bottom with a premium elastic ease
      tl.fromTo(containerRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: "power4.out" }
      )

      // Slide in and bounce the floating close button
      tl.fromTo('.blog-close',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.45"
      )

      // Stagger in vertical content panels with a gentle upward lift and fade-in
      tl.fromTo('.blog-slide',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      )
    }
  }, { dependencies: [localCase], scope: modalRef })

  // Initialize smooth scrolling specifically for the blog overlay container
  useEffect(() => {
    const wrapper = containerRef.current
    const content = scrollRef.current
    if (!wrapper || !content || !localCase) return

    const lenis = new Lenis({
      wrapper: wrapper,
      content: content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [localCase])

  const handleClose = () => {
    if (!containerRef.current) return
    const tl = gsap.timeline({
      onComplete: () => {
        setLocalCase(null)
        onClose()
      }
    })

    // Slide down the floating close button immediately
    tl.to('.blog-close', {
      y: 35,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in"
    }, 0)

    // Stagger slide out sections slightly
    tl.to('.blog-slide', {
      y: 30,
      opacity: 0,
      duration: 0.25,
      stagger: 0.04,
      ease: "power2.in"
    }, 0)

    // Slide down the overlay container completely
    tl.to(containerRef.current, {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut"
    }, "-=0.15")
  }

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [localCase])

  if (!localCase) return null

  const data = blogData[localCase]
  if (!data) return null

  const ContentComponent = COMPONENTS[localCase]

  return (
    <div ref={modalRef}>
      <button className="blog-close" onClick={handleClose} aria-label="Close modal">
        <span className="blog-close-icon">✕</span>
        <span className="blog-close-text">Close</span>
      </button>
      <div className={`blog-overlay ${activeCase ? 'open' : ''}`} ref={containerRef} data-lenis-prevent>
        <div className="blog-body" ref={scrollRef}>
          {ContentComponent ? <ContentComponent data={data} /> : null}
        </div>
      </div>
    </div>
  )
}

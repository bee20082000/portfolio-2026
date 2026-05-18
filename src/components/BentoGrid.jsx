import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import HeroTile from './tiles/HeroTile'
import ClockTile from './tiles/ClockTile'
import YearsTile from './tiles/YearsTile'
import EduTile from './tiles/EduTile'
import ExpTile from './tiles/ExpTile'
import SkillsTile from './tiles/SkillsTile'
import StatusAccentTile from './tiles/StatusAccentTile'
import LanguageTile from './tiles/LanguageTile'
import QuoteTile from './tiles/QuoteTile'
import ContactTile from './tiles/ContactTile'
import SpotifyTile from './tiles/SpotifyTile'
import StatusTile from './tiles/StatusTile'

// ── MAIN BENTO GRID ROOT COMPONENT ─────────────────────────────────────────
export default function BentoGrid({ onSelect, loaded }) {
  const [time, setTime] = useState('--:--:--')
  const bentoRef = useRef(null)

  // HCMC Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const t = new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 7 * 3600000)
      const p = x => String(x).padStart(2, '0')
      setTime(`${p(t.getHours())}:${p(t.getMinutes())}:${p(t.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Tile reveal + tool bars + event-driven local hover zoom & repulsion via GSAP
  useGSAP(() => {
    if (!loaded) return

    const bento = bentoRef.current
    if (!bento) return

    const tiles = bento.querySelectorAll('.tile')

    // Tile reveal via pure GSAP to avoid CSS forwards animation transform locks
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = (+e.target.dataset.i * 50) / 1000
          gsap.fromTo(e.target, {
            opacity: 0,
            y: 20,
            scale: 0.2
          }, {
            opacity: 1,
            y: 0, // Animate fully to baseline y: 0
            scale: 1, // Animate fully to baseline scale: 1
            duration: 2,
            delay: delay,
            ease: "elastic.out(1,0.6)",
            clearProps: 'transform'
          })
          io.unobserve(e.target)
        }
      })
    }, { threshold: .10 })
    tiles.forEach(t => io.observe(t))

    // Tool bars animate to target width
    setTimeout(() => {
      bento.querySelectorAll('.tool-bar-fill').forEach(el => {
        el.style.width = el.dataset.w + '%'
      })
    }, 700)

    // ── LOCAL TILE HOVER & DIRECTIONAL REPULSION ──────────────────────────
    tiles.forEach((tile) => {

      const handleEnter = () => {
        if (window.innerWidth <= 1024) return
        tile.isHovered = true

        // Calculate absolute viewport center of the hovered tile
        const tileRect = tile.getBoundingClientRect()
        const cxHovered = tileRect.left + tileRect.width / 2
        const cyHovered = tileRect.top + tileRect.height / 2

        gsap.killTweensOf(tile)
        gsap.to(tile, {
          scale: 1.02, // Zooms smoothly from baseline scale 1 to 1.02
          z: 5,
          zIndex: 2, // Layer active card on top
          transformPerspective: 1000,
          duration: 0.45, // Snappy entry response
          ease: "power3.out",
          overwrite: "auto"
        })

        tiles.forEach((other) => {
          if (other === tile) return

          // Calculate absolute viewport center of each neighboring tile
          const otherRect = other.getBoundingClientRect()
          const cxOther = otherRect.left + otherRect.width / 2
          const cyOther = otherRect.top + otherRect.height / 2

          const dx = cxOther - cxHovered
          const dy = cyOther - cyHovered
          const dist = Math.hypot(dx, dy) || 1
          const pushForce = 12
          const px = (dx / dist) * pushForce
          const py = (dy / dist) * pushForce

          gsap.killTweensOf(other)
          gsap.to(other, {
            x: px,
            y: py,
            scale: 0.98, // Shrinks smoothly from baseline scale 1 to 0.98
            z: -5,
            zIndex: 1,
            transformPerspective: 1000,
            duration: 0.45, // Snappy repulsion matching active zoom
            ease: "power3.out",
            overwrite: "auto"
          })
        })
      }

      const handleLeave = () => {
        if (window.innerWidth <= 1024) return
        tile.isHovered = false

        // Bridge state checks via animation frame to prevent down-and-up stutter during sweeps
        requestAnimationFrame(() => {
          const activeHovered = Array.from(tiles).find(t => t.isHovered)

          if (activeHovered) {
            // If another card has taken active hover focus, let its handleEnter handle transitions.
            return
          }

          // Restores all cards back to baseline only when cursor has exited the entire bento grid
          tiles.forEach((t) => {
            gsap.killTweensOf(t)
            gsap.to(t, {
              scale: 1, // Reset fully to layout baseline scale 1
              z: 0,
              rotateX: 0,
              rotateY: 0,
              x: 0,
              y: 0, // Reset fully to layout baseline y: 0
              zIndex: '',
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: 'transformPerspective,zIndex'
            })
          })
        })
      }

      tile.addEventListener('mouseenter', handleEnter)
      tile.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      io.disconnect()
    }
  }, { dependencies: [loaded], scope: bentoRef })

  // High-performance liquid-smooth asymmetric column scroll parallax effect
  useEffect(() => {
    if (!loaded) return

    const bento = bentoRef.current
    if (!bento) return

    const cols = bento.querySelectorAll('.bento-col')
    if (!cols || cols.length < 4) return

    const handleScroll = () => {
      const sy = window.scrollY || window.pageYOffset

      // Apply subtle, asymmetric vertical scroll offsets to the columns
      // Using GSAP to cushion the motion, creating an incredibly premium floating/shifting feel!
      gsap.to(cols[0], { y: sy * 0.015, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[1], { y: sy * -0.02, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[2], { y: sy * 0.025, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[3], { y: sy * -0.015, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Reset translations if grid unmounts or loads state shifts
      if (cols && cols.length >= 4) {
        cols.forEach(c => gsap.killTweensOf(c))
      }
    }
  }, [loaded])

  return (
    // Masonry 4-column flex layout — zero dead space, 16px gap everywhere
    <div className="bento-masonry" id="bento" ref={bentoRef}>

      {/* Column 1 */}
      <div className="bento-col">
        <HeroTile onSelect={onSelect} />
        <ClockTile time={time} />
        <EduTile />
        <LanguageTile />
      </div>

      {/* Column 2 */}
      <div className="bento-col">
        <YearsTile />
        <ExpTile onSelect={onSelect} />
        <QuoteTile />
      </div>

      {/* Column 3 */}
      <div className="bento-col">
        <StatusAccentTile />
        <SkillsTile onSelect={onSelect} />
        <SpotifyTile onSelect={onSelect} />
      </div>

      {/* Column 4 */}
      <div className="bento-col">
        <ContactTile onSelect={onSelect} />
        <StatusTile />
      </div>

    </div>
  )
}

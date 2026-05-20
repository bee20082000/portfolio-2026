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
import QuoteTile from './tiles/QuoteTile'
import ContactTile from './tiles/ContactTile'
import SpotifyTile from './tiles/SpotifyTile'

// Per-case tile components — each has its own unique design
import PanasonicTile from './cases/panasonic/Tile'
import HeinekenTile from './cases/heineken/Tile'
import TuonganTile from './cases/tuongan/Tile'
import PepsicoTile from './cases/pepsico/Tile'
import SpotifyRemixTile from './cases/spotify_remix/Tile'
import UrbanFramesTile from './cases/urban_frames/Tile'
import BrandCampaignTile from './cases/brand_campaign/Tile'
import HondaMobilityTile from './cases/honda_mobility/Tile'

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

    // Tile reveal via pure GSAP
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = (+e.target.dataset.i * 70) / 1000
          gsap.fromTo(e.target,
            { opacity: 0, y: 120, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 1.6, delay, ease: "power4.out", clearProps: 'transform' }
          )
          io.unobserve(e.target)
        }
      })
    }, { threshold: .01 })
    tiles.forEach(t => io.observe(t))

    setTimeout(() => {
      bento.querySelectorAll('.tool-bar-fill').forEach(el => {
        el.style.width = el.dataset.w + '%'
      })
    }, 700)

    tiles.forEach((tile) => {
      const handleEnter = () => {
        if (window.innerWidth <= 1024) return
        tile.isHovered = true
        const tileRect = tile.getBoundingClientRect()
        const cxHovered = tileRect.left + tileRect.width / 2
        const cyHovered = tileRect.top + tileRect.height / 2
        gsap.killTweensOf(tile)
        gsap.to(tile, { scale: 1.02, zIndex: 2, duration: 0.45, ease: "power3.out", overwrite: "auto" })
        tiles.forEach((other) => {
          if (other === tile) return
          const otherRect = other.getBoundingClientRect()
          const dx = (otherRect.left + otherRect.width / 2) - cxHovered
          const dy = (otherRect.top + otherRect.height / 2) - cyHovered
          const dist = Math.hypot(dx, dy) || 1
          const pushForce = 12
          gsap.killTweensOf(other)
          gsap.to(other, { x: (dx / dist) * pushForce, y: (dy / dist) * pushForce, scale: 0.98, zIndex: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" })
        })
      }
      const handleLeave = () => {
        if (window.innerWidth <= 1024) return
        tile.isHovered = false
        requestAnimationFrame(() => {
          const activeHovered = Array.from(tiles).find(t => t.isHovered)
          if (activeHovered) return
          tiles.forEach((t) => {
            gsap.killTweensOf(t)
            gsap.to(t, { scale: 1, x: 0, y: 0, zIndex: '', duration: 0.45, ease: "power3.out", overwrite: "auto", clearProps: 'zIndex' })
          })
        })
      }
      tile.addEventListener('mouseenter', handleEnter)
      tile.addEventListener('mouseleave', handleLeave)
    })

    return () => { io.disconnect() }
  }, { dependencies: [loaded], scope: bentoRef })

  // Asymmetric column scroll parallax
  useEffect(() => {
    if (!loaded) return
    const bento = bentoRef.current
    if (!bento) return
    const cols = bento.querySelectorAll('.bento-col')
    if (!cols || cols.length < 4) return
    const handleScroll = () => {
      const sy = window.scrollY || window.pageYOffset
      gsap.to(cols[0], { y: sy * 0.015, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[1], { y: sy * -0.02, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[2], { y: sy * 0.025, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(cols[3], { y: sy * -0.015, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (cols && cols.length >= 4) cols.forEach(c => gsap.killTweensOf(c))
    }
  }, [loaded])

  return (
    <div className="bento-masonry" id="bento" ref={bentoRef}>

      {/* Column 1 */}
      <div className="bento-col">
        <HeroTile onSelect={onSelect} />
        <EduTile />
        <ContactTile onSelect={onSelect} />
        <PanasonicTile onSelect={onSelect} index={12} />
        <SpotifyRemixTile onSelect={onSelect} index={13} />
      </div>

      {/* Column 2 */}
      <div className="bento-col">
        <YearsTile />
        <ExpTile />
        <HeinekenTile onSelect={onSelect} index={14} />
        <UrbanFramesTile onSelect={onSelect} index={15} />
      </div>

      {/* Column 3 */}
      <div className="bento-col">
        <SpotifyTile onSelect={onSelect} />
        <TuonganTile onSelect={onSelect} index={16} />
        <BrandCampaignTile onSelect={onSelect} index={17} />
      </div>

      {/* Column 4 */}
      <div className="bento-col">
        <PepsicoTile onSelect={onSelect} index={18} />
        <HondaMobilityTile onSelect={onSelect} index={19} />
      </div>

    </div>
  )
}

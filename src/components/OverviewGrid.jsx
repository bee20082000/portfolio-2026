import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function OverviewGrid() {
  const gridRef = useRef(null)

  // HCMC Live Ticking Clock State
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const utc = n.getTime() + n.getTimezoneOffset() * 60000
      const HCMC = new Date(utc + 7 * 3600000) // GMT +7
      const pad = x => String(x).padStart(2, '0')
      setTime(`${pad(HCMC.getHours())}:${pad(HCMC.getMinutes())}:${pad(HCMC.getSeconds())}`)
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  // Stagger entry + 3D Tilt + Magnetic hover triggers
  useGSAP(() => {
    const tiles = gridRef.current.querySelectorAll('.tile')

    // 1. Grid Entry Stagger Reveal
    gsap.fromTo(tiles, {
      opacity: 0,
      y: 35,
      scale: 0.94
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.03,
      ease: 'power3.out'
    })

    // 2. Fills for Skill/Tool Progress Bars
    gridRef.current.querySelectorAll('.tool-bar-fill').forEach(el => {
      gsap.to(el, { width: el.dataset.w + '%', duration: 1.3, ease: 'power3.out', delay: 0.4 })
    })

    // 3. Dynamic 3D Card Tilt Mouse Physics
    tiles.forEach(tile => {
      const handleMove = (e) => {
        const rect = tile.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const xc = rect.width / 2
        const yc = rect.height / 2

        const dx = x - xc
        const dy = y - yc

        const rx = -(dy / yc) * 7
        const ry = (dx / xc) * 7

        const tx = (dx / xc) * 8
        const ty = (dy / yc) * 8

        gsap.to(tile, {
          rotateX: rx,
          rotateY: ry,
          x: tx,
          y: ty,
          scale: 1.015,
          borderColor: 'var(--border2)',
          boxShadow: 'var(--shadow)',
          duration: 0.35,
          ease: 'power2.out'
        })
      }

      const handleLeave = () => {
        gsap.to(tile, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          scale: 1,
          borderColor: 'var(--border)',
          boxShadow: '',
          duration: 0.55,
          ease: 'power2.out'
        })
      }

      tile.addEventListener('mousemove', handleMove)
      tile.addEventListener('mouseleave', handleLeave)
    })

    // 4. Spring Magnetic Attraction Loops
    const magnets = gridRef.current.querySelectorAll('.tag, .ctact-row')
    magnets.forEach(m => {
      const handleMove = (e) => {
        const rect = m.getBoundingClientRect()
        const xc = rect.width / 2
        const yc = rect.height / 2
        const dx = e.clientX - (rect.left + xc)
        const dy = e.clientY - (rect.top + yc)

        gsap.to(m, {
          x: dx * 0.32,
          y: dy * 0.32,
          scale: 1.04,
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      const handleLeave = () => {
        gsap.to(m, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        })
      }

      m.addEventListener('mousemove', handleMove)
      m.addEventListener('mouseleave', handleLeave)
    })
  }, { scope: gridRef })

  return (
    <div className="bento" id="bento-overview" ref={gridRef}>

      {/* Hero Tile */}
      <div className="tile tile-hero c2r2" data-i="0">
        <div className="inner">
          <div className="lbl">creative junior · ux/ui</div>
          <div className="h1">Huy<br /><em>Nguyen</em></div>
          <div className="hero-sub">A creative with a research background —<br />transforming ideas into seamless digital experiences.</div>
          <div className="hero-avail"><span className="dot-live"></span>open to UX/UI opportunities</div>
        </div>
      </div>

      {/* Clock Tile */}
      <div className="tile" data-i="1">
        <div className="inner">
          <div className="lbl">local time</div>
          <div className="clock" id="clock">{time}</div>
          <div className="clock-tz">Ho Chi Minh City · GMT+7</div>
        </div>
      </div>

      {/* Years Experience Tile */}
      <div className="tile" data-i="2">
        <div className="inner">
          <div className="lbl">years experience</div>
          <div className="stat">4<sup>+</sup></div>
        </div>
      </div>

      {/* Education Tile */}
      <div className="tile" data-i="3">
        <div className="inner">
          <div className="lbl">education</div>
          <div className="lang-row">
            <div className="lang-left"><span className="lang-flag">🎓</span><span className="lang-name">UEH</span></div>
            <span className="lang-lvl">2018–2021</span>
          </div>
          <div className="lang-row">
            <div className="lang-left"><span className="lang-flag">📚</span><span className="lang-name">Marketing</span></div>
            <span className="lang-lvl">Economics Univ.</span>
          </div>
        </div>
      </div>

      {/* Creative Photos Grid */}
      <div className="tile" data-i="12">
        <div className="inner" style={{ padding: '20px' }}>
          <div className="lbl">creative side</div>
          <div className="pgrid">
            <div className="pc p1">📸</div>
            <div className="pc p2">🎬</div>
            <div className="pc p3">🎨</div>
            <div className="pc p4">☕</div>
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div className="tile c3" id="skills" data-i="5">
        <div className="inner">
          <div className="lbl">skills</div>
          <div className="tags">
            <span className="tag">UX/UI Design</span>
            <span className="tag">Graphic Design</span>
            <span className="tag">Market Research</span>
            <span className="tag">Creative Strategy</span>
            <span className="tag">Photography</span>
            <span className="tag">Filmmaking</span>
            <span className="tag">Copywriting</span>
            <span className="tag">Campaign Execution</span>
            <span className="tag">Design Systems</span>
            <span className="tag">Interactive Media</span>
          </div>
        </div>
      </div>

      {/* Seeking Accent Card */}
      <div className="tile tile-accent" data-i="6">
        <div className="inner">
          <div className="lbl">status</div>
          <div className="h2">Seeking<br />UX/UI<br />role.</div>
        </div>
      </div>

      {/* Tools Card */}
      <div className="tile r2" data-i="7">
        <div className="inner">
          <div className="lbl">tools</div>
          <div className="tool-row"><span className="tool-name">Figma</span><div className="tool-bar-bg"><div className="tool-bar-fill" data-w="92"></div></div></div>
          <div className="tool-row"><span className="tool-name">Adobe CC</span><div className="tool-bar-bg"><div className="tool-bar-fill" data-w="88"></div></div></div>
          <div className="tool-row"><span className="tool-name">Balsamiq</span><div className="tool-bar-bg"><div class="tool-bar-fill" data-w="75"></div></div></div>
          <div className="tool-row"><span className="tool-name">HTML / CSS / JS</span><div className="tool-bar-bg"><div className="tool-bar-fill" data-w="65"></div></div></div>
          <div className="tool-row"><span className="tool-name">SQL / SPSS</span><div className="tool-bar-bg"><div className="tool-bar-fill" data-w="60"></div></div></div>
          <div className="tool-row"><span className="tool-name">MS Office</span><div className="tool-bar-bg"><div className="tool-bar-fill" data-w="85"></div></div></div>
        </div>
      </div>

      {/* Clients Card */}
      <div className="tile c2" data-i="8">
        <div className="inner">
          <div className="lbl">notable clients</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            <span className="client-item">Panasonic</span>
            <span className="client-item">Heineken</span>
            <span className="client-item">Tường An</span>
            <span className="client-item">Carlsberg</span>
            <span className="client-item">Mondelez</span>
            <span className="client-item">Lipton</span>
            <span className="client-item">Akzo Nobel</span>
            <span className="client-item">Bobby</span>
            <span className="client-item">Santen</span>
          </div>
        </div>
      </div>

      {/* Experience Chronology */}
      <div className="tile r2" id="exp" data-i="4">
        <div className="inner">
          <div className="lbl">work experience</div>
          <div className="exp-item">
            <span className="exp-icon">🏢</span>
            <div className="exp-body">
              <div className="exp-role">Creative Junior</div>
              <div className="exp-co">DDB Việt Nam · IMC</div>
            </div>
            <span className="exp-yr">2022–now</span>
          </div>
          <div className="exp-item">
            <span className="exp-icon">📊</span>
            <div className="exp-body">
              <div className="exp-role">Research Assistant</div>
              <div className="exp-co">Ipsos Việt Nam</div>
            </div>
            <span className="exp-yr">2021–22</span>
          </div>
          <div className="exp-item">
            <span className="exp-icon">🎓</span>
            <div className="exp-body">
              <div className="exp-role">Marketing Assistant</div>
              <div className="exp-co">SEA Education</div>
            </div>
            <span className="exp-yr">2020–21</span>
          </div>
          <div className="exp-item">
            <span className="exp-icon">🎨</span>
            <div className="exp-body">
              <div className="exp-role">Designer</div>
              <div className="exp-co">Lop Creative · Freelance</div>
            </div>
            <span className="exp-yr">2023</span>
          </div>
          <div className="exp-item">
            <span className="exp-icon">🔔</span>
            <div className="exp-body">
              <div className="exp-role">Design Team</div>
              <div className="exp-co">BELL Club UEH</div>
            </div>
            <span className="exp-yr">2018–21</span>
          </div>
        </div>
      </div>

      {/* Quote Card */}
      <div className="tile c2" data-i="10">
        <div className="inner">
          <div className="lbl">design belief</div>
          <div className="qt">"Creativity + research = experiences that actually work for people."</div>
          <div className="qt-src">— Huy's approach</div>
        </div>
      </div>

      {/* Languages Card */}
      <div className="tile" data-i="9">
        <div className="inner">
          <div className="lbl">language</div>
          <div className="lang-row">
            <div className="lang-left"><span className="lang-flag">🇻🇳</span><span className="lang-name">Vietnamese</span></div>
            <span className="lang-lvl">Native</span>
          </div>
          <div className="lang-row">
            <div className="lang-left"><span className="lang-flag">🇬🇧</span><span className="lang-name">English</span></div>
            <span className="lang-lvl">TOEIC 930</span>
          </div>
        </div>
      </div>

      {/* Film card */}
      <div className="tile" data-i="11">
        <div className="inner">
          <div className="lbl">film projects</div>
          <div className="film-item"><span className="film-dot"></span><div><div className="film-name">iTVC</div><div className="film-role">Director · 2020</div></div></div>
          <div className="film-item"><span className="film-dot"></span><div><div className="film-name">BELL Short Film</div><div className="film-role">Writer · 2019</div></div></div>
          <div className="film-item"><span className="film-dot"></span><div><div className="film-name">Just Dream MV</div><div className="film-role">Production · 2018</div></div></div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="tile c2" id="contact" data-i="13">
        <div className="inner">
          <div className="lbl">get in touch</div>
          <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap' }}>
            <a className="ctact-row" href="mailto:Huy.nguyen20800@gmail.com">
              <span className="ctact-icon">✉</span>
              <span className="ctact-text">Huy.nguyen20800@gmail.com</span>
            </a>
            <a className="ctact-row" href="tel:+840938051535">
              <span className="ctact-icon">📱</span>
              <span className="ctact-text">(+84) 0938 051 535</span>
            </a>
            <a className="ctact-row" href="#">
              <span className="ctact-icon">🔗</span>
              <span className="ctact-text">LinkedIn / Portfolio</span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Card */}
      <div className="tile c4" style={{ height: '46px' }} data-i="14">
        <div className="inner" style={{ padding: '0 24px', justifyContent: 'center', overflow: 'hidden' }}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              <span className="mqi"><em>✦</em>UX/UI Design</span>
              <span class="mqi"><em>✦</em>Creative Strategy</span>
              <span className="mqi"><em>✦</em>Market Research</span>
              <span className="mqi"><em>✦</em>Campaign Execution</span>
              <span className="mqi"><em>✦</em>Graphic Design</span>
              <span className="mqi"><em>✦</em>Photography</span>
              <span className="mqi"><em>✦</em>Filmmaking</span>
              <span className="mqi"><em>✦</em>Branding</span>
              <span className="mqi"><em>✦</em>UX/UI Design</span>
              <span className="mqi"><em>✦</em>Creative Strategy</span>
              <span className="mqi"><em>✦</em>Market Research</span>
              <span className="mqi"><em>✦</em>Campaign Execution</span>
              <span className="mqi"><em>✦</em>Graphic Design</span>
              <span className="mqi"><em>✦</em>Photography</span>
              <span className="mqi"><em>✦</em>Filmmaking</span>
              <span className="mqi"><em>✦</em>Branding</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

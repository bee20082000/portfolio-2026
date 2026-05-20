import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Cursor() {
  const curRef = useRef(null)
  const svgRef = useRef(null)
  const pillRef = useRef(null)
  const pillTextRef = useRef(null)

  useGSAP(() => {
    let mx = typeof window.lastMouseX === 'number' ? window.lastMouseX : window.innerWidth / 2
    let my = typeof window.lastMouseY === 'number' ? window.lastMouseY : window.innerHeight / 2
    let rx = mx, ry = my

    const setCurLeft = gsap.quickSetter(curRef.current, 'left', 'px')
    const setCurTop = gsap.quickSetter(curRef.current, 'top', 'px')

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      // Liquid, buttery-smooth trailing glide interpolation
      rx += (mx - rx) * 0.22
      ry += (my - ry) * 0.22
      setCurLeft(rx)
      setCurTop(ry)
    }
    gsap.ticker.add(tick)

    // GSAP Interactive Elements Hover Bounce Sequence
    let hoveredEl = null

    const showPill = (text, bg = '#ffffff', color = '#000000') => {
      if (pillTextRef.current) pillTextRef.current.textContent = text
      if (pillRef.current) {
        pillRef.current.style.background = bg
        pillRef.current.style.color = color
        pillRef.current.style.borderColor = bg === '#ffffff' ? '#000000' : bg
      }
      gsap.set(pillRef.current, { display: 'flex' })
      gsap.fromTo(pillRef.current,
        { scale: 0, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: 'back.out(1.7)', overwrite: 'auto' }
      )
    }

    const hidePill = () => {
      gsap.to(pillRef.current, {
        scale: 0, opacity: 0, duration: 0.22, ease: 'power2.out', overwrite: 'auto',
        onComplete: () => { gsap.set(pillRef.current, { display: 'none' }) }
      })
    }

    const showSvgHover = () => {
      gsap.to(svgRef.current, {
        scale: 1.45, rotate: -18, opacity: 1, duration: 0.42,
        ease: 'back.out(1.7)', transformOrigin: '18.75% 12.5%', overwrite: 'auto'
      })
    }

    const resetSvg = () => {
      gsap.to(svgRef.current, {
        scale: 1.0, rotate: 0, opacity: 1, duration: 0.38,
        ease: 'back.out(1.7)', transformOrigin: '18.75% 12.5%', overwrite: 'auto'
      })
    }

    const hideSvg = () => {
      gsap.to(svgRef.current, {
        scale: 0, opacity: 0, rotate: -45, duration: 0.28,
        ease: 'power2.out', transformOrigin: '18.75% 12.5%', overwrite: 'auto'
      })
    }

    const handleMouseOver = (e) => {
      const isHero = e.target.closest('.tile-hero')
      const isCase = e.target.closest('.tile-case')
      const el = e.target.closest('.tile, a, button, [role="button"], .clickable, .view-more-badge, .unified-close-btn, .spotify-btn')

      if (isHero) {
        if (hoveredEl !== 'hero') {
          hoveredEl = 'hero'
          hideSvg()
          showPill('Read more!', '#ffffff', '#000000')
        }
      } else if (isCase) {
        if (hoveredEl !== 'case') {
          hoveredEl = 'case'
          hideSvg()
          showPill('View Project →', '#ffffffff', '#000000ff')
        }
      } else if (el) {
        if (hoveredEl !== el) {
          hoveredEl = el
          hidePill()
          showSvgHover()
        }
      } else {
        if (hoveredEl !== null) {
          hoveredEl = null
          hidePill()
          resetSvg()
        }
      }
    }

    window.addEventListener('mouseover', handleMouseOver)

    // Cursor press-bounce on mousedown / mouseup
    const onDown = () => {
      gsap.to(curRef.current, {
        scale: 0.85,
        duration: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
        transformOrigin: '18.75% 12.5%'
      })
    }
    const onUp = () => {
      gsap.to(curRef.current, {
        scale: 1,
        duration: 0.55,
        ease: 'back.out(4)',
        overwrite: 'auto',
        transformOrigin: '18.75% 12.5%'
      })
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div id="cursor" ref={curRef} style={{ transformOrigin: "18.75% 12.5%" }}>
      {/* Classic premium black cursor arrow SVG — crisp, high-contrast, with white border */}
      <svg ref={svgRef} width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: "18.75% 12.5%" }}>
        <path
          d="M4.5 3V21L10.5 15H17.5L4.5 3Z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Shared cursor pill — text & colors set dynamically by showPill() */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(4.5px, 3px)', /* align with cursor tip */
          pointerEvents: 'none'
        }}
      >
        <div
          ref={pillRef}
          className="cursor-pill"
          style={{
            display: 'none',
            transform: 'translate(-50%, -50%)', /* Center pill on the tip point */
            background: '#ffffff',
            color: '#000000',
            padding: '7px 14px',
            borderRadius: '99px',
            fontSize: '14px',
            fontFamily: "var(--font-family)",
            fontWeight: '700',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
            border: '1.5px solid #000000',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            letterSpacing: '-0.01em',
            transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
          }}
        >
          <span ref={pillTextRef}>Make it short please!</span>
        </div>
      </div>
    </div>
  )
}

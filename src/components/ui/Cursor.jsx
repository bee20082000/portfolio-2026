import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const curRef = useRef(null)
  const svgRef = useRef(null)
  const handSvgRef = useRef(null)
  const pillRef = useRef(null)
  const pillTextRef = useRef(null)

  useGSAP(() => {
    let mx = typeof window.lastMouseX === 'number' ? window.lastMouseX : window.innerWidth / 2
    let my = typeof window.lastMouseY === 'number' ? window.lastMouseY : window.innerHeight / 2
    let rx = mx, ry = my

    // Directional velocity tracking for momentum
    let lastMx = mx, lastMy = my
    let vx = 0, vy = 0

    const setCurX = gsap.quickSetter(curRef.current, 'x', 'px')
    const setCurY = gsap.quickSetter(curRef.current, 'y', 'px')

    // Track last written position to skip redundant DOM style mutations.
    // Use Infinity (not NaN) as sentinel: Math.abs(x - Infinity) = Infinity > 0.05
    // ensures the very first tick always writes the position to the DOM.
    let lastSetX = Infinity
    let lastSetY = Infinity

    let hasMoved = typeof window.lastMouseX === 'number'
    gsap.set(curRef.current, { opacity: hasMoved ? 1 : 0 })

    const onMove = e => {
      mx = e.clientX
      my = e.clientY
      if (!hasMoved) {
        hasMoved = true
        rx = mx
        ry = my
        gsap.to(curRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const onMouseLeave = () => {
      gsap.to(curRef.current, { opacity: 0, duration: 0.2, overwrite: 'auto' })
    }
    const onMouseEnter = () => {
      if (hasMoved) {
        gsap.to(curRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' })
      }
    }
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

    const tick = () => {
      // Calculate real-time frame distance vector
      const dx = mx - lastMx
      const dy = my - lastMy

      // Build up momentum velocity vectors
      vx += (dx - vx) * 0.5
      vy += (dy - vy) * 0.5

      // Increased Lerp factor for crisp responsiveness
      rx += (mx - rx) * 0.55
      ry += (my - ry) * 0.55

      // Dampen the overshoot so it snaps to a stop quickly and precisely
      if (dx === 0 && dy === 0 && (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1)) {
        rx += vx * 0.15
        ry += vy * 0.15

        vx *= 0.25
        vy *= 0.25
      }

      // Apply coordinates offset so the visual tip (22.91%, 9.58%) of the 36x36px SVG is directly under the mouse
      const nextX = rx - 8.25
      const nextY = ry - 3.45

      // Only write to DOM when position has meaningfully changed — eliminates
      // hundreds of redundant style mutations per second when cursor is still.
      if (Math.abs(nextX - lastSetX) > 0.05 || Math.abs(nextY - lastSetY) > 0.05) {
        setCurX(nextX)
        setCurY(nextY)
        lastSetX = nextX
        lastSetY = nextY
      }

      lastMx = mx
      lastMy = my
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
        scale: 0.6, opacity: 0, y: 10, duration: 0.15, ease: 'power3.out', overwrite: 'auto',
        onComplete: () => { gsap.set(pillRef.current, { display: 'none' }) }
      })
    }

    const showSvgHover = (scale = 1.15) => {
      gsap.to(svgRef.current, {
        scale: scale,
        opacity: 1,
        duration: 0.42,
        ease: 'back.out(1.7)',
        transformOrigin: '22.91% 9.58%',
        overwrite: 'auto'
      })
    }

    const resetSvg = () => {
      gsap.to(svgRef.current, {
        scale: 1.0, opacity: 1, duration: 0.38,
        ease: 'back.out(1.7)', transformOrigin: '22.91% 9.58%', overwrite: 'auto'
      })
    }

    const hideSvg = () => {
      gsap.to(svgRef.current, {
        scale: 0, opacity: 0, duration: 0.28,
        ease: 'power2.out', transformOrigin: '22.91% 9.58%', overwrite: 'auto'
      })
    }

    const showHandHover = () => {
      gsap.set(handSvgRef.current, { display: 'block' })
      gsap.fromTo(handSvgRef.current,
        { scale: 0, opacity: 0, rotate: -45 },
        {
          scale: 1.15,
          rotate: -10,
          opacity: 1,
          duration: 0.42,
          ease: 'back.out(1.7)',
          transformOrigin: '28% 10%',
          overwrite: 'auto'
        }
      )
    }

    const hideHand = () => {
      gsap.to(handSvgRef.current, {
        scale: 0, opacity: 0, rotate: -45, duration: 0.28,
        ease: 'power2.out', transformOrigin: '28% 10%', overwrite: 'auto',
        onComplete: () => {
          if (hoveredEl !== 'hero') {
            gsap.set(handSvgRef.current, { display: 'none' })
          }
        }
      })
    }

    const updateHoverState = (target) => {
      if (!target) return
      const isWorkList = target.closest('.work-list-item')
      const isHeroBackground = target.closest('.tile-hero') && !target.closest('.bio-link') && !isWorkList
      const isCase = target.closest('.tile-case')
      const el = !isHeroBackground && !isWorkList && target.closest('.tile, a, button, [role="button"], .clickable, .view-more-badge, .unified-close-btn, .spotify-btn')

      if (isHeroBackground) {
        if (hoveredEl !== 'hero-bg') {
          hoveredEl = 'hero-bg'
          hidePill()
          hideHand()
          gsap.set(svgRef.current, { display: 'block' })
          resetSvg()
        }
      } else if (isCase) {
        if (hoveredEl !== 'case') {
          hoveredEl = 'case'
          hideHand()
          hideSvg()
          showPill('View Work →', '#ffffffff', '#000000ff')
        }
      } else if (isWorkList) {
        if (hoveredEl !== 'worklist') {
          hoveredEl = 'worklist'
          hideHand()
          gsap.set(svgRef.current, { display: 'block' })
          showSvgHover() // Keep the cursor visible and enlarge it
          showPill('view', '#ffffffff', '#000000ff') // Show the pill aligned as a tooltip
        }
      } else if (el) {
        if (hoveredEl !== el) {
          hoveredEl = el
          hideHand()
          hidePill()
          gsap.set(svgRef.current, { display: 'block' })
          showSvgHover()
        }
      } else {
        if (hoveredEl !== null) {
          hoveredEl = null
          hideHand()
          hidePill()
          gsap.set(svgRef.current, { display: 'block' })
          resetSvg()
        }
      }
    }

    const handleMouseOver = (e) => updateHoverState(e.target)

    const onScroll = () => {
      if (hasMoved) {
        const target = document.elementFromPoint(mx, my)
        updateHoverState(target)
      }
    }

    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    // Cursor press-bounce on mousedown / mouseup
    const onDown = () => {
      gsap.to(curRef.current, {
        scale: 0.85,
        duration: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
        transformOrigin: '22.91% 9.58%'
      })
    }
    const onUp = () => {
      gsap.to(curRef.current, {
        scale: 1,
        duration: 0.55,
        ease: 'back.out(4)',
        overwrite: 'auto',
        transformOrigin: '22.91% 9.58%'
      })
    }
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div className={styles.cursor} ref={curRef} style={{ transformOrigin: "22.91% 9.58%" }}>
      {/* Custom SVG cursor — crisp, high-contrast, with white border */}
      <svg
        ref={svgRef}
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: "22.91% 9.58%" }}
      >
        <path
          d="M7.92098 2.29951C6.93571 1.5331 5.5 2.23523 5.5 3.48349V20.4923C5.5 21.9145 7.2945 22.5382 8.17661 21.4226L12.3676 16.1224C12.6806 15.7267 13.1574 15.4958 13.6619 15.4958H20.5143C21.9425 15.4958 22.5626 13.6887 21.4353 12.8119L7.92098 2.29951Z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Modern hand pointer cursor SVG (kept for backward compatibility, hidden) */}
      <svg
        id="fi_16702775"
        enableBackground="new 0 0 100 100"
        ref={handSvgRef}
        width="40"
        height="40"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'none', transformOrigin: "28% 10%" }}
      >
        <path
          d="M17.5,12.55,10.65,9.7,7.1,13.25a1.2,1.2,0,0,1-1.7,0,1.2,1.2,0,0,1,0-1.7L9,8,6.15,5.15a1.2,1.2,0,0,1,0-1.7,1.2,1.2,0,0,1,1.7,0L10.7,6.3,13.55,3.45a1.2,1.2,0,0,1,1.7,0,1.2,1.2,0,0,1,0,1.7L12.4,8l3.4,3.4a1.2,1.2,0,0,1,0,1.7,1.2,1.2,0,0,1-1.7,0L10.7,9.7l-2.85,2.85a1.2,1.2,0,0,1-1.7,0"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Shared cursor pill ── text & colors set dynamically by showPill() */}
      <div
        style={{
          position: 'absolute',
          top: '3.45px',  /* Exact Y coordinate of the cursor tip */
          left: '8.25px', /* Exact X coordinate of the cursor tip */
          transform: 'translate(16px, 0px)', /* place perfectly next to the bottom-right of the cursor */
          pointerEvents: 'none'
        }}
      >
        <div
          ref={pillRef}
          className={`cursor-pill ${styles.cursorPill}`}
          style={{
            background: '#ffffff',
            color: '#000000',
          }}
        >
          <span ref={pillTextRef} style={{ fontWeight: 700 }}>Make it short please!</span>
        </div>
      </div>
    </div>
  )
}
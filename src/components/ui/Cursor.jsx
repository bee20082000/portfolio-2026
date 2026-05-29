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
    window.addEventListener('mousemove', onMove)

    const onMouseLeave = () => {
      gsap.to(curRef.current, { opacity: 0, duration: 0.2, overwrite: 'auto' })
    }
    const onMouseEnter = () => {
      if (hasMoved) {
        gsap.to(curRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' })
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const tick = () => {
      // Calculate real-time frame distance vector
      const dx = mx - lastMx
      const dy = my - lastMy

      // Build up momentum velocity vectors
      vx += (dx - vx) * 0.3
      vy += (dy - vy) * 0.3

      // ── ADJUSTMENT 3: Balanced smoothness factor (0.32) ──
      rx += (mx - rx) * 0.32
      ry += (my - ry) * 0.32

      // ── REGARDING QUESTION 2: Location momentum animation engine ──
      // If the physical mouse breaks suddenly, overshoot the render tracking positions 
      // ahead based on velocity vectors, then collapse them back dynamically.
      if (dx === 0 && dy === 0 && (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5)) {
        rx += vx * 0.55 // Amplified slightly for noticeable inertia drop-off
        ry += vy * 0.55

        vx *= 0.5 // Quick dampening decay to anchor back smoothly
        vy *= 0.5
      }

      // Apply coordinates using GPU-accelerated 3D Transforms!
      // Subtracting the hotspot tip offset (-7.88px, -5.25px) directly here
      setCurX(rx - 7.88)
      setCurY(ry - 5.25)

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
        scale: 0, opacity: 0, duration: 0.22, ease: 'power2.out', overwrite: 'auto',
        onComplete: () => { gsap.set(pillRef.current, { display: 'none' }) }
      })
    }

    const showSvgHover = (scale = 1.15, rotate = -10) => {
      gsap.to(svgRef.current, {
        // ── ADJUSTMENT 1: Scale zoom reduced from 1.45 to 1.15 ──
        scale: scale,
        rotate: rotate, // Slightly gentler rotation to match subtle scale
        opacity: 1,
        duration: 0.42,
        ease: 'back.out(1.7)',
        transformOrigin: '18.75% 12.5%',
        overwrite: 'auto'
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

    const handleMouseOver = (e) => {
      const isHero = e.target.closest('.tile-hero')
      const isCase = e.target.closest('.tile-case')
      const el = e.target.closest('.tile, a, button, [role="button"], .clickable, .view-more-badge, .unified-close-btn, .spotify-btn')

      if (isHero) {
        if (hoveredEl !== 'hero') {
          hoveredEl = 'hero'
          hidePill()
          hideHand()
          gsap.set(svgRef.current, { display: 'block' })
          showSvgHover(1.45, -20)
        }
      } else if (isCase) {
        if (hoveredEl !== 'case') {
          hoveredEl = 'case'
          hideHand()
          hideSvg()
          showPill('View Work →', '#ffffffff', '#000000ff')
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
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div className={styles.cursor} ref={curRef} style={{ transformOrigin: "18.75% 12.5%" }}>
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

      {/* Modern hand pointer cursor SVG */}
      <svg
        id="fi_16702775"
        enableBackground="new 0 0 100 100"
        ref={handSvgRef}
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'none', transformOrigin: "28% 10%" }}
      >
        <path
          d="m83.1344528 26.0754948c-2.1633835-4.3434639-7.5547714-6.1498184-11.8982315-3.986433-2.8542862 1.4216557-4.5945282 4.1470661-4.847023 7.0607681l-.1236191-.2481995c-2.1633835-4.3434639-7.5547829-6.1498127-11.898243-3.9864292-2.8542824 1.4216576-4.5945282 4.147068-4.8470192 7.0607681l-.1236229-.2482033c-2.1633835-4.3434601-7.5547714-6.1498127-11.8982391-3.9864254-2.8542747 1.4216537-4.5945206 4.1470585-4.8470154 7.0607605l-13.2893657-26.6812667c-1.050787-2.1096826-2.9084549-3.6625876-5.20119-4.5341415-2.2309198-.7474573-4.6491785-.6271737-6.7588644.4236152-4.3434601 2.1633844-6.1498127 7.5547752-3.9864261 11.8982401l24.5389736 49.2672865c.2472496.4964066.1844749.9923172-.1260014 1.301857-.3104877.3095322-.8068867.556778-1.3646164.3699112l-12.0841475-4.0487175c-4.090023-1.3703346-8.6189137.4207573-10.6706047 4.0757179-1.2433755 2.1681519-1.4335756 4.8959503-.6932745 7.3151627.7403033 2.4c-1.2433755 2.1681519-1.4335756 4.8959503-.6932745 7.3151627.7403033 2.4c7.0736313-3.5232315 12.2910385-9.5293884 14.7825699-16.9657898 2.4915085-7.4364014 1.945694-15.3734932-1.5775299-22.4471283z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Shared cursor pill ── text & colors set dynamically by showPill() */}
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
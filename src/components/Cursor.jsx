import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Cursor() {
  const curRef = useRef(null)

  useGSAP(() => {
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my

    const setCurLeft  = gsap.quickSetter(curRef.current,  'left', 'px')
    const setCurTop   = gsap.quickSetter(curRef.current,  'top',  'px')

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

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div id="cursor" ref={curRef}>
      {/* Classic premium black cursor arrow SVG — crisp, high-contrast, with white border */}
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M4.5 3V21L10.5 15H17.5L4.5 3Z" 
          fill="#000000" 
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

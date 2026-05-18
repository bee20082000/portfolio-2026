import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Cursor() {
  const curRef = useRef(null)
  const ringRef = useRef(null)

  useGSAP(() => {
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my

    // Position dot immediately, ring follows with lag
    const setCurLeft  = gsap.quickSetter(curRef.current,  'left', 'px')
    const setCurTop   = gsap.quickSetter(curRef.current,  'top',  'px')
    const setRingLeft = gsap.quickSetter(ringRef.current, 'left', 'px')
    const setRingTop  = gsap.quickSetter(ringRef.current, 'top',  'px')

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    // GSAP ticker — runs every animation frame
    const tick = () => {
      // Ring lags behind cursor for liquid trailing effect
      rx += (mx - rx) * 0.10
      ry += (my - ry) * 0.10
      setCurLeft(mx);  setCurTop(my)
      setRingLeft(rx); setRingTop(ry)
    }
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div id="cursor"      ref={curRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

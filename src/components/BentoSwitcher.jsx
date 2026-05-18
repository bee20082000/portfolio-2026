import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function BentoSwitcher({ activeTab, onChangeTab }) {
  const switcherRef = useRef(null)

  // Attach spring magnetic pull triggers to switcher buttons
  useGSAP(() => {
    const buttons = switcherRef.current.querySelectorAll('.switcher-btn')

    buttons.forEach(el => {
      const handleMove = (e) => {
        const rect = el.getBoundingClientRect()
        const xc = rect.width / 2
        const yc = rect.height / 2
        const dx = e.clientX - (rect.left + xc)
        const dy = e.clientY - (rect.top + yc)

        gsap.to(el, {
          x: dx * 1,
          y: dy * 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        })
      }

      const handleLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        })
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    })
  }, { scope: switcherRef })

  return (
    <div className="bento-switcher" ref={switcherRef}>
      <button
        className={`switcher-btn ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => onChangeTab('overview')}
      >
        <span className="switcher-dot"></span>Overview
      </button>
      <button
        className={`switcher-btn ${activeTab === 'cases' ? 'active' : ''}`}
        onClick={() => onChangeTab('cases')}
      >
        <span className="switcher-dot"></span>Case Studies
      </button>
    </div>
  )
}

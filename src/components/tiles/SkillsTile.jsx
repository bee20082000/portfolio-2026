import { useState } from 'react'

export default function SkillsTile({ onSelect }) {
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    // If already unlocked and showing "Heh heh", open modal immediately
    if (clickCount === 3) {
      if (onSelect) onSelect('skills')
      return
    }

    const nextCount = clickCount + 1
    if (nextCount >= 3) {
      setClickCount(3) // Persistently set to "Heh heh"
      setTimeout(() => {
        if (onSelect) onSelect('skills')
      }, 550) // Sweet spot delay to read the final "Heh heh" message on the first unlock
    } else {
      setClickCount(nextCount)
    }
  }

  const getBadgeText = () => {
    if (clickCount === 0) return "Do not click this!!!"
    if (clickCount === 1) return "PLEASE DO NOT CLICK THIS!!!"
    if (clickCount === 2) return "I'M BEGGING YOU!!!!"
    return "Heh heh"
  }

  const getBadgeClass = () => {
    // Reverts to normal styling once unlocked in state 3
    if (clickCount === 3) return ""
    return `skills-btn-warning-${clickCount} ${clickCount === 2 ? 'shake-active' : ''}`
  }

  return (
    <div className="tile tile-skills c2" id="skills" data-i="5" onClick={handleClick}>
      <div className="inner">
        <div className="lbl">skills</div>
        <div className="tags">
          {['UX/UI Design', 'Graphic Design', 'Market Research', 'Creative Strategy', 'Photography', 'Filmmaking', 'Copywriting', 'Campaign Execution'].map(s => (
            <span className="tag" key={s}>{s}</span>
          ))}
        </div>
        <div className={`view-more-badge badge-inline ${getBadgeClass()}`}>
          <span>{getBadgeText()}</span>
          <span className="arrow-icon">↗</span>
        </div>
      </div>
    </div>
  )
}

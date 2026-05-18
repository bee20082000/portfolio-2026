export default function SkillsTile({ onSelect }) {
  return (
    <div className="tile tile-skills c2" id="skills" data-i="5" onClick={() => onSelect && onSelect('skills')}>
      <div className="inner">
        <div className="lbl">skills</div>
        <div className="tags">
          {['UX/UI Design', 'Graphic Design', 'Market Research', 'Creative Strategy', 'Photography', 'Filmmaking', 'Copywriting', 'Campaign Execution'].map(s => (
            <span className="tag" key={s}>{s}</span>
          ))}
        </div>
        <div className="view-more-badge badge-inline">
          <span>+4 more skills</span>
          <span className="arrow-icon">↗</span>
        </div>
      </div>
    </div>
  )
}

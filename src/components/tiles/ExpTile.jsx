export default function ExpTile({ onSelect }) {
  return (
    <div className="tile tile-exp r3" id="exp" data-i="4" onClick={() => onSelect && onSelect('experience')}>
      <div className="inner">
        <div className="lbl">work experience</div>

        <div className="exp-list-fixed">
          {[
            { r: 'Creative Junior', c: 'DDB Việt Nam · IMC Agency', y: '2022–now' },
            { r: 'Research Assistant', c: 'Ipsos Việt Nam', y: '2021–22' },
            { r: 'Marketing Assistant', c: 'SEA Education Consultants', y: '2020–21' },
            { r: 'Designer', c: 'Lop Creative · Freelance', y: '2023' },
          ].map((e, k) => (
            <div className="exp-item" key={k}>
              <div className="exp-body">
                <div className="exp-role">{e.r}</div>
                <div className="exp-co">{e.c}</div>
              </div>
              <span className="exp-yr">{e.y}</span>
            </div>
          ))}
        </div>

        {/* Removed inline marginTop so it naturally hugs the list */}
        <div className="view-more-badge badge-inline">
          <span>+3 more roles</span>
          <span className="arrow-icon">↗</span>
        </div>

      </div>
    </div>
  )
}
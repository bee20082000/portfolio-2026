export default function FilmTile() {
  return (
    <div className="tile tile-film" data-i="11">
      <div className="inner">
        <div className="lbl">film projects</div>
        <div className="film-list">
          {[
            ['iTVC', 'Director · 2020'],
            ['BELL Short Film', 'Writer · 2019'],
            ['Just Dream MV', 'Production · 2018']
          ].map(([n, r]) => (
            <div className="film-item" key={n}>
              <span className="film-dot"></span>
              <div><div className="film-name">{n}</div><div className="film-role">{r}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

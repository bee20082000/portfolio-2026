export default function StatusTile() {
  return (
    <div className="tile tile-status c2" data-i="15">
      <div className="inner">
        <div className="lbl">current status</div>
        <div className="status-focus-row">
          <div className="focus-heading">Available for hire as Freelance or Full-time Specialist</div>
          <span className="live-status-pill">
            <span className="pulse-dot"></span>
            Active Now
          </span>
        </div>
      </div>
    </div>
  )
}

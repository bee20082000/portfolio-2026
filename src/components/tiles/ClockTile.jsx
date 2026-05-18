export default function ClockTile({ time }) {
  return (
    <div className="tile tile-clock" data-i="1">
      <div className="inner">
        <div className="  lbl">Local Time</div>
        <div className="clock">{time}</div>
        <div className="clock-tz">Ho Chi Minh City · GMT+7</div>
      </div>
    </div>
  )
}

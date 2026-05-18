export default function ContactTile({ onSelect }) {
  return (
    <div className="tile tile-contact c2" id="contact" data-i="13" onClick={(e) => { if (!e.target.closest('a')) { onSelect && onSelect('contact'); } }} style={{ cursor: 'pointer' }}>
      <div className="inner">
        <div className="lbl">get in touch</div>
        <div className="contact-flex-row">
          <a className="ctact-row flex-item" href="mailto:Huy.nguyen20800@gmail.com">
            <span className="ctact-icon">✉</span>
            <span className="ctact-text">Huy.nguyen20800@gmail.com</span>
          </a>
          <a className="ctact-row flex-item" href="tel:+840938051535">
            <span className="ctact-icon">📱</span>
            <span className="ctact-text">(+84) 0938 051 535</span>
          </a>
          <a className="ctact-row flex-item" href="#">
            <span className="ctact-icon">🔗</span>
            <span className="ctact-text">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}

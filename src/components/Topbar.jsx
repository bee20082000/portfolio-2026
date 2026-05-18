export default function Topbar({ theme, onToggleTheme }) {
  return (
    <nav className="topbar">
      <div className="logo">huy<strong>.nguyen</strong></div>
      <div className="topbar-right">
        <a href="#exp" className="nav-link">experience</a>
        <a href="#skills" className="nav-link">skills</a>
        <a href="#contact" className="nav-link">contact</a>
        <button className="theme-btn" onClick={onToggleTheme}>
          <div className="moon-sun"></div>
          <span className="theme-lbl">{theme}</span>
        </button>
      </div>
    </nav>
  )
}

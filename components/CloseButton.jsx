export default function CloseButton({ onClick, className, label = "Close" }) {
  return (
    <button
      className={`unified-close-btn ${className || ""}`}
      onClick={onClick}
      aria-label={`${label} modal`}
    >
      <span className="close-btn-icon">✕</span>
      <span className="close-btn-text">{label}</span>
    </button>
  );
}

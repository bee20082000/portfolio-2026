import styles from './CloseButton.module.css';

export default function CloseButton({ onClick, className, label = "Close" }) {
  return (
    <button
      className={`${styles['unified-close-btn']} ${className || ""}`}
      onClick={onClick}
      aria-label={`${label} modal`}
    >
      <span className={styles['close-btn-icon']}>✕</span>
      <span className={styles['close-btn-text']}>{label}</span>
    </button>
  );
}

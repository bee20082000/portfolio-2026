import styles from './MobileBlocker.module.css';

export default function MobileBlocker() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>Please use a desktop browser</h2>
        <p>This portfolio is best experienced on a larger screen.</p>
      </div>
    </div>
  );
}

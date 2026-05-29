
// EASILY ADJUST TILE SIZE & CONTENT HERE:
const TILE_WIDTH = "span 3";
const TILE_HEIGHT = "span 4";
const TILE_BG_COLOR = "#EDE2CF"; // Updated to match the blue reference
const TILE_TEXT_COLOR = "#4FADF5";
const TILE_RADIUS = "5px";
import styles from './YearsTile.module.css';

export default function YearsTile() {
  return (
    <div className="tile tile-years" data-i="2" style={{
      gridColumn: TILE_WIDTH,
      gridRow: TILE_HEIGHT,
      height: '100%',
      backgroundColor: TILE_BG_COLOR,
      color: TILE_TEXT_COLOR,
      borderRadius: TILE_RADIUS,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      {/* Lightweight, hardware-accelerated CSS animations */}

      {/* The Big Number '4+' with animated weight */}
      <span className={styles['animate-weight']} style={{
        fontSize: '10rem',
        lineHeight: '0.8',
        letterSpacing: '-0.05em',
        fontFamily: 'DynaPuff',
        zIndex: 1
      }}>
        4+
      </span>

      {/* Overlapping Black Pill Label with floating animation */}
      <div className={styles['animate-pill']} style={{
        backgroundColor: '#D70E18',
        color: '#ffffff',
        padding: '8px 20px',
        borderRadius: TILE_RADIUS,
        fontSize: '0.95rem',
        fontWeight: '800',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        zIndex: 2,
        marginTop: '-8px',
        willChange: 'transform'
      }}>
        Years experience
      </div>

    </div>
  )
}

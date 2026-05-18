import { useCallback, useRef } from 'react'

const TILE_COLS = {
  'tile-hero'        : 4,
  'tile-clock'       : 2,
  'tile-years'       : 2,
  'tile-edu'         : 2,
  'tile-exp'         : 3,
  'tile-skills'      : 4,
  'tile-statusaccent': 2,
  'tile-tools'       : 2,
  'tile-clients'     : 3,
  'tile-language'    : 2,
  'tile-quote'       : 2,
  'tile-film'        : 2,
  'tile-photos'      : 2,
  'tile-contact'     : 3,
  'tile-spotify'     : 2,
  'tile-status'      : 2,
}

function getTileSpan(className) {
  for (const [key, cols] of Object.entries(TILE_COLS)) {
    if (className.includes(key)) return cols
  }
  return 2
}

/**
 * useMasonryLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * A high-performance dynamic horizontal geometric packer for bento grids.
 * 
 * DESIGN GOAL:
 *   - Perfect, strict 16px horizontal and vertical gaps.
 *   - Dynamically packs tiles downward in column slots.
 *   - Auto-spills/moves to the right whenever items exceed the viewport height constraint.
 *   - Keeps desktop completely fluid and responsive, falling back gracefully to mobile grid.
 */
export function useMasonryLayout({ gap = 16, colWidth = 176 } = {}) {
  const containerRef = useRef(null)
  const rafRef = useRef(null)

  const recalculate = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) return

      const isMobile = window.innerWidth <= 768
      const tiles = Array.from(container.querySelectorAll(':scope > .tile'))
      if (!tiles.length) return

      if (isMobile) {
        // Clear layout styles on mobile to let native CSS Grid layout manage everything
        tiles.forEach(tile => {
          tile.style.position = ''
          tile.style.left = ''
          tile.style.top = ''
          tile.style.width = ''
          tile.style.height = ''
        })
        container.style.width = ''
        return
      }

      // Desktop Dynamic Horizontal Shelf Masonry Layout
      const containerHeight = container.clientHeight || 600

      // Reset tile layout to relative positioning temporarily so we can accurately measure
      // natural heights using their content scrollHeight.
      tiles.forEach(tile => {
        tile.style.position = 'absolute'
        tile.style.left = '0px'
        tile.style.top = '0px'
        const span = getTileSpan(tile.className)
        const tileW = span * colWidth + (span - 1) * gap
        tile.style.width = `${tileW}px`
        tile.style.height = 'auto'
      })

      const placedRects = []
      let maxRightEdge = 0

      tiles.forEach(tile => {
        const span = getTileSpan(tile.className)
        const W = span * colWidth + (span - 1) * gap
        const H = tile.scrollHeight

        let placed = false
        let colIndex = 0

        // Find the absolute first available location starting from column 0
        while (!placed) {
          const x = colIndex * (colWidth + gap)

          // Candidate top Y positions: 0, or right below any placed tile
          // that overlaps horizontally with our proposed placement window
          const candidates = [0]
          placedRects.forEach(rect => {
            if (rect.left < x + W - 1 && rect.right > x + 1) {
              candidates.push(rect.bottom + gap)
            }
          })

          candidates.sort((a, b) => a - b)

          // Test candidates
          for (const y of candidates) {
            if (y + H <= containerHeight) {
              // Ensure there is absolutely zero vertical or horizontal overlap
              let hasOverlap = false
              for (const rect of placedRects) {
                if (
                  x < rect.right - 1 &&
                  x + W > rect.left + 1 &&
                  y < rect.bottom - 1 &&
                  y + H > rect.top + 1
                ) {
                  hasOverlap = true
                  break
                }
              }

              if (!hasOverlap) {
                placedRects.push({
                  left: x,
                  top: y,
                  right: x + W,
                  bottom: y + H
                })
                tile.style.left = `${x}px`
                tile.style.top = `${y}px`
                tile.style.width = `${W}px`
                tile.style.height = `${H}px`

                maxRightEdge = Math.max(maxRightEdge, x + W)
                placed = true
                break
              }
            }
          }

          if (!placed) {
            colIndex++
          }
        }
      })

      // Set the dynamic container width so horizontal scrolling behaves flawlessly
      container.style.width = `${maxRightEdge}px`
    })
  }, [gap, colWidth])

  return { containerRef, recalculate }
}

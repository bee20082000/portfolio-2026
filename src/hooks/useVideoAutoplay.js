import { useEffect } from 'react';

/**
 * Plays/pauses a video element automatically based on viewport visibility.
 * Replaces the duplicated IntersectionObserver pattern in video tiles.
 *
 * @param {React.RefObject} videoRef - Ref pointing to the <video> element
 * @param {string}          [label]  - Optional label for the console warning (e.g. 'Chivas')
 */
export function useVideoAutoplay(videoRef, label = 'Video') {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              console.log(`${label} tile: video autoplay blocked by browser.`);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

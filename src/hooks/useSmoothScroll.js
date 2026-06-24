import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useSmoothScroll
 *
 * Reusable scroll hook that initializes a Lenis scroll instance
 * and attaches it to GSAP's global ticker to unify frame render loops.
 *
 * @param {object} params
 * @param {React.RefObject} [params.wrapperRef]  - Scroll wrapper element (default: window)
 * @param {React.RefObject} [params.contentRef]  - Scroll content element (default: document)
 * @param {boolean}         [params.enabled]     - Toggle instance activation (default: true)
 * @param {boolean}         [params.isLocked]    - Track scroll lock state dynamically
 * @param {object}          [params.options]     - Custom Lenis config overrides
 * @param {function}        [params.onScroll]    - Optional scroll event listener callback
 * @returns {React.MutableRefObject}  ref whose .current holds the active Lenis instance (or null)
 */
export default function useSmoothScroll({
  wrapperRef,
  contentRef,
  enabled = true,
  isLocked = false,
  options = {},
  onScroll,
} = {}) {
  const lenisRef   = useRef(null);
  const onScrollRef = useRef(onScroll);
  const isLockedRef = useRef(isLocked);

  // Keep the callbacks and lock state refs fresh without recreating Lenis
  useEffect(() => {
    onScrollRef.current = onScroll;
  });

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    if (!enabled) return;

    // Don't initialise until wrapper/content elements are mounted in the DOM
    if (wrapperRef  && !wrapperRef.current)  return;
    if (contentRef  && !contentRef.current)  return;

    let active = true;
    let lenis = null;
    let resizeObserver = null;
    let tick = null;

    // Dynamically load Lenis to defer script execution until post-loading screen
    import('lenis').then(({ default: Lenis }) => {
      if (!active) return;

      const wrapper = wrapperRef?.current ?? window;
      const content = contentRef?.current ?? document.documentElement;

      const baseOptions = {
        orientation:        'vertical',
        gestureOrientation: 'vertical',
        smoothWheel:        true,
        wheelMultiplier:    1.1, // Slightly higher multiplier for responsive feed
        touchMultiplier:    1.5, // Responsive inertia match for mobile
        syncTouch:          true,  // Enable touch scroll on tablets
      };

      if (!options.duration && !options.easing && !('lerp' in options)) {
        baseOptions.lerp = 0.075; // Lower value for a silkier, smoother scrolling experience
      }

      lenis = new Lenis({
        ...(wrapperRef ? { wrapper, content } : {}),
        ...baseOptions,
        ...options,
      });

      lenisRef.current = lenis;

      // Expose global-scroll instance on window so other components can call stop/start
      if (!wrapperRef) window.lenis = lenis;

      // Apply latest lock state at the time of initialization
      if (isLockedRef.current) {
        lenis.stop();
      } else {
        lenis.start();
      }

      // Automatically keep GSAP ScrollTrigger updated with Lenis frame transitions
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Forward scroll events to the optional callback
      if (onScrollRef.current) {
        lenis.on('scroll', (e) => {
          if (onScrollRef.current) onScrollRef.current(e);
        });
      }

      // Use ResizeObserver to recompute Lenis scroll limits whenever content height changes.
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          lenis.resize();
        });
        resizeObserver.observe(content);
      }

      // Bind Lenis to the GSAP ticker (time is in seconds; Lenis expects ms)
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
    }).catch(err => {
      console.error('Failed to load Lenis:', err);
    });

    return () => {
      active = false;
      if (tick) gsap.ticker.remove(tick);
      if (resizeObserver) resizeObserver.disconnect();
      if (!wrapperRef) window.lenis = null;
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  // wrapperRef/contentRef objects are stable; .current changes when the DOM mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, wrapperRef?.current, contentRef?.current]);

  // Synchronously lock/unlock when the wrapper component state changes
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (isLocked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isLocked]);

  return lenisRef;
}

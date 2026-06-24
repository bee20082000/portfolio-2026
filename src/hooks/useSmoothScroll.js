import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
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
 * @param {object}          [params.options]     - Custom Lenis config overrides
 * @param {function}        [params.onScroll]    - Optional scroll event listener callback
 * @returns {React.MutableRefObject}  ref whose .current holds the active Lenis instance (or null)
 */
export default function useSmoothScroll({
  wrapperRef,
  contentRef,
  enabled = true,
  options = {},
  onScroll,
} = {}) {
  const lenisRef   = useRef(null);
  const onScrollRef = useRef(onScroll);

  // Keep the callback ref fresh without recreating Lenis
  useEffect(() => {
    onScrollRef.current = onScroll;
  });

  useEffect(() => {
    if (!enabled) return;

    // Don't initialise until wrapper/content elements are mounted in the DOM
    if (wrapperRef  && !wrapperRef.current)  return;
    if (contentRef  && !contentRef.current)  return;

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

    const lenis = new Lenis({
      ...(wrapperRef ? { wrapper, content } : {}),
      ...baseOptions,
      ...options,
    });

    lenisRef.current = lenis;

    // Expose global-scroll instance on window so other components can call stop/start
    if (!wrapperRef) window.lenis = lenis;

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
    // This correctly handles: lazy-loaded Suspense components mounting, images loading,
    // and any dynamic layout changes — all of which expand the content after Lenis init.
    // The old 'load' event listener missed React re-renders that expand the DOM layout.
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      resizeObserver.observe(content);
    }

    // Bind Lenis to the GSAP ticker (time is in seconds; Lenis expects ms)
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      if (resizeObserver) resizeObserver.disconnect();
      if (!wrapperRef) window.lenis = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  // wrapperRef/contentRef objects are stable; .current changes when the DOM mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, wrapperRef?.current, contentRef?.current]);

  return lenisRef;
}

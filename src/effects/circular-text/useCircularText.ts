import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { CircularTextMode } from './CircularText.types';

/**
 * Manages scroll-reactive rotation for the circular text SVG.
 * Returns a ref to attach to the `<svg>` element.
 * In 'spin' or 'none' mode the ref is returned but no listeners are added.
 */
export function useCircularText(
  mode: CircularTextMode,
  scrollSensitivity: number,
): RefObject<SVGSVGElement> {
  const svgRef = useRef<SVGSVGElement>(null);
  const angleRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (mode !== 'scroll') return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = (): void => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;
      lastScrollYRef.current = current;
      angleRef.current += delta * scrollSensitivity;
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mode, scrollSensitivity]);

  return svgRef;
}

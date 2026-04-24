import { useState, useEffect } from 'react';

/**
 * Returns `true` if the user has enabled "prefers-reduced-motion: reduce".
 * Listens for media-query changes and re-renders on toggle.
 * SSR-safe: returns `false` on the server.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

import { useState, useEffect } from 'react';

/**
 * Returns `false` on the server and during the first render (hydration pass).
 * Returns `true` after the component has committed to the DOM.
 *
 * Used to conditionally render browser-only content and prevent SSR hydration mismatches.
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

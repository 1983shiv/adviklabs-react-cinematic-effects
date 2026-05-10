import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export interface ColorShiftEntry {
  bg: string;
  text: string;
}

/**
 * Watches `[data-rce-cs-section]` children inside `containerRef` with an
 * IntersectionObserver. When a section enters the active viewport zone, its
 * colours are applied as CSS custom properties on the container element.
 *
 * `entries` is read via a ref so changing the array reference (e.g. when
 * sections are defined inline) does not recreate the observer.
 */
export function useColorShift(
  containerRef: RefObject<HTMLElement>,
  entries: ColorShiftEntry[],
  triggerOffset: number,
  enabled: boolean,
): void {
  // Stable reference to the latest entries — allows the effect to read current
  // values without listing the array in the dependency array.
  const entriesRef = useRef<ColorShiftEntry[]>(entries);
  entriesRef.current = entries;

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const sectionEls = Array.from(
      container.querySelectorAll<HTMLElement>('[data-rce-cs-section]'),
    );
    if (sectionEls.length === 0) return;

    const applyColors = (index: number): void => {
      const entry = entriesRef.current[index];
      if (!entry) return;
      container.style.setProperty('--rce-cs-bg', entry.bg);
      container.style.setProperty('--rce-cs-text', entry.text);
    };

    // Seed with the first section's palette immediately.
    applyColors(0);

    const clampedOffset = Math.min(Math.max(0, triggerOffset), 0.49);
    const rootMargin = `-${clampedOffset * 100}% 0px -${clampedOffset * 100}% 0px`;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((obsEntry) => {
          if (obsEntry.isIntersecting) {
            const idx = sectionEls.indexOf(obsEntry.target as HTMLElement);
            if (idx !== -1) applyColors(idx);
          }
        });
      },
      { rootMargin, threshold: 0 },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, triggerOffset, enabled]);
}

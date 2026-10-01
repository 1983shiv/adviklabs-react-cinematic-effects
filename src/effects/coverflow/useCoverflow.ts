import { useState, useCallback } from 'react';

export interface UseCoverflowOptions {
  /** Total number of cards */
  itemCount: number;
  /** Initial active index for uncontrolled mode (defaults to middle item) */
  defaultActiveIndex?: number;
  /** Controlled active index — overrides internal state */
  activeIndex?: number;
  /** Callback when the active card changes */
  onActiveChange?: (index: number) => void;
}

export interface UseCoverflowReturn {
  /** Current active card index */
  activeIdx: number;
  /** Activate a card by index (clamped to range) */
  goTo: (index: number) => void;
  /** Move the active card by a signed step (clamped to range) */
  move: (dir: number) => void;
}

/**
 * Encapsulates Coverflow state logic.
 * Supports both controlled and uncontrolled modes, clamped to `[0, itemCount - 1]`.
 */
export function useCoverflow(options: UseCoverflowOptions): UseCoverflowReturn {
  const { itemCount, defaultActiveIndex, activeIndex, onActiveChange } = options;

  const fallback = Math.max(0, Math.floor(itemCount / 2));
  const [internalIndex, setInternalIndex] = useState<number>(
    defaultActiveIndex ?? fallback,
  );

  // Controlled mode: use `activeIndex` prop; uncontrolled: use internal state
  const activeIdx =
    activeIndex === undefined
      ? Math.max(0, Math.min(itemCount - 1, internalIndex))
      : Math.max(0, Math.min(itemCount - 1, activeIndex));

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(itemCount - 1, index));
      if (activeIndex === undefined) {
        setInternalIndex(clamped);
      }
      onActiveChange?.(clamped);
    },
    [activeIndex, itemCount, onActiveChange],
  );

  const move = useCallback(
    (dir: number) => {
      goTo(activeIdx + dir);
    },
    [activeIdx, goTo],
  );

  return { activeIdx, goTo, move };
}

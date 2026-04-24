import { useEffect, useRef, useCallback } from 'react';
import { distance } from '../utils/distance';

export interface UsePointerTrackerOptions {
  /** Reference to the container element to track within */
  ref: React.RefObject<HTMLElement | null>;
  /** Minimum distance (px) between events to fire callback */
  threshold: number;
  /** Called when pointer moves beyond threshold distance since last fire */
  onMove: (x: number, y: number) => void;
  /** Whether tracking is enabled — default true */
  enabled?: boolean;
}

/**
 * Tracks pointer (mouse + touch) movement within a container element.
 * Fires `onMove` only when the cursor has traveled at least `threshold` pixels
 * since the last fire.
 *
 * Uses PointerEvent API for unified mouse/touch handling.
 */
export function usePointerTracker(options: UsePointerTrackerOptions): void {
  const { ref, threshold, onMove, enabled = true } = options;
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Stable callback ref to avoid listener churn
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const dist = distance(
        lastPosRef.current.x,
        lastPosRef.current.y,
        clientX,
        clientY,
      );

      if (dist > threshold) {
        lastPosRef.current = { x: clientX, y: clientY };
        onMoveRef.current(clientX, clientY);
      }
    },
    [threshold],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    el.addEventListener('pointermove', handlePointerMove);
    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
    };
  }, [ref, enabled, handlePointerMove]);
}

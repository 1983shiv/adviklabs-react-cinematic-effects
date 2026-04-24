import { useRef, useMemo } from 'react';

export interface PoolItem<T = Record<string, unknown>> {
  /** The data/state for this pool item */
  data: T;
  /** Index within the pool */
  index: number;
}

export interface UsePoolManagerOptions<T> {
  /** Number of items to pre-allocate */
  size: number;
  /** Factory function to create initial data for each pool item */
  create: (index: number) => T;
}

export interface UsePoolManagerReturn<T> {
  /** Get the next available item from the pool (round-robin). Does NOT cause re-render. */
  acquire: () => PoolItem<T>;
  /** The full pool array (stable reference — for initial rendering) */
  pool: PoolItem<T>[];
  /** Current round-robin index */
  currentIndex: () => number;
}

/**
 * Manages a fixed-size object pool for element reuse.
 *
 * Uses refs internally to avoid re-renders when acquiring items.
 * The pool array itself is created once and its reference is stable.
 *
 * Designed for ImageTrail-style effects where DOM nodes are recycled
 * rather than created/destroyed.
 */
export function usePoolManager<T = Record<string, unknown>>(
  options: UsePoolManagerOptions<T>,
): UsePoolManagerReturn<T> {
  const { size, create } = options;
  const indexRef = useRef(0);

  // Create pool once — stable reference across renders
  const pool = useMemo<PoolItem<T>[]>(() => {
    return Array.from({ length: size }, (_, i) => ({
      data: create(i),
      index: i,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const acquire = useMemo(() => {
    return (): PoolItem<T> => {
      const item = pool[indexRef.current % size];
      indexRef.current += 1;
      return item;
    };
  }, [pool, size]);

  const currentIndex = useMemo(() => {
    return () => indexRef.current;
  }, []);

  return { acquire, pool, currentIndex };
}

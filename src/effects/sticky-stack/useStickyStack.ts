import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';

export interface UseStickyStackOptions {
  itemCount: number;
  activationMargin: string;
  onActiveChange?: (index: number) => void;
  enabled: boolean;
}

export interface UseStickyStackReturn {
  activeIndex: number;
  cardRefs: RefObject<HTMLDivElement>[];
}

/**
 * Tracks which StickyStack card is in the activation zone using
 * IntersectionObserver — zero external dependencies.
 *
 * The "last card that became visible" wins, matching GSAP ScrollTrigger's
 * `onEnter` / `onEnterBack` semantics from the reference design.
 */
export function useStickyStack({
  itemCount,
  activationMargin,
  onActiveChange,
  enabled,
}: UseStickyStackOptions): UseStickyStackReturn {
  const [activeIndex, setActiveIndex] = useState(0);

  // Create a stable array of refs (one per card)
  const cardRefsRef = useRef<RefObject<HTMLDivElement>[]>([]);
  if (cardRefsRef.current.length !== itemCount) {
    cardRefsRef.current = Array.from({ length: itemCount }, () => ({
      current: null,
    })) as RefObject<HTMLDivElement>[];
  }

  const activate = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onActiveChange?.(index);
    },
    [onActiveChange],
  );

  useEffect(() => {
    if (!enabled) return;

    const observers: IntersectionObserver[] = [];

    cardRefsRef.current.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activate(i);
            }
          });
        },
        { rootMargin: activationMargin, threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [enabled, activationMargin, activate, itemCount]);

  return {
    activeIndex,
    cardRefs: cardRefsRef.current,
  };
}

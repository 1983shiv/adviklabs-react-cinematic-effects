import { useCallback, useEffect, useRef, useState } from 'react';

export interface CardProgress {
  scale: number;
  opacity: number;
}

export function useStickyCardStack(
  itemCount: number,
  scaleOnScroll: boolean,
  scaledScale: number,
  scaledOpacity: number,
  stickyTop: number,
) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  const [progressValues, setProgressValues] = useState<number[]>(() =>
    Array.from({ length: Math.max(0, itemCount - 1) }, () => 0),
  );

  useEffect(() => {
    if (!scaleOnScroll || itemCount <= 1) {
      setProgressValues(Array.from({ length: Math.max(0, itemCount - 1) }, () => 0));
      return;
    }

    const handleScroll = () => {
      const vh = window.innerHeight;
      const startTrigger = vh * 0.8;
      const endTrigger = vh * 0.2;
      const range = startTrigger - endTrigger;

      const newProgress = cardRefs.current.slice(0, -1).map((_card, i) => {
        const nextCard = cardRefs.current[i + 1];
        if (!nextCard) return 0;

        const rect = nextCard.getBoundingClientRect();
        const raw = 1 - (rect.top - endTrigger) / range;
        return Math.max(0, Math.min(1, raw));
      });

      setProgressValues(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemCount, scaleOnScroll, scaledScale, scaledOpacity, stickyTop]);

  const cardProgress: CardProgress[] = progressValues.map((p) => ({
    scale: 1 - (1 - scaledScale) * p,
    opacity: 1 - (1 - scaledOpacity) * p,
  }));

  return { setCardRef, cardProgress };
}

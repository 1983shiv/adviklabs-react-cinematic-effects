import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

// ── Cycler hook ───────────────────────────────────────────────────────────────

interface UseCyclerOptions {
  phrases: string[];
  typeSpeed: number;
  deleteSpeed: number;
  pauseFrames: number;
  betweenPhraseDelay: number;
  enabled: boolean;
}

/**
 * Manages the type / pause / delete / cycle animation for the cycler variant.
 * Returns a ref to attach to the output `<span>` element that displays the
 * current text content.
 */
export function useTypeWriterCycler({
  phrases,
  typeSpeed,
  deleteSpeed,
  pauseFrames,
  betweenPhraseDelay,
  enabled,
}: UseCyclerOptions): MutableRefObject<HTMLSpanElement | null> {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseCount = 0;
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = (): void => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > phrase.length) {
          // End of phrase — pause then start deleting
          pauseCount++;
          if (pauseCount > pauseFrames) {
            deleting = true;
            pauseCount = 0;
          }
          rafId = requestAnimationFrame(tick);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          // Done deleting — advance to next phrase
          charIndex = 0;
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pauseCount = 0;
          timerId = setTimeout(tick, betweenPhraseDelay);
          return;
        }
      }

      if (textRef.current) {
        textRef.current.textContent = phrase.substring(0, charIndex);
      }

      timerId = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    timerId = setTimeout(tick, typeSpeed);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [phrases, typeSpeed, deleteSpeed, pauseFrames, betweenPhraseDelay, enabled]);

  return textRef;
}

// ── Code hook ─────────────────────────────────────────────────────────────────

interface UseCodeTyperOptions {
  codeText: string;
  minDelay: number;
  maxDelay: number;
  threshold: number;
  enabled: boolean;
}

/**
 * Types a code string character-by-character once the container enters the
 * viewport. Uses IntersectionObserver so it only starts when visible.
 * Returns a ref to attach to the `<pre>` / `<div>` element.
 */
export function useTypeWriterCode({
  codeText,
  minDelay,
  maxDelay,
  threshold,
  enabled,
}: UseCodeTyperOptions): MutableRefObject<HTMLDivElement | null> {
  const codeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Reduced-motion / SSR: show everything immediately
      if (codeRef.current) {
        codeRef.current.textContent = codeText;
      }
      return;
    }

    let charIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;
    let started = false;

    const typeNext = (): void => {
      if (!codeRef.current) return;
      if (charIdx <= codeText.length) {
        codeRef.current.textContent = codeText.substring(0, charIdx) + '_';
        charIdx++;
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        timerId = setTimeout(typeNext, delay);
      } else {
        codeRef.current.textContent = codeText;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          typeNext();
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (codeRef.current) {
      observer.observe(codeRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timerId);
    };
  }, [codeText, minDelay, maxDelay, threshold, enabled]);

  return codeRef;
}

// ── Chat hook ─────────────────────────────────────────────────────────────────

interface UseChatSequenceOptions {
  count: number;
  delays: number[];
  initialOffset: number;
  enabled: boolean;
}

/**
 * Manages the staggered reveal of chat bubble elements.
 * Returns a ref to attach to the chat container; the hook queries its
 * children by index and adds a `data-visible` attribute to trigger CSS
 * transitions.
 */
export function useTypeWriterChat({
  count,
  delays,
  initialOffset,
  enabled,
}: UseChatSequenceOptions): MutableRefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    if (!enabled) {
      // Immediately show all bubbles
      const items = container.querySelectorAll<HTMLElement>('[data-chat-bubble]');
      items.forEach((el) => {
        el.setAttribute('data-visible', 'true');
      });
      return;
    }

    const timerIds: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < count; i++) {
      const delay = (delays[i] ?? 0) + initialOffset;
      const id = setTimeout(() => {
        const items = container.querySelectorAll<HTMLElement>('[data-chat-bubble]');
        const el = items[i];
        if (el) el.setAttribute('data-visible', 'true');
      }, delay);
      timerIds.push(id);
    }

    return () => {
      timerIds.forEach(clearTimeout);
    };
  }, [count, delays, initialOffset, enabled]);

  return containerRef;
}

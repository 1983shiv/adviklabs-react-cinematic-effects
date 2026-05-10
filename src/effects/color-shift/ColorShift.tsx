import { useRef } from 'react';
import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { ColorShiftProps } from './ColorShift.types';
import styles from './ColorShift.module.css';
import { useColorShift } from './useColorShift';
import type { ColorShiftEntry } from './useColorShift';

/**
 * ColorShift — Scroll-driven background and text colour transitions.
 *
 * Wrap page sections inside `<ColorShift>`. As each section scrolls into the
 * active viewport zone the container smoothly transitions to that section's
 * colour palette. Uses IntersectionObserver — no runtime dependencies.
 *
 * @example
 * ```tsx
 * import { ColorShift } from 'react-cinematic-effects';
 *
 * <ColorShift
 *   sections={[
 *     { bg: '#0a0a0b', text: '#eae7e2', children: <HeroSection /> },
 *     { bg: '#1a0d08', text: '#f0e8df', children: <WarmSection /> },
 *     { bg: '#081a12', text: '#dff0e8', children: <ForestSection /> },
 *   ]}
 * />
 * ```
 */
export function ColorShift({
  sections,
  transitionDuration = 800,
  transitionEasing = 'ease',
  triggerOffset = 0.4,
  sectionMinHeight = '100dvh',
  className,
  style,
  id,
}: ColorShiftProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  if (process.env.NODE_ENV !== 'production') {
    if (sections.length === 0) {
      console.warn(
        '[react-cinematic-effects] ColorShift: `sections` array is empty. ' +
          'Pass at least one section entry.',
      );
    }
    if (triggerOffset < 0 || triggerOffset >= 0.5) {
      console.warn(
        '[react-cinematic-effects] ColorShift: `triggerOffset` must be in the ' +
          'range [0, 0.49]. Value will be clamped.',
      );
    }
  }

  // Derive stable-shape entries for the hook (colours only — no ReactNode).
  const entries: ColorShiftEntry[] = sections.map(({ bg, text }) => ({ bg, text }));

  useColorShift(
    containerRef as React.RefObject<HTMLElement>,
    entries,
    triggerOffset,
    isClient,
  );

  // Seed colour for SSR / first paint — use the first section's palette.
  const seedBg = sections[0]?.bg ?? '#0a0a0b';
  const seedText = sections[0]?.text ?? '#eae7e2';

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        styles.container,
        reducedMotion && styles['container--reduced'],
        className,
      )}
      style={
        {
          '--rce-cs-duration': `${transitionDuration}ms`,
          '--rce-cs-easing': transitionEasing,
          '--rce-cs-section-min-height': sectionMinHeight,
          // Provide initial colours for SSR and first client paint.
          '--rce-cs-bg': seedBg,
          '--rce-cs-text': seedText,
          ...style,
        } as React.CSSProperties
      }
    >
      {sections.map((section, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          data-rce-cs-section=""
          className={styles.section}
        >
          {section.children}
        </div>
      ))}
    </div>
  );
}

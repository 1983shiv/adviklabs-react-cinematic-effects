import { useId } from 'react';
import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { CircularTextProps } from './CircularText.types';
import styles from './CircularText.module.css';
import { useCircularText } from './useCircularText';

/**
 * CircularText — Renders text along a rotating circular SVG path.
 *
 * Supports three animation modes: continuous CSS spin, scroll-reactive rotation,
 * or static. Optional centre slot accepts any React content.
 *
 * @example
 * ```tsx
 * import { CircularText } from 'react-cinematic-effects';
 *
 * <CircularText text="DESIGN • BUILD • SHIP • SCALE • " repeat={2} size={280}>
 *   <span>2026</span>
 * </CircularText>
 * ```
 */
export function CircularText({
  text,
  repeat = 1,
  radius = 120,
  size = 320,
  fontSize = 14,
  letterSpacing = '0.3em',
  textColor = 'currentColor',
  fontWeight = 500,
  spinDuration = 20,
  spinDirection = 'normal',
  mode = 'spin',
  scrollSensitivity = 0.5,
  children,
  className,
  style,
  id,
}: CircularTextProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  // Unique path id — safe for concurrent rendering
  const uid = useId();
  const pathId = `rce-ct-${uid.replace(/:/g, '')}`;

  // Disable all motion during SSR or when user prefers reduced motion
  const effectiveMode = !isClient || reducedMotion ? 'none' : mode;

  const svgRef = useCircularText(effectiveMode, scrollSensitivity);

  // Clamp radius to stay within the 300×300 viewBox
  const r = Math.min(Math.max(1, radius), 145);
  const d = `M150,150 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`;

  const displayText = Array.from(
    { length: Math.max(1, Math.round(repeat)) },
    () => text,
  ).join(' ');

  if (process.env.NODE_ENV !== 'production') {
    if (radius > 145) {
      console.warn(
        '[react-cinematic-effects] CircularText: `radius` exceeds 145 SVG units ' +
          'and will be clamped. The viewBox is 300×300 with centre at (150,150).',
      );
    }
  }

  return (
    <div
      id={id}
      className={cn(styles.wrap, className)}
      style={
        {
          '--rce-ct-size': `${size}px`,
          '--rce-ct-duration': `${spinDuration}s`,
          ...style,
        } as React.CSSProperties
      }
    >
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        aria-hidden="true"
        className={cn(styles.svg, effectiveMode === 'spin' && styles['svg--spin'])}
        style={effectiveMode === 'spin' ? { animationDirection: spinDirection } : undefined}
      >
        <defs>
          <path id={pathId} d={d} />
        </defs>
        <text fill={textColor} fontSize={fontSize} fontWeight={fontWeight} letterSpacing={letterSpacing}>
          <textPath href={`#${pathId}`}>{displayText}</textPath>
        </text>
      </svg>

      {children != null && <div className={styles.center}>{children}</div>}
    </div>
  );
}

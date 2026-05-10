import type { BaseEffectProps } from '../../core/types/common';

/** Animation mode for the circular text */
export type CircularTextMode = 'spin' | 'scroll' | 'none';

/** Rotation direction for spin mode */
export type SpinDirection = 'normal' | 'reverse';

export interface CircularTextProps extends BaseEffectProps {
  /** The text to render along the circular arc */
  text: string;

  /**
   * Number of times the text string is repeated to fill the circle.
   * Increase for short strings — default 1
   */
  repeat?: number;

  /**
   * Radius of the circular path in internal SVG units.
   * The viewBox is 300×300 with centre at (150,150); keep below 145 — default 120
   */
  radius?: number;

  /** Rendered width and height of the component in px — default 320 */
  size?: number;

  /** Font size of the arc text in SVG units — default 14 */
  fontSize?: number;

  /** CSS letter-spacing applied to the arc text — default '0.3em' */
  letterSpacing?: string;

  /** Text fill colour — default 'currentColor' */
  textColor?: string;

  /** Font weight of the arc text — default 500 */
  fontWeight?: number | string;

  /**
   * Duration of one full rotation in seconds (spin mode only).
   * Smaller = faster — default 20
   */
  spinDuration?: number;

  /** Rotation direction for spin mode — default 'normal' (clockwise) */
  spinDirection?: SpinDirection;

  /**
   * Animation mode:
   * - `'spin'`   — continuous CSS rotation (default)
   * - `'scroll'` — rotation driven by page-scroll delta
   * - `'none'`   — static, no animation
   */
  mode?: CircularTextMode;

  /**
   * Degrees of rotation added per pixel scrolled (scroll mode only) — default 0.5
   */
  scrollSensitivity?: number;

  /** Content rendered at the centre of the circle */
  children?: React.ReactNode;
}

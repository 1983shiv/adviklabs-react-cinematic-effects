import type { CSSProperties } from 'react';

/**
 * Base props that every effect component accepts.
 */
export interface BaseEffectProps {
  /** Additional CSS class on the container */
  className?: string;
  /** Inline style overrides on the container */
  style?: CSSProperties;
  /** Unique ID for the container element */
  id?: string;
}

/**
 * Standard transition configuration reusable across effects.
 */
export interface TransitionConfig {
  /** Duration in milliseconds */
  duration: number;
  /** CSS easing string (e.g., 'ease-out', 'cubic-bezier(...)') */
  easing: string;
  /** Delay in milliseconds before the transition starts */
  delay?: number;
}

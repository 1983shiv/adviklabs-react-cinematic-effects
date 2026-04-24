import type { CSSProperties, ReactNode } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Props for the ImageTrail component.
 */
export interface ImageTrailProps extends BaseEffectProps {
  /** Content to render inside the trail-enabled region */
  children: ReactNode;
  /** Array of image URLs. Trail items show images instead of solid colours */
  images?: string[];
  /** Array of CSS colour strings used when `images` is not provided */
  colors?: string[];
  /** Number of pre-allocated trail elements — default 20 */
  poolSize?: number;
  /** Minimum cursor travel (px) before spawning the next trail item — default 60 */
  threshold?: number;
  /** Width of each trail item in px — default 160 */
  trailWidth?: number;
  /** Height of each trail item in px — default 200 */
  trailHeight?: number;
  /** Border radius of trail items in px — default 10 */
  borderRadius?: number;
  /** Initial opacity of spawned trail items — default 0.85 */
  initialOpacity?: number;
  /** Duration (ms) of the fade-out animation — default 800 */
  fadeDuration?: number;
  /** Delay (ms) before fade begins — default 300 */
  staggerDelay?: number;
  /** Initial scale factor when trail item appears — default 0.8 */
  initialScale?: number;
  /** Random rotation range in degrees (±) — default 10 */
  rotationRange?: number;
  /** Whether to hide the native cursor inside the region — default true */
  hideCursor?: boolean;
  /** Render-prop for fully custom trail items */
  renderTrailItem?: (index: number, style: CSSProperties) => ReactNode;
}

/**
 * CSS custom property overrides for ImageTrail.
 */
export interface ImageTrailCSSVars extends CSSProperties {
  '--rce-it-width'?: string;
  '--rce-it-height'?: string;
  '--rce-it-radius'?: string;
}

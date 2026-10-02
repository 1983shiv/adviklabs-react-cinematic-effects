import type { CSSProperties } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Data for a single glitch card shown below the headline.
 */
export interface GlitchEffectItem {
  /** Unique identifier for the card */
  id: string;
  /** Card heading */
  title: string;
  /** Card body text */
  description?: string;
}

/**
 * Props for the GlitchEffect component.
 */
export interface GlitchEffectProps extends BaseEffectProps {
  /** Headline text that glitches (also used for the RGB-split pseudo-elements) */
  text: string;
  /**
   * When the glitch fires.
   * - `'hover'` fires controlled bursts on hover/focus (recommended — constant glitching is distracting).
   * - `'always'` loops the glitch animation continuously.
   * @default 'hover'
   */
  trigger?: 'hover' | 'always';
  /** Headline font size as a CSS value — default 'clamp(60px,12vw,160px)' */
  fontSize?: string;
  /** Headline font weight — default 800 */
  fontWeight?: number;
  /** Headline letter-spacing as a CSS value — default '-0.04em' */
  letterSpacing?: string;
  /** Headline text colour — default 'currentColor' */
  textColor?: string;
  /** Cyan channel colour for the top RGB-split layer — default '#00f0ff' */
  cyanColor?: string;
  /** Red channel colour for the bottom RGB-split layer — default '#ff3b3b' */
  redColor?: string;
  /** Muted colour for card descriptions — default '#5a5a5e' */
  mutedColor?: string;
  /** Card background colour — default 'transparent' */
  cardBackground?: string;
  /** Card border colour (turns to `redColor` on hover) — default '#1e1e22' */
  cardBorderColor?: string;
  /** Card border radius in px — default 14 */
  cardBorderRadius?: number;
  /** Duration of one RGB-split glitch loop in ms — default 400 */
  glitchDuration?: number;
  /** Duration of one card-title text jitter in ms — default 150 */
  textGlitchDuration?: number;
  /** Optional cards rendered below the headline */
  items?: GlitchEffectItem[];
  /** Show the CRT scanline overlay on card hover — default true */
  showScanlines?: boolean;
  /** Accessible label for the headline (defaults to `text`) */
  ariaLabel?: string;
}

/**
 * CSS custom property overrides applied via inline style.
 */
export interface GlitchEffectCSSVars extends CSSProperties {
  '--rce-ge-font-size'?: string;
  '--rce-ge-weight'?: string;
  '--rce-ge-spacing'?: string;
  '--rce-ge-color'?: string;
  '--rce-ge-cyan'?: string;
  '--rce-ge-red'?: string;
  '--rce-ge-muted'?: string;
  '--rce-ge-card-bg'?: string;
  '--rce-ge-card-border'?: string;
  '--rce-ge-card-radius'?: string;
  '--rce-ge-duration'?: string;
  '--rce-ge-text-duration'?: string;
}

import type { CSSProperties, ReactNode } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Data for a single coverflow card.
 */
export interface CoverflowItem {
  /** Unique identifier for the card */
  id: string;
  /** Card heading */
  title: string;
  /** Card sub-text shown below the title */
  description?: string;
  /**
   * CSS background for the card (colour, gradient, or image).
   * @example 'linear-gradient(135deg,#1a1a2e,#0a0a1a)'
   */
  background?: string;
}

/**
 * Props for the Coverflow component.
 */
export interface CoverflowProps extends BaseEffectProps {
  /** Array of card data to render */
  items: CoverflowItem[];
  /**
   * Index of the initially active (centred) card — default middle item.
   * Ignored when `activeIndex` is provided.
   */
  defaultActiveIndex?: number;
  /** Controlled active index (makes the component controlled) */
  activeIndex?: number;
  /** Callback fired when the active card changes */
  onActiveChange?: (index: number) => void;
  /** Card width in px — default 300 */
  itemWidth?: number;
  /** Card height in px — default 360 */
  itemHeight?: number;
  /** Horizontal offset per step away from centre in px — default 220 */
  offsetX?: number;
  /** Y-axis tilt applied to side cards in degrees — default 40 */
  tiltAngle?: number;
  /** Scale applied to non-active cards — default 0.8 */
  sideScale?: number;
  /**
   * How many cards are visible on each side of the active card — default 2.
   * Cards further away are hidden (opacity 0, non-interactive).
   */
  maxVisible?: number;
  /** Opacity falloff per step away from centre (0–1) — default 0.2 */
  fadeStep?: number;
  /** Brightness applied to non-active cards (0–1) — default 0.6 */
  dimBrightness?: number;
  /** 3D perspective depth in px — default 1200 */
  perspective?: number;
  /** Card border radius in px — default 20 */
  borderRadius?: number;
  /** Track (stage) height as a CSS value — default '400px' */
  trackHeight?: string;
  /** Transition duration in ms — default 600 */
  transitionDuration?: number;
  /** CSS easing string — default 'cubic-bezier(0.16, 1, 0.3, 1)' */
  transitionEasing?: string;
  /** Show prev/next navigation buttons — default true */
  showNavigation?: boolean;
  /** Accessible label for the previous button — default 'Previous card' */
  prevLabel?: string;
  /** Accessible label for the next button — default 'Next card' */
  nextLabel?: string;
  /** Custom renderer for a card — receives the item, its index, and active state */
  renderItem?: (item: CoverflowItem, index: number, isActive: boolean) => ReactNode;
}

/**
 * CSS custom property overrides applied via inline style.
 */
export interface CoverflowCSSVars extends CSSProperties {
  '--rce-c-perspective'?: string;
  '--rce-c-track-height'?: string;
  '--rce-c-item-width'?: string;
  '--rce-c-item-height'?: string;
  '--rce-c-radius'?: string;
  '--rce-c-duration'?: string;
  '--rce-c-easing'?: string;
}

import type { CSSProperties, ReactNode } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Data for a single sticky-stack item (feature card + paired visual).
 */
export interface StickyStackItem {
  /** Unique identifier */
  id: string;
  /** Small label/number displayed above the title (e.g. "01") */
  number?: string;
  /** Feature card heading */
  title: string;
  /** Feature card body text */
  description: string;
  /**
   * Content displayed in the sticky visual panel when this item is active.
   * Can be any ReactNode — an image, chart, illustration, etc.
   */
  visual: ReactNode;
}

/**
 * Props for the StickyStack component.
 */
export interface StickyStackProps extends BaseEffectProps {
  /** Array of feature items to render */
  items: StickyStackItem[];
  /**
   * CSS `top` value for the sticky visual panel.
   * Default: '100px'
   */
  stickyTop?: string;
  /**
   * Rootmargin passed to IntersectionObserver that determines when a card
   * is considered "in view" and becomes active. Negative values shrink the
   * detection zone towards the centre of the viewport.
   * Default: '-20% 0px -20% 0px'
   */
  activationMargin?: string;
  /**
   * Gap between feature cards in px.
   * Default: 40
   */
  cardGap?: number;
  /**
   * Opacity of inactive feature cards (0–1).
   * Default: 0.35
   */
  inactiveOpacity?: number;
  /**
   * Accent colour used for card highlights and number labels.
   * Default: '#4f46e5'
   */
  accentColor?: string;
  /**
   * Transition duration in ms for card & visual crossfade animations.
   * Default: 400
   */
  transitionDuration?: number;
  /**
   * Padding inside each feature card (CSS shorthand string).
   * Default: '40px 32px'
   */
  cardPadding?: string;
  /**
   * Minimum height of the visual panel in px.
   * Default: 340
   */
  visualMinHeight?: number;
  /**
   * Layout orientation.
   * - 'visual-left'  → sticky panel on left, cards on right (default)
   * - 'visual-right' → sticky panel on right, cards on left
   */
  visualSide?: 'visual-left' | 'visual-right';
  /** Callback fired whenever the active index changes */
  onActiveChange?: (index: number) => void;
}

/**
 * CSS custom-property bag applied inline on the root element.
 */
export interface StickyStackCSSVars extends CSSProperties {
  '--rce-ss-sticky-top'?: string;
  '--rce-ss-card-gap'?: string;
  '--rce-ss-inactive-opacity'?: string;
  '--rce-ss-accent'?: string;
  '--rce-ss-duration'?: string;
  '--rce-ss-card-padding'?: string;
  '--rce-ss-visual-min-height'?: string;
}

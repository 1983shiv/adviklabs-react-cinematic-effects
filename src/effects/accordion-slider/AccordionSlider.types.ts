import type { CSSProperties, ReactNode } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Data for a single accordion panel.
 */
export interface AccordionSliderItem {
  /** Unique identifier for the panel */
  id: string;
  /** URL for the panel background image */
  backgroundSrc: string;
  /** Label shown in collapsed state (displayed vertically in horizontal mode) */
  collapsedLabel?: string;
  /** Number/index label shown when expanded (e.g., "01") */
  number?: string;
  /** Title shown when the panel is expanded */
  title: string;
  /** Description text shown when expanded */
  description?: string;
}

/**
 * Props for the AccordionSlider component.
 */
export interface AccordionSliderProps extends BaseEffectProps {
  /** Array of panel data to render */
  items: AccordionSliderItem[];
  /** Layout orientation — default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Index of the initially active/expanded panel — default 0 */
  defaultActiveIndex?: number;
  /** Controlled active index (makes the component controlled) */
  activeIndex?: number;
  /** Callback fired when the active panel changes */
  onActiveChange?: (index: number) => void;
  /** Interaction trigger — default 'hover' */
  trigger?: 'hover' | 'click';
  /** Flex grow value for the expanded panel — default 5 */
  expandedFlex?: number;
  /** Gap between panels in px — default 8 */
  gap?: number;
  /** Border radius in px — default 16 */
  borderRadius?: number;
  /** Container height (CSS value) — default '70vh' */
  height?: string;
  /** Container min-height — default '400px' */
  minHeight?: string;
  /** Container max-height — default '600px' */
  maxHeight?: string;
  /** Collapsed panel height in vertical mode (CSS value) — default '60px' */
  collapsedHeight?: string;
  /** Expanded panel height in vertical mode (CSS value) — default '240px' */
  expandedHeight?: string;
  /** Transition duration in ms — default 600 */
  transitionDuration?: number;
  /** CSS easing string — default 'cubic-bezier(0.16, 1, 0.3, 1)' */
  transitionEasing?: string;
  /** Breakpoint (px) below which horizontal auto-switches to vertical stack — default 768 */
  mobileBreakpoint?: number;
  /** Render-prop for complete panel customisation */
  renderPanel?: (
    item: AccordionSliderItem,
    index: number,
    isActive: boolean,
  ) => ReactNode;
}

/**
 * Props for the internal AccordionPanel sub-component.
 */
export interface AccordionPanelProps {
  item: AccordionSliderItem;
  index: number;
  isActive: boolean;
  orientation: 'horizontal' | 'vertical';
  trigger: 'hover' | 'click';
  onActivate: (index: number) => void;
}

/**
 * CSS custom property overrides applied via inline style.
 */
export interface AccordionCSSVars extends CSSProperties {
  '--rce-as-gap'?: string;
  '--rce-as-radius'?: string;
  '--rce-as-height'?: string;
  '--rce-as-min-height'?: string;
  '--rce-as-max-height'?: string;
  '--rce-as-duration'?: string;
  '--rce-as-easing'?: string;
  '--rce-as-expanded-flex'?: string;
  '--rce-as-collapsed-height'?: string;
  '--rce-as-expanded-height'?: string;
}

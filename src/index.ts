/**
 * react-cinematic-effects
 *
 * Drop-in, extensible cinematic UI effect components for React.
 *
 * @packageDocumentation
 */

// ── Effects ──────────────────────────────────────
export { AccordionSlider } from './effects/accordion-slider';
export type {
  AccordionSliderProps,
  AccordionSliderItem,
} from './effects/accordion-slider';

export { ImageTrail } from './effects/image-trail';
export type { ImageTrailProps } from './effects/image-trail';

export { StickyStack } from './effects/sticky-stack';
export type {
  StickyStackProps,
  StickyStackItem,
} from './effects/sticky-stack';

// ── Core (advanced users / contributors) ─────────
export { useReducedMotion } from './core/hooks/useReducedMotion';
export { useIsClient } from './core/hooks/useIsClient';
export { usePoolManager } from './core/hooks/usePoolManager';
export { usePointerTracker } from './core/hooks/usePointerTracker';

export { cn } from './core/utils/cn';
export { clamp } from './core/utils/clamp';
export { mergeRefs } from './core/utils/mergeRefs';
export { distance } from './core/utils/distance';

export type { BaseEffectProps, TransitionConfig } from './core/types/common';

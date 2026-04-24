// Core hooks
export { useReducedMotion } from './hooks/useReducedMotion';
export { useIsClient } from './hooks/useIsClient';
export { usePoolManager } from './hooks/usePoolManager';
export { usePointerTracker } from './hooks/usePointerTracker';

// Core utilities
export { clamp } from './utils/clamp';
export { cn } from './utils/cn';
export { mergeRefs } from './utils/mergeRefs';
export { distance } from './utils/distance';

// Core types
export type { BaseEffectProps, TransitionConfig } from './types/common';
export type {
  PoolItem,
  UsePoolManagerOptions,
  UsePoolManagerReturn,
} from './hooks/usePoolManager';
export type { UsePointerTrackerOptions } from './hooks/usePointerTracker';

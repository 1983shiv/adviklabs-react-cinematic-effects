import { useRef } from 'react';
import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import { useImageTrail } from './useImageTrail';
import type { ImageTrailProps } from './ImageTrail.types';
import './image-trail.css';

/**
 * ImageTrail — A container where the cursor spawns images/colours that fade away.
 *
 * Wrap any content inside `<ImageTrail>` to add a cursor trail effect.
 * Uses a fixed-size DOM pool for performance — no DOM creation/destruction
 * during interaction.
 *
 * @example
 * ```tsx
 * import { ImageTrail } from 'react-cinematic-effects';
 *
 * <ImageTrail images={['/a.jpg', '/b.jpg']} threshold={50}>
 *   <h1>MOVE YOUR MOUSE</h1>
 * </ImageTrail>
 * ```
 */
export function ImageTrail({
  children,
  images,
  colors,
  poolSize = 20,
  threshold = 60,
  trailWidth = 160,
  trailHeight = 200,
  borderRadius = 10,
  initialOpacity = 0.85,
  fadeDuration = 800,
  staggerDelay = 300,
  initialScale = 0.8,
  rotationRange = 10,
  hideCursor = true,
  className,
  style,
  id,
}: ImageTrailProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Development warnings
  if (process.env.NODE_ENV !== 'production') {
    if (poolSize < 1) {
      console.warn(
        '[react-cinematic-effects] ImageTrail: `poolSize` must be >= 1.',
      );
    }
  }

  const { poolContainerRef } = useImageTrail({
    containerRef,
    poolSize,
    threshold,
    trailWidth,
    trailHeight,
    borderRadius,
    initialOpacity,
    fadeDuration,
    staggerDelay,
    initialScale,
    rotationRange,
    images,
    colors,
    enabled: isClient && !reducedMotion,
  });

  // SSR fallback — render children without the trail
  if (!isClient) {
    return (
      <div id={id} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn(
        'rce-it-container',
        hideCursor && 'rce-it-hide-cursor',
        className,
      )}
      style={style}
    >
      {children}
      {/* Pool container — trail items are appended here via DOM API */}
      <div ref={poolContainerRef} aria-hidden="true" />
    </div>
  );
}

import { useRef, useCallback, useEffect } from 'react';

const DEFAULT_COLORS = [
  '#a8748e',
  '#748ea8',
  '#8ea874',
  '#a8a074',
  '#74a8a0',
  '#a07448',
  '#7448a0',
  '#48a074',
];

export interface UseImageTrailOptions {
  /** Reference to the container element */
  containerRef: React.RefObject<HTMLElement>;
  /** Number of pre-allocated trail elements */
  poolSize: number;
  /** Minimum cursor travel (px) before spawning */
  threshold: number;
  /** Width of each trail item in px */
  trailWidth: number;
  /** Height of each trail item in px */
  trailHeight: number;
  /** Border radius in px */
  borderRadius: number;
  /** Initial opacity */
  initialOpacity: number;
  /** Fade-out duration in ms */
  fadeDuration: number;
  /** Delay before fade in ms */
  staggerDelay: number;
  /** Initial scale factor */
  initialScale: number;
  /** Random rotation range in degrees */
  rotationRange: number;
  /** Image URLs (optional) */
  images?: string[];
  /** Colour strings (optional, fallback if no images) */
  colors?: string[];
  /** Whether the trail is enabled */
  enabled: boolean;
}

/**
 * Manages an image trail effect using a DOM element pool.
 *
 * Creates actual DOM elements (not React elements) for performance —
 * position updates bypass React reconciliation.
 *
 * Returns a cleanup function and the pool container element.
 */
export function useImageTrail(options: UseImageTrailOptions): {
  /** Ref to assign to the pool container (portal for trail items) */
  poolContainerRef: React.RefObject<HTMLDivElement>;
} {
  const {
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
    colors = DEFAULT_COLORS,
    enabled,
  } = options;

  const poolContainerRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement[]>([]);
  const indexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Create / teardown pool elements
  useEffect(() => {
    if (!enabled) return;

    const poolContainer = poolContainerRef.current;
    if (!poolContainer) return;

    // Clear existing
    poolContainer.innerHTML = '';
    poolRef.current = [];

    // Create pool items
    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '1';
      el.style.willChange = 'transform, opacity';
      el.style.opacity = '0';
      el.style.width = `${trailWidth}px`;
      el.style.height = `${trailHeight}px`;
      el.style.borderRadius = `${borderRadius}px`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.setAttribute('aria-hidden', 'true');

      if (images && images.length > 0) {
        el.style.backgroundImage = `url(${images[i % images.length]})`;
      } else {
        el.style.backgroundColor = colors[i % colors.length];
      }

      poolContainer.appendChild(el);
      poolRef.current.push(el);
    }

    return () => {
      if (poolContainer) {
        poolContainer.innerHTML = '';
      }
      poolRef.current = [];
    };
  }, [enabled, poolSize, trailWidth, trailHeight, borderRadius, images, colors]);

  // Spawn a trail item at the given position
  const spawnTrail = useCallback(
    (x: number, y: number) => {
      const pool = poolRef.current;
      if (pool.length === 0) return;

      const el = pool[indexRef.current % poolSize];
      indexRef.current += 1;

      const rotation = Math.random() * rotationRange * 2 - rotationRange;
      const fadeRotation =
        Math.random() * rotationRange * 3 - rotationRange * 1.5;

      // Reset — instant positioning
      el.style.transition = 'none';
      el.style.left = `${x - trailWidth / 2}px`;
      el.style.top = `${y - trailHeight / 2}px`;
      el.style.opacity = String(initialOpacity);
      el.style.transform = `scale(${initialScale}) rotate(${rotation}deg)`;

      // Force reflow so the browser registers the "from" state
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;

      // Apply fade-out transition
      el.style.transition = `opacity ${fadeDuration}ms ease ${staggerDelay}ms, transform ${fadeDuration}ms ease`;
      el.style.opacity = '0';
      el.style.transform = `scale(${initialScale * 0.75}) rotate(${fadeRotation}deg)`;
    },
    [
      poolSize,
      trailWidth,
      trailHeight,
      initialOpacity,
      initialScale,
      rotationRange,
      fadeDuration,
      staggerDelay,
    ],
  );

  // Pointer tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > threshold) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        spawnTrail(e.clientX, e.clientY);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [containerRef, enabled, threshold, spawnTrail]);

  return { poolContainerRef };
}

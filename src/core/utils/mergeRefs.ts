import type { Ref, RefCallback, MutableRefObject } from 'react';

/**
 * Combines multiple refs (callback refs and RefObjects) into a single callback ref.
 * Useful when a component needs to forward a ref AND use its own internal ref.
 *
 * @example
 * const Component = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
 *   const internalRef = useRef<HTMLDivElement>(null);
 *   return <div ref={mergeRefs(forwardedRef, internalRef)} />;
 * });
 */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
  };
}

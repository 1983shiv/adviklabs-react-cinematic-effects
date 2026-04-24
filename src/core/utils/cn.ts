/**
 * Merges CSS class names, filtering out falsy values.
 *
 * @example
 * cn('foo', false && 'bar', 'baz') // => 'foo baz'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

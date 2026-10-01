import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import { useCoverflow } from './useCoverflow';
import type { CoverflowProps, CoverflowCSSVars } from './Coverflow.types';
import styles from './Coverflow.module.css';

/**
 * Coverflow — A 3D carousel where the active card is front and centre
 * and flanking cards tilt away in perspective.
 *
 * Click arrows or cards to navigate. Pure React state — no browser APIs
 * beyond the SSR/reduced-motion guards.
 *
 * @example
 * ```tsx
 * import { Coverflow } from 'react-cinematic-effects';
 *
 * <Coverflow
 *   items={[
 *     { id: '1', title: 'Brand Identity', description: 'Logo, type, colour system' },
 *     { id: '2', title: 'Website', description: 'Responsive, animated, fast' },
 *   ]}
 * />
 * ```
 */
export function Coverflow({
  items,
  defaultActiveIndex,
  activeIndex,
  onActiveChange,
  itemWidth = 300,
  itemHeight = 360,
  offsetX = 220,
  tiltAngle = 40,
  sideScale = 0.8,
  maxVisible = 2,
  fadeStep = 0.2,
  dimBrightness = 0.6,
  perspective = 1200,
  borderRadius = 20,
  trackHeight = '400px',
  transitionDuration = 600,
  transitionEasing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  showNavigation = true,
  prevLabel = 'Previous card',
  nextLabel = 'Next card',
  className,
  style,
  id,
  renderItem,
}: CoverflowProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  const { activeIdx, goTo, move } = useCoverflow({
    itemCount: items.length,
    defaultActiveIndex,
    activeIndex,
    onActiveChange,
  });

  // Development warnings
  if (process.env.NODE_ENV !== 'production') {
    if (items.length === 0) {
      console.warn('[react-cinematic-effects] Coverflow: `items` array is empty.');
    }
    if (maxVisible < 0) {
      console.warn('[react-cinematic-effects] Coverflow: `maxVisible` should be >= 0.');
    }
  }

  const cssVars: CoverflowCSSVars = {
    '--rce-c-perspective': `${perspective}px`,
    '--rce-c-track-height': trackHeight,
    '--rce-c-item-width': `${itemWidth}px`,
    '--rce-c-item-height': `${itemHeight}px`,
    '--rce-c-radius': `${borderRadius}px`,
    '--rce-c-duration': !isClient || reducedMotion ? '0ms' : `${transitionDuration}ms`,
    '--rce-c-easing': transitionEasing,
    ...style,
  };

  // SSR fallback — render a simple static list (no 3D state)
  if (!isClient) {
    return (
      <div id={id} className={cn(styles.root, className)} style={cssVars}>
        <div className={styles.staticList}>
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.staticItem}
              style={item.background ? { background: item.background } : undefined}
            >
              {renderItem ? (
                renderItem(item, 0, false)
              ) : (
                <>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Reduced-motion fallback — static list with navigation, no 3D tilt or animation
  if (reducedMotion) {
    return (
      <div id={id} className={cn(styles.root, className)} style={cssVars}>
        <div className={styles.staticList} role="list">
          {items.map((item, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={item.id}
                role="listitem"
                aria-current={isActive || undefined}
                className={cn(styles.staticItem, isActive && styles.staticItemActive)}
                style={item.background ? { background: item.background } : undefined}
                onClick={() => goTo(index)}
              >
                {renderItem ? (
                  renderItem(item, index, isActive)
                ) : (
                  <>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {showNavigation && items.length > 1 && (
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navButton}
              aria-label={prevLabel}
              disabled={activeIdx <= 0}
              onClick={() => move(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navButton}
              aria-label={nextLabel}
              disabled={activeIdx >= items.length - 1}
              onClick={() => move(1)}
            >
              →
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id={id} className={cn(styles.root, className)} style={cssVars}>
      <div className={styles.track} role="listbox" aria-label="Coverflow carousel">
        {items.map((item, index) => {
          const off = index - activeIdx;
          const absOff = Math.abs(off);
          const isActive = off === 0;
          const isHidden = absOff > maxVisible;

          const tx = off * offsetX;
          const ry = off < 0 ? tiltAngle : off > 0 ? -tiltAngle : 0;
          const sc = isActive ? 1 : sideScale;
          const z = isActive ? 10 : 10 - absOff;
          const op = isHidden ? 0 : Math.max(0, 1 - absOff * fadeStep);

          return (
            <div
              key={item.id}
              role="option"
              aria-selected={isActive}
              aria-hidden={isHidden || undefined}
              tabIndex={isHidden ? -1 : 0}
              className={cn(styles.item, isHidden && styles.itemHidden)}
              style={{
                background: item.background,
                transform: `translateX(${tx}px) rotateY(${ry}deg) scale(${sc})`,
                zIndex: z,
                opacity: op,
                filter: isActive ? 'brightness(1)' : `brightness(${dimBrightness})`,
              }}
              onClick={() => goTo(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goTo(index);
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  move(-1);
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  move(1);
                }
              }}
            >
              {renderItem ? (
                renderItem(item, index, isActive)
              ) : (
                <>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                </>
              )}
            </div>
          );
        })}
      </div>

      {showNavigation && items.length > 1 && (
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            aria-label={prevLabel}
            disabled={activeIdx <= 0}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label={nextLabel}
            disabled={activeIdx >= items.length - 1}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

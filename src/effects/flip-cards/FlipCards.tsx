import { useState, useCallback } from 'react'
import { useIsClient } from "../../core/hooks/useIsClient"
import { useReducedMotion } from "../../core/hooks/useReducedMotion"
import {cn} from "../../core/utils/cn"
import type { FlipCardsProps, FlipCardItem, FlipCardsCSSVars} from "./FlipCards.types"
import styles from "./FlipCards.module.css"
import "./flip-cards.css"

/**
 * FlipCards — A responsive grid of 3D flip cards that reveal back content on hover or click.
 *
 * @example
 * ```tsx
 * import { FlipCards } from 'react-cinematic-effects';
 *
 * <FlipCards
 *   items={[
 *     { id: '1', icon: '▲', title: 'Strategy', subtitle: 'Market fit', description: 'Deep research first.' },
 *     { id: '2', icon: '◆', title: 'Design',   subtitle: 'UX & UI',    description: 'Designed in the browser.' },
 *   ]}
 *   trigger="hover"
 * />
 * ``` 
 */

export function FlipCards({
    items,
    trigger = 'hover',
    cardHeight = '320px',
    perspective = 800,
    borderRadius = 20,
    gap = 20,
    minColumnWidth = '260px',
    columns,
    className,
    style,
    id,
    renderFront,
    renderBack,
    transitionDuration = 600,
    transitionEasing = 'cubic-bezzier(0.16, 1, 0.3, 1)',
}: FlipCardsProps){
    const isClient = useIsClient();
    const reducedMotion = useReducedMotion()
    const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set())

    const handleToggle = useCallback((itemId: string) => {
        setFlippedIds((prev) => {
            const next = new Set(prev);
            if(next.has(itemId)) {
                next.delete(itemId);
            } else {
                next.add(itemId);
            }
            return next;
        })
    }, []);

    if (process.env.NODE_ENV !== 'production'){
        if(items.length === 0){
            console.warn(`[react-cinematic-effects] FlipCards: 'item' array is empty`);
        }
    }
    
    const cssVars: FlipCardsCSSVars = {
    '--rce-fc-perspective': `${perspective}px`,
    '--rce-fc-height': cardHeight,
    '--rce-fc-radius': `${borderRadius}px`,
    '--rce-fc-gap': `${gap}px`,
    '--rce-fc-duration': reducedMotion ? '0ms' : `${transitionDuration}ms`,
    '--rce-fc-easing': transitionEasing,
    '--rce-fc-columns': columns ?? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
    ...style,
  };

  const isClickable = trigger === 'click' || trigger === 'both';
  const isHoverEnabled = trigger === 'hover' || trigger === 'both';

  // SSR: render front face only — no 3D state, no interaction
  if (!isClient) {
    return (
      <div id={id} className={cn(styles.grid, className)} style={cssVars}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.inner}>
              <div
                className={styles.front}
                style={item.frontBackground ? { background: item.frontBackground } : undefined}
              >
                {renderFront ? renderFront(item, 0) : <DefaultFront item={item} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id={id} className={cn(styles.grid, className)} style={cssVars}>
      {items.map((item, index) => {
        const isFlipped = flippedIds.has(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              styles.card,
              isHoverEnabled && styles.hoverEnabled,
              isFlipped && styles.flipped,
            )}
            onClick={isClickable ? () => handleToggle(item.id) : undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-pressed={isClickable ? isFlipped : undefined}
            onKeyDown={
              isClickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(item.id);
                    }
                  }
                : undefined
            }
          >
            <div className={styles.inner}>
              <div
                className={styles.front}
                style={item.frontBackground ? { background: item.frontBackground } : undefined}
              >
                {renderFront ? renderFront(item, index) : <DefaultFront item={item} />}
              </div>
              <div
                className={styles.back}
                style={item.backBackground ? { background: item.backBackground } : undefined}
              >
                {renderBack ? renderBack(item, index) : <DefaultBack item={item} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Default slot renderers ────────────────────────────────────────────────────

function DefaultFront({ item }: { item: FlipCardItem }) {
  return (
    <>
      {item.icon && <div className={styles.icon}>{item.icon}</div>}
      <h3 className={styles.frontTitle}>{item.title}</h3>
      {item.subtitle && <p className={styles.frontSubtitle}>{item.subtitle}</p>}
    </>
  );
}

function DefaultBack({ item }: { item: FlipCardItem }) {
  return (
    <>
      <h3 className={styles.backTitle}>{item.backTitle ?? item.title}</h3>
      {item.description && <p className={styles.backDescription}>{item.description}</p>}
      {item.linkLabel && <span className={styles.backLink}>{item.linkLabel}</span>}
    </>
  );
}
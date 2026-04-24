import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import { useStickyStack } from './useStickyStack';
import type { StickyStackProps, StickyStackCSSVars } from './StickyStack.types';
import './sticky-stack.css';

/**
 * StickyStack — A two-column scroll-driven feature section.
 *
 * The left (or right) column contains a sticky panel whose content crossfades
 * as the user scrolls through feature cards on the other side.
 * Implements the "sticky product + scrolling benefits" pattern popularised by
 * Stripe, Linear and Apple — zero external dependencies, pure CSS transitions.
 *
 * @example
 * ```tsx
 * import { StickyStack } from 'react-cinematic-effects';
 *
 * <StickyStack
 *   items={[
 *     {
 *       id: '1',
 *       number: '01',
 *       title: 'Real-time monitoring',
 *       description: 'Track uptime, latency, and error rates.',
 *       visual: <img src="/feature-1.png" alt="" />,
 *     },
 *   ]}
 * />
 * ```
 */
export function StickyStack({
  items,
  stickyTop = '100px',
  activationMargin = '-20% 0px -20% 0px',
  cardGap = 40,
  inactiveOpacity = 0.35,
  accentColor = '#4f46e5',
  transitionDuration = 400,
  cardPadding = '40px 32px',
  visualMinHeight = 340,
  visualSide = 'visual-left',
  onActiveChange,
  className,
  style,
  id,
}: StickyStackProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  const { activeIndex, cardRefs } = useStickyStack({
    itemCount: items.length,
    activationMargin,
    onActiveChange,
    enabled: isClient,
  });

  // Development warnings
  if (process.env.NODE_ENV !== 'production') {
    if (items.length === 0) {
      console.warn(
        '[react-cinematic-effects] StickyStack: `items` array is empty.',
      );
    }
  }

  const cssVars: StickyStackCSSVars = {
    '--rce-ss-sticky-top': stickyTop,
    '--rce-ss-card-gap': `${cardGap}px`,
    '--rce-ss-inactive-opacity': String(inactiveOpacity),
    '--rce-ss-accent': accentColor,
    '--rce-ss-duration': reducedMotion ? '0ms' : `${transitionDuration}ms`,
    '--rce-ss-card-padding': cardPadding,
    '--rce-ss-visual-min-height': `${visualMinHeight}px`,
    ...style,
  };

  // SSR fallback: render all items stacked, no interactivity
  if (!isClient) {
    return (
      <div id={id} className={cn('rce-ss-root', className)} style={style}>
        {items.map((item) => (
          <div key={item.id}>
            <div>{item.visual}</div>
            <div>
              {item.number && <span>{item.number}</span>}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const visualCol = (
    <div className="rce-ss-visual-col">
      <div className="rce-ss-visual-panel">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              'rce-ss-visual-state',
              i === activeIndex && 'rce-ss-visual-active',
            )}
            aria-hidden={i !== activeIndex}
          >
            {item.visual}
          </div>
        ))}
      </div>
    </div>
  );

  const cardsCol = (
    <div className="rce-ss-cards-col">
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={cardRefs[i]}
          className={cn('rce-ss-card', i === activeIndex && 'rce-ss-card-active')}
          role="region"
          aria-label={item.title}
        >
          {item.number && (
            <div className="rce-ss-card-number">{item.number}</div>
          )}
          <h3 className="rce-ss-card-title">{item.title}</h3>
          <p className="rce-ss-card-description">{item.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div
      id={id}
      className={cn('rce-ss-root', className)}
      style={cssVars}
    >
      <div
        className={cn(
          'rce-ss-grid',
          visualSide === 'visual-right' && 'rce-ss-visual-right',
        )}
      >
        {visualSide === 'visual-left' ? (
          <>
            {visualCol}
            {cardsCol}
          </>
        ) : (
          <>
            {cardsCol}
            {visualCol}
          </>
        )}
      </div>
    </div>
  );
}

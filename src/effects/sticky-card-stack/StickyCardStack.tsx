import { useId } from 'react';
import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { StickyCardStackProps } from './StickyCardStack.types';
import styles from './StickyCardStack.module.css';
import { useStickyCardStack } from './useStickyCardStack';

const DEFAULT_PALETTE: { bg: string; text: string }[] = [
  { bg: '#1a1a1f', text: '#eae7e2' },
  { bg: '#2d4a3e', text: '#e8f0ec' },
  { bg: '#4a3a2d', text: '#f0ece8' },
  { bg: '#2d3a4a', text: '#e8ecf0' },
  { bg: '#ffffff', text: '#1a1a1f' },
];

export function StickyCardStack({
  items,
  sectionLabel = 'Our process',
  stickyTop = 100,
  initialTopOffset = 80,
  peekOffset = 20,
  cardMinHeight = 320,
  cardBorderRadius = 24,
  cardPadding = '48px 40px',
  cardMarginBottom = 32,
  cardShadow = '0 20px 60px rgba(0,0,0,0.06)',
  scaleOnScroll = true,
  scaledScale = 0.95,
  scaledOpacity = 0.6,
  className,
  style,
  id,
}: StickyCardStackProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  const uid = useId();
  const labelId = `rce-scs-label-${uid.replace(/:/g, '')}`;

  const effectiveScaleOnScroll = !isClient || reducedMotion ? false : scaleOnScroll;

  const { setCardRef, cardProgress } = useStickyCardStack(
    items.length,
    effectiveScaleOnScroll,
    scaledScale,
    scaledOpacity,
    stickyTop,
  );

  if (process.env.NODE_ENV !== 'production') {
    if (items.length === 0) {
      console.warn(
        '[react-cinematic-effects] StickyCardStack: `items` array is empty. Nothing will render.',
      );
    }
  }

  return (
    <section
      id={id}
      className={cn(styles.section, className)}
      style={
        {
          '--rce-scs-card-min-height': `${cardMinHeight}px`,
          '--rce-scs-card-radius': `${cardBorderRadius}px`,
          '--rce-scs-card-padding': cardPadding,
          '--rce-scs-card-margin': `${cardMarginBottom}px`,
          '--rce-scs-card-shadow': cardShadow,
          ...style,
        } as React.CSSProperties
      }
    >
      {sectionLabel && (
        <div className={styles.label} id={labelId}>
          {sectionLabel}
        </div>
      )}

      <div className={styles.stack} role="list" aria-labelledby={labelId}>
        {items.map((item, index) => {
          const palette = DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
          const bg = item.bgColor ?? palette.bg;
          const text = item.textColor ?? palette.text;
          const progress = cardProgress[index] ?? { scale: 1, opacity: 1 };

          const top = initialTopOffset + peekOffset * index;

          return (
            <div
              key={item.id}
              ref={setCardRef(index)}
              role="listitem"
              className={cn(
                styles.card,
                index === items.length - 1 && styles['card--last'],
              )}
              style={{
                top: `${top}px`,
                background: bg,
                color: text,
                transform: `scale(${progress.scale})`,
                opacity: progress.opacity,
                zIndex: index + 1,
              }}
            >
              <div className={styles.cardNum}>{item.number}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

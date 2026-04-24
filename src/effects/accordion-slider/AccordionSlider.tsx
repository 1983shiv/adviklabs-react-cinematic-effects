import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import { useAccordionSlider } from './useAccordionSlider';
import { AccordionPanel } from './AccordionPanel';
import type {
  AccordionSliderProps,
  AccordionCSSVars,
} from './AccordionSlider.types';
import './accordion-slider.css';

/**
 * AccordionSlider — A row (or column) of narrow image panels that expand on hover/click.
 *
 * @example
 * ```tsx
 * import { AccordionSlider } from 'react-cinematic-effects';
 *
 * <AccordionSlider
 *   items={[
 *     { id: '1', backgroundSrc: '/img/a.jpg', title: 'Strategy', collapsedLabel: 'Strategy' },
 *     { id: '2', backgroundSrc: '/img/b.jpg', title: 'Design', collapsedLabel: 'Design' },
 *   ]}
 *   orientation="horizontal"
 * />
 * ```
 */
export function AccordionSlider({
  items,
  orientation = 'horizontal',
  defaultActiveIndex = 0,
  activeIndex,
  onActiveChange,
  trigger = 'hover',
  expandedFlex = 5,
  gap = 8,
  borderRadius = 16,
  height = '70vh',
  minHeight = '400px',
  maxHeight = '600px',
  collapsedHeight = '60px',
  expandedHeight = '240px',
  transitionDuration = 600,
  transitionEasing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  className,
  style,
  id,
  renderPanel,
}: AccordionSliderProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  const { activeIdx, handleActivate } = useAccordionSlider({
    itemCount: items.length,
    defaultActiveIndex,
    activeIndex,
    onActiveChange,
  });

  // Development warnings
  if (process.env.NODE_ENV !== 'production') {
    if (items.length === 0) {
      console.warn(
        '[react-cinematic-effects] AccordionSlider: `items` array is empty.',
      );
    }
  }

  const cssVars: AccordionCSSVars = {
    '--rce-as-gap': `${gap}px`,
    '--rce-as-radius': `${borderRadius}px`,
    '--rce-as-height': height,
    '--rce-as-min-height': minHeight,
    '--rce-as-max-height': maxHeight,
    '--rce-as-duration': reducedMotion ? '0ms' : `${transitionDuration}ms`,
    '--rce-as-easing': transitionEasing,
    '--rce-as-expanded-flex': String(expandedFlex),
    '--rce-as-collapsed-height': collapsedHeight,
    '--rce-as-expanded-height': expandedHeight,
    ...style,
  };

  // SSR fallback — render a simple list
  if (!isClient) {
    return (
      <div id={id} className={className} style={style}>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      id={id}
      className={cn(
        'rce-as-accordion',
        orientation === 'vertical' && 'rce-as-vertical',
        className,
      )}
      role="tablist"
      aria-label="Accordion slider"
      style={cssVars}
    >
      {items.map((item, i) =>
        renderPanel ? (
          renderPanel(item, i, activeIdx === i)
        ) : (
          <AccordionPanel
            key={item.id}
            item={item}
            index={i}
            isActive={activeIdx === i}
            orientation={orientation}
            trigger={trigger}
            onActivate={handleActivate}
          />
        ),
      )}
    </div>
  );
}

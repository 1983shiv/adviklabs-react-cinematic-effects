import { useCallback } from 'react';
import { cn } from '../../core/utils/cn';
import type { AccordionPanelProps } from './AccordionSlider.types';
import './accordion-slider.css';

/**
 * A single panel within the AccordionSlider.
 *
 * Renders the background image, gradient overlay, collapsed label,
 * and expanded content (number, title, description).
 */
export function AccordionPanel({
  item,
  index,
  isActive,
  orientation,
  trigger,
  onActivate,
}: AccordionPanelProps) {
  const handleClick = useCallback(() => {
    onActivate(index);
  }, [index, onActivate]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      onActivate(index);
    }
  }, [index, trigger, onActivate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate(index);
      }
    },
    [index, onActivate],
  );

  return (
    <div
      className={cn('rce-as-panel', isActive && 'rce-as-panel-active')}
      role="tab"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={item.title}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
    >
      {/* Background image */}
      <div
        className="rce-as-bg"
        style={{ backgroundImage: `url(${item.backgroundSrc})` }}
      />

      {/* Gradient overlay */}
      <div className="rce-as-overlay" />

      {/* Collapsed label */}
      {item.collapsedLabel && (
        <div className="rce-as-collapsed-label">{item.collapsedLabel}</div>
      )}

      {/* Expanded content */}
      <div className="rce-as-content">
        {item.number && <div className="rce-as-number">{item.number}</div>}
        <div className="rce-as-title">{item.title}</div>
        {item.description && (
          <div className="rce-as-description">{item.description}</div>
        )}
      </div>
    </div>
  );
}

import { useState, useCallback } from 'react';

export interface UseAccordionSliderOptions {
  /** Total number of panels */
  itemCount: number;
  /** Initial active index for uncontrolled mode */
  defaultActiveIndex?: number;
  /** Controlled active index — overrides internal state */
  activeIndex?: number;
  /** Callback when active panel changes */
  onActiveChange?: (index: number) => void;
}

export interface UseAccordionSliderReturn {
  /** Current active panel index */
  activeIdx: number;
  /** Handler to activate a panel by index */
  handleActivate: (index: number) => void;
}

/**
 * Encapsulates AccordionSlider state logic.
 * Supports both controlled and uncontrolled modes.
 */
export function useAccordionSlider(
  options: UseAccordionSliderOptions,
): UseAccordionSliderReturn {
  const {
    defaultActiveIndex = 0,
    activeIndex,
    onActiveChange,
  } = options;

  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);

  // Controlled mode: use `activeIndex` prop; Uncontrolled: use internal state
  const activeIdx = activeIndex ?? internalIndex;

  const handleActivate = useCallback(
    (index: number) => {
      if (activeIndex === undefined) {
        setInternalIndex(index);
      }
      onActiveChange?.(index);
    },
    [activeIndex, onActiveChange],
  );

  return { activeIdx, handleActivate };
}

import type { BaseEffectProps } from '../../core/types/common';

export interface StickyCardStackItem {
  /** Unique identifier */
  id: string;
  /** Step number label (e.g. 'Step 01') */
  number: string;
  /** Card heading */
  title: string;
  /** Card body text */
  description: string;
  /** Background colour for this card — default auto-assigned from palette */
  bgColor?: string;
  /** Text colour for this card — default auto-assigned from palette */
  textColor?: string;
}

export interface StickyCardStackProps extends BaseEffectProps {
  /** Card data items — required */
  items: StickyCardStackItem[];

  /** Label shown above the card stack — default 'Our process' */
  sectionLabel?: string;

  /** CSS top value for sticky positioning in px — default 100 */
  stickyTop?: number;

  /** Base top offset for the first card in px — default 80 */
  initialTopOffset?: number;

  /** Additional top offset added per card in px — default 20 */
  peekOffset?: number;

  /** Minimum card height in px — default 320 */
  cardMinHeight?: number;

  /** Card border radius in px — default 24 */
  cardBorderRadius?: number;

  /** Card padding shorthand — default '48px 40px' */
  cardPadding?: string;

  /** Margin-bottom on each card in px — default 32 */
  cardMarginBottom?: number;

  /** Box-shadow value — default '0 20px 60px rgba(0,0,0,0.06)' */
  cardShadow?: string;

  /** Whether covered cards scale down on scroll — default true */
  scaleOnScroll?: boolean;

  /** Scale factor for covered cards — default 0.95 */
  scaledScale?: number;

  /** Opacity for covered cards — default 0.6 */
  scaledOpacity?: number;
}

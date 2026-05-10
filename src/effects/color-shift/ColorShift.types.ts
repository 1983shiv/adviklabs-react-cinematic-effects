import type { BaseEffectProps } from '../../core/types/common';

/** A single section entry with its colour palette */
export interface ColorShiftSection {
  /** Background colour for this section (any valid CSS colour string) */
  bg: string;
  /** Foreground / text colour for this section */
  text: string;
  /** Section content */
  children: React.ReactNode;
}

export interface ColorShiftProps extends BaseEffectProps {
  /**
   * Ordered list of sections. Each section declares its own background and
   * text colour. The container transitions between palettes as the user scrolls.
   */
  sections: ColorShiftSection[];

  /**
   * Duration of the background/text-colour transition in milliseconds — default 800
   */
  transitionDuration?: number;

  /**
   * CSS easing function applied to the colour transition — default 'ease'
   */
  transitionEasing?: string;

  /**
   * Fraction of the viewport (0–0.49) used as dead-band at top and bottom
   * before a section is considered "active". Mirrors GSAP's `start:'top 60%'`
   * behaviour when set to 0.4 (the default).
   *
   * Example: 0.4 → active zone is the central 20 % of the viewport.
   */
  triggerOffset?: number;

  /**
   * CSS `min-height` value applied to every section wrapper — default '100dvh'
   */
  sectionMinHeight?: string;
}

import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { GlitchEffectProps, GlitchEffectCSSVars } from './GlitchEffect.types';
import styles from './GlitchEffect.module.css';

/**
 * GlitchEffect — RGB channel split on hover. Digital distortion.
 *
 * A large uppercase headline whose cyan/red channel copies slice apart via
 * `clip-path` + `translate` keyframes. The glitch fires in controlled bursts
 * on hover/focus (or loops continuously with `trigger="always"`). Optional
 * info cards below add a text-jitter + CRT scanline hover treatment.
 * Pure CSS — no canvas, no JavaScript animation.
 *
 * @example
 * ```tsx
 * import { GlitchEffect } from 'react-cinematic-effects';
 *
 * <GlitchEffect
 *   text="GLITCH"
 *   items={[
 *     { id: '1', title: 'Cyberpunk aesthetic', description: 'RGB channel splitting with clip-path.' },
 *     { id: '2', title: 'Hover-triggered', description: 'Controlled bursts create drama.' },
 *   ]}
 * />
 * ```
 */
export function GlitchEffect({
  text,
  trigger = 'hover',
  fontSize = 'clamp(60px,12vw,160px)',
  fontWeight = 800,
  letterSpacing = '-0.04em',
  textColor = 'currentColor',
  cyanColor = '#00f0ff',
  redColor = '#ff3b3b',
  mutedColor = '#5a5a5e',
  cardBackground = 'transparent',
  cardBorderColor = '#1e1e22',
  cardBorderRadius = 14,
  glitchDuration = 400,
  textGlitchDuration = 150,
  items,
  showScanlines = true,
  ariaLabel,
  className,
  style,
  id,
}: GlitchEffectProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  // Development warnings
  if (process.env.NODE_ENV !== 'production') {
    if (!text || text.trim().length === 0) {
      console.warn('[react-cinematic-effects] GlitchEffect: `text` is empty.');
    }
    if (glitchDuration <= 0) {
      console.warn('[react-cinematic-effects] GlitchEffect: `glitchDuration` should be > 0.');
    }
  }

  const cssVars: GlitchEffectCSSVars = {
    '--rce-ge-font-size': fontSize,
    '--rce-ge-weight': `${fontWeight}`,
    '--rce-ge-spacing': letterSpacing,
    '--rce-ge-color': textColor,
    '--rce-ge-cyan': cyanColor,
    '--rce-ge-red': redColor,
    '--rce-ge-muted': mutedColor,
    '--rce-ge-card-bg': cardBackground,
    '--rce-ge-card-border': cardBorderColor,
    '--rce-ge-card-radius': `${cardBorderRadius}px`,
    '--rce-ge-duration': reducedMotion ? '0ms' : `${glitchDuration}ms`,
    '--rce-ge-text-duration': reducedMotion ? '0ms' : `${textGlitchDuration}ms`,
    ...style,
  };

  const label = ariaLabel ?? text;

  // SSR fallback — static headline + cards, no pseudo-element animation
  if (!isClient) {
    return (
      <div id={id} className={cn(styles.root, className)} style={cssVars}>
        <div className={styles.staticStage}>
          <p className={styles.staticText}>{text}</p>
        </div>
        {items && items.length > 0 && (
          <div className={styles.staticGrid}>
            {items.map((item) => (
              <div key={item.id} className={styles.staticCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.description && <p className={styles.cardDesc}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Reduced-motion fallback — static headline + cards, no glitch animation
  if (reducedMotion) {
    return (
      <div id={id} className={cn(styles.root, className)} style={cssVars}>
        <div className={styles.staticStage}>
          <p className={styles.staticText} role="heading" aria-level={2} aria-label={label}>
            {text}
          </p>
        </div>
        {items && items.length > 0 && (
          <div className={styles.staticGrid} role="list">
            {items.map((item) => (
              <div key={item.id} className={styles.staticCard} role="listitem">
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.description && <p className={styles.cardDesc}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div id={id} className={cn(styles.root, className)} style={cssVars}>
      <div className={styles.stage}>
        <div
          className={cn(
            styles.glitch,
            trigger === 'always' ? styles.glitchTriggerAlways : styles.glitchTriggerHover,
          )}
          data-text={text}
          role="heading"
          aria-level={2}
          aria-label={label}
          tabIndex={trigger === 'hover' ? 0 : undefined}
        >
          {text}
        </div>
      </div>
      {items && items.length > 0 && (
        <div className={styles.grid} role="list">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(styles.card, showScanlines && styles.scanlines)}
              role="listitem"
              tabIndex={0}
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && <p className={styles.cardDesc}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

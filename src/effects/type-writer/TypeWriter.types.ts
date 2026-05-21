import type { BaseEffectProps } from '../../core/types/common';

/**
 * Determines which of the three typewriter variants is rendered.
 *
 * - `'cycler'`  — types each phrase, pauses, deletes, then cycles to the next.
 * - `'code'`    — types a single string character-by-character with a randomised
 *                 per-character delay; starts automatically when the element
 *                 enters the viewport (IntersectionObserver).
 * - `'chat'`    — renders a list of chat bubbles that each slide in after an
 *                 individual delay, without a per-character typewriter effect.
 */
export type TypeWriterVariant = 'cycler' | 'code' | 'chat';

/**
 * A single message in the chat variant.
 */
export interface ChatMessage {
  /** The message text */
  text: string;
  /** Sender role – controls visual alignment and styling */
  role: 'user' | 'bot';
  /**
   * Delay in milliseconds before this bubble becomes visible — default 0.
   * Stagger each message to create a natural conversation feel.
   */
  delay?: number;
}

export interface TypeWriterProps extends BaseEffectProps {
  /**
   * Which typewriter variant to render — default `'cycler'`
   */
  variant?: TypeWriterVariant;

  // ── Cycler variant ────────────────────────────────────────────────────────

  /**
   * Array of phrases to cycle through (cycler variant only).
   * — default `['We build websites.', 'We build brands.', 'We build products.']`
   */
  phrases?: string[];

  /**
   * Milliseconds per character while typing (cycler & code variants) — default 60
   */
  typeSpeed?: number;

  /**
   * Milliseconds per character while deleting (cycler variant) — default 30
   */
  deleteSpeed?: number;

  /**
   * Number of animation frames to pause at the end of a phrase before deleting
   * (cycler variant) — default 40
   */
  pauseFrames?: number;

  /**
   * Milliseconds to wait between finishing a delete and starting the next phrase
   * (cycler variant) — default 400
   */
  betweenPhraseDelay?: number;

  /**
   * Show a blinking cursor (cycler variant) — default `true`
   */
  showCursor?: boolean;

  /**
   * Colour of the blinking cursor — default `'currentColor'`
   */
  cursorColor?: string;

  /**
   * Width of the cursor bar in pixels — default 3
   */
  cursorWidth?: number;

  // ── Code variant ──────────────────────────────────────────────────────────

  /**
   * The code string to type character-by-character (code variant only).
   * — default: a short JavaScript snippet
   */
  codeText?: string;

  /**
   * Minimum per-character delay in ms for the random range (code variant) — default 20
   */
  codeMinDelay?: number;

  /**
   * Maximum per-character delay in ms for the random range (code variant) — default 60
   */
  codeMaxDelay?: number;

  /**
   * Fraction of the element that must be visible before typing begins
   * (code variant, IntersectionObserver threshold) — default 0.5
   */
  codeIntersectionThreshold?: number;

  // ── Chat variant ──────────────────────────────────────────────────────────

  /**
   * Array of chat messages to display (chat variant only).
   * — default: a short conversation demo
   */
  messages?: ChatMessage[];

  /**
   * Extra milliseconds added to every message delay as a global offset
   * (chat variant) — default 500
   */
  chatInitialOffset?: number;
}

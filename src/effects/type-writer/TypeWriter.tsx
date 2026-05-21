import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { TypeWriterProps, ChatMessage } from './TypeWriter.types';
import styles from './TypeWriter.module.css';
import {
  useTypeWriterCycler,
  useTypeWriterCode,
  useTypeWriterChat,
} from './useTypeWriter';

// ── Default values ────────────────────────────────────────────────────────────

const DEFAULT_PHRASES = ['We build websites.', 'We build brands.', 'We build products.'];

const DEFAULT_CODE_TEXT =
  'const site = await claude.build({\n  url: "example.com",\n  theme: "dark",\n  animation: "scroll-frame"\n});\n\nconsole.log(site.url);\n// => https://example.vercel.app';

const DEFAULT_MESSAGES: ChatMessage[] = [
  { text: 'How fast can you build a landing page?', role: 'user', delay: 0 },
  { text: 'Under 30 seconds. Want me to start?', role: 'bot', delay: 1200 },
  { text: 'Show me.', role: 'user', delay: 2600 },
  { text: 'Done. Check the preview above.', role: 'bot', delay: 3800 },
];

// ── Sub-components (not exported — internal only) ──────────────────────────────

interface CyclerProps {
  phrases: string[];
  typeSpeed: number;
  deleteSpeed: number;
  pauseFrames: number;
  betweenPhraseDelay: number;
  showCursor: boolean;
  cursorColor: string;
  cursorWidth: number;
  reducedMotion: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

function CyclerVariant({
  phrases,
  typeSpeed,
  deleteSpeed,
  pauseFrames,
  betweenPhraseDelay,
  showCursor,
  cursorColor,
  cursorWidth,
  reducedMotion,
  className,
  style,
  id,
}: CyclerProps) {
  const enabled = !reducedMotion;

  const textRef = useTypeWriterCycler({
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseFrames,
    betweenPhraseDelay,
    enabled,
  });

  const cssVars = {
    '--rce-tw-cursor-color': cursorColor,
    '--rce-tw-cursor-width': `${cursorWidth}px`,
  } as React.CSSProperties;

  return (
    <div
      id={id}
      className={cn(styles.container, className)}
      style={{ ...cssVars, ...style }}
    >
      <span className={styles.cyclerRoot} aria-live="polite" aria-atomic="true">
        {reducedMotion ? (
          /* Static: show the first phrase instantly */
          <span className={styles.cyclerText}>{phrases[0] ?? ''}</span>
        ) : (
          <span ref={textRef} className={styles.cyclerText} />
        )}
        {showCursor && (
          <span
            className={cn(styles.cursor, reducedMotion && styles['cursor--static'])}
            aria-hidden="true"
          />
        )}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface CodeProps {
  codeText: string;
  minDelay: number;
  maxDelay: number;
  threshold: number;
  reducedMotion: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

function CodeVariant({
  codeText,
  minDelay,
  maxDelay,
  threshold,
  reducedMotion,
  className,
  style,
  id,
}: CodeProps) {
  const codeRef = useTypeWriterCode({
    codeText,
    minDelay,
    maxDelay,
    threshold,
    enabled: !reducedMotion,
  });

  return (
    <div id={id} className={cn(styles.container, className)} style={style}>
      <div
        ref={codeRef}
        className={styles.codeRoot}
        role="region"
        aria-label="Code typewriter"
      >
        {/* Content filled imperatively by the hook */}
        {reducedMotion ? codeText : null}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface ChatProps {
  messages: ChatMessage[];
  initialOffset: number;
  reducedMotion: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

function ChatVariant({
  messages,
  initialOffset,
  reducedMotion,
  className,
  style,
  id,
}: ChatProps) {
  const delays = messages.map((m) => m.delay ?? 0);

  const containerRef = useTypeWriterChat({
    count: messages.length,
    delays,
    initialOffset,
    enabled: !reducedMotion,
  });

  return (
    <div id={id} className={cn(styles.container, className)} style={style}>
      <div ref={containerRef} className={styles.chatRoot} role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            data-chat-bubble={i}
            data-visible={reducedMotion ? 'true' : undefined}
            className={cn(
              styles.chatBubble,
              msg.role === 'user' ? styles['chatBubble--user'] : styles['chatBubble--bot'],
            )}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * TypeWriter — Three cinematic text-animation variants in one component.
 *
 * ### Variants
 * - **`'cycler'`** — types each phrase, pauses, deletes, then moves to the next.
 * - **`'code'`**   — types a code snippet character-by-character, triggered when
 *                    the element scrolls into view (IntersectionObserver).
 * - **`'chat'`**   — reveals chat bubbles with staggered delays and a slide-up
 *                    `opacity`/`transform` transition.
 *
 * All variants respect `prefers-reduced-motion`: animations are suppressed and
 * content is shown immediately. All browser APIs are gated behind `useIsClient`.
 *
 * @example
 * ```tsx
 * // Cycler
 * <TypeWriter
 *   variant="cycler"
 *   phrases={['We design.', 'We build.', 'We ship.']}
 *   typeSpeed={60}
 * />
 *
 * // Code block
 * <TypeWriter variant="code" codeText={mySnippet} />
 *
 * // Chat sequence
 * <TypeWriter
 *   variant="chat"
 *   messages={[
 *     { text: 'Hello!', role: 'user', delay: 0 },
 *     { text: 'Hi there!', role: 'bot', delay: 800 },
 *   ]}
 * />
 * ```
 */
export function TypeWriter({
  variant = 'cycler',
  // cycler
  phrases = DEFAULT_PHRASES,
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseFrames = 40,
  betweenPhraseDelay = 400,
  showCursor = true,
  cursorColor = 'currentColor',
  cursorWidth = 3,
  // code
  codeText = DEFAULT_CODE_TEXT,
  codeMinDelay = 20,
  codeMaxDelay = 60,
  codeIntersectionThreshold = 0.5,
  // chat
  messages = DEFAULT_MESSAGES,
  chatInitialOffset = 500,
  // base
  className,
  style,
  id,
}: TypeWriterProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  // Validate in dev mode
  if (process.env.NODE_ENV !== 'production') {
    if (variant === 'cycler' && phrases.length === 0) {
      console.warn('[react-cinematic-effects] TypeWriter: `phrases` array is empty.');
    }
    if (variant === 'chat' && messages.length === 0) {
      console.warn('[react-cinematic-effects] TypeWriter: `messages` array is empty.');
    }
    if (codeMinDelay > codeMaxDelay) {
      console.warn(
        '[react-cinematic-effects] TypeWriter: `codeMinDelay` is greater than `codeMaxDelay`.',
      );
    }
  }

  // During SSR, always treat as reduced-motion to avoid hydration mismatches
  const effectiveReducedMotion = !isClient || reducedMotion;

  const sharedProps = { className, style, id };

  if (variant === 'code') {
    return (
      <CodeVariant
        codeText={codeText}
        minDelay={codeMinDelay}
        maxDelay={codeMaxDelay}
        threshold={codeIntersectionThreshold}
        reducedMotion={effectiveReducedMotion}
        {...sharedProps}
      />
    );
  }

  if (variant === 'chat') {
    return (
      <ChatVariant
        messages={messages}
        initialOffset={chatInitialOffset}
        reducedMotion={effectiveReducedMotion}
        {...sharedProps}
      />
    );
  }

  // Default: 'cycler'
  return (
    <CyclerVariant
      phrases={phrases}
      typeSpeed={typeSpeed}
      deleteSpeed={deleteSpeed}
      pauseFrames={pauseFrames}
      betweenPhraseDelay={betweenPhraseDelay}
      showCursor={showCursor}
      cursorColor={cursorColor}
      cursorWidth={cursorWidth}
      reducedMotion={effectiveReducedMotion}
      {...sharedProps}
    />
  );
}

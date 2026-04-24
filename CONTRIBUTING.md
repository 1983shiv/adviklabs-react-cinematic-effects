# Contributing to react-cinematic-effects

Thank you for your interest in contributing! This guide explains how to add a new cinematic effect to the library.

## Prerequisites

- Node.js 18+
- pnpm (or npm)

## Setup

```bash
git clone <repo-url>
cd react-cinematic-effects
npm install
npm run dev    # Watch mode
```

## Adding a New Effect

Adding a new effect is designed to be as simple as creating a new folder. Here's the complete step-by-step process.

### Step 1: Create the effect folder

```
src/effects/<effect-name>/
  ├── index.ts              # Barrel export
  ├── <EffectName>.tsx       # Main component
  ├── <EffectName>.types.ts  # TypeScript interfaces
  ├── <EffectName>.module.css  # Scoped styles
  ├── use<EffectName>.ts     # Internal hook (optional)
  └── <EffectName>.stories.tsx  # Storybook demo (optional)
```

### Step 2: Define types

```typescript
// src/effects/magnetic-cursor/MagneticCursor.types.ts
import type { BaseEffectProps } from '../../core/types/common';

export interface MagneticCursorProps extends BaseEffectProps {
  children: React.ReactNode;
  /** Magnetic pull strength (0-1) — default 0.3 */
  strength?: number;
  /** Magnetic radius in px — default 200 */
  radius?: number;
  // ... your effect-specific props
}
```

### Step 3: Implement the component

Use shared hooks from `core/`:

```typescript
// src/effects/magnetic-cursor/MagneticCursor.tsx
import { useIsClient } from '../../core/hooks/useIsClient';
import { useReducedMotion } from '../../core/hooks/useReducedMotion';
import { cn } from '../../core/utils/cn';
import type { MagneticCursorProps } from './MagneticCursor.types';
import styles from './MagneticCursor.module.css';

export function MagneticCursor({
  children,
  strength = 0.3,
  radius = 200,
  className,
  style,
  id,
}: MagneticCursorProps) {
  const isClient = useIsClient();
  const reducedMotion = useReducedMotion();

  // SSR fallback
  if (!isClient) {
    return <div id={id} className={className} style={style}>{children}</div>;
  }

  // Reduced motion — skip effect
  if (reducedMotion) {
    return <div id={id} className={className} style={style}>{children}</div>;
  }

  // Your effect implementation...
  return (
    <div
      id={id}
      className={cn(styles.container, className)}
      style={style}
    >
      {children}
    </div>
  );
}
```

### Step 4: Create barrel export

```typescript
// src/effects/magnetic-cursor/index.ts
export { MagneticCursor } from './MagneticCursor';
export type { MagneticCursorProps } from './MagneticCursor.types';
```

### Step 5: Register in root barrel (1 line)

```typescript
// src/index.ts — add:
export { MagneticCursor } from './effects/magnetic-cursor';
export type { MagneticCursorProps } from './effects/magnetic-cursor';
```

### Step 6: Add build entry point

```typescript
// tsup.config.ts — add to entry object:
'effects/magnetic-cursor': 'src/effects/magnetic-cursor/index.ts',
```

### Step 7: Add package.json export map

```json
"./effects/magnetic-cursor": {
  "import": {
    "types": "./dist/effects/magnetic-cursor.d.ts",
    "default": "./dist/effects/magnetic-cursor.js"
  },
  "require": {
    "types": "./dist/effects/magnetic-cursor.d.cts",
    "default": "./dist/effects/magnetic-cursor.cjs"
  }
}
```

### Step 8: Build and test

```bash
npm run build
```

## Conventions

### Shared Hooks (use these!)

| Hook | Purpose |
|---|---|
| `useIsClient()` | SSR guard — returns `false` during SSR/hydration |
| `useReducedMotion()` | Detects `prefers-reduced-motion` |
| `usePoolManager()` | Fixed-size object pool for DOM element reuse |
| `usePointerTracker()` | Throttled pointer movement tracking |

### Shared Utilities

| Utility | Purpose |
|---|---|
| `cn()` | Merge CSS class names |
| `clamp()` | Clamp a number between min/max |
| `mergeRefs()` | Combine multiple refs |
| `distance()` | Euclidean distance between points |

### CSS Guidelines

- Use CSS Modules (`.module.css`)
- Prefix custom properties with `--rce-<effect-abbrev>-`
- Only transition GPU-friendly properties (`transform`, `opacity`)
- Support `prefers-reduced-motion`

### Component Guidelines

- Use named exports (no `default`)
- Extend `BaseEffectProps` for common className/style/id props
- Provide sensible defaults for all optional props
- Gate browser APIs behind `useIsClient()`
- Add dev-mode warnings for invalid props
- Support `forwardRef` if consumers might need a ref

## Questions?

Open an issue or discussion on GitHub.

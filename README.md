# @adviklabs/react-cinematic-effects

> Drop-in, extensible cinematic UI effect components for React.

[![npm version](https://img.shields.io/npm/v/@adviklabs/react-cinematic-effects.svg)](https://www.npmjs.com/package/@adviklabs/react-cinematic-effects)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@adviklabs/react-cinematic-effects)](https://bundlephobia.com/package/@adviklabs/react-cinematic-effects)
[![license](https://img.shields.io/npm/l/@adviklabs/react-cinematic-effects)](./LICENSE.txt)

## Features

- 🎬 **AccordionSlider** — Narrow image panels that expand on hover/click (horizontal + vertical)
- ✨ **ImageTrail** — Cursor leaves a trail of images/colours that fade out
- 📌 **StickyStack** — Scroll-driven two-column feature section with a crossfading sticky visual panel
- 🧩 **Extensible** — Add new effects by dropping a folder — no core changes needed
- 📦 **Tree-shakable** — Import only the effects you use
- 🎯 **TypeScript** — Full type definitions with IDE autocomplete
- ♿ **Accessible** — `prefers-reduced-motion`, ARIA attributes, keyboard support
- 🖥️ **SSR-safe** — Works with Next.js, Remix, and any SSR framework
- 🪶 **Lightweight** — Zero runtime dependencies (only React peer dep)

## Installation

```bash
npm install @adviklabs/react-cinematic-effects
```

## Quick Start

### AccordionSlider

```tsx
import { AccordionSlider } from '@adviklabs/react-cinematic-effects';

const items = [
  {
    id: '1',
    backgroundSrc: '/images/strategy.jpg',
    title: 'Brand Strategy',
    collapsedLabel: 'Strategy',
    number: '01',
    description: 'Positioning, messaging, and identity systems.',
  },
  {
    id: '2',
    backgroundSrc: '/images/design.jpg',
    title: 'Interface Design',
    collapsedLabel: 'Design',
    number: '02',
    description: 'Components, layouts, and interaction patterns.',
  },
  {
    id: '3',
    backgroundSrc: '/images/dev.jpg',
    title: 'Development',
    collapsedLabel: 'Code',
    number: '03',
    description: 'TypeScript, edge-first architecture, CI/CD.',
  },
];

export default function Portfolio() {
  return (
    <AccordionSlider
      items={items}
      orientation="horizontal"
      trigger="hover"
      height="70vh"
      gap={8}
      borderRadius={16}
      transitionDuration={600}
    />
  );
}
```

### Vertical variant

```tsx
<AccordionSlider
  items={items}
  orientation="vertical"
  trigger="click"
  collapsedHeight="60px"
  expandedHeight="240px"
/>
```

### ImageTrail

```tsx
import { ImageTrail } from '@adviklabs/react-cinematic-effects';

export default function Hero() {
  return (
    <ImageTrail
      images={['/img/a.jpg', '/img/b.jpg', '/img/c.jpg', '/img/d.jpg']}
      threshold={50}
      trailWidth={160}
      trailHeight={200}
      fadeDuration={900}
      poolSize={20}
    >
      <h1 style={{ fontSize: '8rem', textAlign: 'center' }}>
        MOVE YOUR MOUSE
      </h1>
    </ImageTrail>
  );
}
```

### With colours instead of images

```tsx
<ImageTrail
  colors={['#a8748e', '#748ea8', '#8ea874', '#a8a074']}
  threshold={40}
  rotationRange={15}
>
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2>Hover here</h2>
  </div>
</ImageTrail>
```

### StickyStack

The "sticky product + scrolling benefits" pattern made popular by Stripe, Linear, and Apple. A sticky visual panel on one side crossfades as the user scrolls through feature cards on the other side.

```tsx
import { StickyStack } from '@adviklabs/react-cinematic-effects';

const features = [
  {
    id: '1',
    number: '01',
    title: 'Real-time monitoring',
    description: 'Track uptime, latency, and error rates across all your services.',
    visual: <img src="/feature-monitoring.png" alt="Monitoring dashboard" />,
  },
  {
    id: '2',
    number: '02',
    title: 'Instant alerts',
    description: 'Get notified the moment something goes wrong — via Slack, email, or PagerDuty.',
    visual: <img src="/feature-alerts.png" alt="Alert configuration" />,
  },
  {
    id: '3',
    number: '03',
    title: 'Detailed analytics',
    description: 'Drill into historical data, P99 latency, and custom dashboards.',
    visual: <img src="/feature-analytics.png" alt="Analytics chart" />,
  },
];

export default function Features() {
  return (
    <StickyStack
      items={features}
      visualSide="visual-left"
      accentColor="#4f46e5"
      transitionDuration={400}
      cardGap={40}
    />
  );
}
```

### Visual on the right

```tsx
<StickyStack
  items={features}
  visualSide="visual-right"
  accentColor="#e85d3a"
  inactiveOpacity={0.25}
  stickyTop="80px"
/>
```

## Props

### `<AccordionSlider />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `AccordionSliderItem[]` | *required* | Panel data array |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `defaultActiveIndex` | `number` | `0` | Initial expanded panel |
| `activeIndex` | `number` | — | Controlled active panel |
| `onActiveChange` | `(index: number) => void` | — | Active change callback |
| `trigger` | `'hover' \| 'click'` | `'hover'` | Expand trigger |
| `expandedFlex` | `number` | `5` | Expanded panel flex value |
| `gap` | `number` | `8` | Gap between panels (px) |
| `borderRadius` | `number` | `16` | Panel border radius (px) |
| `height` | `string` | `'70vh'` | Container height |
| `transitionDuration` | `number` | `600` | Transition duration (ms) |
| `transitionEasing` | `string` | `'cubic-bezier(0.16, 1, 0.3, 1)'` | CSS easing |
| `renderPanel` | `(item, index, isActive) => ReactNode` | — | Custom panel renderer |

### `<ImageTrail />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | *required* | Content inside the trail region |
| `images` | `string[]` | — | Image URLs for trail items |
| `colors` | `string[]` | Default palette | Colour swatches (when no images) |
| `poolSize` | `number` | `20` | Pre-allocated trail items |
| `threshold` | `number` | `60` | Min cursor travel (px) to spawn |
| `trailWidth` | `number` | `160` | Trail item width (px) |
| `trailHeight` | `number` | `200` | Trail item height (px) |
| `fadeDuration` | `number` | `800` | Fade-out duration (ms) |
| `staggerDelay` | `number` | `300` | Delay before fade (ms) |
| `initialScale` | `number` | `0.8` | Spawn scale factor |
| `rotationRange` | `number` | `10` | Random rotation ± degrees |
| `hideCursor` | `boolean` | `true` | Hide native cursor |
| `renderTrailItem` | `(index, style) => ReactNode` | — | Custom trail item renderer |

### `<StickyStack />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `StickyStackItem[]` | *required* | Feature card data array |
| `visualSide` | `'visual-left' \| 'visual-right'` | `'visual-left'` | Side the sticky panel appears on |
| `stickyTop` | `string` | `'100px'` | CSS `top` value for the sticky panel |
| `activationMargin` | `string` | `'-20% 0px -20% 0px'` | IntersectionObserver root margin |
| `cardGap` | `number` | `40` | Gap between feature cards (px) |
| `inactiveOpacity` | `number` | `0.35` | Opacity of non-active cards (0–1) |
| `accentColor` | `string` | `'#4f46e5'` | Accent colour for highlights & numbers |
| `transitionDuration` | `number` | `400` | Crossfade animation duration (ms) |
| `cardPadding` | `string` | `'40px 32px'` | CSS padding shorthand for each card |
| `visualMinHeight` | `number` | `340` | Minimum height of the visual panel (px) |
| `onActiveChange` | `(index: number) => void` | — | Fires when the active card changes |

#### `StickyStackItem` shape

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `title` | `string` | Card heading |
| `description` | `string` | Card body text |
| `visual` | `ReactNode` | Content shown in the sticky panel (image, chart, illustration…) |
| `number` | `string?` | Optional label shown above the title (e.g. `"01"`) |

## Theming with CSS Custom Properties

Override any visual property from your own CSS:

```css
/* Global overrides */
:root {
  --rce-as-radius: 24px;
  --rce-as-duration: 400ms;
}

/* Per-instance */
.my-slider {
  --rce-as-gap: 12px;
  --rce-as-expanded-flex: 4;
}
```

## Adding a New Effect

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the step-by-step guide.

**TL;DR:** Create a folder under `src/effects/<name>/`, implement the component, add one re-export line in `src/index.ts`. Done.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari 15.4+
- Edge (last 2 versions)
- iOS Safari 15+ / Chrome Android 10+

## License

MIT © [Shiv Srivastava](https://github.com/1983shiv) — see [LICENSE.txt](./LICENSE.txt) for details.

---

Built by **Shiv Srivastava**  
Part of the [AdvikLabs](https://adviklabs.com) ecosystem

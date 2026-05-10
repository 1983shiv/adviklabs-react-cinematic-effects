# @adviklabs/react-cinematic-effects

> Drop-in, extensible cinematic UI effect components for React.

[![npm version](https://img.shields.io/npm/v/@adviklabs/react-cinematic-effects.svg)](https://www.npmjs.com/package/@adviklabs/react-cinematic-effects)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@adviklabs/react-cinematic-effects)](https://bundlephobia.com/package/@adviklabs/react-cinematic-effects)
[![license](https://img.shields.io/npm/l/@adviklabs/react-cinematic-effects)](./LICENSE.txt)


## Features

- 🎬 **AccordionSlider** — Narrow image panels that expand on hover/click (horizontal + vertical)
- ✨ **ImageTrail** — Cursor leaves a trail of images/colours that fade out
- 📌 **StickyStack** — Scroll-driven two-column feature section with a crossfading sticky visual panel
- 🃏 **FlipCards** — Responsive 3D cards that flip to reveal more info on hover or click
- 🔵 **CircularText** — Text rendered along a rotating SVG arc; spin, scroll-reactive, or static modes
- 🎨 **ColorShift** — Scroll-driven background and text colour transitions between page sections
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

### Required: Import the stylesheet

The package ships its styles as a separate CSS file. Add this import **once** in your app's entry point (e.g. `app/layout.tsx` for Next.js, `main.tsx` for Vite):

```ts
import '@adviklabs/react-cinematic-effects/styles.css';
```

> **Next.js note:** Because the CSS comes from `node_modules`, Next.js requires you to mark the package as transpilable. Add the following to your `next.config.ts`:
>
> ```ts
> const nextConfig = {
>   transpilePackages: ['@adviklabs/react-cinematic-effects'],
> };
> ```

## Quick Start

### AccordionSlider

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
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


### FlipCards

Responsive 3D cards that flip to reveal more info on hover or click. Great for feature highlights, team bios, or service overviews.

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
import { FlipCards } from '@adviklabs/react-cinematic-effects';

const items = [
  {
    id: '1',
    icon: '🩺',
    title: 'Diagnosis',
    subtitle: 'Accurate patient assessment',
    description: 'Utilizing advanced imaging and lab tests, our team ensures every diagnosis is precise and timely for optimal care.',
    linkLabel: 'Learn more',
  },
  {
    id: '2',
    icon: '💊',
    title: 'Treatment',
    subtitle: 'Personalized therapies',
    description: 'From medication management to surgical procedures, we tailor treatments to each patient’s unique needs and conditions.',
    linkLabel: 'Learn more',
  },
  {
    id: '3',
    icon: '🤝',
    title: 'Patient Support',
    subtitle: 'Continuous care',
    description: 'Our support staff guides patients through recovery, offering education, counseling, and follow-up for lasting health.',
    linkLabel: 'Learn more',
  },
  {
    id: '4',
    icon: '🔬',
    title: 'Research',
    subtitle: 'Innovative solutions',
    description: 'We invest in medical research and clinical trials to bring the latest advancements and therapies to our patients.',
    linkLabel: 'Learn more',
  },
];

export default function HealthcareHighlights() {
  return (
    <FlipCards
      items={items}
      trigger="hover"
      cardHeight="320px"
      gap={20}
      borderRadius={20}
    />
  );
}
```

### StickyStack

The "sticky product + scrolling benefits" pattern made popular by Stripe, Linear, and Apple. A sticky visual panel on one side crossfades as the user scrolls through feature cards on the other side.

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
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

### CircularText

Text rendered along a rotating SVG arc. Works as badges, logo treatments, and section accents. Three modes: continuous CSS spin, scroll-reactive rotation, or static.

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
import { CircularText } from '@adviklabs/react-cinematic-effects';

export default function Badge() {
  return (
    <CircularText
      text="DESIGN \u2022 BUILD \u2022 SHIP \u2022 SCALE \u2022 "
      repeat={2}
      size={320}
      radius={120}
      spinDuration={20}
      mode="spin"
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 600 }}>2026</div>
        <div style={{ fontSize: 13, opacity: 0.5 }}>Est.</div>
      </div>
    </CircularText>
  );
}
```

#### Scroll-reactive variant

```tsx
<CircularText
  text="SCROLL REACTIVE \u2022 SCROLL REACTIVE \u2022 "
  size={240}
  radius={90}
  mode="scroll"
  scrollSensitivity={0.5}
  textColor="#a8748e"
>
  <span style={{ fontSize: 28 }}>&#8595;</span>
</CircularText>
```

#### Reverse spin

```tsx
<CircularText
  text="FREE CONSULTATION \u2022 FREE CONSULTATION \u2022 "
  size={240}
  radius={90}
  spinDuration={12}
  spinDirection="reverse"
  textColor="#e85d3a"
/>
```

### ColorShift

Scroll-driven background and text colour transitions. As each section enters the active viewport zone the container smoothly transitions to that section's colour palette. Uses `IntersectionObserver` — zero dependencies.

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
import { ColorShift } from '@adviklabs/react-cinematic-effects';

export default function Page() {
  return (
    <ColorShift
      sections={[
        {
          bg: '#0a0a0b',
          text: '#eae7e2',
          children: <HeroSection />,
        },
        {
          bg: '#1a0d08',
          text: '#f0e8df',
          children: <WarmSection />,
        },
        {
          bg: '#081a12',
          text: '#dff0e8',
          children: <ForestSection />,
        },
        {
          bg: '#0d081a',
          text: '#e0dff0',
          children: <NightSection />,
        },
      ]}
      transitionDuration={800}
      triggerOffset={0.4}
    />
  );
}
```

#### Dark-to-light flip mid-page

```tsx
<ColorShift
  sections={[
    { bg: '#0a0a0b', text: '#eae7e2', children: <StorySection /> },
    { bg: '#f5f3ef', text: '#1a1a1f', children: <ActionSection /> },
    { bg: '#0a0a0b', text: '#eae7e2', children: <ClosingSection /> },
  ]}
  transitionDuration={600}
  transitionEasing="ease-in-out"
/>
```


### ImageTrail

```tsx
import '@adviklabs/react-cinematic-effects/styles.css'; // required — add once at app entry
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

### `<CircularText />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | *required* | Text rendered along the circular arc |
| `repeat` | `number` | `1` | Number of times to repeat the text string around the arc |
| `radius` | `number` | `120` | Arc radius in SVG units (viewBox is 300×300, max 145) |
| `size` | `number` | `320` | Rendered width and height of the component in px |
| `fontSize` | `number` | `14` | Font size in SVG units |
| `letterSpacing` | `string` | `'0.3em'` | CSS letter-spacing on the arc text |
| `textColor` | `string` | `'currentColor'` | Text fill colour |
| `fontWeight` | `number \| string` | `500` | Font weight of the arc text |
| `spinDuration` | `number` | `20` | Duration of one full rotation in seconds (spin mode only) |
| `spinDirection` | `'normal' \| 'reverse'` | `'normal'` | Clockwise or counter-clockwise rotation |
| `mode` | `'spin' \| 'scroll' \| 'none'` | `'spin'` | Animation mode |
| `scrollSensitivity` | `number` | `0.5` | Degrees of rotation per pixel scrolled (scroll mode only) |
| `children` | `ReactNode` | — | Content rendered at the centre of the circle |

### `<ColorShift />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `ColorShiftSection[]` | *required* | Ordered list of sections with their colour palettes and content |
| `transitionDuration` | `number` | `800` | Duration of the background/text colour transition in ms |
| `transitionEasing` | `string` | `'ease'` | CSS easing function for the colour transition |
| `triggerOffset` | `number` | `0.4` | Fraction of the viewport (0–0.49) used as dead-band at top and bottom before a section activates |
| `sectionMinHeight` | `string` | `'100dvh'` | CSS `min-height` applied to every section wrapper |

#### `ColorShiftSection` shape

| Field | Type | Description |
|---|---|---|
| `bg` | `string` | Background colour for this section (any valid CSS colour) |
| `text` | `string` | Foreground / text colour for this section |
| `children` | `ReactNode` | Section content |

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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StickyStack } from '../effects/sticky-stack';
import type { StickyStackItem } from '../effects/sticky-stack';

// ── Sample data ───────────────────────────────────────────────────────────────
const featureItems: StickyStackItem[] = [
  {
    id: 'performance',
    number: '01',
    title: 'Buttery-Smooth Performance',
    description:
      'Built on requestAnimationFrame and CSS custom properties. ' +
      'Zero layout thrash, no GSAP dependency — sub-16ms frame times even on low-end devices.',
    visual: (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 340,
          background: 'linear-gradient(135deg, #0f0f12 0%, #1a1a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1 }}>⚡</div>
        <span style={{ color: '#4f46e5', fontFamily: 'monospace', fontSize: 14 }}>
          {'<16ms frame time'}
        </span>
      </div>
    ),
  },
  {
    id: 'accessible',
    number: '02',
    title: 'Accessible by Default',
    description:
      'Every component ships with ARIA roles, keyboard navigation support, ' +
      'and automatically respects `prefers-reduced-motion` — no extra config.',
    visual: (
      <div
        style={{
          width: '100%',
          minHeight: 340,
          background: 'linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1 }}>♿</div>
        <span style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: 14 }}>
          WCAG 2.1 AA
        </span>
      </div>
    ),
  },
  {
    id: 'treeshake',
    number: '03',
    title: 'Tree-Shakeable Exports',
    description:
      'Import only the effect you use. The dual ESM/CJS build with ' +
      'per-effect entry points ensures your bundle only includes what you ship.',
    visual: (
      <div
        style={{
          width: '100%',
          minHeight: 340,
          background: 'linear-gradient(135deg, #2e1a0a 0%, #1a0f05 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1 }}>📦</div>
        <span style={{ color: '#f97316', fontFamily: 'monospace', fontSize: 14 }}>
          ESM + CJS dual build
        </span>
      </div>
    ),
  },
  {
    id: 'extensible',
    number: '04',
    title: 'Fully Extensible',
    description:
      'Every component accepts a `renderPanel` / `renderTrailItem` render-prop ' +
      'for total customisation, plus CSS custom property overrides at the root level.',
    visual: (
      <div
        style={{
          width: '100%',
          minHeight: 340,
          background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0518 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1 }}>🧩</div>
        <span style={{ color: '#a855f7', fontFamily: 'monospace', fontSize: 14 }}>
          render-prop API
        </span>
      </div>
    ),
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof StickyStack> = {
  title: 'Effects/StickyStack',
  component: StickyStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A feature showcase layout where a visual panel sticks in view while ' +
          'the user scrolls through feature cards. The active card and its paired ' +
          'visual crossfade as cards enter the viewport. ' +
          '**Scroll inside the story canvas to see the effect.**',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0f0f12', minHeight: '100vh', padding: '60px 0' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    stickyTop: {
      control: 'text',
      description: 'CSS `top` value for the sticky visual panel',
      table: { defaultValue: { summary: '100px' } },
    },
    cardGap: {
      control: { type: 'range', min: 0, max: 120, step: 4 },
      description: 'Gap between feature cards (px)',
      table: { defaultValue: { summary: '40' } },
    },
    inactiveOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity of inactive cards',
      table: { defaultValue: { summary: '0.35' } },
    },
    accentColor: {
      control: 'color',
      description: 'Accent colour for highlights and number labels',
      table: { defaultValue: { summary: '#4f46e5' } },
    },
    transitionDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Crossfade transition duration (ms)',
      table: { defaultValue: { summary: '400' } },
    },
    cardPadding: {
      control: 'text',
      description: 'CSS padding shorthand for feature cards',
      table: { defaultValue: { summary: '40px 32px' } },
    },
    visualMinHeight: {
      control: { type: 'range', min: 200, max: 600, step: 20 },
      description: 'Minimum height of the visual panel (px)',
      table: { defaultValue: { summary: '340' } },
    },
    visualSide: {
      control: 'radio',
      options: ['visual-left', 'visual-right'],
      description: 'Which side the sticky visual panel sits on',
      table: { defaultValue: { summary: 'visual-left' } },
    },
    items: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
    activationMargin: { table: { disable: true } },
  },
  args: {
    items: featureItems,
  },
};

export default meta;
type Story = StoryObj<typeof StickyStack>;

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Default layout — scroll down to see each feature card activate the paired visual.
 * The visual panel is sticky on the left.
 */
export const Default: Story = {
  args: {
    stickyTop: '100px',
    cardGap: 40,
    inactiveOpacity: 0.35,
    accentColor: '#4f46e5',
    transitionDuration: 400,
    visualSide: 'visual-left',
    visualMinHeight: 340,
  },
};

/** Visual panel on the right — mirrors the default layout. */
export const VisualRight: Story = {
  name: 'Visual On Right',
  args: {
    visualSide: 'visual-right',
    accentColor: '#e85d3a',
    stickyTop: '80px',
    cardGap: 48,
    inactiveOpacity: 0.25,
  },
};

/** High contrast accent — purple/violet brand colour. */
export const PurpleAccent: Story = {
  name: 'Purple Accent',
  args: {
    accentColor: '#a855f7',
    inactiveOpacity: 0.2,
    transitionDuration: 600,
    cardGap: 60,
    cardPadding: '48px 40px',
  },
};

/** Slow crossfade for a more dramatic reveal. */
export const SlowCrossfade: Story = {
  name: 'Slow Crossfade',
  args: {
    transitionDuration: 800,
    inactiveOpacity: 0.15,
    accentColor: '#22c55e',
    cardGap: 56,
  },
};

/** Tight card spacing — content-dense layout. */
export const TightCards: Story = {
  name: 'Tight Cards',
  args: {
    cardGap: 8,
    cardPadding: '24px 20px',
    visualMinHeight: 280,
    inactiveOpacity: 0.4,
    accentColor: '#f97316',
  },
};

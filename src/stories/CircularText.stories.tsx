import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircularText } from '../effects/circular-text';

const meta = {
  title: 'Effects/CircularText',
  component: CircularText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['spin', 'scroll', 'none'],
    },
    spinDirection: {
      control: 'select',
      options: ['normal', 'reverse'],
    },
    spinDuration: { control: { type: 'range', min: 2, max: 60, step: 1 } },
    radius: { control: { type: 'range', min: 20, max: 145, step: 1 } },
    size: { control: { type: 'range', min: 80, max: 600, step: 10 } },
    fontSize: { control: { type: 'range', min: 8, max: 24, step: 1 } },
    repeat: { control: { type: 'range', min: 1, max: 8, step: 1 } },
    scrollSensitivity: { control: { type: 'range', min: 0.05, max: 3, step: 0.05 } },
    textColor: { control: 'color' },
  },
} satisfies Meta<typeof CircularText>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    text: 'DESIGN \u2022 BUILD \u2022 SHIP \u2022 SCALE \u2022 ',
    repeat: 2,
    size: 320,
    radius: 120,
    fontSize: 14,
    letterSpacing: '0.3em',
    textColor: 'currentColor',
    fontWeight: 500,
    spinDuration: 20,
    spinDirection: 'normal',
    mode: 'spin',
    scrollSensitivity: 0.5,
    children: (
      <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
        <div style={{ fontSize: 32, fontWeight: 600 }}>2026</div>
        <div style={{ fontSize: 13, opacity: 0.5 }}>Est.</div>
      </div>
    ),
  },
};

// ── Reverse spin ──────────────────────────────────────────────────────────────

export const ReverseSpin: Story = {
  name: 'Reverse Spin',
  args: {
    text: 'FREE CONSULTATION \u2022 FREE CONSULTATION \u2022 ',
    repeat: 1,
    size: 240,
    radius: 90,
    fontSize: 11,
    letterSpacing: '0.2em',
    textColor: '#e85d3a',
    fontWeight: 500,
    spinDuration: 12,
    spinDirection: 'reverse',
    mode: 'spin',
    children: <span style={{ fontSize: 28, color: '#e85d3a' }}>&#9734;</span>,
  },
};

// ── Scroll reactive ───────────────────────────────────────────────────────────

export const ScrollReactive: Story = {
  name: 'Scroll Reactive',
  args: {
    text: 'SCROLL REACTIVE \u2022 SCROLL REACTIVE \u2022 ',
    repeat: 1,
    size: 240,
    radius: 90,
    fontSize: 11,
    letterSpacing: '0.2em',
    textColor: '#a8748e',
    fontWeight: 500,
    mode: 'scroll',
    scrollSensitivity: 0.5,
    children: <span style={{ fontSize: 28, color: '#a8748e' }}>&#8595;</span>,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '200vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 80,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// ── Static badge ──────────────────────────────────────────────────────────────

export const StaticBadge: Story = {
  name: 'Static Badge',
  args: {
    text: 'EXPLORE MORE \u2022 EXPLORE MORE \u2022 EXPLORE MORE \u2022 ',
    repeat: 1,
    size: 200,
    radius: 80,
    fontSize: 11,
    letterSpacing: '0.2em',
    textColor: '#5eadb5',
    fontWeight: 500,
    mode: 'none',
    children: <span style={{ fontSize: 24, color: '#5eadb5' }}>&#8594;</span>,
  },
};

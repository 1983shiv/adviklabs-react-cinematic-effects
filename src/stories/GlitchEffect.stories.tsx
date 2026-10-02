import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlitchEffect } from '../effects/glitch-effect';
import type { GlitchEffectItem } from '../effects/glitch-effect';

const SAMPLE_ITEMS: GlitchEffectItem[] = [
  {
    id: '1',
    title: 'Cyberpunk aesthetic',
    description: 'RGB channel splitting with clip-path creates a digital distortion effect. Pure CSS, no canvas needed.',
  },
  {
    id: '2',
    title: 'Hover-triggered',
    description: 'The glitch fires only on hover. Constant glitching is distracting — controlled bursts create drama.',
  },
  {
    id: '3',
    title: 'Scanline overlay',
    description: 'CRT-style scanlines on the cards add to the digital aesthetic. A 4px repeating gradient at low opacity.',
  },
  {
    id: '4',
    title: 'Zero JavaScript',
    description: 'The entire effect is CSS keyframes with clip-path and translate. GPU-accelerated, no layout thrashing.',
  },
];

const meta = {
  title: 'Effects/GlitchEffect',
  component: GlitchEffect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    text: 'GLITCH',
    trigger: 'hover',
  },
  argTypes: {
    trigger: { control: 'select', options: ['hover', 'always'] },
    fontSize: { control: 'text' },
    fontWeight: { control: { type: 'range', min: 400, max: 900, step: 100 } },
    letterSpacing: { control: 'text' },
    textColor: { control: 'color' },
    cyanColor: { control: 'color' },
    redColor: { control: 'color' },
    mutedColor: { control: 'color' },
    cardBackground: { control: 'color' },
    cardBorderColor: { control: 'color' },
    cardBorderRadius: { control: { type: 'range', min: 0, max: 32, step: 1 } },
    glitchDuration: { control: { type: 'range', min: 100, max: 1200, step: 50 } },
    textGlitchDuration: { control: { type: 'range', min: 50, max: 600, step: 10 } },
    showScanlines: { control: 'boolean' },
  },
} satisfies Meta<typeof GlitchEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
};

// ── With info cards ───────────────────────────────────────────────────────────

export const WithCards: Story = {
  name: 'With Info Cards',
  args: {
    items: SAMPLE_ITEMS,
  },
};

// ── Always-on glitch loop ─────────────────────────────────────────────────────

export const AlwaysOn: Story = {
  name: 'Always On',
  args: {
    text: 'SIGNAL',
    trigger: 'always',
    items: SAMPLE_ITEMS.slice(0, 2),
  },
};

// ── Custom channel colours ────────────────────────────────────────────────────

export const CustomChannels: Story = {
  name: 'Custom Channels',
  args: {
    text: 'NEON',
    trigger: 'always',
    cyanColor: '#22ff88',
    redColor: '#ff2fb3',
    cardBorderColor: '#2a2a30',
    glitchDuration: 600,
  },
};

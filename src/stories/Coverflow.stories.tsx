import type { Meta, StoryObj } from '@storybook/react-vite';
import { Coverflow } from '../effects/coverflow';
import type { CoverflowItem } from '../effects/coverflow';

const SAMPLE_ITEMS: CoverflowItem[] = [
  {
    id: '1',
    title: 'Brand Identity',
    description: 'Logo, type, colour system',
    background: 'linear-gradient(135deg,#2a1a10,#1a0d08)',
  },
  {
    id: '2',
    title: 'Website',
    description: 'Responsive, animated, fast',
    background: 'linear-gradient(135deg,#1a2a1e,#0d1a10)',
  },
  {
    id: '3',
    title: 'Mobile App',
    description: 'iOS and Android native',
    background: 'linear-gradient(135deg,#1a1a2e,#0a0a1a)',
  },
  {
    id: '4',
    title: 'Dashboard',
    description: 'Data-dense, real-time',
    background: 'linear-gradient(135deg,#2e1a2a,#1a0d16)',
  },
  {
    id: '5',
    title: 'Marketing Site',
    description: 'Conversion-optimised',
    background: 'linear-gradient(135deg,#2e2a1a,#1a160d)',
  },
  {
    id: '6',
    title: 'E-commerce',
    description: 'Checkout, cart, catalogue',
    background: 'linear-gradient(135deg,#1a2e2a,#0d1a16)',
  },
  {
    id: '7',
    title: 'SaaS Platform',
    description: 'Multi-tenant, scalable',
    background: 'linear-gradient(135deg,#2a1a2a,#160d16)',
  },
];

const meta = {
  title: 'Effects/Coverflow',
  component: Coverflow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    items: SAMPLE_ITEMS,
  },
  argTypes: {
    itemWidth: { control: { type: 'range', min: 160, max: 420, step: 10 } },
    itemHeight: { control: { type: 'range', min: 200, max: 520, step: 10 } },
    offsetX: { control: { type: 'range', min: 100, max: 340, step: 5 } },
    tiltAngle: { control: { type: 'range', min: 0, max: 70, step: 1 } },
    sideScale: { control: { type: 'range', min: 0.5, max: 1, step: 0.05 } },
    maxVisible: { control: { type: 'range', min: 1, max: 4, step: 1 } },
    fadeStep: { control: { type: 'range', min: 0, max: 0.5, step: 0.05 } },
    dimBrightness: { control: { type: 'range', min: 0.2, max: 1, step: 0.05 } },
    perspective: { control: { type: 'range', min: 400, max: 2000, step: 50 } },
    borderRadius: { control: { type: 'range', min: 0, max: 40, step: 1 } },
    transitionDuration: { control: { type: 'range', min: 0, max: 1200, step: 50 } },
    showNavigation: { control: 'boolean' },
  },
} satisfies Meta<typeof Coverflow>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
};

// ── Tight spacing, dramatic tilt ──────────────────────────────────────────────

export const DramaticTilt: Story = {
  name: 'Dramatic Tilt',
  args: {
    offsetX: 180,
    tiltAngle: 60,
    sideScale: 0.7,
    maxVisible: 3,
  },
};

// ── Flat spread, no dimming ───────────────────────────────────────────────────

export const FlatSpread: Story = {
  name: 'Flat Spread',
  args: {
    offsetX: 260,
    tiltAngle: 0,
    sideScale: 0.9,
    dimBrightness: 1,
    fadeStep: 0.1,
    maxVisible: 3,
  },
};

// ── Without navigation ────────────────────────────────────────────────────────

export const NoNavigation: Story = {
  name: 'Without Navigation',
  args: {
    showNavigation: false,
  },
};

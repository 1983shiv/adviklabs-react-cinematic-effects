import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionSlider } from '../effects/accordion-slider';
import type { AccordionSliderItem } from '../effects/accordion-slider';

// ── Local image imports (Vite resolves these at build time) ───────────────────

import imgMountain from './assets/nature-01-mountain.jpg';
import imgOcean from './assets/nature-02-ocean.jpg';
import imgForest from './assets/nature-03-forest.jpg';
import imgDesert from './assets/nature-04-desert.jpg';
import imgAurora from './assets/nature-05-aurora.jpg';

// ── Shared sample data ────────────────────────────────────────────────────────
const SAMPLE_ITEMS: AccordionSliderItem[] = [
  {
    id: '1',
    backgroundSrc: imgMountain,
    collapsedLabel: 'Mountain',
    number: '01',
    title: 'Mountain Peaks',
    description: 'Soaring above the clouds, where silence meets the infinite sky.',
  },
  {
    id: '2',
    backgroundSrc: imgOcean,
    collapsedLabel: 'Ocean',
    number: '02',
    title: 'Ocean Depths',
    description: 'Discover the mystery of the deep — where light fades and life flourishes.',
  },
  {
    id: '3',
    backgroundSrc: imgForest,
    collapsedLabel: 'Forest',
    number: '03',
    title: 'Ancient Forests',
    description: 'Centuries of growth, a cathedral of green beneath the canopy.',
  },
  {
    id: '4',
    backgroundSrc: imgDesert,
    collapsedLabel: 'Desert',
    number: '04',
    title: 'Desert Dunes',
    description: 'Golden waves of sand, sculpted by the wind across time.',
  },
  {
    id: '5',
    backgroundSrc: imgAurora,
    collapsedLabel: 'Aurora',
    number: '05',
    title: 'Aurora Borealis',
    description: 'Nature\'s light show — painted across the polar sky.',
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof AccordionSlider> = {
  title: 'Effects/AccordionSlider',
  component: AccordionSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A cinematic accordion of image panels that expand on hover or click. ' +
          'Supports horizontal and vertical layouts, controlled/uncontrolled modes, ' +
          'and fully customisable transitions.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the panels',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    trigger: {
      control: 'radio',
      options: ['hover', 'click'],
      description: 'What user action expands a panel',
      table: { defaultValue: { summary: 'hover' } },
    },
    defaultActiveIndex: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Initially active panel index',
      table: { defaultValue: { summary: '0' } },
    },
    expandedFlex: {
      control: { type: 'range', min: 2, max: 10, step: 0.5 },
      description: 'flex-grow value for the expanded panel',
      table: { defaultValue: { summary: '5' } },
    },
    gap: {
      control: { type: 'range', min: 0, max: 32, step: 2 },
      description: 'Gap between panels (px)',
      table: { defaultValue: { summary: '8' } },
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 40, step: 2 },
      description: 'Border radius of panels (px)',
      table: { defaultValue: { summary: '16' } },
    },
    height: {
      control: 'text',
      description: 'Container height (any CSS value)',
      table: { defaultValue: { summary: '70vh' } },
    },
    transitionDuration: {
      control: { type: 'range', min: 100, max: 1500, step: 50 },
      description: 'Transition duration in ms',
      table: { defaultValue: { summary: '600' } },
    },
    items: { table: { disable: true } },
    renderPanel: { table: { disable: true } },
    onActiveChange: { table: { disable: true } },
    activeIndex: { table: { disable: true } },
    mobileBreakpoint: { table: { disable: true } },
  },
  args: {
    items: SAMPLE_ITEMS,
  },
};

export default meta;
type Story = StoryObj<typeof AccordionSlider>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** The default horizontal layout — hover over any panel to expand it. */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    trigger: 'hover',
    defaultActiveIndex: 0,
    height: '70vh',
    gap: 8,
    borderRadius: 16,
    expandedFlex: 5,
    transitionDuration: 600,
  },
};

/** Click-to-expand variant — ideal for touch devices. */
export const ClickTrigger: Story = {
  name: 'Click Trigger',
  args: {
    orientation: 'horizontal',
    trigger: 'click',
    defaultActiveIndex: 2,
    height: '65vh',
    gap: 12,
    borderRadius: 20,
    transitionDuration: 500,
  },
};

/** Vertical stacking mode — great for mobile-first layouts. */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    trigger: 'hover',
    defaultActiveIndex: 1,
    height: 'auto',
    gap: 6,
    borderRadius: 12,
    transitionDuration: 500,
    collapsedHeight: '60px',
    expandedHeight: '280px',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'In vertical mode, panels stack on top of each other. ' +
          'The container height is driven by `collapsedHeight` and `expandedHeight` per panel.',
      },
    },
  },
};

/** Tighter gaps, sharper corners — a minimal editorial look. */
export const EditorialMinimal: Story = {
  name: 'Editorial / Minimal',
  args: {
    orientation: 'horizontal',
    trigger: 'hover',
    gap: 2,
    borderRadius: 4,
    expandedFlex: 6,
    height: '75vh',
    transitionDuration: 800,
    transitionEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

/** Slow dramatic transition for a cinematic, film-like feel. */
export const CinematicSlow: Story = {
  name: 'Cinematic Slow',
  args: {
    orientation: 'horizontal',
    trigger: 'hover',
    transitionDuration: 1200,
    transitionEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expandedFlex: 7,
    gap: 10,
    borderRadius: 24,
    height: '80vh',
  },
};

/** Three panels only — a common design pattern. */
export const ThreePanels: Story = {
  name: 'Three Panels',
  args: {
    items: SAMPLE_ITEMS.slice(0, 3),
    orientation: 'horizontal',
    trigger: 'hover',
    height: '60vh',
    gap: 8,
    borderRadius: 16,
    expandedFlex: 5,
    transitionDuration: 600,
  },
};

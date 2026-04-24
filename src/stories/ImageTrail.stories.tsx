import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageTrail } from '../effects/image-trail';

// ── Local image imports (Vite resolves these at build time) ───────────────────
import imgMountain from './assets/nature-01-mountain.jpg';
import imgOcean from './assets/nature-02-ocean.jpg';
import imgForest from './assets/nature-03-forest.jpg';
import imgDesert from './assets/nature-04-desert.jpg';
import imgAurora from './assets/nature-05-aurora.jpg';
import imgValley from './assets/nature-06-valley.jpg';
import portrait01 from './assets/portrait-01.jpg';
import portrait02 from './assets/portrait-02.jpg';
import portrait03 from './assets/portrait-03.jpg';
import portrait04 from './assets/portrait-04.jpg';
import portrait05 from './assets/portrait-05.jpg';

// ── Sample image sets ─────────────────────────────────────────────────────────

const NATURE_IMAGES = [
  imgMountain,
  imgOcean,
  imgForest,
  imgDesert,
  imgAurora,
  imgValley
];

// const NATURE_IMAGES = [
//   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
//   'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80',
//   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80',
//   'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
//   'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
//   'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
// ];

const PORTRAIT_IMAGES = [
  portrait01,
  portrait02,
  portrait03,
  portrait04,
  portrait05
]

// const PORTRAIT_IMAGES = [
//   'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
//   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
//   'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
//   'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
//   'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80',
// ];

// Shared inner content for the trail zone
const heroContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '16px',
      userSelect: 'none',
    }}
  >
    <h2
      style={{
        fontFamily: 'var(--rce-font-family, system-ui)',
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 700,
        color: '#eae7e2',
        letterSpacing: '-0.03em',
        margin: 0,
        textAlign: 'center',
      }}
    >
      Move your cursor
    </h2>
    <p
      style={{
        fontFamily: 'var(--rce-font-family, system-ui)',
        color: '#5a5a5e',
        fontSize: '1rem',
        margin: 0,
      }}
    >
      Images trail behind your pointer
    </p>
  </div>
);

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof ImageTrail> = {
  title: 'Effects/ImageTrail',
  component: ImageTrail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A pointer-tracking effect that spawns image (or colour) tiles as the ' +
          'cursor moves across the region. Images fade out after a configurable duration. ' +
          'Works with any children as the interactive area content.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', background: '#0f0f12' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    poolSize: {
      control: { type: 'range', min: 5, max: 40, step: 1 },
      description: 'Number of pre-allocated trail elements',
      table: { defaultValue: { summary: '20' } },
    },
    threshold: {
      control: { type: 'range', min: 10, max: 200, step: 5 },
      description: 'Min cursor travel (px) before spawning next item',
      table: { defaultValue: { summary: '60' } },
    },
    trailWidth: {
      control: { type: 'range', min: 60, max: 400, step: 10 },
      description: 'Width of each trail item (px)',
      table: { defaultValue: { summary: '160' } },
    },
    trailHeight: {
      control: { type: 'range', min: 60, max: 500, step: 10 },
      description: 'Height of each trail item (px)',
      table: { defaultValue: { summary: '200' } },
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 50, step: 2 },
      description: 'Border radius of trail items (px)',
      table: { defaultValue: { summary: '10' } },
    },
    initialOpacity: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
      description: 'Initial opacity when item spawns',
      table: { defaultValue: { summary: '0.85' } },
    },
    fadeDuration: {
      control: { type: 'range', min: 200, max: 2000, step: 50 },
      description: 'Fade-out animation duration (ms)',
      table: { defaultValue: { summary: '800' } },
    },
    initialScale: {
      control: { type: 'range', min: 0.3, max: 1.5, step: 0.05 },
      description: 'Scale factor when item spawns',
      table: { defaultValue: { summary: '0.8' } },
    },
    rotationRange: {
      control: { type: 'range', min: 0, max: 45, step: 1 },
      description: '±Rotation range in degrees',
      table: { defaultValue: { summary: '10' } },
    },
    hideCursor: {
      control: 'boolean',
      description: 'Hide native cursor inside the region',
      table: { defaultValue: { summary: 'true' } },
    },
    images: { table: { disable: true } },
    colors: { table: { disable: true } },
    children: { table: { disable: true } },
    renderTrailItem: { table: { disable: true } },
  },
  args: {
    images: NATURE_IMAGES,
    children: heroContent,
  },
};

export default meta;
type Story = StoryObj<typeof ImageTrail>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default nature images trail — move your cursor to see the effect. */
export const NatureImages: Story = {
  name: 'Nature Images',
  args: {
    images: NATURE_IMAGES,
    poolSize: 20,
    threshold: 60,
    trailWidth: 160,
    trailHeight: 200,
    borderRadius: 10,
    initialOpacity: 0.85,
    fadeDuration: 800,
    initialScale: 0.8,
    rotationRange: 10,
    hideCursor: true,
  },
};

/** Portrait photography trail — taller aspect ratio items. */
export const PortraitImages: Story = {
  name: 'Portrait Images',
  args: {
    images: PORTRAIT_IMAGES,
    trailWidth: 140,
    trailHeight: 200,
    borderRadius: 140,
    rotationRange: 5,
    threshold: 50,
    fadeDuration: 1000,
  },
};

/** Colour swatches — no images, just vibrant CSS colours. */
export const ColorSwatches: Story = {
  name: 'Colour Swatches (no images)',
  args: {
    images: undefined,
    colors: ['#e85d3a', '#3a6de8', '#3ae8a1', '#e8c93a', '#9b3ae8', '#e83a9b'],
    trailWidth: 80,
    trailHeight: 80,
    borderRadius: 50,
    rotationRange: 0,
    threshold: 30,
    fadeDuration: 600,
    poolSize: 25,
  },
};

/** Dense trail with many small items and very low threshold. */
export const DenseSmall: Story = {
  name: 'Dense & Small',
  args: {
    images: NATURE_IMAGES,
    trailWidth: 80,
    trailHeight: 100,
    threshold: 20,
    poolSize: 35,
    borderRadius: 8,
    fadeDuration: 600,
    rotationRange: 15,
    initialScale: 0.6,
  },
};

/** Slow large cards — dramatic, editorial feel. */
export const LargeEditorial: Story = {
  name: 'Large Editorial',
  args: {
    images: NATURE_IMAGES,
    trailWidth: 280,
    trailHeight: 380,
    threshold: 120,
    poolSize: 8,
    borderRadius: 4,
    fadeDuration: 1400,
    rotationRange: 4,
    initialOpacity: 0.95,
    initialScale: 0.9,
  },
};

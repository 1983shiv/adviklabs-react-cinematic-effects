import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorShift } from '../effects/color-shift';
import type { ColorShiftSection } from '../effects/color-shift';

// ── Shared section content helper ─────────────────────────────────────────────

function SectionContent({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 24px',
        minHeight: 'inherit',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.5,
          marginBottom: 20,
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          maxWidth: 600,
          marginBottom: 12,
        }}
      >
        {heading}
      </h2>
      <p style={{ fontSize: 17, opacity: 0.6, maxWidth: '48ch', lineHeight: 1.5 }}>
        {body}
      </p>
    </div>
  );
}

// ── Palette sets ──────────────────────────────────────────────────────────────

const DARK_PALETTES: ColorShiftSection[] = [
  {
    bg: '#0a0a0b',
    text: '#eae7e2',
    children: (
      <SectionContent
        label="Scroll Color Shift"
        heading="The page changes colour as you scroll"
        body="Background and text transition smoothly between palettes as each section enters view."
      />
    ),
  },
  {
    bg: '#1a0d08',
    text: '#f0e8df',
    children: (
      <SectionContent
        label="Warm"
        heading="Chapter one — Amber"
        body="A warm amber palette signals craft, heritage, and trust."
      />
    ),
  },
  {
    bg: '#081a12',
    text: '#dff0e8',
    children: (
      <SectionContent
        label="Forest"
        heading="Chapter two — Green"
        body="Deep green communicates growth, health, and sustainability."
      />
    ),
  },
  {
    bg: '#0d081a',
    text: '#e0dff0',
    children: (
      <SectionContent
        label="Night"
        heading="Chapter three — Violet"
        body="Cool violet carries creativity, innovation, and premium tech."
      />
    ),
  },
  {
    bg: '#0a0a0b',
    text: '#eae7e2',
    children: (
      <SectionContent
        label="Return"
        heading="Back to dark"
        body="Returning to the original palette closes the loop."
      />
    ),
  },
];

const LIGHT_FLIP_PALETTES: ColorShiftSection[] = [
  {
    bg: '#0a0a0b',
    text: '#eae7e2',
    children: (
      <SectionContent
        label="Start — Dark"
        heading="Begin in the dark"
        body="The story opens in a deep, focused dark palette."
      />
    ),
  },
  {
    bg: '#f5f3ef',
    text: '#1a1a1f',
    children: (
      <SectionContent
        label="Light"
        heading="Flip to light mid-page"
        body="Flipping to light mode resets attention and signals a shift in tone — from storytelling to action."
      />
    ),
  },
  {
    bg: '#0a0a0b',
    text: '#eae7e2',
    children: (
      <SectionContent
        label="Return"
        heading="Back to dark"
        body="Returning to the original palette completes the journey."
      />
    ),
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Effects/ColorShift',
  component: ColorShift,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    transitionDuration: {
      control: { type: 'range', min: 0, max: 2000, step: 50 },
    },
    transitionEasing: {
      control: 'select',
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
    },
    triggerOffset: {
      control: { type: 'range', min: 0, max: 0.49, step: 0.01 },
    },
    sectionMinHeight: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ColorShift>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default — five dark-palette chapters ─────────────────────────────────────

export const Default: Story = {
  args: {
    sections: DARK_PALETTES,
    transitionDuration: 800,
    transitionEasing: 'ease',
    triggerOffset: 0.4,
    sectionMinHeight: '100dvh',
  },
};

// ── Light flip — dark → light → dark ─────────────────────────────────────────

export const LightFlip: Story = {
  name: 'Light Flip',
  args: {
    sections: LIGHT_FLIP_PALETTES,
    transitionDuration: 600,
    transitionEasing: 'ease-in-out',
    triggerOffset: 0.4,
    sectionMinHeight: '100dvh',
  },
};

// ── Fast snap — very short transition ────────────────────────────────────────

export const FastSnap: Story = {
  name: 'Fast Snap',
  args: {
    sections: DARK_PALETTES,
    transitionDuration: 150,
    transitionEasing: 'ease-out',
    triggerOffset: 0.35,
    sectionMinHeight: '100dvh',
  },
};

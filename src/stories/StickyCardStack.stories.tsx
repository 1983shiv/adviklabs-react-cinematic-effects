import type { Meta, StoryObj } from '@storybook/react-vite';
import { StickyCardStack } from '../effects/sticky-card-stack';

const meta = {
  title: 'Effects/StickyCardStack',
  component: StickyCardStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    stickyTop: { control: { type: 'range', min: 0, max: 300, step: 10 } },
    initialTopOffset: { control: { type: 'range', min: 40, max: 200, step: 10 } },
    peekOffset: { control: { type: 'range', min: 0, max: 60, step: 5 } },
    cardMinHeight: { control: { type: 'range', min: 180, max: 500, step: 20 } },
    cardBorderRadius: { control: { type: 'range', min: 0, max: 40, step: 4 } },
    cardMarginBottom: { control: { type: 'range', min: 8, max: 80, step: 4 } },
    scaledScale: { control: { type: 'range', min: 0.5, max: 1, step: 0.05 } },
    scaledOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyCardStack>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Career Journey (B) ──────────────────────────────────────────────────────

const careerItems = [
  { id: '1', number: 'Stage 01', title: 'Foundation', description: 'Core skills, mentorship, and building a portfolio of small wins. Curiosity outweighs ego. Every mistake is a lesson in disguise.' },
  { id: '2', number: 'Stage 02', title: 'Specialisation', description: 'Deep dive into one craft — frontend, infrastructure, or product thinking. You start saying no to things that distract from mastery.' },
  { id: '3', number: 'Stage 03', title: 'Leadership', description: 'You ship less code and grow more people. Reviews, RFCs, and 1:1s replace ticket queues. Your success is measured by your team\'s output.' },
  { id: '4', number: 'Stage 04', title: 'Strategy', description: 'Roadmaps, OKRs, and cross-functional influence. You connect engineering decisions to business outcomes. The "how" matters less than the "why".' },
  { id: '5', number: 'Stage 05', title: 'Legacy', description: 'You build the thing that outlasts you — a platform, a culture, a community. Your name appears in commit logs less, but your impact compounds.' },
];

export const CareerJourney: Story = {
  name: 'Career Journey',
  args: {
    items: careerItems,
    sectionLabel: 'Career progression',
  },
};

export const CareerJourneyNoScale: Story = {
  name: 'Career Journey — No Scale',
  args: {
    items: careerItems,
    sectionLabel: 'Career progression',
    scaleOnScroll: false,
  },
};

// ── Product Launch (A) ──────────────────────────────────────────────────────

const productItems = [
  { id: '1', number: 'Phase 01', title: 'Research & Discovery', description: 'User interviews, competitive audits, and market analysis. We identify pain points and opportunities before writing a single line of code.' },
  { id: '2', number: 'Phase 02', title: 'MVP Sprint', description: 'Two-week build cycles focused on the core value proposition. Ship fast, validate assumptions, and iterate based on real user feedback.' },
  { id: '3', number: 'Phase 03', title: 'Beta & Polish', description: 'Closed beta with power users. Performance tuning, edge-case fixes, and UX refinements based on session recordings and heatmaps.' },
  { id: '4', number: 'Phase 04', title: 'Public Launch', description: 'Coordinated release across web, email, and social. Monitoring dashboards live, incident response on standby, champagne on ice.' },
  { id: '5', number: 'Phase 05', title: 'Growth Loop', description: 'Retention analytics, conversion optimisation, and feature discovery. Every metric feeds back into the next research phase.' },
];

export const ProductLaunch: Story = {
  name: 'Product Launch',
  args: {
    items: productItems,
    sectionLabel: 'Product roadmap',
  },
};

// ── Design Sprint (C) ──────────────────────────────────────────────────────

const designItems = [
  { id: '1', number: 'Day 01', title: 'Understand', description: 'Map the problem space. Stakeholder interviews, user journey mapping, and "how might we" statements. Define what success looks like in measurable terms.' },
  { id: '2', number: 'Day 02', title: 'Diverge', description: 'Crazy 8s, storyboards, and rapid sketching. Every idea gets a wall space. The goal is volume — critique comes later, creation comes now.' },
  { id: '3', number: 'Day 03', title: 'Converge', description: 'Dot voting, heat maps, and the "supervote". One concept emerges. A single prototype direction gets the green light and a dedicated owner.' },
  { id: '4', number: 'Day 04', title: 'Prototype', description: 'High-fidelity mockup with real data. No pixel-perfect — just enough fidelity to test the core hypothesis with five real users tomorrow.' },
  { id: '5', number: 'Day 05', title: 'Test & Iterate', description: 'Five user interviews back-to-back. Patterns emerge by session three. You walk away with a validated concept, a kill decision, or a clear pivot.' },
];

export const DesignSprint: Story = {
  name: 'Design Sprint',
  args: {
    items: designItems,
    sectionLabel: 'Sprint schedule',
  },
};

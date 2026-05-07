import type { Meta, StoryObj } from "@storybook/react-vite"
import { FlipCards } from "../effects/flip-cards"
import type { FlipCardItem } from "../effects/flip-cards"

// const SAMPLE_ITEMS: FlipCardItem[] = [
//     {
//     id: '1',
//     icon: '▲',
//     title: 'Strategy',
//     subtitle: 'Positioning and market fit',
//     description: 'We spend the first two weeks in research. Competitive teardowns, user interviews, and a positioning document that becomes the north star.',
//     linkLabel: 'Learn more',
//   },
//   {
//     id: '2',
//     icon: '◆',
//     title: 'Design',
//     subtitle: 'Interface and experience',
//     description: 'Component library, interaction patterns, and motion principles. We design in the browser so what you review is what ships.',
//     linkLabel: 'Learn more',
//   },
//   {
//     id: '3',
//     icon: '■',
//     title: 'Development',
//     subtitle: 'Production-grade code',
//     description: 'TypeScript, edge functions, CI/CD from commit one. Every route pre-rendered, every image optimised.',
//     linkLabel: 'Learn more',
//   },
//   {
//     id: '4',
//     icon: '★',
//     title: 'Growth',
//     subtitle: 'Analytics and iteration',
//     description: 'Fortnightly sprint cycles with data reviews. A/B tests, funnel analysis, and conversion optimisation.',
//     linkLabel: 'Learn more',
//   },
// ]

const SAMPLE_ITEMS: FlipCardItem[] = [
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

const meta: Meta<typeof FlipCards> = {
    title: 'Effects/FlipCards',
    component: FlipCards,
    parameters: { layout: 'padded'},
    args: { items: SAMPLE_ITEMS}
}

export default meta;
type Story = StoryObj<typeof FlipCards>;

export const HoverTrigger: Story = {
  args: { trigger: 'hover' },
};

export const ClickTrigger: Story = {
  args: { trigger: 'click' },
};

export const BothTriggers: Story = {
  args: { trigger: 'both' },
};

export const TwoColumns: Story = {
  args: { columns: 'repeat(2, 1fr)' },
};
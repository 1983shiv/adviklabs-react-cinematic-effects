import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypeWriter } from '../effects/type-writer';

const meta = {
    title: 'Effects/TypeWriter',
    component: TypeWriter,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['cycler', 'code', 'chat'],
        },
        typeSpeed: { control: { type: 'range', min: 10, max: 200, step: 5 } },
        deleteSpeed: { control: { type: 'range', min: 5, max: 100, step: 5 } },
        pauseFrames: { control: { type: 'range', min: 5, max: 100, step: 1 } },
        betweenPhraseDelay: {
            control: { type: 'range', min: 100, max: 2000, step: 50 },
        },
        showCursor: { control: 'boolean' },
        cursorColor: { control: 'color' },
        cursorWidth: { control: { type: 'range', min: 1, max: 8, step: 1 } },
        codeMinDelay: { control: { type: 'range', min: 5, max: 100, step: 5 } },
        codeMaxDelay: {
            control: { type: 'range', min: 10, max: 200, step: 5 },
        },
        codeIntersectionThreshold: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
        },
        chatInitialOffset: {
            control: { type: 'range', min: 0, max: 2000, step: 100 },
        },
    },
} satisfies Meta<typeof TypeWriter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default — Cycler ──────────────────────────────────────────────────────────

export const Default: Story = {
    name: 'Cycler (default)',
    args: {
        variant: 'cycler',
        phrases: [
            'We craft digital experiences.',
            'We define modern brands.',
            'We architect future products.',
            'We earn lasting trust.',
        ],
        typeSpeed: 60,
        deleteSpeed: 30,
        pauseFrames: 40,
        betweenPhraseDelay: 400,
        showCursor: true,
        cursorColor: '#c8a97e',
        cursorWidth: 3,
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    fontSize: 'clamp(24px, 4vw, 48px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#D4AF37',
                    fontFamily: 'system-ui, sans-serif',
                    minWidth: '20ch',
                    textAlign: 'center',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

// ── Code block typewriter ─────────────────────────────────────────────────────

export const CodeBlock: Story = {
    name: 'Code Block',
    args: {
        variant: 'code',
        codeText: `$(document).ready(function() { alert("🚀 Party like it's 2006! The DOM is locked and loaded."); });`,
        codeMinDelay: 20,
        codeMaxDelay: 60,
        codeIntersectionThreshold: 0.5,
    },
    decorators: [
        (Story) => (
            <div
                style={
                    {
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#D4AF37',
                        background: '#111114',
                        border: '1px solid #1e1e22',
                        borderRadius: 12,
                        padding: 32,
                        width: 'min(560px, 90vw)',
                        '--rce-tw-code-font': "'JetBrains Mono', monospace",
                    } as React.CSSProperties
                }
            >
                <Story />
            </div>
        ),
    ],
};

// ── Chat sequence ─────────────────────────────────────────────────────────────

export const ChatSequence: Story = {
    name: 'Chat Sequence',
    args: {
        variant: 'chat',
        messages: [
            {
                text: 'How are you guys handling cinematic animations in React lately?',
                role: 'user',
                delay: 0,
            },
            {
                text: 'Mostly custom hooks, but the bundle size is getting out of hand.',
                role: 'bot',
                delay: 1200,
            },
            {
                text: 'Same. Need something high-perf that doesn’t require a PhD in physics.',
                role: 'user',
                delay: 2600,
            },
            {
                text: 'Check out AdvikLabs. It’s tree-shakable and actually feels cinematic.',
                role: 'bot',
                delay: 3800,
            },
        ],
        chatInitialOffset: 500,
    },
    decorators: [
        (Story) => (
            <div
                style={
                    {
                        width: 'min(500px, 90vw)',
                        fontFamily: 'system-ui, sans-serif',
                        color: '#D4AF37',
                        '--rce-tw-bubble-user-bg': '#1e1e22',
                        '--rce-tw-bubble-bot-bg': 'rgba(235, 180, 100, 0.08)',
                        '--rce-tw-bubble-bot-border': 'rgba(200,169,126,0.15)',
                    } as React.CSSProperties
                }
            >
                <Story />
            </div>
        ),
    ],
};

// ── Fast cycler — terminal feel ───────────────────────────────────────────────

export const TerminalCycler: Story = {
    name: 'Terminal Cycler',
    args: {
        variant: 'cycler',
        phrases: [
            '> Syncing state...',
            '> Injecting motion...',
            '> Optimizing frames...',
            '> Deploying to edge...',
            '> Production ready. ✨',
        ],
        typeSpeed: 35,
        deleteSpeed: 15,
        pauseFrames: 60,
        betweenPhraseDelay: 200,
        showCursor: true,
        cursorColor: '#00ff88',
        cursorWidth: 2,
    },
    decorators: [
        (Story) => (
            <div
                style={
                    {
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#D4AF37',
                        background: '#0a0a0b',
                        border: '1px solid #1e1e22',
                        borderRadius: 8,
                        padding: '24px 32px',
                        minWidth: '30ch',
                        '--rce-tw-cursor-color': '#00ff88',
                    } as React.CSSProperties
                }
            >
                <Story />
            </div>
        ),
    ],
};

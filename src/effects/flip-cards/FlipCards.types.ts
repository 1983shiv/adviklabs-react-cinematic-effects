import type { CSSProperties, ReactNode } from 'react';
import type { BaseEffectProps } from '../../core/types/common';

/**
 * Data for a single flip card
 */

export interface FlipCardItem {
    // Unique Identifier
    id: string;
    // Optional icon shown at the top of the front face
    icon?: ReactNode;
    // Front Face Heading
    title: string;
    // Front face sub title
    subtitle?: string;
    // Back face heading - default to 'title' if omitted
    backTitle?: string;
    // back face body text
    description?: string;
    // optional link label on the back face
    linkLabel?: string;
    // CSS background for the front face (overrides default)
    frontBackground?: string;
    // CSS background for the back face (overrides accent to token)
    backBackground?: string;
}

// CSS Custom Properties injected on the grid container
export interface FlipCardsCSSVars extends CSSProperties {
    '--rce-fc-perspective'?: string;
    '--rce-fc-height'?: string;
    '--rce-fc-radius'?: string;
    '--rce-fc-gap'?: string;
    '--rce-fc-duration'?: string;
    '--rce-fc-easing'?: string;
    '--rce-fc-columns'?: string;
}

// Props for the FlipCards Components
export interface FlipCardsProps extends BaseEffectProps {
    // Array of card data to render
    items: FlipCardItem[];
    /**
     * Interaction that trigger the flip
     * - `'hover'` - CSS-only hover flip(default)
     * - `'click'` - Click/tap toggles the card
     * - `'both'` - hover/flips and click toggle
     */
    trigger?: 'hover' | 'click' | 'both';
    // Card height (CSS vale) - default '320px'
    cardHeight?: string;
    // 3D perspective depth in px - default 800px
    perspective?: number;
    // Card border radius in px - default 20
    borderRadius?: number;
    /** Gap between cards in px — default 20 */
    gap?: number;
    /**
     * Minimum column width for the auto-fit grid — default '260px'.
     * Ignored when `columns` is provided.
     */
    minColumnWidth?: string;
    /**
     * Explicit CSS `grid-template-columns` value.
     * Overrides `minColumnWidth` when set.
     */
    columns?: string;
    /** Flip transition duration in ms — default 600 */
    transitionDuration?: number;
    /** Flip transition easing — default 'cubic-bezier(0.16, 1, 0.3, 1)' */
    transitionEasing?: string;
    /** Custom renderer for the front face — receives the item and its index */
    renderFront?: (item: FlipCardItem, index: number) => ReactNode;
    /** Custom renderer for the back face — receives the item and its index */
    renderBack?: (item: FlipCardItem, index: number) => ReactNode;
}

/// <reference types="vite/client" />

// ── Static asset type declarations ────────────────────────────────────────────
// Vite resolves these to URLs at build/dev time; TypeScript needs to know
// they export a `string` so imports like `import img from './foo.jpg'` compile.

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

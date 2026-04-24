// ── Static asset declarations for Storybook stories ───────────────────────────
// The main tsconfig.json excludes *.stories.tsx from compilation (to keep the
// library build clean), which means vite-env.d.ts is not visible when
// TypeScript checks these files. Placing the declarations here ensures they
// are always in scope for any file inside the stories directory.

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

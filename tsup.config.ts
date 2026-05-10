import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'effects/accordion-slider': 'src/effects/accordion-slider/index.ts',
    'effects/image-trail': 'src/effects/image-trail/index.ts',
    'effects/sticky-stack': 'src/effects/sticky-stack/index.ts',
    'effects/flip-cards': 'src/effects/flip-cards/index.ts',
    'effects/circular-text': 'src/effects/circular-text/index.ts',
    'effects/color-shift': 'src/effects/color-shift/index.ts',
    core: 'src/core/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
});

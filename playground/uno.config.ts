import { defineTokenSystem } from '@crbroughton/unocss-token-system'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    defineTokenSystem({
      name: 'token-system',
      allowArbitraryValues: true,
      spacing: {
        xss: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      rounded: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '32px',
        full: '9999px',
      },
      typography: {
        fonts: {
          sans: '"Inter", sans-serif',
          mono: '"Fira Code", monospace',
        },
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
        },
        weights: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeights: {
          none: 1,
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75,
        },
      },
      effects: {
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
        opacity: {
          0: 0,
          50: 0.5,
          75: 0.75,
          100: 1,
        },
      },
      sizes: {
        xss: '20px',
        xs: '40px',
        sm: '80px',
        md: '160px',
        lg: '320px',
        xl: '640px',
      },
      borderWidths: {
        thin: '1px',
        normal: '2px',
        thick: '4px',
      },
      colors: {
        background: {
          themes: {
            light: '#FFFFFF',
            dark: '#121212',
            forest: '#1B4332',
            ocean: '#1A374D',
          },
        },
        primary: {
          themes: {
            light: '#B74F6F',
            dark: '#E67A9E',
            forest: '#95D5B2',
            ocean: '#7BB5E3',
          },
        },
        secondary: {
          themes: {
            light: '#334155',
            dark: '#64748B',
            forest: '#3F6F6F',
            ocean: '#0EA5E9',
          },
        },
        text: {
          themes: {
            light: '#000000',
            dark: '#FFFFFF',
            forest: '#98FB98',
            ocean: '#87CEEB',
          },
        },
      },
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})

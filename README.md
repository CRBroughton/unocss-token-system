# UnoCSS Token System

A simple and flexible token system for UnoCSS, allowing you to define and manage your design tokens while providing utility classes for spacing, colours, sizes, and more.

## Installation

```bash
npm install @crbroughton/unocss-token-system
```

## Usage

```typescript
import { defineTokenSystem } from '@crbroughton/unocss-token-system'
import { defineConfig } from 'unocss'

const preset = defineTokenSystem({
  name: 'my-design-system',
  zindex: {
    10: 10,
    20: 20,
    '-20': '-20',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  rounded: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  sizes: {
    sm: '100px',
    md: '200px',
    lg: '300px',
    full: '100%',
  },
colors: {
    // Theme colours generate dynamic utilities that use CSS variables.
    // The preset will create a preflight that injects CSS variables for the default
    // theme (applied on :root) and additional themes using a corresponding class.
    primary: {
      themes: {
        light: '#ffffff',
        dark: '#111111',
        forest: '#2f4f4f',
        ocean: '#000080',
      },
    },
    secondary: {
      themes: {
        light: '#334155',
        dark: '#222222',
        forest: '#2f4f4f',
        ocean: '#000080',
      },
    },
  },
  allowArbitraryValues: true,
})

export default defineConfig({
  presets: [
    preset,
    // ... other presets
  ],
})
```

## Features

Here's a comparison table of Tailwind features and our current support status:

| Category | Feature | Supported | Notes |
|----------|---------|-----------|--------|
| Layout | Flexbox | ✅ | Full flexbox support including display, direction, wrap, justify, align |
| Layout | Grid | ✅ | Complete grid support with templates, auto-flow, spans |
| Layout | Position | ✅ | Static, fixed, absolute, relative, sticky |
| Layout | Top/Right/Bottom/Left | ✅ | Uses spacing tokens |
| Layout | Z-index | ✅ | Uses zindex tokens |
| Spacing | Margin | ✅ | All directions, auto values, uses spacing tokens |
| Spacing | Padding | ✅ | All directions, uses spacing tokens |
| Spacing | Gap | ✅ | Uses spacing tokens for grid/flex gap |
| Colors | Background | ✅ | Multi-theme support |
| Colors | Text | ✅ | Multi-theme support |
| Borders | Width | ✅ | Uses border tokens |
| Borders | Color | ✅ | Multi-theme support |
| Borders | Style | ✅ | Solid, dashed, dotted, none |
| Borders | Radius | ✅ | Uses rounded tokens |
| Outlines | Width | ✅ | Uses border tokens |
| Outlines | Color | ✅ | Multi-theme support |
| Outlines | Style | ✅ | Solid, dashed, dotted, none |
| Sizing | Width | ✅ | Uses size tokens |
| Sizing | Height | ✅ | Uses size tokens |
| Typography | Font Family | ✅ | Uses font tokens |
| Typography | Font Size | ✅ | Uses size tokens |
| Typography | Font Weight | ✅ | Uses weight tokens |
| Typography | Line Height | ✅ | Uses line height tokens |
| Typography | Text Align | ✅ | Left, center, right, justify |
| Effects | Box Shadow | ✅ | Uses shadow tokens |
| Effects | Opacity | ✅ | Uses opacity tokens |
| Transforms | Scale/Rotate/Translate | ❌ | Not implemented yet |
| Transitions | Duration/Timing/Property | ❌ | Not implemented yet |
| Interactivity | Cursor | ❌ | Not implemented yet |
| Interactivity | User Select | ❌ | Not implemented yet |
| State Variants | Hover/Focus/Active | ✅ | Supports grouped variants like hover:(bg-primary) |
| State Variants | Disabled/Checked | ✅ | Supports disabled and checked states |
| Responsive | Breakpoints | ❌ | Not implemented yet |
| Theme Support | Multi-theme | ✅ | Supports arbitrary number of themes |
| Arbitrary Values | Square Brackets | ✅ | Optional feature for all supported properties |

## Options

```typescript
interface PresetOptions {
  name: string;                                        // Name of your design system
  zindex: Record<string, string | number>;            // z-index tokens
  spacing?: Record<string, string | number>;          // Spacing tokens
  rounded?: Record<string, string | number>;          // Border radius tokens
  sizes?: Record<string, string | number>;            // Width/height tokens
  colors?: Record<string, Record<string, string>>; // Color tokens
  allowArbitraryValues?: boolean;                     // Enable arbitrary values
}
```

## License

MIT License

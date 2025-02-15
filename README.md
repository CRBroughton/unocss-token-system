# UnoCSS Token System

A simple and flexible token system for UnoCSS, allowing you to define and manage your design tokens while providing utility classes for spacing, colors, sizes, and more.

## Installation

```bash
npm install @crbroughton/unocss-token-system
```

## Usage

```typescript
import { defineDesignSystem } from '@crbroughton/unocss-token-system'
import { defineConfig } from 'unocss'

const preset = defineDesignSystem({
  name: 'my-design-system',
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
    primary: {
      50: '#f8fafc',
      900: '#0f172a',
    },
    text: 'black',
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

### Spacing Utilities
- Margins: `m-{size}`, `mt-{size}`, `mb-{size}`, `ml-{size}`, `mr-{size}`, `mx-{size}`, `my-{size}`
- Paddings: `p-{size}`, `pt-{size}`, `pb-{size}`, `pl-{size}`, `pr-{size}`, `px-{size}`, `py-{size}`
- Auto margins: `m-auto`, `mt-auto`, `mx-auto`, etc.

### Border Radius
- `rounded-{size}`

### Sizing
- Width: `w-{size}`
- Height: `h-{size}`

### Colors
- Background: `bg-{color}` or `bg-{color}-{shade}`
- Text: `text-{color}` or `text-{color}-{shade}`

### Flexbox Utilities
- Display: `flex`, `inline-flex`
- Direction: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
- Wrap: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`
- Justify Content: `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly`
- Align Items: `items-start`, `items-end`, `items-center`, `items-baseline`, `items-stretch`
- Align Self: `self-start`, `self-end`, `self-center`, `self-baseline`, `self-stretch`
- Flex Properties: `flex-1`, `flex-auto`, `flex-initial`, `flex-none`, `grow`, `grow-0`, `shrink`, `shrink-0`

### State Modifiers
Group multiple utilities under state modifiers:
- `hover:(bg-primary-50 rounded-md)`
- `focus:(p-md m-lg)`
- `active:(flex items-center)`

### Arbitrary Values
When `allowArbitraryValues` is enabled:
- `p-[10px]`
- `m-[2rem]`
- `w-[50vw]`
- `rounded-[4px]`

## Options

```typescript
interface PresetOptions {
  name: string;                                        // Name of your design system
  spacing?: Record<string, string | number>;          // Spacing tokens
  rounded?: Record<string, string | number>;          // Border radius tokens
  sizes?: Record<string, string | number>;            // Width/height tokens
  colors?: Record<string, string | Record<string, string>>; // Color tokens
  allowArbitraryValues?: boolean;                     // Enable arbitrary values
}
```

## License

MIT License

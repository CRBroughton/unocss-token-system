import type { Preflight, Preset, Rule } from 'unocss'
import { createDefaultPositionRules } from './position'
import { createDefaultFlexRules } from './flex'
import { createDefaultGridRules } from './grid'
import { createSpacingRules } from './spacing'
import { createRoundedRules } from './rounded'
import { createDefaultSizesRules, createSizesRules } from './sizes'
import { createDefaultInteractivityRules } from './interactivity'
import { createZIndexRules } from './zindex'

export type TokenValue = string | number

export interface ThemeToken {
  themes: Record<string, string>
}

/**
 * Typography configuration for font-related utilities
 * @example
 * typography: {
 *   fonts: { sans: '"Inter", sans-serif' },    // creates font-sans
 *   sizes: { base: '16px' },                   // creates text-base
 *   weights: { bold: 700 },                    // creates font-bold
 *   lineHeights: { normal: 1.5 },              // creates leading-normal
 * }
 */
export interface TypographyConfig {
  fonts?: Record<string, string>
  sizes?: Record<string, string>
  weights?: Record<string, number>
  lineHeights?: Record<string, string | number>
}

/**
 * Effects configuration for shadows and opacity
 * @example
 * effects: {
 *   shadows: { sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }, // creates shadow-sm
 *   opacity: { 50: 0.5 },                             // creates opacity-50
 * }
 */
export interface EffectsConfig {
  shadows?: Record<string, string>
  opacity?: Record<string, number>
}

export interface PresetOptions {
  /** Name of the preset */
  name: string
  /**
   * Z-indexing tokens
   * @example
   * indexes: {
   *   10: 10,        // create z-10
   *   20: 20,        // creates z-20
   *   '-20: '-20',   // creates z-
   * }
   */
  zindex?: Record<string, TokenValue>
  /**
   * Spacing tokens for margin, padding, and gap utilities
   * @example
   * spacing: {
   *   sm: '8px',    // creates m-sm, p-sm, gap-sm
   *   md: '16px',   // creates m-md, p-md, gap-md
   * }
   * Generates:
   * - Margins: m-{token}, mt-{token}, mb-{token}, ml-{token}, mr-{token}, mx-{token}, my-{token}
   * - Padding: p-{token}, pt-{token}, pb-{token}, pl-{token}, pr-{token}, px-{token}, py-{token}
   * - Gap: gap-{token}, gap-x-{token}, gap-y-{token}
   */
  spacing?: Record<string, TokenValue>
  /**
   * Border radius tokens
   * @example
   * rounded: {
   *   sm: '4px', // creates rounded-sm
   *   md: '8px', // creates rounded-md
   * }
   * Generates:
   * - rounded-{token}
   */
  rounded?: Record<string, TokenValue>
  /**
   * Size tokens for width and height utilities
   * Note: 'full', 'w-screen', 'screen' and 'h-screen' are reserved
   * @example
   * sizes: {
   *   sm: '100px',  // creates w-sm, h-sm
   *   md: '200px',  // creates w-md, h-md
   * }
   * Generates:
   * - w-{token}
   * - h-{token}
   */
  sizes?: Record<string, TokenValue>
  /**
   * Color tokens with theme support
   * @example
   * colors: {
   *   primary: {
   *     themes: {
   *       light: '#ffffff',
   *       dark: '#000000'
   *     }
   *   }
   * }
   * Generates theme-aware utilities:
   * - bg-{color}
   * - text-{color}
   * - border-{color}
   * - outline-{color}
   */
  colors: Record<string, ThemeToken>
  /**
   * blur tokens
   * @example
   * blur: {
   *   sm: "8px",  // creates blur-sm
   *   md: "10px", // creates blur-md
   *   lg: "16px", // creates blur-lg
   * }
   */
  blur?: Record<string, TokenValue>
  /**
   * Border width tokens
   * @example
   * borderWidths: {
   *   thin: '1px',    // creates border-thin
   *   thick: '4px',   // creates border-thick
   * }
   * Generates:
   * - border-{token}
   * - border-t-{token}, border-r-{token}, border-b-{token}, border-l-{token}
   * - outline-{token}
   */
  borderWidths?: Record<string, TokenValue>
  /**
   * Typography configuration for font-related utilities
   * @example
   * typography: {
   *   fonts: { sans: '"Inter", sans-serif' },    // creates font-sans
   *   sizes: { base: '16px' },                   // creates text-base
   *   weights: { bold: 700 },                    // creates font-bold
   *   lineHeights: { normal: 1.5 },              // creates leading-normal
   * }
   */
  typography?: TypographyConfig
  /**
   * Effects configuration for shadows and opacity
   * @example
   * effects: {
   *   shadows: { sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }, // creates shadow-sm
   *   opacity: { 50: 0.5 },                             // creates opacity-50
   * }
   */
  effects?: EffectsConfig
  /**
   * Enable arbitrary values using square bracket notation
   * @example allowArbitraryValues: true
   * Enables:
   * - p-[20px]
   * - m-[30px]
   * - w-[500px]
   * etc.
   */
  allowArbitraryValues?: boolean
}

/**
 * Generate CSS for color tokens.
 *
 * For the default theme (assumed as 'light'), the CSS variables are defined on :root.
 * For every additional theme, a theme class is generated (e.g. .theme-dark).
 */
function generateColorCSS(
  colors: Record<string, ThemeToken>,
  defaultTheme = 'light',
) {
  // Build an object mapping each theme to its CSS variables.
  const themes: Record<string, Record<string, string>> = {}

  // Initialize the default theme.
  themes[defaultTheme] = {}

  // Iterate over each token.
  for (const tokenName in colors) {
    const token = colors[tokenName]

    if (!token)
      return

    // Set default theme value on :root.
    themes[defaultTheme][`--color-${tokenName}`]
      = token.themes[defaultTheme] || ''

    // Process any other themes defined for the token.
    for (const theme in token.themes) {
      if (theme === defaultTheme)
        continue
      if (!themes[theme])
        themes[theme] = {}
      themes[theme][`--color-${tokenName}`] = token.themes[theme]
    }
  }

  // Generate the CSS string.
  let css = ''

  // Default theme on :root.
  css += `:root {\n`
  for (const varName in themes[defaultTheme])
    css += `  ${varName}: ${themes[defaultTheme][varName]};\n`

  css += `}\n`

  // Other themes as classes.
  for (const theme in themes) {
    if (theme === defaultTheme)
      continue
    css += `.${theme} {\n`
    for (const varName in themes[theme])
      css += `  ${varName}: ${themes[theme][varName]};\n`

    css += `}\n`
  }

  return css
}

/**
 * Generate UnoCSS dynamic rules for color tokens.
 *
 * This registers rules for classes like:
 * - bg-<token> → { background-color: var(--color-<token>) }
 * - text-<token> → { color: var(--color-<token>) }
 * - border-<token> → { border-color: var(--color-<token>) }
 */
function generateDynamicRules(config: PresetOptions): Rule[] {
  const rules: Rule[] = []

  // Background color rule.
  rules.push([
    /^bg-([\w-]+)$/,
    ([, tokenName]) => {
      if (!tokenName)
        return

      if (tokenName in config.colors)
        return { 'background-color': `var(--color-${tokenName})` }
    },
    {
      // Suggest tokens prefixed with "bg-"
      autocomplete: Object.keys(config.colors).map(token => `bg-${token}`),
    },
  ])

  // Text color rule.
  rules.push([
    /^text-([\w-]+)$/,
    ([, tokenName]) => {
      if (!tokenName)
        return
      if (tokenName in config.colors)
        return { color: `var(--color-${tokenName})` }
    },
    {
      // Suggest tokens prefixed with "text-"
      autocomplete: Object.keys(config.colors).map(token => `text-${token}`),
    },
  ])

  // Border color rule.
  rules.push([
    /^border-([\w-]+)$/,
    ([, tokenName]) => {
      if (!tokenName)
        return
      if (tokenName in config.colors)
        return { 'border-color': `var(--color-${tokenName})` }
    },
    {
      // Suggest tokens prefixed with "border-"
      autocomplete: Object.keys(config.colors).map(token => `border-${token}`),
    },
  ])

  return rules
}
// TODO - add the missing below params (docs)

/**
 * Creates a UnoCSS preset with customizable tokens and utilities
 * @param {PresetOptions} options - Configuration options
 * @param {string} options.name - Name of the token system preset
 * @param {Record<string, string | number>} [options.zindex] - Z-index tokens
 * @param {Record<string, string | number>} [options.spacing] - Spacing tokens for margin and padding utilities
 * @param {Record<string, string | number>} [options.rounded] - Border radius tokens
 * @param {Record<string, string | number>} [options.sizes] - Size tokens for width and height utilities
 * @param {Record<string, string | Record<string, string>>} [options.colors] - Color tokens for background and text utilities
 * @param {boolean} [options.allowArbitraryValues] - Enable arbitrary values using square bracket notation (e.g., p-[10px])
 * @returns {Preset} UnoCSS preset with generated utilities
 *
 * @example
 * ```ts
 * const preset = defineTokenSystem({
 *   name: 'my-token-system',
 *   spacing: {
 *     sm: '8px',
 *     md: '16px',
 *   },
 *   colors: {
 *     primary: {
 *       50: '#f8fafc',
 *       900: '#0f172a',
 *     },
 *     text: 'black',
 *   },
 *   allowArbitraryValues: true,
 * })
 * ```
 */
export function defineTokenSystem(options: PresetOptions): Preset {
  const rules: Rule[] = [
    ...createDefaultPositionRules(),
    ...createDefaultFlexRules(),
    ...createDefaultGridRules(),
    ...createDefaultInteractivityRules(),
  ]

  if (options.zindex) {
    const numericZIndex = Object.fromEntries(
      Object.entries(options.zindex).map(([key, value]) => [key, Number(value)]),
    )
    rules.push(...createZIndexRules(numericZIndex))
  }

  if (options.spacing)
    rules.push(...createSpacingRules(options.spacing))

  if (options.rounded)
    rules.push(...createRoundedRules(options.rounded))

  if (options.sizes) {
    rules.push(...createDefaultSizesRules())
    rules.push(...createSizesRules(options.sizes))
  }

  if (options.colors) {
    Object.entries(options.colors).forEach(([colorName, value]) => {
      if (typeof value === 'string') {
        rules.push([`bg-${colorName}`, { background: value }])
        rules.push([`text-${colorName}`, { color: value }])
      }
    })
  }

  if (options.borderWidths) {
    Object.entries(options.borderWidths).forEach(([key, value]) => {
      // All borders
      rules.push([`border-${key}`, { 'border-width': `${value}` }])
      rules.push([`border-t-${key}`, { 'border-top-width': `${value}` }])
      rules.push([`border-r-${key}`, { 'border-right-width': `${value}` }])
      rules.push([`border-b-${key}`, { 'border-bottom-width': `${value}` }])
      rules.push([`border-l-${key}`, { 'border-left-width': `${value}` }])
      rules.push(
        ['border-solid', { 'border-style': 'solid' }],
        ['border-dashed', { 'border-style': 'dashed' }],
        ['border-dotted', { 'border-style': 'dotted' }],
        ['border-none', { 'border-style': 'none' }],
      )

      // Outlines
      rules.push([`outline-${key}`, { 'outline-width': `${value}` }])
      rules.push(
        ['outline-none', { outline: 'none' }],
        ['outline-solid', { 'outline-style': 'solid' }],
        ['outline-dashed', { 'outline-style': 'dashed' }],
        ['outline-dotted', { 'outline-style': 'dotted' }],
      )
    })
  }
  if (options.colors) {
    Object.entries(options.colors).forEach(([colorName, value]) => {
      if (typeof value === 'string')
        rules.push([`border-${colorName}`, { 'border-color': value }])
    })
  }
  if (options.colors) {
    Object.entries(options.colors).forEach(([colorName, value]) => {
      if (typeof value === 'string')
        rules.push([`outline-${colorName}`, { 'outline-color': value }])
    })
  }

  if (options.allowArbitraryValues) {
    rules.push(
      [/^top-\[(.*)\]$/, ([, value]) => ({ top: value })],
      [/^right-\[(.*)\]$/, ([, value]) => ({ right: value })],
      [/^bottom-\[(.*)\]$/, ([, value]) => ({ bottom: value })],
      [/^left-\[(.*)\]$/, ([, value]) => ({ left: value })],
      [/^inset-\[(.*)\]$/, ([, value]) => ({ top: value, right: value, bottom: value, left: value })],
    )
    rules.push(
      // Spacing arbitrary values
      [/^m-\[(.*)\]$/, ([, value]) => ({ margin: value })],
      [/^mt-\[(.*)\]$/, ([, value]) => ({ 'margin-top': value })],
      [/^mb-\[(.*)\]$/, ([, value]) => ({ 'margin-bottom': value })],
      [/^ml-\[(.*)\]$/, ([, value]) => ({ 'margin-left': value })],
      [/^mr-\[(.*)\]$/, ([, value]) => ({ 'margin-right': value })],
      [/^mx-\[(.*)\]$/, ([, value]) => ({ 'margin-left': value, 'margin-right': value })],
      [/^my-\[(.*)\]$/, ([, value]) => ({ 'margin-top': value, 'margin-bottom': value })],

      [/^p-\[(.*)\]$/, ([, value]) => ({ padding: value })],
      [/^pt-\[(.*)\]$/, ([, value]) => ({ 'padding-top': value })],
      [/^pb-\[(.*)\]$/, ([, value]) => ({ 'padding-bottom': value })],
      [/^pl-\[(.*)\]$/, ([, value]) => ({ 'padding-left': value })],
      [/^pr-\[(.*)\]$/, ([, value]) => ({ 'padding-right': value })],
      [/^px-\[(.*)\]$/, ([, value]) => ({ 'padding-left': value, 'padding-right': value })],
      [/^py-\[(.*)\]$/, ([, value]) => ({ 'padding-top': value, 'padding-bottom': value })],

      // Size arbitrary values
      [/^w-\[(.*)\]$/, ([, value]) => ({ width: value })],
      [/^h-\[(.*)\]$/, ([, value]) => ({ height: value })],

      // Border radius arbitrary values
      [/^rounded-\[(.*)\]$/, ([, value]) => ({ 'border-radius': value })],

      // Grid arbitrary values
      [/^grid-cols-\[(.*)\]$/, ([, value]) => ({ 'grid-template-columns': value })],
      [/^grid-rows-\[(.*)\]$/, ([, value]) => ({ 'grid-template-rows': value })],
      [/^col-start-\[(.*)\]$/, ([, value]) => ({ 'grid-column-start': value })],
      [/^col-end-\[(.*)\]$/, ([, value]) => ({ 'grid-column-end': value })],
      [/^row-start-\[(.*)\]$/, ([, value]) => ({ 'grid-row-start': value })],
      [/^row-end-\[(.*)\]$/, ([, value]) => ({ 'grid-row-end': value })],

      // Border width arbitrary values
      [/^border-\[(.*)\]$/, ([, value]) => ({ 'border-width': value })],
      [/^border-t-\[(.*)\]$/, ([, value]) => ({ 'border-top-width': value })],
      [/^border-r-\[(.*)\]$/, ([, value]) => ({ 'border-right-width': value })],
      [/^border-b-\[(.*)\]$/, ([, value]) => ({ 'border-bottom-width': value })],
      [/^border-l-\[(.*)\]$/, ([, value]) => ({ 'border-left-width': value })],

      // Outline arbitrary values
      [/^outline-\[(.*)\]$/, ([, value]) => ({ 'outline-width': value })],
    )
  }

  if (options.typography) {
  // Font Family
    if (options.typography.fonts) {
      Object.entries(options.typography.fonts).forEach(([name, value]) => {
        rules.push([`font-${name}`, { 'font-family': value }])
      })
    }

    // Font Size
    if (options.typography.sizes) {
      Object.entries(options.typography.sizes).forEach(([size, value]) => {
        rules.push([`text-${size}`, { 'font-size': value }])
      })
    }

    // Font Weight
    if (options.typography.weights) {
      Object.entries(options.typography.weights).forEach(([weight, value]) => {
        rules.push([`font-${weight}`, { 'font-weight': value }])
      })
    }

    // Line Height
    if (options.typography.lineHeights) {
      Object.entries(options.typography.lineHeights).forEach(([height, value]) => {
        rules.push([`leading-${height}`, { 'line-height': value }])
      })
    }
  }

  if (options.effects) {
    // Box Shadow
    if (options.effects.shadows) {
      Object.entries(options.effects.shadows).forEach(([name, value]) => {
        rules.push([`shadow-${name}`, { 'box-shadow': value }])
      })
    }
    // Opacity
    if (options.effects.opacity) {
      Object.entries(options.effects.opacity).forEach(([name, value]) => {
        rules.push([`opacity-${name}`, { opacity: value }])
      })
    }
  }

  const textAlignRules: Rule[] = [
    ['text-left', { 'text-align': 'left' }],
    ['text-center', { 'text-align': 'center' }],
    ['text-right', { 'text-align': 'right' }],
    ['text-justify', { 'text-align': 'justify' }],
  ]
  rules.push(...textAlignRules)

  const colorRules = generateDynamicRules(options)
  rules.push(...colorRules)
  const preflight: Preflight = {
    getCSS: () => generateColorCSS(options.colors),
  }

  return {
    name: options.name,
    rules,
    preflights: [preflight],
    shortcuts: [
      [/^focus:\(([\s\S]+)\)$/, ([, body]) => {
        if (!body)
          return ''
        return body.split(/\s+/).map(p => `focus:${p}`).join(' ')
      }],
      [/^hover:\(([\s\S]+)\)$/, ([, body]) => {
        if (!body)
          return ''
        return body.split(/\s+/).map(p => `hover:${p}`).join(' ')
      }],
      [/^active:\(([\s\S]+)\)$/, ([, body]) => {
        if (!body)
          return ''
        return body.split(/\s+/).map(p => `active:${p}`).join(' ')
      }],
    ],
    variants: [
      (matcher) => {
        if (!matcher.startsWith('hover:'))
          return matcher
        return {
          matcher: matcher.slice(6),
          selector: s => `${s}:hover`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('focus:'))
          return matcher
        return {
          matcher: matcher.slice(6),
          selector: s => `${s}:focus`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('active:'))
          return matcher
        return {
          matcher: matcher.slice(7),
          selector: s => `${s}:active`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('disabled:'))
          return matcher
        return {
          matcher: matcher.slice(9),
          selector: s => `${s}:disabled`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('checked:'))
          return matcher
        return {
          matcher: matcher.slice(8),
          selector: s => `${s}:checked`,
        }
      },
    ],
  }
}

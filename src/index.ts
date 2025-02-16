import type { Preflight, Preset, Rule } from 'unocss'

export type TokenValue = string | number

export interface ThemeToken {
  themes: Record<string, string>
}

export interface PresetOptions {
  name: string
  spacing?: Record<string, TokenValue>
  rounded?: Record<string, TokenValue>
  sizes?: Record<string, TokenValue>
  colors: Record<string, ThemeToken>
  borderWidths?: Record<string, TokenValue>
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
): string {
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

/**
 * Creates a UnoCSS preset with customizable tokens and utilities
 * @param {PresetOptions} options - Configuration options
 * @param {string} options.name - Name of the token system preset
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
  const positionRules: Rule[] = [
    // Position
    ['static', { position: 'static' }],
    ['fixed', { position: 'fixed' }],
    ['absolute', { position: 'absolute' }],
    ['relative', { position: 'relative' }],
    ['sticky', { position: 'sticky' }],

    // Inset shortcuts
    ['inset-0', { top: '0', right: '0', bottom: '0', left: '0' }],
    ['inset-auto', { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }],

    // Zero and auto values
    ['top-0', { top: '0' }],
    ['right-0', { right: '0' }],
    ['bottom-0', { bottom: '0' }],
    ['left-0', { left: '0' }],
    ['top-auto', { top: 'auto' }],
    ['right-auto', { right: 'auto' }],
    ['bottom-auto', { bottom: 'auto' }],
    ['left-auto', { left: 'auto' }],
  ]

  const flexRules: Rule[] = [
    // Display
    ['flex', { display: 'flex' }],
    ['inline-flex', { display: 'inline-flex' }],

    // Direction
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],

    // Wrap
    ['flex-wrap', { 'flex-wrap': 'wrap' }],
    ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
    ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],

    // Justify Content
    ['justify-start', { 'justify-content': 'flex-start' }],
    ['justify-end', { 'justify-content': 'flex-end' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['justify-around', { 'justify-content': 'space-around' }],
    ['justify-evenly', { 'justify-content': 'space-evenly' }],

    // Align Items
    ['items-start', { 'align-items': 'flex-start' }],
    ['items-end', { 'align-items': 'flex-end' }],
    ['items-center', { 'align-items': 'center' }],
    ['items-baseline', { 'align-items': 'baseline' }],
    ['items-stretch', { 'align-items': 'stretch' }],

    // Align Self
    ['self-start', { 'align-self': 'flex-start' }],
    ['self-end', { 'align-self': 'flex-end' }],
    ['self-center', { 'align-self': 'center' }],
    ['self-baseline', { 'align-self': 'baseline' }],
    ['self-stretch', { 'align-self': 'stretch' }],

    // Align Content
    ['content-start', { 'align-content': 'flex-start' }],
    ['content-end', { 'align-content': 'flex-end' }],
    ['content-center', { 'align-content': 'center' }],
    ['content-between', { 'align-content': 'space-between' }],
    ['content-around', { 'align-content': 'space-around' }],
    ['content-evenly', { 'align-content': 'space-evenly' }],

    // Flex Grow/Shrink
    ['flex-1', { flex: '1 1 0%' }],
    ['flex-auto', { flex: '1 1 auto' }],
    ['flex-initial', { flex: '0 1 auto' }],
    ['flex-none', { flex: 'none' }],
    ['grow', { 'flex-grow': '1' }],
    ['grow-0', { 'flex-grow': '0' }],
    ['shrink', { 'flex-shrink': '1' }],
    ['shrink-0', { 'flex-shrink': '0' }],
  ]

  const gridRules: Rule[] = [
    // Grid Container
    ['grid', { display: 'grid' }],
    ['inline-grid', { display: 'inline-grid' }],

    // Grid Flow
    ['grid-flow-row', { 'grid-auto-flow': 'row' }],
    ['grid-flow-col', { 'grid-auto-flow': 'column' }],
    ['grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
    ['grid-flow-col-dense', { 'grid-auto-flow': 'column dense' }],

    // Auto Columns
    ['auto-cols-auto', { 'grid-auto-columns': 'auto' }],
    ['auto-cols-min', { 'grid-auto-columns': 'min-content' }],
    ['auto-cols-max', { 'grid-auto-columns': 'max-content' }],
    ['auto-cols-fr', { 'grid-auto-columns': 'minmax(0, 1fr)' }],

    // Auto Rows
    ['auto-rows-auto', { 'grid-auto-rows': 'auto' }],
    ['auto-rows-min', { 'grid-auto-rows': 'min-content' }],
    ['auto-rows-max', { 'grid-auto-rows': 'max-content' }],
    ['auto-rows-fr', { 'grid-auto-rows': 'minmax(0, 1fr)' }],

    // Grid Template Columns
    ['grid-cols-none', { 'grid-template-columns': 'none' }],
    ['grid-cols-1', { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' }],
    ['grid-cols-2', { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' }],
    ['grid-cols-3', { 'grid-template-columns': 'repeat(3, minmax(0, 1fr))' }],
    ['grid-cols-4', { 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' }],
    ['grid-cols-5', { 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' }],
    ['grid-cols-6', { 'grid-template-columns': 'repeat(6, minmax(0, 1fr))' }],
    ['grid-cols-12', { 'grid-template-columns': 'repeat(12, minmax(0, 1fr))' }],

    // Grid Template Rows
    ['grid-rows-none', { 'grid-template-rows': 'none' }],
    ['grid-rows-1', { 'grid-template-rows': 'repeat(1, minmax(0, 1fr))' }],
    ['grid-rows-2', { 'grid-template-rows': 'repeat(2, minmax(0, 1fr))' }],
    ['grid-rows-3', { 'grid-template-rows': 'repeat(3, minmax(0, 1fr))' }],
    ['grid-rows-4', { 'grid-template-rows': 'repeat(4, minmax(0, 1fr))' }],
    ['grid-rows-5', { 'grid-template-rows': 'repeat(5, minmax(0, 1fr))' }],
    ['grid-rows-6', { 'grid-template-rows': 'repeat(6, minmax(0, 1fr))' }],

    // Grid Column Span
    ['col-auto', { 'grid-column': 'auto' }],
    ['col-span-1', { 'grid-column': 'span 1 / span 1' }],
    ['col-span-2', { 'grid-column': 'span 2 / span 2' }],
    ['col-span-3', { 'grid-column': 'span 3 / span 3' }],
    ['col-span-4', { 'grid-column': 'span 4 / span 4' }],
    ['col-span-5', { 'grid-column': 'span 5 / span 5' }],
    ['col-span-6', { 'grid-column': 'span 6 / span 6' }],
    ['col-span-12', { 'grid-column': 'span 12 / span 12' }],
    ['col-span-full', { 'grid-column': '1 / -1' }],

    // Grid Row Span
    ['row-auto', { 'grid-row': 'auto' }],
    ['row-span-1', { 'grid-row': 'span 1 / span 1' }],
    ['row-span-2', { 'grid-row': 'span 2 / span 2' }],
    ['row-span-3', { 'grid-row': 'span 3 / span 3' }],
    ['row-span-4', { 'grid-row': 'span 4 / span 4' }],
    ['row-span-5', { 'grid-row': 'span 5 / span 5' }],
    ['row-span-6', { 'grid-row': 'span 6 / span 6' }],
    ['row-span-full', { 'grid-row': '1 / -1' }],

    // Grid Column Start/End
    ['col-start-1', { 'grid-column-start': '1' }],
    ['col-start-2', { 'grid-column-start': '2' }],
    ['col-start-3', { 'grid-column-start': '3' }],
    ['col-start-4', { 'grid-column-start': '4' }],
    ['col-start-auto', { 'grid-column-start': 'auto' }],
    ['col-end-1', { 'grid-column-end': '1' }],
    ['col-end-2', { 'grid-column-end': '2' }],
    ['col-end-3', { 'grid-column-end': '3' }],
    ['col-end-4', { 'grid-column-end': '4' }],
    ['col-end-auto', { 'grid-column-end': 'auto' }],

    // Grid Row Start/End
    ['row-start-1', { 'grid-row-start': '1' }],
    ['row-start-2', { 'grid-row-start': '2' }],
    ['row-start-3', { 'grid-row-start': '3' }],
    ['row-start-4', { 'grid-row-start': '4' }],
    ['row-start-auto', { 'grid-row-start': 'auto' }],
    ['row-end-1', { 'grid-row-end': '1' }],
    ['row-end-2', { 'grid-row-end': '2' }],
    ['row-end-3', { 'grid-row-end': '3' }],
    ['row-end-4', { 'grid-row-end': '4' }],
    ['row-end-auto', { 'grid-row-end': 'auto' }],
  ]

  const rules: Rule[] = [...positionRules, ...flexRules, ...gridRules]

  if (options.spacing) {
    Object.entries(options.spacing).forEach(([key, value]) => {
      rules.push(
        // Individual positions
        [`top-${key}`, { top: `${value}` }],
        [`right-${key}`, { right: `${value}` }],
        [`bottom-${key}`, { bottom: `${value}` }],
        [`left-${key}`, { left: `${value}` }],

        // Inset (all sides)
        [`inset-${key}`, { top: `${value}`, right: `${value}`, bottom: `${value}`, left: `${value}` }],
      )
    })

    rules.push(
      ['m-auto', { margin: 'auto' }],
      ['mt-auto', { 'margin-top': 'auto' }],
      ['mb-auto', { 'margin-bottom': 'auto' }],
      ['ml-auto', { 'margin-left': 'auto' }],
      ['mr-auto', { 'margin-right': 'auto' }],
      ['mx-auto', { 'margin-left': 'auto', 'margin-right': 'auto' }],
      ['my-auto', { 'margin-top': 'auto', 'margin-bottom': 'auto' }],
    )

    Object.entries(options.spacing).forEach(([key, value]) => {
      // All margins
      rules.push([`m-${key}`, { margin: `${value}` }])
      rules.push([`mt-${key}`, { 'margin-top': `${value}` }])
      rules.push([`mb-${key}`, { 'margin-bottom': `${value}` }])
      rules.push([`ml-${key}`, { 'margin-left': `${value}` }])
      rules.push([`mr-${key}`, { 'margin-right': `${value}` }])
      rules.push([`mx-${key}`, { 'margin-left': `${value}`, 'margin-right': `${value}` }])
      rules.push([`my-${key}`, { 'margin-top': `${value}`, 'margin-bottom': `${value}` }])

      // All paddings
      rules.push([`p-${key}`, { padding: `${value}` }])
      rules.push([`pt-${key}`, { 'padding-top': `${value}` }])
      rules.push([`pb-${key}`, { 'padding-bottom': `${value}` }])
      rules.push([`pl-${key}`, { 'padding-left': `${value}` }])
      rules.push([`pr-${key}`, { 'padding-right': `${value}` }])
      rules.push([`px-${key}`, { 'padding-left': `${value}`, 'padding-right': `${value}` }])
      rules.push([`py-${key}`, { 'padding-top': `${value}`, 'padding-bottom': `${value}` }])

      // Gap utilities using the same spacing tokens
      rules.push([`gap-${key}`, { gap: `${value}` }])
      rules.push([`gap-x-${key}`, { 'column-gap': `${value}` }])
      rules.push([`gap-y-${key}`, { 'row-gap': `${value}` }])
    })
  }

  if (options.rounded) {
    Object.entries(options.rounded).forEach(([key, value]) => {
      rules.push([`rounded-${key}`, { 'border-radius': `${value}` }])
    })
  }

  if (options.sizes) {
    Object.entries(options.sizes).forEach(([key, value]) => {
      rules.push([`w-${key}`, { width: `${value}` }])
      rules.push([`h-${key}`, { height: `${value}` }])
    })
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
      if (typeof value === 'string') {
        rules.push([`border-${colorName}`, { 'border-color': value }])
      }
      else {
        Object.entries(value).forEach(([shade, shadeValue]) => {
          rules.push([`border-${colorName}-${shade}`, { 'border-color': shadeValue }])
        })
      }
    })
  }
  if (options.colors) {
    Object.entries(options.colors).forEach(([colorName, value]) => {
      if (typeof value === 'string') {
        rules.push([`outline-${colorName}`, { 'outline-color': value }])
      }
      else {
        Object.entries(value).forEach(([shade, shadeValue]) => {
          rules.push([`outline-${colorName}-${shade}`, { 'outline-color': shadeValue }])
        })
      }
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
    ],
  }
}

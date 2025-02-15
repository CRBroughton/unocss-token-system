import type { Preset, Rule } from 'unocss'

export type TokenValue = string | number
export type ColorValue = string | Record<string, string>

export interface PresetOptions {
  name: string
  spacing?: Record<string, TokenValue>
  rounded?: Record<string, TokenValue>
  sizes?: Record<string, TokenValue>
  colors?: Record<string, ColorValue>
  allowArbitraryValues?: boolean
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

  const rules: Rule[] = [...flexRules]

  if (options.spacing) {
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
      else {
        Object.entries(value).forEach(([shade, shadeValue]) => {
          rules.push([`bg-${colorName}-${shade}`, { background: shadeValue }])
          rules.push([`text-${colorName}-${shade}`, { color: shadeValue }])
        })
      }
    })
  }

  if (options.allowArbitraryValues) {
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
    )
  }

  return {
    name: options.name,
    rules,
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

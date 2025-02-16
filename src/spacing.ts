import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createSpacingRules(spacing: Record<string, TokenValue>) {
  const rules: Rule[] = []

  Object.entries(spacing).forEach(([key, value]) => {
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

  Object.entries(spacing).forEach(([key, value]) => {
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

  return rules
}

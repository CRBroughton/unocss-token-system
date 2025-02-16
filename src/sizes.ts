import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createDefaultSizesRules() {
  const rules: Rule[] = []
  rules.push(
    ['w-full', { width: '100%' }],
    ['h-full', { height: '100%' }],
    ['w-screen', { width: '100vw' }],
    ['h-screen', { height: '100vh' }],
  )
  return rules
}
type ExcludedKeys = 'full' | 'w-screen' | 'h-screen' | 'screen'
export function createSizesRules<T>(sizes: Omit<{ [K in keyof T]: TokenValue }, ExcludedKeys>) {
  const rules: Rule[] = []

  Object.entries(sizes).forEach(([key, value]) => {
    if (key === 'full' || key === 'w-screen' || key === 'h-screen' || key === 'screen')
      return

    rules.push([`w-${key}`, { width: `${value}` }])
    rules.push([`h-${key}`, { height: `${value}` }])
  })

  return rules
}

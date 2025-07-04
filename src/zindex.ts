import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createZIndexRules(indexes: Record<string, number>) {
  const rules: Rule[] = []

  rules.push(
    ['z-auto', { 'z-index': 'auto' }],
  )

  Object.entries(indexes).forEach(([key, value]) => {
    const isNegative = key.startsWith('-') || value < 0

    if (isNegative) {
      // For negative values, ensure both key and value have the minus sign
      const cleanKey = key.startsWith('-') ? key.slice(1) : key
      const negativeValue = value < 0 ? value : -Math.abs(value)
      rules.push([`-z-${cleanKey}`, { 'z-index': negativeValue }])
    }
    else {
      rules.push([`z-${key}`, { 'z-index': value }])
    }
  })

  return rules
}

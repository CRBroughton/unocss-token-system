import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createRoundedRules(rounded: Record<string, TokenValue>) {
  const rules: Rule[] = []

  Object.entries(rounded).forEach(([key, value]) => {
    rules.push([`rounded-${key}`, { 'border-radius': `${value}` }])
  })

  return rules
}

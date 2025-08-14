import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createRoundedRules(rounded: Record<string, TokenValue>): Rule<any>[] {
  const rules: Rule<any>[] = []

  Object.entries(rounded).forEach(([key, value]) => {
    rules.push([`rounded-${key}`, { 'border-radius': `${value}` }])
  })

  return rules
}

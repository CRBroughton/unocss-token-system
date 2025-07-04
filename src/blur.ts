import type { Rule } from 'unocss'
import type { TokenValue } from '.'

export function createBlurRules(blurs: Record<string, TokenValue>) {
  const rules: Rule[] = []
  Object.entries(blurs).forEach(([key, value]) => {
    rules.push([`blur-${key}`, {
      filter: `blur(${value})`,
    }])
  })

  return rules
}

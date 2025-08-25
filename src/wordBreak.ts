import type { Rule } from 'unocss'

export function createDefaultWordBreakRules(): Rule<any>[] {
  const wordBreakRules: Rule<any>[] = [
    ['break-normal', { 'word-break': 'normal' }],
    ['break-all', { 'word-break': 'break-all' }],
    ['break-keep', { 'word-break': 'keep-all' }],
  ]

  return wordBreakRules
}

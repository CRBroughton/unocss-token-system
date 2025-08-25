import { describe, expect, test } from 'bun:test'
import { createDefaultWordBreakRules } from './wordBreak'

describe('word break tests', () => {
  test('creates word break rules', () => {
    const result = createDefaultWordBreakRules()

    expect(result).toStrictEqual([
      ['break-normal', { 'word-break': 'normal' }],
      ['break-all', { 'word-break': 'break-all' }],
      ['break-keep', { 'word-break': 'keep-all' }],
    ])
  })
})

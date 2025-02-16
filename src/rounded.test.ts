import { describe, expect, test } from 'bun:test'
import { createRoundedRules } from './rounded'

describe('rounded tests', () => {
  test('creates rounded rules', () => {
    const result = createRoundedRules(
      {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    )

    expect(result).toStrictEqual([
      ['rounded-sm', { 'border-radius': '4px' }],
      ['rounded-md', { 'border-radius': '8px' }],
      ['rounded-lg', { 'border-radius': '16px' }],
    ])
  })
})

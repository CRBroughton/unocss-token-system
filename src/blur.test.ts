import {
  describe,
  expect,
  test,
} from 'bun:test'
import { createBlurRules } from './blur'

describe('blur tests', () => {
  test('create blur rules', () => {
    const result = createBlurRules({
      sm: '8px',
      md: '10px',
      lg: '16px',
    })
    expect(result).toStrictEqual([
      ['blur-sm', { filter: 'blur(8px)' }],
      ['blur-md', { filter: 'blur(10px)' }],
      ['blur-lg', { filter: 'blur(16px)' }],
    ])
  })
})

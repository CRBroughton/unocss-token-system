import {
  describe,
  expect,
  test,
} from 'bun:test'
import { createZIndexRules } from './zindex'

describe('z-index tests', () => {
  test('creates z-index rules', () => {
    const result = createZIndexRules({
      '10': 10,
      '20': 20,
      '-10': -10,
    })

    expect(result).toStrictEqual([
      ['z-auto', { 'z-index': 'auto' }],
      ['z-10', { 'z-index': 10 }],
      ['z-20', { 'z-index': 20 }],
      ['-z-10', { 'z-index': -10 }],

    ])
  })
})

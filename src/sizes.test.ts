import { describe, expect, test } from 'bun:test'
import { createDefaultSizesRules, createSizesRules } from './sizes'

describe('sizes tests', () => {
  test('creates default sizes rules', () => {
    const result = createDefaultSizesRules()

    expect(result).toStrictEqual([
      ['w-full', { width: '100%' }],
      ['w-fit', { width: 'fit-content' }],
      ['w-min', { width: 'min-content' }],
      ['w-max', { width: 'max-content' }],
      ['h-full', { height: '100%' }],
      ['w-screen', { width: '100vw' }],
      ['h-screen', { height: '100vh' }],
    ])
  })
  test('creates sizes rules', () => {
    interface MySizes {
      sm: '100px'
      md: '200px'
      lg: '300px'
    }

    const result = createSizesRules<MySizes>({
      sm: '100px',
      md: '200px',
      lg: '300px',
    })

    expect(result).toStrictEqual([
      ['w-sm', { width: '100px' }],
      ['h-sm', { height: '100px' }],
      ['w-md', { width: '200px' }],
      ['h-md', { height: '200px' }],
      ['w-lg', { width: '300px' }],
      ['h-lg', { height: '300px' }],
    ])
  })

  test('doesnt return full or screen classes when supplied (these are internally generated)', () => {
    const result = createSizesRules({
      'sm': '100px',
      'md': '200px',
      'lg': '300px',
      'full': '100%',
      'w-screen': '100vw',
      'h-screen': '100vh',
    })

    expect(result).toStrictEqual([
      ['w-sm', { width: '100px' }],
      ['h-sm', { height: '100px' }],
      ['w-md', { width: '200px' }],
      ['h-md', { height: '200px' }],
      ['w-lg', { width: '300px' }],
      ['h-lg', { height: '300px' }],
    ])
  })
})

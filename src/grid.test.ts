import { describe, expect, test } from 'bun:test'
import { createDefaultGridRules } from './grid'

describe('grid tests', () => {
  test('creates the default grid rules', () => {
    const result = createDefaultGridRules()

    expect(result).toStrictEqual([
      // Grid Container
      ['grid', { display: 'grid' }],
      ['inline-grid', { display: 'inline-grid' }],

      // Grid Flow
      ['grid-flow-row', { 'grid-auto-flow': 'row' }],
      ['grid-flow-col', { 'grid-auto-flow': 'column' }],
      ['grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
      ['grid-flow-col-dense', { 'grid-auto-flow': 'column dense' }],

      // Auto Columns
      ['auto-cols-auto', { 'grid-auto-columns': 'auto' }],
      ['auto-cols-min', { 'grid-auto-columns': 'min-content' }],
      ['auto-cols-max', { 'grid-auto-columns': 'max-content' }],
      ['auto-cols-fr', { 'grid-auto-columns': 'minmax(0, 1fr)' }],

      // Auto Rows
      ['auto-rows-auto', { 'grid-auto-rows': 'auto' }],
      ['auto-rows-min', { 'grid-auto-rows': 'min-content' }],
      ['auto-rows-max', { 'grid-auto-rows': 'max-content' }],
      ['auto-rows-fr', { 'grid-auto-rows': 'minmax(0, 1fr)' }],

      // Grid Template Columns
      ['grid-cols-none', { 'grid-template-columns': 'none' }],
      ['grid-cols-1', { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' }],
      ['grid-cols-2', { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' }],
      ['grid-cols-3', { 'grid-template-columns': 'repeat(3, minmax(0, 1fr))' }],
      ['grid-cols-4', { 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' }],
      ['grid-cols-5', { 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' }],
      ['grid-cols-6', { 'grid-template-columns': 'repeat(6, minmax(0, 1fr))' }],
      ['grid-cols-12', { 'grid-template-columns': 'repeat(12, minmax(0, 1fr))' }],

      // Grid Template Rows
      ['grid-rows-none', { 'grid-template-rows': 'none' }],
      ['grid-rows-1', { 'grid-template-rows': 'repeat(1, minmax(0, 1fr))' }],
      ['grid-rows-2', { 'grid-template-rows': 'repeat(2, minmax(0, 1fr))' }],
      ['grid-rows-3', { 'grid-template-rows': 'repeat(3, minmax(0, 1fr))' }],
      ['grid-rows-4', { 'grid-template-rows': 'repeat(4, minmax(0, 1fr))' }],
      ['grid-rows-5', { 'grid-template-rows': 'repeat(5, minmax(0, 1fr))' }],
      ['grid-rows-6', { 'grid-template-rows': 'repeat(6, minmax(0, 1fr))' }],

      // Grid Column Span
      ['col-auto', { 'grid-column': 'auto' }],
      ['col-span-1', { 'grid-column': 'span 1 / span 1' }],
      ['col-span-2', { 'grid-column': 'span 2 / span 2' }],
      ['col-span-3', { 'grid-column': 'span 3 / span 3' }],
      ['col-span-4', { 'grid-column': 'span 4 / span 4' }],
      ['col-span-5', { 'grid-column': 'span 5 / span 5' }],
      ['col-span-6', { 'grid-column': 'span 6 / span 6' }],
      ['col-span-12', { 'grid-column': 'span 12 / span 12' }],
      ['col-span-full', { 'grid-column': '1 / -1' }],

      // Grid Row Span
      ['row-auto', { 'grid-row': 'auto' }],
      ['row-span-1', { 'grid-row': 'span 1 / span 1' }],
      ['row-span-2', { 'grid-row': 'span 2 / span 2' }],
      ['row-span-3', { 'grid-row': 'span 3 / span 3' }],
      ['row-span-4', { 'grid-row': 'span 4 / span 4' }],
      ['row-span-5', { 'grid-row': 'span 5 / span 5' }],
      ['row-span-6', { 'grid-row': 'span 6 / span 6' }],
      ['row-span-full', { 'grid-row': '1 / -1' }],

      // Grid Column Start/End
      ['col-start-1', { 'grid-column-start': '1' }],
      ['col-start-2', { 'grid-column-start': '2' }],
      ['col-start-3', { 'grid-column-start': '3' }],
      ['col-start-4', { 'grid-column-start': '4' }],
      ['col-start-auto', { 'grid-column-start': 'auto' }],
      ['col-end-1', { 'grid-column-end': '1' }],
      ['col-end-2', { 'grid-column-end': '2' }],
      ['col-end-3', { 'grid-column-end': '3' }],
      ['col-end-4', { 'grid-column-end': '4' }],
      ['col-end-auto', { 'grid-column-end': 'auto' }],

      // Grid Row Start/End
      ['row-start-1', { 'grid-row-start': '1' }],
      ['row-start-2', { 'grid-row-start': '2' }],
      ['row-start-3', { 'grid-row-start': '3' }],
      ['row-start-4', { 'grid-row-start': '4' }],
      ['row-start-auto', { 'grid-row-start': 'auto' }],
      ['row-end-1', { 'grid-row-end': '1' }],
      ['row-end-2', { 'grid-row-end': '2' }],
      ['row-end-3', { 'grid-row-end': '3' }],
      ['row-end-4', { 'grid-row-end': '4' }],
      ['row-end-auto', { 'grid-row-end': 'auto' }],
    ])
  })
})

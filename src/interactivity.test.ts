import { describe, expect, test } from 'bun:test'
import { createDefaultPositionRules } from './position'
import { createDefaultInteractivityRules } from './interactivity'

describe('interactivity tests', () => {
  test('creates the default interactivity rules', () => {
    const result = createDefaultInteractivityRules()

    expect(result).toStrictEqual([
      // Cursor utilities
      ['cursor-default', { cursor: 'default' }],
      ['cursor-pointer', { cursor: 'pointer' }],
      ['cursor-text', { cursor: 'text' }],
      ['cursor-move', { cursor: 'move' }],
      ['cursor-not-allowed', { cursor: 'not-allowed' }],
      ['cursor-grab', { cursor: 'grab' }],
      ['cursor-grabbing', { cursor: 'grabbing' }],
      ['cursor-zoom-in', { cursor: 'zoom-in' }],
      ['cursor-zoom-out', { cursor: 'zoom-out' }],
      ['cursor-wait', { cursor: 'wait' }],
      ['cursor-help', { cursor: 'help' }],
      ['cursor-progress', { cursor: 'progress' }],
      ['cursor-col-resize', { cursor: 'col-resize' }],
      ['cursor-row-resize', { cursor: 'row-resize' }],
      ['cursor-crosshair', { cursor: 'crosshair' }],

      // User Select utilities
      ['select-none', { 'user-select': 'none' }],
      ['select-text', { 'user-select': 'text' }],
      ['select-all', { 'user-select': 'all' }],
      ['select-auto', { 'user-select': 'auto' }],
    ])
  })
})

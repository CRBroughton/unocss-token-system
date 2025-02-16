import type { Rule } from 'unocss'

export function createDefaultFlexRules() {
  const flexRules: Rule[] = [
    // Display
    ['flex', { display: 'flex' }],
    ['inline-flex', { display: 'inline-flex' }],

    // Direction
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],

    // Wrap
    ['flex-wrap', { 'flex-wrap': 'wrap' }],
    ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
    ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],

    // Justify Content
    ['justify-start', { 'justify-content': 'flex-start' }],
    ['justify-end', { 'justify-content': 'flex-end' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['justify-around', { 'justify-content': 'space-around' }],
    ['justify-evenly', { 'justify-content': 'space-evenly' }],

    // Align Items
    ['items-start', { 'align-items': 'flex-start' }],
    ['items-end', { 'align-items': 'flex-end' }],
    ['items-center', { 'align-items': 'center' }],
    ['items-baseline', { 'align-items': 'baseline' }],
    ['items-stretch', { 'align-items': 'stretch' }],

    // Align Self
    ['self-start', { 'align-self': 'flex-start' }],
    ['self-end', { 'align-self': 'flex-end' }],
    ['self-center', { 'align-self': 'center' }],
    ['self-baseline', { 'align-self': 'baseline' }],
    ['self-stretch', { 'align-self': 'stretch' }],

    // Align Content
    ['content-start', { 'align-content': 'flex-start' }],
    ['content-end', { 'align-content': 'flex-end' }],
    ['content-center', { 'align-content': 'center' }],
    ['content-between', { 'align-content': 'space-between' }],
    ['content-around', { 'align-content': 'space-around' }],
    ['content-evenly', { 'align-content': 'space-evenly' }],

    // Flex Grow/Shrink
    ['flex-1', { flex: '1 1 0%' }],
    ['flex-auto', { flex: '1 1 auto' }],
    ['flex-initial', { flex: '0 1 auto' }],
    ['flex-none', { flex: 'none' }],
    ['grow', { 'flex-grow': '1' }],
    ['grow-0', { 'flex-grow': '0' }],
    ['shrink', { 'flex-shrink': '1' }],
    ['shrink-0', { 'flex-shrink': '0' }],
  ]

  return flexRules
}

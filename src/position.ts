import type { Rule } from 'unocss'

export function createDefaultPositionRules() {
  const positionRules: Rule[] = [
    // Position
    ['static', { position: 'static' }],
    ['fixed', { position: 'fixed' }],
    ['absolute', { position: 'absolute' }],
    ['relative', { position: 'relative' }],
    ['sticky', { position: 'sticky' }],

    // Inset shortcuts
    ['inset-0', { top: '0', right: '0', bottom: '0', left: '0' }],
    ['inset-auto', { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }],

    // Zero and auto values
    ['top-0', { top: '0' }],
    ['right-0', { right: '0' }],
    ['bottom-0', { bottom: '0' }],
    ['left-0', { left: '0' }],
    ['top-auto', { top: 'auto' }],
    ['right-auto', { right: 'auto' }],
    ['bottom-auto', { bottom: 'auto' }],
    ['left-auto', { left: 'auto' }],
  ]

  return positionRules
}

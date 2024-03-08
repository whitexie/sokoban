import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTargetStore } from '../target'

describe('target', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should clean all targets', () => {
    const { targets, addTarget, createTarget, cleanAllTargets } = useTargetStore()

    addTarget(createTarget({ x: 1, y: 1 }))
    addTarget(createTarget({ x: 1, y: 2 }))

    expect(targets).toHaveLength(2)

    cleanAllTargets()

    expect(targets).toHaveLength(0)
  })
})

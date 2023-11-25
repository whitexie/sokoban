import { it, expect, describe, beforeEach } from 'vitest'
import { useCargoStore } from '../cargo'
import { createPinia, setActivePinia } from 'pinia'


describe.only('normal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('add cargo', () => {
    const { addCargo, createCargo, cargos } = useCargoStore()
    addCargo(createCargo({ x: 1, y: 1 }))
    expect(cargos).toHaveLength(1)
  })
})

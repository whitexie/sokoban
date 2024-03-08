import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { useMapStore } from '../map'

describe('normal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ]
    const { setupMap } = useMapStore()
    setupMap(map)
  })
  it('add cargo', () => {
    const { addCargo, createCargo, cargos } = useCargoStore()
    addCargo(createCargo({ x: 1, y: 1 }))
    expect(cargos).toHaveLength(1)
  })

  it('should clean all cargos', () => {
    const { cargos, addCargo, createCargo, cleanAllCargos } = useCargoStore()
    addCargo(createCargo({ x: 1, y: 1 }))
    addCargo(createCargo({ x: 2, y: 2 }))

    expect(cargos).toHaveLength(2)
    cleanAllCargos()
    expect(cargos).toHaveLength(0)
  })

  describe('on Target', () => {
    it('shift in', () => {
      const { addCargo, createCargo, moveCargo } = useCargoStore()
      const { addTarget, createTarget } = useTargetStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)
      addTarget(createTarget({ x: 2, y: 1 }))
      moveCargo(cargo, 1, 0)

      expect(cargo.onTarget).toBeTruthy()
    })
    it('shift out', () => {
      const { addCargo, createCargo, moveCargo } = useCargoStore()
      const { addTarget, createTarget } = useTargetStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)
      addTarget(createTarget({ x: 2, y: 1 }))
      moveCargo(cargo, 1, 0)
      moveCargo(cargo, 1, 0)

      expect(cargo.onTarget).toBeFalsy()
    })
  })
})

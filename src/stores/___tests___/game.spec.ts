import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { useMapStore } from '../map'

describe('gameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should game is completed', () => {
    const mapStore = useMapStore()

    vi.spyOn(mapStore, 'isWall').mockReturnValue(false)
    const { createCargo, addCargo, moveCargo } = useCargoStore()

    const { addTarget, createTarget } = useTargetStore()

    const cargo = createCargo({ x: 3, y: 3 })
    addCargo(cargo)
    addTarget(createTarget({ x: 4, y: 3 }))
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBeTruthy()
  })

  it('should game is not completed', () => {
    const mapStore = useMapStore()

    vi.spyOn(mapStore, 'isWall').mockReturnValue(false)
    const { createCargo, addCargo, moveCargo } = useCargoStore()

    const { addTarget, createTarget } = useTargetStore()

    const cargo = createCargo({ x: 3, y: 3 })
    addCargo(cargo)
    addTarget(createTarget({ x: 4, y: 3 }))
    moveCargo(cargo, 1, 0)
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBeFalsy()
  })
})

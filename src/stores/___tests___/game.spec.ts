import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { useMapStore } from '../map'
import { usePlayerStore } from '../player'

describe('gameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // setupMap
    const { setupMap } = useMapStore()

    setupMap([
      [1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ])
  })

  it('should game is completed', () => {
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
    const { createCargo, addCargo, moveCargo } = useCargoStore()
    const { addTarget, createTarget } = useTargetStore()

    const cargo = createCargo({ x: 2, y: 2 })
    addCargo(cargo)
    addTarget(createTarget({ x: 3, y: 2 }))
    moveCargo(cargo, 1, 0)
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()

    detectionGameCompleted()
    expect(game.isGameCompleted).toBeFalsy()
  })

  it('setupGame', () => {
    const setupOption = {
      player: { x: 2, y: 2 },
      map: [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1],
      ],
      cargos: [
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
      targets: [
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ],
    }

    const { setupGame } = useGameStore()
    setupGame(setupOption)

    const { cargos } = useCargoStore()
    const { targets } = useTargetStore()
    const { player } = usePlayerStore()

    expect(player).toEqual({ x: 2, y: 2 })
    expect(cargos).toHaveLength(2)
    expect(targets).toHaveLength(2)
  })
})

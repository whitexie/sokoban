import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { useMapStore } from '../map'
import { usePlayerStore } from '../player'
import type { LevelGameData } from '@/game/gameData'

const firstLevelGameData = {
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

const secondLevelGameData = {
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
    { x: 4, y: 4 },
  ],
  targets: [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
  ],
}

const gameData = [firstLevelGameData, secondLevelGameData]

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

  it('should setup game', () => {
    const { setupGame } = useGameStore()
    setupGame(gameData)

    expectSetuplevelGameData(firstLevelGameData)
  })

  it('should to next level', () => {
    const { setupGame, toNextLevel } = useGameStore()
    setupGame(gameData)

    toNextLevel()

    expectSetuplevelGameData(secondLevelGameData)
  })

  it('should be reset game completed when to next level', () => {
    const { setupGame, game, toNextLevel } = useGameStore()

    game.isGameCompleted = true

    setupGame(gameData)

    toNextLevel()

    expect(game.isGameCompleted).toBeFalsy()
  })

  function expectSetuplevelGameData(levelGameData: LevelGameData) {
    const { cargos } = useCargoStore()
    const { targets } = useTargetStore()
    const { player } = usePlayerStore()
    const { map } = useMapStore()

    expect(player).toEqual(levelGameData.player)
    expect(map).toEqual(levelGameData.map)
    expect(cargos).toHaveLength(levelGameData.cargos.length)
    expect(targets).toHaveLength(levelGameData.targets.length)
  }
})

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { usePlayerStore } from './player'
import { useTargetStore } from './target'
import { type MapTile, useMapStore } from './map'
import type { Position } from '@/composables/usePosition'
import type { GameData } from '@/game/gameData'

interface Game {
  isGameCompleted: boolean
  level: number
}

export interface SetupGameOption {
  map: MapTile[][]
  player: Position
  cargos: Position[]
  targets: Position[]
}

export const useGameStore = defineStore('Game', () => {
  const game = reactive<Game>({
    isGameCompleted: false,
    level: 1,
  })

  let _gameData: GameData = []

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()
    game.isGameCompleted = cargos.every(cargo => cargo.onTarget)
  }

  function setupGame(gameData: GameData) {
    _gameData = gameData
    setupLevel()
  }

  function toNextLevel() {
    game.level += 1
    setupLevel()
    game.isGameCompleted = false
  }

  function setupLevel() {
    const { player, cargos, targets, map } = _gameData[game.level - 1]

    const { setupMap } = useMapStore()
    const { setupPlayer } = usePlayerStore()
    const { createCargo, addCargo, cleanAllCargos } = useCargoStore()
    const { createTarget, addTarget, cleanAllTargets } = useTargetStore()

    cleanAllCargos()
    cleanAllTargets()

    setupMap(map)
    setupPlayer(player)
    cargos.forEach((position) => {
      addCargo(createCargo(position))
    })
    targets.forEach((position) => {
      addTarget(createTarget(position))
    })
  }

  return {
    detectionGameCompleted,
    toNextLevel,
    game,
    setupGame,
  }
})

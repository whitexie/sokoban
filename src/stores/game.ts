import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { usePlayerStore } from './player'
import { useTargetStore } from './target'
import { type MapTile, useMapStore } from './map'
import type { Position } from '@/composables/usePosition'

interface Game {
  isGameCompleted: boolean
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
  })

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()
    game.isGameCompleted = cargos.every(cargo => cargo.onTarget)
  }

  function setupGame(setupGameOption: SetupGameOption) {
    const { player, cargos, targets, map } = setupGameOption

    const { setupMap } = useMapStore()
    const { setupPlayer } = usePlayerStore()
    const { createCargo, addCargo } = useCargoStore()
    const { createTarget, addTarget } = useTargetStore()

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
    game,
    setupGame,
  }
})

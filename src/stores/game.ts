import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'

interface Game {
  isGameCompleted: boolean
}

export const useGameStore = defineStore('Game', () => {
  const game = reactive<Game>({
    isGameCompleted: false,
  })
  function detectionGameCompleted() {
    const { cargos } = useCargoStore()
    game.isGameCompleted = cargos.every(cargo => cargo.onTarget)
  }

  return {
    detectionGameCompleted,
    game,
  }
})

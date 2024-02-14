import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from './map'
import { useCargoStore } from './cargo'
import type { Position } from '@/composables/usePosition'

export const usePlayerStore = defineStore('player', () => {
  const player = reactive({
    x: 0,
    y: 0,
  })
  const { isWall } = useMapStore()
  const { moveCargo } = useCargoStore()

  function _move(dx: number, dy: number) {
    const nextPosition = {
      x: player.x + dx,
      y: player.y + dy,
    }

    if (isWall(nextPosition))
      return

    const { findCargo } = useCargoStore()
    const cargo = findCargo(nextPosition)

    if (cargo) {
      const isMoveCargo = moveCargo(cargo, dx, dy)
      if (!isMoveCargo)
        return
    }

    player.x += dx
    player.y += dy
  }

  function movePlayerToLeft() {
    _move(-1, 0)
  }

  function movePlayerToRight() {
    _move(1, 0)
  }

  function movePlayerToUp() {
    _move(0, -1)
  }

  function movePlayerToDown() {
    _move(0, 1)
  }

  function setupPlayer(position: Position) {
    player.x = position.x
    player.y = position.y
  }

  return {
    player,
    setupPlayer,
    movePlayerToUp,
    movePlayerToDown,
    movePlayerToLeft,
    movePlayerToRight,
  }
})

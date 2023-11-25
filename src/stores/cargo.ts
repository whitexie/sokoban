import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from './map'
import type { Position } from '@/composables/usePosition'

interface Cargo {
  x: number
  y: number
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: Cargo[] = reactive([])

  function createCargo(position: Position) {
    return {
      x: position.x,
      y: position.y,
    }
  }

  function addCargo(cargo: Cargo) {
    cargos.push(cargo)
  }

  function findCargo(position: Position) {
    return cargos.find(cargo => cargo.x === position.x && cargo.y === position.y)
  }

  function moveCargo(cargo: Cargo, dx: number, dy: number): boolean {
    const { isWall } = useMapStore()
    const nextPosition = { x: cargo.x + dx, y: cargo.y + dy }

    if (isWall(nextPosition))
      return false

    if (findCargo(nextPosition))
      return false

    cargo.x += dx
    cargo.y += dy
    return true
  }

  return {
    cargos,
    moveCargo,
    createCargo,
    addCargo,
    findCargo,
  }
})

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import { useMapStore } from './map'
import { useTargetStore } from './target'
import type { Position } from '@/composables/usePosition'

export interface Cargo {
  id: number | string
  x: number
  y: number
  onTarget: boolean
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: Cargo[] = reactive([])

  function createCargo(position: Position): Cargo {
    return {
      id: nanoid(),
      x: position.x,
      y: position.y,
      onTarget: false,
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
    detectionTarget(cargo)

    return true
  }

  function detectionTarget(cargo: Cargo) {
    const { findTarget } = useTargetStore()
    cargo.onTarget = !!findTarget(cargo)
  }

  function cleanAllCargos() {
    cargos.splice(0, cargos.length)
  }

  return {
    cargos,
    moveCargo,
    createCargo,
    addCargo,
    findCargo,
    cleanAllCargos,
  }
})

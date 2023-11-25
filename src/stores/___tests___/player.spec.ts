import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '../player'
import { useMapStore } from '../map'
import { useCargoStore } from '../cargo'

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('normal move', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ])
      const { player } = usePlayerStore()
      player.x = 1
      player.y = 1
    })

    it('should move to left', () => {
      const { player, movePlayerToLeft } = usePlayerStore()
      movePlayerToLeft()

      expect(player.x).toBe(0)
    })
    it('should move to right', () => {
      const { player, movePlayerToRight } = usePlayerStore()
      movePlayerToRight()

      expect(player.x).toBe(2)
    })
    it('should move to up', () => {
      const { player, movePlayerToUp } = usePlayerStore()
      movePlayerToUp()

      expect(player.y).toBe(0)
    })
    it('should move to down', () => {
      const { player, movePlayerToDown } = usePlayerStore()
      movePlayerToDown()

      expect(player.y).toBe(2)
    })
  })

  describe('collision wall', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ])
      const { player } = usePlayerStore()
      player.x = 1
      player.y = 1
    })

    it('should not move to left when collision a wall', () => {
      const { movePlayerToLeft, player } = usePlayerStore()
      movePlayerToLeft()
      expect(player.x).toBe(1)
    })
    it('should not move to right when collision a wall', () => {
      const { movePlayerToRight, player } = usePlayerStore()
      movePlayerToRight()
      expect(player.x).toBe(1)
    })
    it('should not move to up when collision a wall', () => {
      const { movePlayerToUp, player } = usePlayerStore()
      movePlayerToUp()
      expect(player.y).toBe(1)
    })
    it('should not move to down when collision a wall', () => {
      const { movePlayerToDown, player } = usePlayerStore()
      movePlayerToDown()
      expect(player.y).toBe(1)
    })
  })

  describe('move box', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ])
    })
    it('should push a cargo to left', () => {
      const { createCargo, addCargo } = useCargoStore()
      const { movePlayerToLeft, player } = usePlayerStore()
      const cargoPosition = { x: 2, y: 1 }
      const cargo = createCargo(cargoPosition)
      addCargo(cargo)
      player.x = 3
      player.y = 1
      movePlayerToLeft()

      expect(cargo.x).toBe(1)
      expect(player.x).toBe(2)
    })

    it('should push a cargo to right', () => {
      const { createCargo, addCargo } = useCargoStore()
      const { movePlayerToRight, player } = usePlayerStore()
      const cargoPosition = { x: 2, y: 1 }
      const cargo = createCargo(cargoPosition)
      addCargo(cargo)
      player.x = 1
      player.y = 1
      movePlayerToRight()

      expect(cargo.x).toBe(3)
      expect(player.x).toBe(2)
    })
    it('should push a cargo to up', () => {
      const { createCargo, addCargo } = useCargoStore()
      const { movePlayerToUp, player } = usePlayerStore()
      const cargoPosition = { x: 1, y: 2 }
      const cargo = createCargo(cargoPosition)
      addCargo(cargo)
      player.x = 1
      player.y = 3
      movePlayerToUp()

      expect(cargo.y).toBe(1)
      expect(player.y).toBe(2)
    })
    it('should push a cargo to down', () => {
      const { createCargo, addCargo } = useCargoStore()
      const { movePlayerToDown, player } = usePlayerStore()
      const cargoPosition = { x: 1, y: 2 }
      const cargo = createCargo(cargoPosition)
      addCargo(cargo)
      player.x = 1
      player.y = 1
      movePlayerToDown()

      expect(cargo.y).toBe(3)
      expect(player.y).toBe(2)
    })

    it('should not push cargo when the cargo hits wall', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)

      const { movePlayerToLeft, player } = usePlayerStore()
      player.x = 2
      player.y = 1

      movePlayerToLeft()
      expect(player.x).toBe(2)
      expect(cargo.x).toBe(1)
    })
    it('should not push cargo when the cargo hits other cargo', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo1 = createCargo({ x: 1, y: 1 })
      const cargo2 = createCargo({ x: 2, y: 1 })
      addCargo(cargo1)
      addCargo(cargo2)

      const { movePlayerToLeft, player } = usePlayerStore()
      player.x = 3
      player.y = 1

      movePlayerToLeft()
      expect(cargo1.x).toBe(1)
      expect(cargo2.x).toBe(2)
      expect(player.x).toBe(3)
    })
  })
})

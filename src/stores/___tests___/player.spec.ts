import { it, expect, describe, beforeEach } from 'vitest'
import { usePlayerStore } from "../player"
import { useMapStore } from '../map'
import { createPinia, setActivePinia } from "pinia"


describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const { player } = usePlayerStore();
    player.x = 1
    player.y = 1

  })

  describe('normal move', () => {

    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ])
    })

    it('should move to left', () => {
      const { player, movePlayerToLeft } = usePlayerStore();
      movePlayerToLeft()

      expect(player.x).toBe(0)
    })
    it('should move to right', () => {
      const { player, movePlayerToRight } = usePlayerStore();
      movePlayerToRight()

      expect(player.x).toBe(2)
    })
    it('should move to up', () => {
      const { player, movePlayerToUp } = usePlayerStore();
      movePlayerToUp()

      expect(player.y).toBe(0)
    })
    it('should move to down', () => {
      const { player, movePlayerToDown } = usePlayerStore();
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

})

import { defineStore } from "pinia"
import { ref } from "vue"

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

interface Position {
  x: number,
  y: number
}

export const useMapStore = defineStore('map', () => {
  const map = ref<number[][]>(
    [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
    ]
  )

  function setupMap(newMap: MapTile[][]) {
    map.value = newMap
  }

  function isWall(position: Position) {
    const { x, y } = position
    return map.value[x][y] === MapTile.WALL
  }


  return {
    map,
    setupMap,
    isWall
  }
})

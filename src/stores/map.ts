import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

interface Position {
  x: number
  y: number
}

export const useMapStore = defineStore('map', () => {
  const map = ref<MapTile[][]>([])

  function setupMap(newMap: MapTile[][]) {
    map.value = newMap
  }

  function isWall(position: Position) {
    const { x, y } = position
    return map.value[y][x] === MapTile.WALL
  }

  return {
    map,
    setupMap,
    isWall,
  }
})

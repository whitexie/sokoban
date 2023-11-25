import { usePlayerStore } from "@/stores/player"
import { computed } from "vue"

export interface Position {
  x: number
  y: number
}


const STEP = 32;
export function usePosition(player: Position) {
  const position = computed(() => {
    return {
      left: player.x * STEP + 'px',
      top: player.y * STEP + 'px',
    }
  })
  return {
    position
  }
}

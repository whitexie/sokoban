import { usePlayerStore } from "@/stores/player"
import { computed } from "vue"


const STEP = 32;
export function usePosition() {
  const { player } = usePlayerStore()
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

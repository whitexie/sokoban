import { onMounted, onUnmounted } from "vue"
import { usePlayerStore } from "@/stores/player"

type DirectionKey = 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown'

export function useMove() {
  const { movePlayerToLeft, movePlayerToDown, movePlayerToRight, movePlayerToTop } = usePlayerStore()
  const evnetMapping = {
    ArrowUp: movePlayerToTop,
    ArrowLeft: movePlayerToLeft,
    ArrowRight: movePlayerToRight,
    ArrowDown: movePlayerToDown,
  }

  function handleKeyup(event: KeyboardEvent) {
    const func = evnetMapping[event.code as DirectionKey]
    func && func()
  }

  onMounted(() => {
    window.addEventListener('keyup', handleKeyup)
  })
  onUnmounted(() => {
    window.removeEventListener('keyup', handleKeyup)
  })
}

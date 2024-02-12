import { onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useGameStore } from '@/stores/game'

type DirectionKey = 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown'

const WHITE_KEY_CODE = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown']

export function useMove() {
  const { movePlayerToLeft, movePlayerToDown, movePlayerToRight, movePlayerToUp } = usePlayerStore()
  const evnetMapping = {
    ArrowUp: movePlayerToUp,
    ArrowLeft: movePlayerToLeft,
    ArrowRight: movePlayerToRight,
    ArrowDown: movePlayerToDown,
  }

  function handleKeyup(event: KeyboardEvent) {
    if (WHITE_KEY_CODE.includes(event.code)) {
      const func = evnetMapping[event.code as DirectionKey]
      func()
      const { detectionGameCompleted } = useGameStore()
      detectionGameCompleted()
    }
  }

  onMounted(() => {
    window.addEventListener('keyup', handleKeyup)
  })
  onUnmounted(() => {
    window.removeEventListener('keyup', handleKeyup)
  })
}

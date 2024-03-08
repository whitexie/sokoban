import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import type { Position } from '@/composables/usePosition'

interface Target {
  id: string
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets = reactive<Target[]>([])

  function createTarget({ x, y }: Position): Target {
    const id = nanoid()
    return { id, x, y }
  }

  function addTarget(target: Target) {
    targets.push(target)
  }

  function findTarget({ x, y }: Position) {
    return targets.find(target => target.x === x && target.y === y)
  }

  function cleanAllTargets() {
    targets.splice(0, targets.length)
  }

  return {
    targets,
    createTarget,
    addTarget,
    findTarget,
    cleanAllTargets,
  }
})

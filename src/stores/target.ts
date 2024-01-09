import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Position } from '@/composables/usePosition'

interface Target {
  x: number
  y: number
}

export const useTargetStore = defineStore('target', () => {
  const targets = reactive<Target[]>([
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
  ])

  function createTarget({ x, y }: Position) {
    return { x, y }
  }

  function addTarget(target: Target) {
    targets.push(target)
  }

  function findTarget({ x, y }: Position) {
    return targets.find(target => target.x === x && target.y === y)
  }

  return {
    targets,
    createTarget,
    addTarget,
    findTarget,
  }
})

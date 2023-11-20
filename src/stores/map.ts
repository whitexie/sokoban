import { defineStore } from "pinia"
import { ref } from "vue"

export const useMapStore = defineStore('map', () => {
  const map = ref<number[]>([1, 2, 3, 4, 5])

  const addItem = (num: number) => {
    map.value.push(num)
  }

  return {
    map,
    addItem
  }
})

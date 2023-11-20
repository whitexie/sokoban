import { it, expect, describe, beforeEach } from 'vitest'
import { useMapStore } from '../map'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'


describe('map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('setupMap', () => {
    const mapStore = useMapStore()
    const { setupMap } = mapStore
    const { map } = storeToRefs(mapStore);
    const newMap = [
      [1, 1, 1, 1],
      [2, 2, 2, 2]
    ]
    setupMap(newMap)
    expect(map.value).toEqual(newMap)
  })
})

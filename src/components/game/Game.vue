<script setup lang="ts">
import Map from './Map.vue'
import Player from './Player.vue'
import Cargo from './Cargo.vue'
import { useCargoStore } from '@/stores/cargo'
import { useMapStore } from '@/stores/map'

const { setupMap } = useMapStore()
const { cargos, createCargo, addCargo } = useCargoStore()
addCargo(createCargo({ x: 2, y: 2 }))
setupMap([
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
])
</script>

<template>
  <div class="relative la scale-200">
    <Map />
    <Player />
    <template v-for="(item, i) in cargos" :key="i">
      <Cargo :x="item.x" :y="item.y" />
    </template>
  </div>
</template>

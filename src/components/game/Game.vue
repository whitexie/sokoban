<script setup lang="ts">
import Map from './Map.vue'
import Player from './Player.vue'
import Cargo from './Cargo.vue'
import Target from './Target.vue'
import { useCargoStore } from '@/stores/cargo'
import { useMapStore } from '@/stores/map'
import { useTargetStore } from '@/stores/target'

const { setupMap } = useMapStore()
const { targets } = useTargetStore()
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
    <Target v-for="(item, index) in targets" :key="index" :x="item.x" :y="item.y" />
    <Player />
    <template v-for="(item, i) in cargos" :key="i">
      <Cargo :cargo="item" />
    </template>
  </div>
</template>

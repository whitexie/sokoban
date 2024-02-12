<script setup lang="ts">
import Map from './Map.vue'
import Player from './Player.vue'
import Cargo from './Cargo.vue'
import Target from './Target.vue'
import { useCargoStore } from '@/stores/cargo'
import { useMapStore } from '@/stores/map'
import { useTargetStore } from '@/stores/target'
import { useGameStore } from '@/stores/game'

const { setupMap } = useMapStore()
const { targets, createTarget, addTarget } = useTargetStore()
const { cargos, createCargo, addCargo } = useCargoStore()
const { game } = useGameStore()
addCargo(createCargo({ x: 2, y: 2 }))
addCargo(createCargo({ x: 3, y: 3 }))
addCargo(createCargo({ x: 4, y: 4 }))

addTarget(createTarget({ x: 5, y: 5 }))
addTarget(createTarget({ x: 6, y: 6 }))
addTarget(createTarget({ x: 7, y: 7 }))
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
  <header>
    <h1 class="text-center text-xl h-7 select-none">
      {{ game.isGameCompleted ? '已通关！' : '' }}
    </h1>
  </header>
  <main class="flex justify-center items-center">
    <div class="relative">
      <Map />
      <Target v-for="(item, index) in targets" :key="index" :x="item.x" :y="item.y" />
      <Player />
      <template v-for="(item, i) in cargos" :key="i">
        <Cargo :cargo="item" />
      </template>
    </div>
  </main>
</template>

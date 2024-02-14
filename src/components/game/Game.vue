<script setup lang="ts">
import Map from './Map.vue'
import Player from './Player.vue'
import Cargo from './Cargo.vue'
import Target from './Target.vue'
import { levelGameData } from '@/game/gameData'
import { useCargoStore } from '@/stores/cargo'
import { useTargetStore } from '@/stores/target'
import { useGameStore } from '@/stores/game'

const { targets } = useTargetStore()
const { cargos } = useCargoStore()
const { game, setupGame } = useGameStore()

setupGame(levelGameData)
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
@/game/gameData

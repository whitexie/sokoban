<script setup lang="ts">
import Map from './Map.vue'
import Player from './Player.vue'
import Cargo from './Cargo.vue'
import Target from './Target.vue'
import { gameData } from '@/game/gameData'
import { useCargoStore } from '@/stores/cargo'
import { useTargetStore } from '@/stores/target'
import { useGameStore } from '@/stores/game'

const { targets } = useTargetStore()
const { cargos } = useCargoStore()
const { game, setupGame, toNextLevel } = useGameStore()

setupGame(gameData)
</script>

<template>
  <header>
    <h1 class="text-center text-xl h-7 select-none">
      {{ game.isGameCompleted ? '已过关' : '' }}
    </h1>
  </header>
  <main class="flex justify-center items-center">
    <div class="relative">
      <Map />
      <Target v-for="item in targets" :key="item.id" :x="item.x" :y="item.y" />
      <Player />
      <template v-for="item in cargos" :key="item.id">
        <Cargo :cargo="item" />
      </template>
    </div>
  </main>
  <span v-if="game.isGameCompleted" class="block w-20 text m-auto">
    <button @click.stop="toNextLevel">
      进入下一关
    </button>
  </span>
</template>

<script setup lang="ts">
import { useMove } from '@/composables/useMove'
import { usePosition } from '@/composables/usePosition'
import { usePlayerStore } from '@/stores/player'

const { player } = usePlayerStore()
const { position } = usePosition(player)

useMove()
</script>

<template>
  <div>
    <img class="absolute" src="@/assets/img/keeper.png" :style="position">
  </div>
</template>

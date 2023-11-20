<script setup lang="ts">
import { useMove } from "@/composables/useMove"
import { usePosition } from "@/composables/usePosition"

useMove()
const { position } = usePosition();
</script>
<template>
  <div>
    <img class="absolute" src="@/assets/img/keeper.png" :style="position" />
  </div>
</template>

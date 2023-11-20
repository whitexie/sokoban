<script setup lang="ts">
import { useMapStore } from "@/stores/map"

const mapStore = useMapStore();
</script>

<template>
  <h1>
    {{ mapStore.map }}
  </h1>
  <button @click="mapStore.addItem(1)">click me </button>
  <h1 class="text-3xl font-bold underline bg-red-500">
    Hello world!
  </h1>
</template>

<style scoped>
</style>

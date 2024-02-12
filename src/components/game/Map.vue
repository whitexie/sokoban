<script setup lang="ts">
import { computed } from 'vue'
import floorImg from '@/assets/img/floor.png'
import wallImg from '@/assets/img/wall.png'
import { MapTile, useMapStore } from '@/stores/map'

const mapStore = useMapStore()

const map = computed(() => {
  return mapStore.map
})
</script>

<template>
  <div>
    <div v-for="(row, i) in map" :key="i" class="flex">
      <div v-for="(col, j) in row" :key="j">
        <template v-if="map[i][j] === MapTile.WALL">
          <img class="select-none" :src="wallImg">
        </template>
        <template v-else-if="map[i][j] === MapTile.FLOOR">
          <img class="select-none" :src="floorImg">
        </template>
      </div>
    </div>
  </div>
</template>

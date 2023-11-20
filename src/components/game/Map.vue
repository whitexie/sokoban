<script setup lang="ts">
import floorImg from "@/assets/img/floor.png"
import wallImg from "@/assets/img/wall.png"
import { useMapStore, MapTile } from "@/stores/map"
import { computed } from "vue";

const mapStore = useMapStore()

const map = computed(() => {
  return mapStore.map
})
</script>
<template>
  <div>
    <div class="flex" v-for="(row, i) in map" :key="i">
      <div v-for="(col, j) in row" :key="j">
        <template v-if="map[i][j] === MapTile.WALL">
          <img :src="wallImg" />
        </template>
        <template v-else-if="map[i][j] === MapTile.FLOOR">
          <img :src="floorImg" />
        </template>
      </div>
    </div>
  </div>
</template>

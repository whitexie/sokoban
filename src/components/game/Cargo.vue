<script lang="ts" setup>
import cargoImg from "@/assets/img/cargo.png"
import { usePosition } from "@/composables/usePosition"

interface Props {
  x: number,
  y: number
}
const props = defineProps<Props>()

const { position } = usePosition(props)

</script>
<template>
  <img :src="cargoImg" class="absolute" :style="position" />
</template>

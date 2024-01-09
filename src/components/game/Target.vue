<script lang="ts" setup>
import targetImg from '@/assets/img/target.png'
import { usePosition } from '@/composables/usePosition'

interface Props {
  x: number
  y: number
}
const props = defineProps<Props>()

const { position } = usePosition(props)
</script>

<template>
  <img :src="targetImg" class="absolute" :style="position">
</template>

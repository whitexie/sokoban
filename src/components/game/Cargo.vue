<script lang="ts" setup>
import { computed } from 'vue'
import type { Cargo } from '@/stores/cargo'
import cargoImg from '@/assets/img/cargo.png'
import cargoOnTargetImg from '@/assets/img/cargo_on_target.png'
import { usePosition } from '@/composables/usePosition'

interface Props {
  cargo: Cargo
}
const props = defineProps<Props>()

const { position } = usePosition(props.cargo)
const img = computed(() => {
  return props.cargo.onTarget ? cargoOnTargetImg : cargoImg
})
</script>

<template>
  <img :src="img" class="absolute" :style="position">
</template>

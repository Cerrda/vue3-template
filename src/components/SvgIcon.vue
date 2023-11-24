<script setup>
import { computed } from 'vue'
import { px2vh, px2vw } from '../utils'

const props = defineProps({
  width: {
    type: String,
    default: '16'
  },
  height: {
    type: String,
    default: '16'
  },
  fill: {
    type: String,
    default: 'currentColor'
  },
  name: {
    type: String
  }
})

const width = computed(() => {
  return px2vw(props.width)
})
const height = computed(() => {
  return px2vh(props.height)
})
</script>

<template>
  <svg class="size">
    <use :xlink:href="`#icon-${name}`" :fill="fill"></use>
  </svg>
</template>

<style scoped lang="scss">
.size {
  width: v-bind('width');
  height: v-bind('height');
}
</style>

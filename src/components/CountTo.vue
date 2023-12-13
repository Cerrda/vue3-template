<script setup>
import { ref, watch } from 'vue'
import { px2vw } from '@/utils/index'
import { v4 as uuid } from 'uuid'

const props = defineProps(['number', 'fontSize'])
const gap = props.fontSize / 1.72
const nowNum = ref('0')
let pointAt = 999

watch(
  () => props.number,
  () => {
    nowNum.value =
      ('' + props.number).indexOf('.') > -1
        ? ('' + (+props.number).toFixed(2)).split('')
        : ('' + props.number).split('')

    pointAt = nowNum.value.findIndex((item) => item === '.')
  }
)

function getLeft(index) {
  return pointAt !== -1 && index > pointAt ? px2vw(gap * index - 0.57 * gap) : px2vw(gap * index)
}
</script>

<template>
  <div class="count-to">
    <transition-group name="list" tag="div">
      <div
        v-for="(item, index) in nowNum"
        :style="{
          'transition-delay': `${0.1 * index}s`,
          'left': `${getLeft(index)}`
        }"
        :key="uuid()">
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.count-to {
  font-size: v-bind('px2vw(props.fontSize)');
  & > div {
    position: relative;
    display: flex;
  }
}
.list-enter-active,
.list-leave-active {
  transition:
    transform 1s ease,
    opacity 1s ease;
}
.list-leave-active {
  position: absolute;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

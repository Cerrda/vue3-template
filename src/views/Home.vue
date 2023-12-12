<script setup>
import CountTo from '@/components/CountTo.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { queryMysqlAPI, queryMiddleAPI } from '@/utils/api.js'
import { ref } from 'vue'

async function query() {
  const res = await queryMysqlAPI()
  console.log('🚀 ~ res:', res)

  const res1 = await queryMiddleAPI()
  console.log('🚀 ~ res1:', res1)
}
query()

const number = ref()
setInterval(() => {
  number.value = Math.floor(Math.random() * 1000)
}, 1000)

const active = ref(0)
</script>

<template>
  <SvgIcon name="cell"></SvgIcon>
  <div class="box"></div>
  <!-- gap是在设计稿中单个数字宽度的px数。如果传入的number是小数会自动保留两位处理 -->
  <CountTo class="count-to" :number="number" gap="14"></CountTo>
  <div class="list">
    <div
      v-for="item in 5"
      :key="item"
      class="item"
      :class="{ active: item - 1 === active }"
      v-waves="['pink', 'keep', 'list1']"></div>
  </div>
  <div class="list">
    <div
      v-for="item in 5"
      :key="item"
      class="item"
      :class="{ active: item - 1 === active }"
      v-waves="['pink', 'keep', 'list2']"></div>
  </div>
  <div class="list">
    <div v-for="item in 5" :key="item" class="item" :class="{ active: item - 1 === active }" v-waves="['pink']"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 20px;
  height: 20px;
  background-color: pink;
}
.count-to {
  font-size: 24px;
}
.list {
  display: flex;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
  div {
    border: 1px solid pink;
    width: 40px;
    height: 40px;
  }
}
</style>

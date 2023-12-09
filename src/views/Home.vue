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
</script>

<template>
  <SvgIcon name="cell"></SvgIcon>
  <div class="box"></div>
  <!-- gap是在设计稿中单个数字宽度的px数。如果传入的number是小数会自动保留两位处理 -->
  <CountTo class="count-to" :number="number" gap="14"></CountTo>
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
</style>

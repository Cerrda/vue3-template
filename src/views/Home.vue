<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { queryMysqlAPI, queryMiddleAPI } from '@/utils/api.js'
async function query() {
  const res = await queryMysqlAPI()
  console.log('🚀 ~ res:', res)

  const res1 = await queryMiddleAPI()
  console.log('🚀 ~ res1:', res1)
}
query()
</script>

<template>
  <SvgIcon name="cell"></SvgIcon>
  <div class="box"></div>
</template>

<style scoped lang="scss">
.box {
  width: 20px;
  height: 20px;
  background-color: pink;
}
</style>

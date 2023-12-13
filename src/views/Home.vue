<script setup>
import CountTo from '@/components/CountTo.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { queryMysqlAPI, queryMiddleAPI, exportAPI } from '@/utils/api.js'
import { ref } from 'vue'

// 测试queryMysql和queryMiddle，需要213的sid
async function query() {
  const res = await queryMysqlAPI()
  console.log('🚀 ~ res:', res)

  const res1 = await queryMiddleAPI()
  console.log('🚀 ~ res1:', res1)
}
query()
// 测试CountTo组件
const number = ref()
setInterval(() => {
  number.value = Math.floor(Math.random() * 1000)
}, 1000)
// 测试waves指令
const active = ref(0)
// 测试导出接口
exportAPI()
</script>

<template>
  <SvgIcon name="cell"></SvgIcon>
  <!-- gap是在设计稿中单个数字宽度的px数。如果传入的number是小数会自动保留两位处理 -->
  <CountTo class="count-to" :number="number" gap="14"></CountTo>
  <div class="list">
    <div
      v-for="item in 5"
      :key="item"
      class="item"
      :class="{ active: item - 1 === active }"
      v-waves="['linear-gradient(219.31deg, #0ef 0%, #07f 100%)', 'keep', 'list1']"></div>
  </div>
  <div class="list">
    <div
      v-for="item in 5"
      :key="item"
      class="item"
      :class="{ active: item - 1 === active }"
      v-waves="['linear-gradient(219.31deg, #0ef 0%, #07f 100%)', 'keep', 'list2']"></div>
  </div>
  <div class="list">
    <div
      v-for="item in 5"
      :key="item"
      class="item special"
      :class="{ active: item - 1 === active }"
      v-waves="['#ffffff50']">
      按钮
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  .special {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    width: 60px;
    background-color: #10b981;
    color: #fff;
  }
}
</style>

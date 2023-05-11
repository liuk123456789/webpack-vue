<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(1)

const onClickCount = () => {
  count.value++
}
</script>
<template>
  <div>
    <p>我是子应用远程组件</p>
    <button @click="onClickCount">{{ count }}</button>
  </div>
</template>

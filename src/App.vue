<script lang="ts" setup>
const { BASE_ENV } = GLOBAL_INFO
const { NODE_ENV } = process.env
</script>
<template>
  <div>Webpack Build Vue3.x</div>
  <p>{{ BASE_ENV }}</p>
  <p class="theme-color">{{ NODE_ENV }}</p>
</template>

<style lang="scss">
@use '@/styles/variable.module.scss' as variableModule;
.theme-color {
  color: variableModule.$themeColor;
}
</style>

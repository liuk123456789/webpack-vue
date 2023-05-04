<script lang="ts" setup>
const { BASE_ENV } = GLOBAL_INFO
const { NODE_ENV } = process.env
</script>
<template>
  <div>Webpack Build Vue3.x</div>
  <p>{{ BASE_ENV }}</p>
  <p class="theme-color flex-center-center">{{ NODE_ENV }}</p>
</template>

<style lang="scss">
@use '@/styles/variable.module.scss' as variableModule;

.flex-center-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-color {
  color: variableModule.$themeColor;
}
</style>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import smallImg from '@/assets/images/5.jpg'
import bigImg from '@/assets/images/4.jpg'

import axios from 'axios'

interface ICity {
  code: string
  value: string
  children?: ICity[]
}

const { BASE_ENV } = GLOBAL_INFO
const { NODE_ENV } = process.env

let cityList = ref<ICity[]>([])

onMounted(async () => {
  const res = await axios.get('/json/city.json')
  cityList.value = res.data
})
</script>
<template>
  <div class="basic-font">Webpack Build Vue3.x</div>
  <p>{{ BASE_ENV }}</p>
  <p class="theme-color flex-center-center">{{ NODE_ENV }}</p>
  <div class="flex-center-center">
    <img class="img" :src="smallImg" />
    <img class="img" :src="bigImg" />
  </div>
  <ul>
    <li v-for="city in cityList" :key="city.code">{{ city.value }}</li>
  </ul>
</template>

<style lang="scss">
@use '@/styles/variable.module.scss' as variableModule;

.flex-center-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.basic-font {
  font-family: 'Fira Code';
}
.theme-color {
  color: variableModule.$themeColor;
  background: url('@/assets/images/timg.png') no-repeat;
}

.img {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 8px;
}
</style>

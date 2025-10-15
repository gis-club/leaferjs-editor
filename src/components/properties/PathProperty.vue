<script lang="ts" setup>
import {defineProps, computed} from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

const height = computed(() => {
  return window.innerHeight - 420
})

</script>

<template>
  <el-table :data="data" stripe style="width: 100%" :height="height">
    <el-table-column prop="name" label="属性名" width="180" />
    <el-table-column prop="value" label="属性值"  />
  </el-table>
</template>

<style scoped>
</style>
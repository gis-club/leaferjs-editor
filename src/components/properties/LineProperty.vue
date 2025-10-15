<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <el-table :data="data" stripe style="width: 100%">
    <el-table-column prop="name" label="属性名" width="180" />
    <el-table-column prop="value" label="属性值"  />
  </el-table>
</template>

<style scoped>
</style>
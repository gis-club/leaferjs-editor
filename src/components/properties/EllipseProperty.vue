<script lang="ts" setup>
import {defineProps} from 'vue'

const emits = defineEmits(['update:data'])

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

const updateData = (row: { name: string, value: any }) => {
  emits('update:data', row)
}


</script>

<template>
  <el-table :data="data" stripe style="width: 100%">
    <el-table-column prop="name" label="属性名" width="180"/>
    <el-table-column prop="value" label="属性值" >
      <template #default="{ row }">
        <el-color-picker v-if="row.name === 'fill'" v-model="row.value" @change="updateData(row)" />
        <el-input v-else-if="row.name === 'tag'" disabled v-model="row.value" @change="updateData(row)" />
        <el-checkbox v-else-if="row.name === 'editable'" v-model="row.value" @change="updateData(row)" />
        <el-input v-else-if="row.name === 'filter'" type="textarea" v-model="row.value" @change="updateData({name: row.name, value: JSON.parse(row.value)})" />
        <el-input v-else type="number" v-model="row.value" @change="updateData({name: row.name, value: Number(row.value)})" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>
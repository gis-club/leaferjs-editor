<script lang="ts" setup>
import {defineProps} from 'vue'
import { ColorEnum, BooleanEnum, JsonEnum, StringEnum, SelectEnum } from '../../enums/PropertyEnum'

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
    <el-table-column prop="name" label="属性名" width="80"/>
    <el-table-column prop="value" label="属性值" >
      <template #default="{ row }">
        <el-input v-if="row.name === 'tag'" disabled v-model="row.value" @change="updateData(row)" />

        <el-color-picker v-else-if="ColorEnum[row.name as keyof typeof ColorEnum]" v-model="row.value" @change="updateData(row)" />

        <el-checkbox v-else-if="BooleanEnum[row.name as keyof typeof BooleanEnum]" v-model="row.value" @change="updateData(row)" />

        <el-input v-else-if="JsonEnum[row.name as keyof typeof JsonEnum]" type="textarea" v-model="row.value" @change="updateData({name: row.name, value: JSON.parse(row.value)})" />

        <el-input v-else-if="StringEnum[row.name as keyof typeof StringEnum]" type="textarea" v-model="row.value" @change="updateData(row)" ></el-input>
        
        <el-select v-else-if="SelectEnum[row.name as keyof typeof SelectEnum]" v-model="row.value" @change="updateData(row)" >
          <el-option v-for="item in SelectEnum[row.name as keyof typeof SelectEnum]" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-input v-else type="number" v-model="row.value" @change="updateData({name: row.name, value: Number(row.value)})" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>
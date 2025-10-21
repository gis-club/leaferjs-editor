<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { FilterType as FilterTypeEnum} from '../types/IFilterType'
import { type FormInstance } from 'element-plus'

const emit = defineEmits(['confirmFilter'])

const filterForm = reactive({
  type: FilterTypeEnum.BLUR,
  blur: 10,
})

const filterFormRef = useTemplateRef<FormInstance>('filterFormRef')

const confirmFilter = () => {
  emit('confirmFilter', filterForm)
}

const cancelFilter = () => {
  filterFormRef.value?.resetFields()
}

</script>

<template>
  <el-form ref="filterFormRef" :model="filterForm" label-width="auto" style="max-width: 600px">
    <el-form-item label="Type">
      <el-select v-model="filterForm.type" placeholder="Select">
        <el-option v-for="item in FilterTypeEnum" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="Blur">
      <el-input type="number" v-model="filterForm.blur" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmFilter">Confirm</el-button>
      <el-button type="primary" plain @click="cancelFilter">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
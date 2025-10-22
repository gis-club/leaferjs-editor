<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { FilterEnum } from '../enums/FilterEnum'
import { type FormInstance } from 'element-plus'

const emit = defineEmits(['confirmFilter', 'cancelFilter'])

const filterForm = reactive({
  type: FilterEnum.BLUR,
  blur: 10,
})

const filterFormRef = useTemplateRef<FormInstance>('filterFormRef')

const confirmFilter = () => {
  emit('confirmFilter', filterForm)
}

const cancelFilter = () => {
  filterFormRef.value?.resetFields()
  emit('cancelFilter')
}

</script>

<template>
  <el-form ref="filterFormRef" :model="filterForm" label-width="auto" style="max-width: 600px">
    <el-form-item label="Type" prop="type">
      <el-select v-model="filterForm.type" placeholder="Select">
        <el-option v-for="item in FilterEnum" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="Blur" prop="blur">
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
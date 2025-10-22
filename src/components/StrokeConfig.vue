<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import type { IStrokeConfig } from '@/interfaces/IStrokeConfig'
import { type FormInstance } from 'element-plus'
import { SelectEnum } from '@/enums/PropertyEnum'

const emit = defineEmits(['confirmStroke', 'cancelStroke'])

const strokeForm = reactive<IStrokeConfig>({
  type: 'solid',
  color: 'red',
  strokeAlign: 'outside',
  strokeWidth: 1,
  strokeWidthFixed: false,
  strokeCap: 'round',
  strokeJoin: 'round',
  // dashPattern: [0, 0],
  // dashOffset: 0,
})

const strokeFormRef = useTemplateRef<FormInstance>('strokeFormRef')

const confirmStroke = () => {
  strokeForm.strokeWidth = Number(strokeForm.strokeWidth)
  emit('confirmStroke', strokeForm)
}

const cancelStroke = () => {
  strokeFormRef.value?.resetFields()
  emit('cancelStroke')
}

</script>

<template>
  <el-form ref="strokeFormRef" :model="strokeForm" label-width="auto" style="max-width: 600px">
    <el-form-item label="Type" prop="type">
      <el-input type="text" v-model="strokeForm.type" />
    </el-form-item>
    <el-form-item label="Color" prop="color">
      <el-color-picker v-model="strokeForm.color" />
    </el-form-item>
    <el-form-item label="Stroke Width" prop="strokeWidth">
      <el-input type="number" v-model="strokeForm.strokeWidth" />
    </el-form-item>
    <el-form-item label="Stroke Width Fixed" prop="strokeWidthFixed">
      <el-switch v-model="strokeForm.strokeWidthFixed" />
    </el-form-item>
    <el-form-item label="Stroke Cap" prop="strokeCap">
      <el-select v-model="strokeForm.strokeCap" placeholder="Select">
        <el-option v-for="item in SelectEnum.strokeCap" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="Stroke Join" prop="strokeJoin">
      <el-select v-model="strokeForm.strokeJoin" placeholder="Select">
        <el-option v-for="item in SelectEnum.strokeJoin" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="Dash Offset" prop="dashOffset">
      <el-input type="number" v-model="strokeForm.dashOffset" />
    </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="confirmStroke">Confirm</el-button>
      <el-button type="primary" plain @click="cancelStroke">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
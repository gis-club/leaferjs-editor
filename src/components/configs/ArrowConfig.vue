<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['createElement'])

// do not use same name with ref
const form = reactive({
  x: 0, // x坐标
  y: 0, // y坐标
  strokeCap: 'round', // 线帽
  strokeJoin: 'round', // 线连接
  strokeWidth: 5, // 线宽
  stroke: '#32cd79', // 线颜色
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createElement', form)
}


</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="X">
      <el-input type="number" :min="1" v-model="form.x" />
    </el-form-item>
    <el-form-item label="Y">
      <el-input type="number" :min="1" v-model="form.y" />
    </el-form-item>
    <el-form-item label="Stroke Cap">
      <el-input type="text" v-model="form.strokeCap" />
    </el-form-item>
    <el-form-item label="Stroke Join">
      <el-input type="text" v-model="form.strokeJoin" />
    </el-form-item>
    <el-form-item label="Stroke Width">
      <el-input type="number" :min="0" v-model="form.strokeWidth" />
    </el-form-item>
    <el-form-item label="Stroke">
      <el-color-picker v-model="form.stroke" />
    </el-form-item>
    <el-form-item label="Editable">
      <el-switch inline-prompt active-text="是" inactive-text="否" v-model="form.editable" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>
<script setup lang="ts">
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['createLine'])

// do not use same name with ref
const form = reactive({
  width: 200, // 宽度
  points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90], // 点
  stroke: '#32cd79', // 填充颜色
  rotation: 0, // 旋转
  close: false, // 是否闭合
  curve: 0, // 是否曲线
  cornerRadius: 0, // 圆角
  strokeWidth: 1, // 线宽
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createLine', form)
}


</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Width">
      <el-input type="number" :min="1" v-model="form.width" />
    </el-form-item>
    <el-form-item label="Points">
      <el-input type="textarea" v-model="form.points" >
        {{ form.points.join(',') }}
      </el-input>
    </el-form-item>
    <el-form-item label="Rotation">
      <el-input type="number" :min="1" v-model="form.rotation" />
    </el-form-item>
    <el-form-item label="Stroke">
      <el-color-picker v-model="form.stroke" />
    </el-form-item>
    <el-form-item label="Close">
      <el-switch inline-prompt active-text="是" inactive-text="否" v-model="form.close" />
    </el-form-item>
    <el-form-item label="Curve">
      <el-input type="number" :min="0" :max="1" v-model="form.curve" />
    </el-form-item>
    <el-form-item label="Corner Radius">
      <el-input type="number" :min="0" v-model="form.cornerRadius" />
    </el-form-item>
    <el-form-item label="Stroke Width">
      <el-input type="number" :min="0" v-model="form.strokeWidth" />
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
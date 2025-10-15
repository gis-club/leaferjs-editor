<script setup lang="ts">
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['createStar'])

// do not use same name with ref
const form = reactive({
  width: 200, // 宽度
  height: 200, // 高度
  fill: '#32cd79', // 填充颜色
  corners: 3, // 边数
  innerRadius: 0, // 内圆半径
  cornerRadius: 0, // 圆角
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createStar', form)
}


</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Width">
      <el-input type="number" :min="1" v-model="form.width" />
    </el-form-item>
    <el-form-item label="Height">
      <el-input type="number" :min="1" v-model="form.height" />
    </el-form-item>
    <el-form-item label="Fill">
      <el-color-picker v-model="form.fill" />
    </el-form-item>
    <el-form-item label="Corners">
      <el-input type="number" :min="3" v-model="form.corners" />
    </el-form-item>
    <el-form-item label="Inner Radius">
      <el-input type="number" :min="0" :max="1" v-model="form.innerRadius" />
    </el-form-item>
    <el-form-item label="Corner Radius">
      <el-input type="number" :min="0" v-model="form.cornerRadius" />
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
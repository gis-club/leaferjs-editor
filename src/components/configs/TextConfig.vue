<script setup lang="ts">
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['createText'])

// do not use same name with ref
const form = reactive({
  width: 0, // 宽度
  height: 0, // 高度
  text: 'Hello', // 文本
  fill: '#ee9210', // 填充颜色
  editable: true, // 是否可编辑
  fontSize: 50, // 字体大小
  fontWeight: 800, // 字体粗细
  italic: false, // 是否斜体
  textDecoration: JSON.stringify({ type: 'none', color: 'red', offset: 0 }), // 文本装饰
})

const onSubmit = () => {
  emit('createText', {
    ...form,
    textDecoration: JSON.parse(form.textDecoration),
  })
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
    <el-form-item label="Text">
      <el-input v-model="form.text" />
    </el-form-item>
    <el-form-item label="Fill">
      <el-color-picker v-model="form.fill" />
    </el-form-item>
    <el-form-item label="Editable">
      <el-switch inline-prompt active-text="是" inactive-text="否" v-model="form.editable" />
    </el-form-item>
    <el-form-item label="Font Size">
      <el-input type="number" :min="1" v-model="form.fontSize" />
    </el-form-item>
    <el-form-item label="Font Weight">
      <el-input type="number" :min="1" v-model="form.fontWeight" />
    </el-form-item>
    <el-form-item label="Italic">
      <el-switch inline-prompt active-text="是" inactive-text="否" v-model="form.italic" />
    </el-form-item>
    <el-form-item label="Text Decoration">
      <el-input type="textarea" v-model="form.textDecoration" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>
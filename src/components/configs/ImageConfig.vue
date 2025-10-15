<script setup lang="ts">
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['createImage'])

// do not use same name with ref
const form = reactive({
  width: 0, // 宽度
  height: 0, // 高度
  url: 'http://localhost:5173/vite.svg', // 图片地址
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createImage', form)
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
    <el-form-item label="URL">
      <el-input v-model="form.url" />
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
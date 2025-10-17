<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['createRect'])

// do not use same name with ref
const form = reactive({
  width: 200, // 宽度
  height: 200, // 高度
  cornerRadius: [0, 0, 0, 0], // 圆角
  isAll: true, // 是否全圆角
  fill: '#32cd79', // 填充颜色
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createRect', form)
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
    <el-form-item label="Corner Radius">
        <el-form-item label="Top Left">
        <el-input type="number" :min="0" v-model="form.cornerRadius[0]" />
      </el-form-item>
      <el-form-item label="Top Right">
        <el-input type="number" :min="0" v-model="form.cornerRadius[1]" />
      </el-form-item>
      <el-form-item label="Bottom Right">
        <el-input type="number" :min="0" v-model="form.cornerRadius[2]" />
      </el-form-item>
      <el-form-item label="Bottom Left">
        <el-input type="number" :min="0" v-model="form.cornerRadius[3]" />
      </el-form-item>
    </el-form-item>
    <el-form-item label="Fill">
      <el-color-picker v-model="form.fill" />
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
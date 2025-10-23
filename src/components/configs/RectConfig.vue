<script setup lang="ts">
import { reactive } from 'vue'
import CornerRadiusConfig from '../CornerRadiusConfig.vue'

const emit = defineEmits(['createElement'])

// do not use same name with ref
const form = reactive<IRectConfig>({
  width: 200, // 宽度
  height: 200, // 高度
  cornerRadius: [0, 0, 0, 0], // 圆角
  fill: '#32cd79', // 填充颜色
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createElement', form)
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
    <CornerRadiusConfig :cornerRadius="form.cornerRadius" />
    <el-form-item class="fill-config">
      <template #label>
        Fill config
      </template>
      <el-color-picker v-model="form.fill" />
    </el-form-item>
    <el-form-item label="Editable">
      <el-switch
        inline-prompt
        active-text="是"
        inactive-text="否"
        v-model="form.editable"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

.fill-config {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fill-config-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>

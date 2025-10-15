<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['toTop', 'toBottom'])

const toTop = () => {
  emits('toTop')
}

const toBottom = () => {
  emits('toBottom')
}

</script>

<template>
  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>Editor Config</span>
      </div>
    </template>
    <el-form-item label="">
      <el-button type="primary" @click="toTop">To Top</el-button>
      <el-button type="primary" @click="toBottom">To Bottom</el-button>
    </el-form-item>
    <template #footer>Footer content</template>
  </el-card>
</template>

<style scoped>
</style>

<script setup lang="ts">
const props = defineProps({
  cornerRadius: {
    type: Array,
    required: true,
  }
})

</script>

<template>
    <el-form-item class="corner-radius-config">
      <template #label> Corner Radius </template>
      <div class="corner-radius-config-items">
        <el-form-item label="top left">
          <el-input type="number" :min="0" v-model="props.cornerRadius[0]" />
        </el-form-item>
        <el-form-item label="top right">
          <el-input type="number" :min="0" v-model="props.cornerRadius[1]" />
        </el-form-item>
        <el-form-item label="bottom right">
          <el-input type="number" :min="0" v-model="props.cornerRadius[2]" />
        </el-form-item>
        <el-form-item label="bottom left">
          <el-input type="number" :min="0" v-model="props.cornerRadius[3]" />
        </el-form-item>
      </div>
    </el-form-item>
</template>

<style scoped>
.corner-radius-config {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.corner-radius-config-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}
</style>
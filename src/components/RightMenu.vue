<script lang="ts" setup>

defineProps<{
  position: {
    x: number
    y: number
  }
}>()

const emits = defineEmits(['toTopByOne', 'toBottomByOne', 'toTop', 'toBottom', 'deleteElement', 'openEdit', 'closeEdit'])

const toTopByOne = () => {
  emits('toTopByOne')
}

const toBottomByOne = () => {
  emits('toBottomByOne')
}

const toTop = () => {
  emits('toTop')
}

const toBottom = () => {
  emits('toBottom')
}

const deleteElement = () => {
  emits('deleteElement')
}

const openEdit = () => {
  emits('openEdit')
}

const closeEdit = () => {
  emits('closeEdit')
}
</script>

<template>
  <el-card
    :style="{
      position: 'fixed',
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <template #header>
      <div class="card-header">
        <span>右键菜单</span>
      </div>
    </template>
    <ul>
      <li>
        <el-button type="primary" plain @click="toTopByOne">toTopByOne</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toBottomByOne">toBottomByOne</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toTop">toTop</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toBottom">toBottom</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="openEdit">openEdit</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="closeEdit">closeEdit</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="deleteElement">deleteElement</el-button>
      </li>
    </ul>
  </el-card>
</template>

<style lang="scss" scoped>

.el-card {
  :deep(.el-card__header) {
    padding: 5px;
  }
  :deep(.el-card__body) {
    padding: 0 5px;
  }
}

ul {
  list-style: none;
}

li {

  margin-bottom: 5px;
  width: 100%;

  &:first-child {
    margin-top: 5px;
  }

  .el-button {
    width: 100%;
  }

}
</style>

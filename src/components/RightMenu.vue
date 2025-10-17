<script lang="ts" setup>

defineProps<{
  position: {
    x: number
    y: number
  }
}>()

const emits = defineEmits(['toTopByOne', 'toBottomByOne', 'toTop', 'toBottom', 'deleteElement'])

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
        <el-button type="primary" plain @click="toTopByOne">上移</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toBottomByOne">下移</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toTop">上移到顶部</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="toBottom">下移到底部</el-button>
      </li>
      <li>
        <el-button type="primary" plain @click="deleteElement">删除</el-button>
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

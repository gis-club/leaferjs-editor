<template>
  <div>当前指针: {{ editorStore.undoStackPointer }}</div>

  <button @click="editorStore.go(-1)">重置</button>
  <button @click="clear">清空</button>
  <button @click="add">添加</button>
  <button @click="editorStore.undo" :disabled="editorStore.isUndoDisable">
    撤销 <small>{{ editorStore.undoCount }}</small>
  </button>
  <button @click="editorStore.redo" :disabled="editorStore.isRedoDisable">
    重做 <small>{{ editorStore.redoCount }}</small>
  </button>

  <ul>
    <li v-for="(item, index) in editorStore.components" :key="item.name">
      <span>{{ item.type }} - {{ item.name }}</span>
      <button @click="remove(item.name)">删除</button>
      <button @click="toTop(item.name)">置顶</button>
      <button @click="toBottom(item.name)">置底</button>
      <button @click="scale(item.name)">缩放</button>
      <button @click="applyFilter(item.name)">滤镜</button>
    </li>
  </ul>

  <div class="his-wrapper">
    <div
      @click="editorStore.go(-1)"
      :class="{ current: editorStore.undoStackPointer === -1 }"
    >
      打开
    </div>
    <div v-for="(item, index) in editorStore.undoStack" :key="index">
      <ul>
        <li
          @click="editorStore.go(index)"
          :class="{ current: index === editorStore.undoStackPointer }"
        >
          <div>
            <small>{{ index + 1 }}: </small>
            <span>{{ item.action }}</span>
          </div>
          <!-- <div>patches: {{ item.patches }}</div>
        <div>inversePatches:{{ item.inversePatches }}</div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { generateId } from '@/utils/nanoid';
import { useComponentStore } from '@/stores/componentStore';

const editorStore = useComponentStore();
editorStore.init();

function clear() {
  editorStore.clear();
}

function remove(name) {
  editorStore.findAndRemove(name);
}

function add() {
  const newItem = {
    type: 'sprite',
    name: generateId(),
    texture: '',
    scaleX: 1,
    filterList: [],
  };
  editorStore.create(newItem);
}

function toTop(name) {
  editorStore.toTop(name);
}

function toBottom(name) {
  editorStore.toBottom(name);
}

function scale(name) {
  editorStore.findOneAndUpdate(name, {
    scaleX: 2,
  });
}

function applyFilter(name) {
  editorStore.findOneAndUpdate(name, {
    filterList: [21],
  });
}
</script>

<style>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}

.done {
  text-decoration: line-through;
}

.current {
  color: rebeccapurple;
}

.his-wrapper {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: 200px;
  height: 100vh;
  border-left: 1px solid #eee;
  overflow-y: auto;
}
</style>

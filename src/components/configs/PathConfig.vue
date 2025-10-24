<script setup lang="ts">
import { reactive, ref, useTemplateRef, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'
import { useDark } from '@vueuse/core'

import FillConfig from './FillConfig/index.vue'

import type { IFillConfig } from '@/interfaces/IFillConfig'

let editor: monaco.editor.IStandaloneCodeEditor

const isDark = useDark()
const emit = defineEmits(['createElement'])
const fillConfig = ref<InstanceType<typeof FillConfig>>()
  const fillConfigRef = useTemplateRef<HTMLDivElement>('fillConfigRef')

// do not use same name with ref
const form = reactive<IPathConfig>({
  path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z', // 路径
  windingRule: 'nonzero', // 填充规则
  scale: 0.1, // 缩放
  fill: [], // 填充颜色
  editable: true, // 是否可编辑
})

const onSubmit = () => {
  emit('createElement', form)
}

const openFillConfig = () => {
  fillConfig.value?.openDialog()
}

const createEditor = (list: IFillConfig[]) => { 
  editor = monaco.editor.create(fillConfigRef.value as HTMLElement, {
    value: JSON.stringify(list, null, 2),
    language: 'json', // 此处使用的html，其他语言支持自行查阅demo
    theme: isDark.value ? 'vs-dark' : 'vs', // 官方自带三种主题vs, hc-black, or vs-dark
    selectOnLineNumbers: true, // 显示行号
    roundedSelection: false,
    readOnly: false, // 只读
    cursorStyle: 'line', // 光标样式
    automaticLayout: true, // 自动布局
    glyphMargin: true, // 字形边缘
    useTabStops: false,
    fontSize: 15, // 字体大小
    autoIndent: 'none', // 自动布局
    quickSuggestionsDelay: 100, // 代码提示延时
    minimap: {
      enabled: false,
    }
  })
}

const updateFill = (list: IFillConfig[]) => {
  editor || createEditor(list)
  form.fill = list
}

onUnmounted(() => {
  editor?.dispose()
})  

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Path">
      <el-input v-model="form.path" />
    </el-form-item>
    <el-form-item label="Winding Rule">
      <el-input v-model="form.windingRule" />
    </el-form-item>
    <el-form-item class="fill-config">
      <template #label>
        Fill config
      </template>
      <el-button type="primary" @click="openFillConfig">Open Fill Config</el-button>
      <div class="fill-config-editor" ref="fillConfigRef"></div>
      <el-button type="primary" @click="updateFill(JSON.parse(editor.getValue()))">Update Fill</el-button>
    </el-form-item>
    <el-form-item label="Scale">
      <el-input type="number" :min="0" v-model="form.scale" />
    </el-form-item>
    <el-form-item label="Editable">
      <el-switch inline-prompt active-text="是" inactive-text="否" v-model="form.editable" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
  <FillConfig ref="fillConfig" @updateFill="updateFill" />
</template>

<style scoped>

.fill-config-editor {
  margin-top: 10px;
  width: 100%;
  height: 200px;
}

</style>
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
const form = reactive<ITextConfig>({
  width: 0, // 宽度
  height: 0, // 高度
  text: 'Hello', // 文本
  fill: [], // 填充颜色
  editable: true, // 是否可编辑
  fontSize: 50, // 字体大小
  fontWeight: 800, // 字体粗细
  italic: false, // 是否斜体
  textDecoration: { type: 'none', color: 'red', offset: 0 }, // 文本装饰
})

const textDecorationRef = JSON.stringify(form.textDecoration)

const onSubmit = () => {
  form.textDecoration = typeof form.textDecoration === 'string' ? JSON.parse(form.textDecoration) : form.textDecoration
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

const updateTextDecoration = (value: string) => {
  form.textDecoration = typeof value === 'string' ? JSON.parse(value) : value
}

onUnmounted(() => {
  editor?.dispose()
})  

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
    <el-form-item class="fill-config">
      <template #label>
        Fill config
      </template>
      <el-button type="primary" @click="openFillConfig">Open Fill Config</el-button>
      <div class="fill-config-editor" ref="fillConfigRef"></div>
      <el-button type="primary" @click="updateFill(JSON.parse(editor.getValue()))">Update Fill</el-button>
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
      <el-input type="textarea" v-model="textDecorationRef" @change="updateTextDecoration" />
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
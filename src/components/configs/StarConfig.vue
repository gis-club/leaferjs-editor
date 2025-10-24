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
const form = reactive<IStarConfig>({
  width: 200, // 宽度
  height: 200, // 高度
  fill: [], // 填充颜色
  corners: 3, // 边数
  innerRadius: 0.2, // 内圆半径
  cornerRadius: 0, // 圆角
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
    <el-form-item label="Width">
      <el-input type="number" :min="1" v-model="form.width" />
    </el-form-item>
    <el-form-item label="Height">
      <el-input type="number" :min="1" v-model="form.height" />
    </el-form-item>
    <el-form-item class="fill-config">
      <template #label>
        Fill config
      </template>
      <el-button type="primary" @click="openFillConfig">Open Fill Config</el-button>
      <div class="fill-config-editor" ref="fillConfigRef"></div>
      <el-button type="primary" @click="updateFill(JSON.parse(editor.getValue()))">Update Fill</el-button>
    </el-form-item>
    <el-form-item label="Corners">
      <el-input-number :min="3" v-model="form.corners" />
    </el-form-item>
    <el-form-item label="Inner Radius">
      <el-input-number :min="0" :max="1" v-model="form.innerRadius" />
    </el-form-item>
    <el-form-item label="Corner Radius">
      <el-input-number :min="0" v-model="form.cornerRadius" />
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
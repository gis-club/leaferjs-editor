<script setup lang="ts">
import { onMounted, ref, useTemplateRef, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'
import * as _lodash from 'lodash'

import autoClose from './composable/autoClose'
import languages from './composable/languages'
import { registerMyTheme, themes } from './composable/themes'
// import removeContextMenuItem from './composable/removeContextMenuItem'

// 自动闭合标签
autoClose(monaco)
// 删除右键弹出来的一些菜单项
// removeContextMenuItem()
// 修改主题
registerMyTheme(monaco)

let htmlEditor: monaco.editor.IStandaloneCodeEditor
let cssEditor: monaco.editor.IStandaloneCodeEditor

const emit = defineEmits(['createHTML'])
const language = ref<string>('html')
const theme = ref<string>('vs-dark')

// html editor
const htmlContainerRef = useTemplateRef<HTMLDivElement>('htmlContainerRef')
const htmlContent = ref<string>(`<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <div></div>
</body>

</html>`)
const htmlSubscriptionRef = ref<monaco.IDisposable>()

// css editor
const cssContainerRef = useTemplateRef<HTMLDivElement>('cssContainerRef')
const cssContent = ref<string>('')
const cssSubscriptionRef = ref<monaco.IDisposable>()

// code content
const codeContent = ref<string>('')

const onSubmit = () => {
  // 提取body标签中的内容
  const bodyContent = htmlContent.value.match(/<body>(.*?)<\/body>/s)?.[1]
  const css = '<style>' + cssContent.value + '</style>'
  emit('createHTML', bodyContent + css)
}

// 修改语言
const changeLanguage = () => {
  monaco.editor.setModelLanguage(
    monaco.editor.getModels()[0] as monaco.editor.ITextModel,
    language.value
  )
}

// 修改主题
const changeTheme = () => {
  monaco.editor.setTheme(theme.value)
}

// 可以使用ctrl + s快捷键格式化
const ctrlS = (e: KeyboardEvent) => {
  const keyCode = e.keyCode || e.which || e.charCode
  const keyCombination = e.ctrlKey
  if (keyCode == 83 && keyCombination) {
    e.preventDefault()
    htmlEditor.trigger('editor', 'editor.action.formatDocument', {})
    cssEditor.trigger('editor', 'editor.action.formatDocument', {})
  }
}

// 获取html编辑内容变化
const getHtmlChangeContent = () => {
  htmlContent.value = htmlEditor.getValue()
  setCodeContent()
}

// 获取css编辑内容变化
const getCssChangeContent = () => {
  cssContent.value = cssEditor.getValue()
  setCodeContent()
}

const setCodeContent = () => {
  const css = '<style>' + cssContent.value + '</style>'
  let html = htmlContent.value
  // 把css 插入到 html的 head标签中
  html = html.replace('</head>', css + '</head>')
  codeContent.value = html
}

onMounted(() => {
  htmlEditor = monaco.editor.create(htmlContainerRef.value as HTMLElement, {
    value: htmlContent.value,
    language: language.value, // 此处使用的html，其他语言支持自行查阅demo
    theme: theme.value, // 官方自带三种主题vs, hc-black, or vs-dark
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
  })

  cssEditor = monaco.editor.create(cssContainerRef.value as HTMLElement, {
    value: cssContent.value,
    language: 'css', // 此处使用的html，其他语言支持自行查阅demo
    theme: theme.value, // 官方自带三种主题vs, hc-black, or vs-dark
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
  })

  // 监听html和css的编辑内容变化
  htmlSubscriptionRef.value = htmlEditor.onDidChangeModelContent(
    _lodash.debounce(getHtmlChangeContent, 300)
  )
  cssSubscriptionRef.value = cssEditor.onDidChangeModelContent(
    _lodash.debounce(getCssChangeContent, 300)
  )
  window.addEventListener('keydown', ctrlS)
})

onUnmounted(() => {
  window.removeEventListener('keydown', ctrlS)
  htmlSubscriptionRef.value?.dispose()
  cssSubscriptionRef.value?.dispose()
})
</script>

<template>
  <div class="code-editor-config">
    <div class="tools">
      <el-form-item label="Language">
        <el-select
          v-model="language"
          placeholder="Select Language"
          @change="changeLanguage"
        >
          <el-option
            v-for="item in languages"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Theme">
        <el-select
          v-model="theme"
          placeholder="Select Theme"
          @change="changeTheme"
        >
          <el-option
            v-for="item in themes"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="tools-buttons">
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </div>
    </div>
    <div class="editor-container">
      <div class="html-editor-container">
        <label class="editor-label">HTML</label>
        <div ref="htmlContainerRef" class="editor-content"></div>
      </div>
      <div class="css-editor-container">
        <label class="editor-label">CSS</label>
        <div ref="cssContainerRef" class="editor-content"></div>
      </div>
    </div>
    <div class="code-content" v-html="codeContent"></div>
  </div>
</template>

<style scoped>
.code-editor-config {
  display: grid;
  grid-template-rows: 70px 1fr 200px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.editor-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;

  .editor-label {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
  }
}
.html-editor-container {
  grid-row: 1;
  display: grid;
  grid-template-rows: 40px 1fr;
}
.css-editor-container {
  grid-row: 2;
  display: grid;
  grid-template-rows: 40px 1fr;
}
.tools {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
}

.tools-buttons {
  grid-column: 3;
}

.code-content {
  grid-row: 3;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>

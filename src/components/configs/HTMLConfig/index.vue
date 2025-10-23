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

const emit = defineEmits(['createElement'])
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
  const config: IHTMLConfig = {
    x: 0,
    y: 0,
    text: bodyContent + css,
    editable: true,
  }
  emit('createElement', config)
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
    value: htmlContent.value, // 编辑器初始显示文字
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
    autoIndent: 'none', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
    quickSuggestionsDelay: 100, // 代码提示延时
    // foldingStrategy: 'indentation', // 代码可分小段折叠
    // autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    // autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    // autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    // comments: {
    //   ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
    //   insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    // }, // 注释配置
    // cursorBlinking: 'solid', // 光标动画样式
    // cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    // cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    // cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
    // cursorWidth: 2, // <=25 光标宽度
    // minimap: {
    //   // 关闭代码缩略图
    //   enabled: false, // 是否启用预览图
    // },
    // overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
    // folding: true, // 是否启用代码折叠
    // scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    // renderLineHighlight: 'all', // 当前行突出显示方式  "all" | "line" | "none" | "gutter"
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

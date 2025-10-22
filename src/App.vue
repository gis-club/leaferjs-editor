<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { type TabsPaneContext, ElMessage } from 'element-plus'
import { type IAppConfig, type App, type IUI } from 'leafer-ui'

import RectConfig from './components/configs/RectConfig.vue'

import TextConfig from './components/configs/TextConfig.vue'

import ImageConfig from './components/configs/ImageConfig.vue'

import PolygonConfig from './components/configs/PolygonConfig.vue'

import EllipseConfig from './components/configs/EllipseConfig.vue'

import LineConfig from './components/configs/LineConfig.vue'

import StarConfig from './components/configs/StarConfig.vue'

import PathConfig from './components/configs/PathConfig.vue'

import ArrowConfig from './components/configs/ArrowConfig.vue'

import HTMLConfig from './components/configs/HTMLConfig/index.vue'

import RightMenu from './components/RightMenu.vue'
import FilterConfig from './components/FilterConfig.vue'
import ElementProperty from './components/properties/ElementProperty.vue'

import {
  initApp,
  selectedJson,
  exportTemplateJson,
  exportSelectedJson,
  exportImage,
  changeBackgroundColor,
} from './index'

import {
  createRect,
  createText,
  createImage,
  createPolygon,
  createEllipse,
  createLine,
  createStar,
  createPath,
  createArrow,
  createHTML,
} from './utils/element'

import { beforeSelect, onContextmenu } from './utils/event'

const isDark = useDark()
const app = ref<App>()
const activeName = ref('first')
const leaferContainer = useTemplateRef('leaferContainer')
const exportImageName = ref('image')
const exportJsonName = ref('template')
const selectedTarget = ref<IUI>()
const properties = ref<{ name: string; value: any }[]>([])
const isShowRightMenu = ref(false)
const rightMenuPosition = ref({
  x: 0,
  y: 0,
})

// config app
const configApp = ref<IAppConfig>({
  fill: '#6a6868',
  editor: {},
})

// config layout
const configLayout = ref({
  min: 300,
  size: 400,
  max: 400,
})

// is open editor engine
const isOpenEditorEngine = ref(false)

// filter config
const isShowFilterConfig = ref(false)



// handle click
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// generate rect
const generateRect = (config: IRectConfig) => {
  createRect(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// change fill
const changeFill = (color: string) => {
  configApp.value.fill = color
  changeBackgroundColor(color)
}

// generate text
const generateText = (config: ITextConfig) => {
  createText(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate image
const generateImage = (config: IImageConfig) => {
  createImage(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate polygon
const generatePolygon = (config: IPolygonConfig) => {
  createPolygon(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate ellipse
const generateEllipse = (config: IEllipseConfig) => {
  createEllipse(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate line
const generateLine = (config: ILineConfig) => {
  createLine(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate star
const generateStar = (config: IStarConfig) => {
  createStar(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate path
const generatePath = (config: IPathConfig) => {
  createPath(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate arrow
const generateArrow = (config: IArrowConfig) => {
  createArrow(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// generate HTML
const generateHTML = (code: string) => {
  const config: IHTMLConfig = {
    x: 0,
    y: 0,
    text: code,
    editable: true,
  }
  createHTML(
    config as IHTMLConfig,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

// to top
const toTop = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = undefined
  }
  app.value?.editor.toTop()
}

// to bottom
const toBottom = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = undefined
  }
  app.value?.editor.toBottom()
}

// to top by one
const toTopByOne = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = (target.zIndex ?? 0) + 1
  }
}

// to bottom by one
const toBottomByOne = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = (target.zIndex ?? 0) - 1
  }
}

// delete element
const deleteElement = () => {
  app.value?.editor.list.forEach((rect) => rect.remove())
}


// selected file json
const selectedFileJson = () => {
  selectedJson(properties)
}

// update data
const updateData = (row: { name: string; value: any }) => {
  console.log(row)

  const target = selectedTarget.value as any
  if (target) {
    target[row.name] = row.value
  }
}

// add filter
const addFilter = () => {
  const target = selectedTarget.value as any
  if (target) {
    isShowFilterConfig.value = true
  } else {
    ElMessage.error('No target selected')
    isShowFilterConfig.value = false
  }
}

// code editor draw
const codeEditorDraw = () => {
  isOpenEditorEngine.value = true
  changeLayout()
}

// exit code editor draw
const exitCodeEditorDraw = () => {
  isOpenEditorEngine.value = false
  changeLayout()
}

// change layout
const changeLayout = () => {
  configLayout.value.min = isOpenEditorEngine.value ? 600 : 300
  configLayout.value.size = isOpenEditorEngine.value ? 800 : 400
  configLayout.value.max = isOpenEditorEngine.value ? 1200 : 400
}

// confirm filter
const confirmFilter = (form: any) => {
  isShowFilterConfig.value = false
  const target = selectedTarget.value as any
  if (target) {
    target.filter = {
      type: form.type,
      blur: Number(form.blur),
    }
  }
}

// cancel filter
const cancelFilter = () => {
  isShowFilterConfig.value = false
}


// open edit
const openEdit = () => {
  const target = selectedTarget.value as any
  if (target) {
    target.editable = true
  }
}

// close edit
const closeEdit = () => {
  const target = selectedTarget.value as any
  if (target) {
    target.editable = false
  }
}

// on mounted
onMounted(() => {
  app.value = initApp(leaferContainer.value as HTMLElement, configApp.value)
  // before select
  beforeSelect(app.value as App, (target) => {
    if (target && !Array.isArray(target)) {
      selectedTarget.value = target
      properties.value = Object.entries(target.toJSON()).map(
        ([key, value]) => ({
          name: key,
          value: value instanceof Object ? JSON.stringify(value) : value,
        })
      )
    } else {
      selectedTarget.value = undefined
      properties.value = []
      isShowRightMenu.value = false
    }
  })

  // on contextmenu
  onContextmenu(app.value as App, (e: MouseEvent) => {
    const { left, top } =
      leaferContainer.value?.getBoundingClientRect() as DOMRect
    const point = {
      x: e.clientX - left,
      y: e.clientY - top,
    }
    const result = app.value?.pick(point)
    if (result && result.target) {
      selectedTarget.value = result.target as IUI
      isShowRightMenu.value = true
      rightMenuPosition.value.x = e.clientX
      rightMenuPosition.value.y = e.clientY
    } else {
      isShowRightMenu.value = false
    }
  })
})
</script>

<template>
  <el-container>
    <el-header>
      <div class="header-center">
        <el-button type="primary" @click="addFilter">add filter</el-button>
      </div>
      <div class="header-right">
        <div>
          <span>background color</span>
          <el-color-picker
            show-alpha
            v-model="configApp.fill"
            @change="changeFill"
          />
        </div>
        <el-switch
          size="small"
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
        />
        <el-button type="primary" @click="selectedFileJson">import</el-button>
        <el-button type="primary" @click="exportImage(exportImageName)"
          >export image</el-button
        >
        <el-button type="primary" @click="exportTemplateJson(exportJsonName)"
          >export all</el-button
        >
        <el-button type="primary" @click="exportSelectedJson(exportJsonName)"
          >export selected</el-button
        >
        <el-button
          type="primary"
          v-if="!isOpenEditorEngine"
          @click="codeEditorDraw"
          >open editor</el-button
        >
        <el-button
          type="primary"
          v-if="isOpenEditorEngine"
          @click="exitCodeEditorDraw"
          >exit editor</el-button
        >
      </div>
    </el-header>
    <el-main>
      <el-splitter lazy>
        <el-splitter-panel
          v-if="!isOpenEditorEngine"
          :collapsible="true"
          :min="configLayout.min"
          :size="configLayout.size"
          :max="configLayout.max"
        >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Rect" name="first">
              <RectConfig @createRect="generateRect" />
            </el-tab-pane>
            <el-tab-pane label="Ellipse" name="second">
              <EllipseConfig @createEllipse="generateEllipse" />
            </el-tab-pane>
            <el-tab-pane label="Line" name="third">
              <LineConfig @createLine="generateLine" />
            </el-tab-pane>
            <el-tab-pane label="Polygon" name="fourth">
              <PolygonConfig @createPolygon="generatePolygon" />
            </el-tab-pane>
            <el-tab-pane label="Star" name="fifth">
              <StarConfig @createStar="generateStar" />
            </el-tab-pane>
            <el-tab-pane label="Path" name="sixth">
              <PathConfig @createPath="generatePath" />
            </el-tab-pane>
            <!-- <el-tab-pane label="Pen" name="seventh">Pen</el-tab-pane> -->
            <el-tab-pane label="Image" name="eighth">
              <ImageConfig @createImage="generateImage" />
            </el-tab-pane>
            <!-- <el-tab-pane label="SVG" name="ninth">SVG</el-tab-pane> -->
            <!-- <el-tab-pane label="Canvas" name="tenth">Canvas</el-tab-pane> -->
            <el-tab-pane label="Text" name="eleventh">
              <TextConfig @createText="generateText" />
            </el-tab-pane>
            <el-tab-pane label="Arrow" name="twelfth">
              <ArrowConfig @createArrow="generateArrow" />
            </el-tab-pane>
          </el-tabs>
        </el-splitter-panel>
        <el-splitter-panel
          v-else="isOpenEditorEngine"
          :collapsible="true"
          :min="configLayout.min"
          :size="configLayout.size"
          :max="configLayout.max"
        >
          <HTMLConfig @createHTML="generateHTML" />
        </el-splitter-panel>
        <el-splitter-panel :collapsible="true" min="600">
          <div ref="leaferContainer" id="leafer-container"></div>
          <RightMenu
            v-if="isShowRightMenu"
            :position="rightMenuPosition"
            @toTopByOne="toTopByOne"
            @toBottomByOne="toBottomByOne"
            @toTop="toTop"
            @toBottom="toBottom"
            @deleteElement="deleteElement"
            @openEdit="openEdit"
            @closeEdit="closeEdit"
          />
        </el-splitter-panel>
        <el-splitter-panel :collapsible="true" min="300" size="400" max="400">
          <ElementProperty
            v-if="selectedTarget"
            :data="properties"
            @update:data="updateData"
          />

          <FilterConfig
            v-if="isShowFilterConfig"
            @confirmFilter="confirmFilter"
            @cancelFilter="cancelFilter"
          />
        </el-splitter-panel>
      </el-splitter>
    </el-main>
  </el-container>
</template>

<style scoped>
#layout {
  width: 100%;
  height: 100%;
}

.el-container {
  background-color: #2e2e2e;
  width: 100%;
  height: 100%;
  color: #fff;
}

.el-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #640404;
  color: #fff;

  .header-center {
    display: flex;
    justify-content: start;
    align-items: center;
    grid-column: 2;
  }

  .header-right {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    grid-column: 3;
  }
}

.el-main {
  background-color: #000000;
}

.el-splitter {
  background-color: #444343;
}

#leafer-container {
  width: 100%;
  height: 100%;
}

.code-editor-draw {
  width: 100%;
  height: 100%;
}
</style>

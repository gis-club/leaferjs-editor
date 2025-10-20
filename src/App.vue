<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import { type IAppConfig, type App, type IUI } from 'leafer-ui'

import RectConfig from './components/configs/RectConfig.vue'
import RectProperty from './components/properties/RectProperty.vue'

import TextConfig from './components/configs/TextConfig.vue'
import TextProperty from './components/properties/TextProperty.vue'

import ImageConfig from './components/configs/ImageConfig.vue'
import ImageProperty from './components/properties/ImageProperty.vue'

import PolygonConfig from './components/configs/PolygonConfig.vue'
import PolygonProperty from './components/properties/PolygonProperty.vue'

import EllipseConfig from './components/configs/EllipseConfig.vue'
import EllipseProperty from './components/properties/EllipseProperty.vue'

import LineConfig from './components/configs/LineConfig.vue'
import LineProperty from './components/properties/LineProperty.vue'

import StarConfig from './components/configs/StarConfig.vue'
import StarProperty from './components/properties/StarProperty.vue'

import PathConfig from './components/configs/PathConfig.vue'
import PathProperty from './components/properties/PathProperty.vue'

import ArrowConfig from './components/configs/ArrowConfig.vue'
import ArrowProperty from './components/properties/ArrowProperty.vue'

import HTMLConfig from './components/configs/HTMLConfig/index.vue'
import HTMLProperty from './components/properties/HTMLProperty.vue'

import RightMenu from './components/RightMenu.vue'

import { ShapeType as ShapeTypeEnum } from './types/IShapeType'

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
const configApp = ref<IAppConfig>({
  fill: '#6a6868',
  editor: {},
})

const configLayout = ref({
  min: 300,
  size: 400,
  max: 400,
})

const isOpenEditor = ref(false)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const generateRect = (config: IRectConfig) => {
  createRect(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const changeFill = (color: string) => {
  configApp.value.fill = color
  changeBackgroundColor(color)
}

const generateText = (config: ITextConfig) => {
  createText(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generateImage = (config: IImageConfig) => {
  createImage(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generatePolygon = (config: IPolygonConfig) => {
  createPolygon(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generateEllipse = (config: IEllipseConfig) => {
  createEllipse(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generateLine = (config: ILineConfig) => {
  createLine(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generateStar = (config: IStarConfig) => {
  createStar(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generatePath = (config: IPathConfig) => {
  createPath(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

const generateArrow = (config: IArrowConfig) => {
  createArrow(
    config,
    app.value as App,
    leaferContainer.value as HTMLElement,
    properties
  )
}

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
const toTop = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = undefined
  }
  app.value?.editor.toTop()
}

const toBottom = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = undefined
  }
  app.value?.editor.toBottom()
}

const toTopByOne = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = (target.zIndex ?? 0) + 1
  }
}

const toBottomByOne = () => {
  const target = app.value?.editor.target
  if (target && !Array.isArray(target)) {
    target.zIndex = (target.zIndex ?? 0) - 1
  }
}

const deleteElement = () => {
  app.value?.editor.list.forEach((rect) => rect.remove())
}

const selectedFileJson = () => {
  selectedJson(properties)
}

const updateData = (row: { name: string, value: any }) => {
  console.log(row);
  
  const target = selectedTarget.value as any
  if (target) {
    target[row.name] = row.value
  }
}



const codeEditorDraw = () => {
  isOpenEditor.value = true
  changeLayout()
}

const exitCodeEditorDraw = () => {
  isOpenEditor.value = false
  changeLayout()
}

const changeLayout = () => {
  configLayout.value.min = isOpenEditor.value ? 600 : 300
  configLayout.value.size = isOpenEditor.value ? 800 : 400
  configLayout.value.max = isOpenEditor.value ? 1200 : 400
}

onMounted(() => {
  app.value = initApp(leaferContainer.value as HTMLElement, configApp.value)
  beforeSelect(app.value as App, (target) => {
    
    if (target && !Array.isArray(target)) {
      console.log(target);
      
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

  onContextmenu(app.value as App, (e: MouseEvent) => {
    const target = app.value?.editor.target
    if (target && !Array.isArray(target)) {
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
        <el-button type="primary" v-if="!isOpenEditor" @click="codeEditorDraw">open editor</el-button>
        <el-button type="primary" v-if="isOpenEditor" @click="exitCodeEditorDraw">exit editor</el-button>
      </div>
    </el-header>
    <el-main>
      <el-splitter lazy>
        <el-splitter-panel v-if="!isOpenEditor" :collapsible="true" :min="configLayout.min" :size="configLayout.size" :max="configLayout.max">
          <el-tabs  v-model="activeName" @tab-click="handleClick">
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
        <el-splitter-panel v-else="isOpenEditor" :collapsible="true" :min="configLayout.min" :size="configLayout.size" :max="configLayout.max">
          <HTMLConfig @createHTML="generateHTML" />
        </el-splitter-panel>
        <el-splitter-panel :collapsible="true" min="600">
          <div ref="leaferContainer" id="leafer-container"></div>
          <RightMenu v-if="isShowRightMenu" :position="rightMenuPosition" @toTopByOne="toTopByOne" @toBottomByOne="toBottomByOne" @toTop="toTop" @toBottom="toBottom" @deleteElement="deleteElement" />
        </el-splitter-panel>
        <el-splitter-panel :collapsible="true" min="300" size="400" max="400">
          <RectProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Rect"
            :data="properties"
            @update:data="updateData"
          />
          <EllipseProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Ellipse"
            :data="properties"
            @update:data="updateData"
          />
          <LineProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Line"
            :data="properties"
            @update:data="updateData"
          />
          <PolygonProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Polygon"
            :data="properties"
            @update:data="updateData"
          />
          <StarProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Star"
            :data="properties"
            @update:data="updateData"
          />
          <PathProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Path"
            :data="properties"
            @update:data="updateData"
          />
          <ImageProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Image"
            :data="properties"
            @update:data="updateData"
          />
          <TextProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Text"
            :data="properties"
            @update:data="updateData"
          />
          <ArrowProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.Arrow"
            :data="properties"
            @update:data="updateData"
          />
          <HTMLProperty
            v-if="selectedTarget && selectedTarget.tag === ShapeTypeEnum.HTMLText"
            :data="properties"
            @update:data="updateData"
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

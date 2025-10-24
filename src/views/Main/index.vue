<script setup lang="ts">
import { ref, useTemplateRef, onMounted, shallowRef, provide, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { type IAppConfig, type App, type IUI } from 'leafer-ui'
import { Ruler } from 'leafer-x-ruler'
import { Snap } from 'leafer-x-easy-snap'

import RightMenu from '@/components/RightMenu.vue'
import FilterConfig from '@/components/FilterConfig.vue'
import ElementProperty from '@/components/properties/ElementProperty.vue'
import StrokeConfig from '@/components/StrokeConfig.vue'

import {
  initApp,
  selectedJson,
  exportTemplateJson,
  exportSelectedJson,
  exportImage,
  changeBackgroundColor,
} from './index'

import { beforeSelect, onContextmenu } from '@/utils/event'

import ElementConfig from '@/pages/ElementConfig/index.vue'

const isDark = useDark()
const app = shallowRef<App>()
const ruler = shallowRef<Ruler>()
const snap = shallowRef<Snap>()

const leaferContainer = useTemplateRef('leaferContainer')
const exportImageName = ref('image')
const exportJsonName = ref('template')
const selectedTarget = ref<IUI>()

const selectedElementProperties = ref<{ name: string; value: any }[]>([])
provide('selectedElementProperties', selectedElementProperties)

const isShowRightMenu = ref(false)
const rightMenuPosition = ref({
  x: 0,
  y: 0,
})

// config app
const configApp = ref<IAppConfig>({
  fill: '#6a6868',
  editor: {
    point: { cornerRadius: 0 },
    middlePoint: {},
    circle: { width: 16, height: 16 },
    rect: { dashPattern: [3, 2] },
  },
})

// is open editor engine
const isOpenEditorEngine = ref(false)

// filter config
const isShowFilterConfig = ref(false)

// stroke config
const isShowStrokeConfig = ref(false)

// change fill
const changeFill = (color: string) => {
  configApp.value.fill = color
  changeBackgroundColor(color)
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
  selectedJson(selectedElementProperties)
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

// add stroke
const addStroke = () => {
  isShowStrokeConfig.value = true
}

// confirm stroke
const confirmStroke = (form: any) => {
  isShowStrokeConfig.value = false
  const target = selectedTarget.value as IUI
  if (target) {
    console.log(form)
  }
}

// cancel stroke
const cancelStroke = () => {
  isShowStrokeConfig.value = false
}
// code editor draw
const toggleCodeEditorDraw = () => {
  isOpenEditorEngine.value = !isOpenEditorEngine.value
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

const toggleDark = (value: boolean) => {
  if (value) {
    ruler.value?.changeTheme('dark2')
  } else {
    ruler.value?.changeTheme('light')
  }
}

// on mounted
onMounted(() => {
  app.value = initApp(leaferContainer.value as HTMLElement, configApp.value)
  // before select
  beforeSelect(app.value as App, (target) => {
    if (target && !Array.isArray(target)) {
      selectedTarget.value = target
      selectedElementProperties.value = Object.entries(target.toJSON()).map(
        ([key, value]) => ({
          name: key,
          value: value instanceof Object ? JSON.stringify(value) : value,
        })
      )
    } else {
      selectedTarget.value = undefined
      selectedElementProperties.value = []
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

  ruler.value = new Ruler(app.value, {
    enabled: true,
    ruleSize: 20,
  })
  ruler.value?.addTheme('dark2', {
    backgroundColor: '#16161a',
    textColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: '#686868',
    highlightColor: 'rgba(0, 102, 255, 0.5)',
  })
  ruler.value?.changeTheme('dark2')

  snap.value = new Snap(app.value)
  snap.value?.enable(true)
})

</script>

<template>
  <el-container>
    <el-header>
      <div class="header-center">
        <el-button type="primary" @click="addFilter">add filter</el-button>
        <el-button type="primary" @click="addStroke">add stroke</el-button>
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
          size="large"
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          @change="toggleDark"
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
          @click="toggleCodeEditorDraw"
          >open editor</el-button
        >
        <el-button
          type="primary"
          v-if="isOpenEditorEngine"
          @click="toggleCodeEditorDraw"
          >exit editor</el-button
        >
      </div>
    </el-header>
    <el-main>
      <el-splitter lazy>
        <ElementConfig
          :app="app as App"
          :leaferContainer="leaferContainer as HTMLElement"
          :isOpenEditorEngine="isOpenEditorEngine"
        />
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
            :data="selectedElementProperties"
            @update:data="updateData"
          />

          <FilterConfig
            v-if="isShowFilterConfig"
            @confirmFilter="confirmFilter"
            @cancelFilter="cancelFilter"
          />

          <StrokeConfig
            v-if="isShowStrokeConfig"
            @confirmStroke="confirmStroke"
            @cancelStroke="cancelStroke"
          />
        </el-splitter-panel>
      </el-splitter>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
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

#leafer-container {
  width: 100%;
  height: 100%;
}

.code-editor-draw {
  width: 100%;
  height: 100%;
}
</style>

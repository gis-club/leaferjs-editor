<script setup lang="ts">
import { ref, shallowRef, inject, type Ref, watch, reactive } from 'vue'
import type { App } from 'leafer-ui'

import RectConfig from '@/components/configs/RectConfig.vue'

import TextConfig from '@/components/configs/TextConfig.vue'

import ImageConfig from '@/components/configs/ImageConfig.vue'

import PolygonConfig from '@/components/configs/PolygonConfig.vue'

import EllipseConfig from '@/components/configs/EllipseConfig.vue'

import LineConfig from '@/components/configs/LineConfig.vue'

import StarConfig from '@/components/configs/StarConfig.vue'

import PathConfig from '@/components/configs/PathConfig.vue'

import ArrowConfig from '@/components/configs/ArrowConfig.vue'

import HTMLConfig from '@/components/configs/HTMLConfig/index.vue'

import type { IElementConfig } from '@/interfaces/IElementConfig'

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
} from '@/utils/element'

const prop = defineProps<{
  app: App | undefined
  leaferContainer: HTMLElement
  isOpenEditorEngine: boolean
}>()

const activeName = ref<string>('rect')
const selectedElementProperties = inject('selectedElementProperties')
const configElement = ref<IElementConfig[]>([
  {
    id: 'rect',
    label: 'Rect',
    component: shallowRef(RectConfig),
    function: (config: IRectConfig) => {
      createRect(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'ellipse',
    label: 'Ellipse',
    component: shallowRef(EllipseConfig),
    function: (config: IEllipseConfig) => {
      createEllipse(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'line',
    label: 'Line',
    component: shallowRef(LineConfig),
    function: (config: ILineConfig) => {
      createLine(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'polygon',
    label: 'Polygon',
    component: shallowRef(PolygonConfig),
    function: (config: IPolygonConfig) => {
      createPolygon(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'star',
    label: 'Star',
    component: shallowRef(StarConfig),
    function: (config: IStarConfig) => {
      createStar(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'path',
    label: 'Path',
    component: shallowRef(PathConfig),
    function: (config: IPathConfig) => {
      createPath(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'image',
    label: 'Image',
    component: shallowRef(ImageConfig),
    function: (config: IImageConfig) => {
      createImage(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'text',
    label: 'Text',
    component: shallowRef(TextConfig),
    function: (config: ITextConfig) => {
      createText(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
  {
    id: 'arrow',
    label: 'Arrow',
    component: shallowRef(ArrowConfig),
    function: (config: IArrowConfig) => {
      createArrow(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
    },
  },
])
const configLayout = reactive({
  min: 300,
  size: 600,
  max: 1200,
})

const generateHTML = (config: IHTMLConfig) => {
  createHTML(config, prop.app as App, prop.leaferContainer, selectedElementProperties as Ref<{ name: string; value: any }[]>)
 }

</script>

<template>
  <el-splitter-panel
    :collapsible="true"
    :min="configLayout.min"
    :size="configLayout.size"
    :max="configLayout.max"
  >
    <el-tabs v-if="!isOpenEditorEngine" v-model="activeName">
      <el-tab-pane
        v-for="item in configElement"
        :key="item.id"
        :label="item.label"
        :name="item.id"
      >
        <component :is="item.component" @createElement="item.function" />
      </el-tab-pane>
    </el-tabs>
    <HTMLConfig v-else="isOpenEditorEngine" @createElement="generateHTML" />
  </el-splitter-panel>
</template>

<style scoped></style>

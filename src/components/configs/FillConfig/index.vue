<script setup lang="ts">
import { ref, useTemplateRef, reactive, watch, onUnmounted } from 'vue'
import { Leafer, Rect, type IUnitPointData, type IColorStop } from 'leafer-ui'
import type { FormProps } from 'element-plus'
import { useDark } from '@vueuse/core'
import * as monaco from 'monaco-editor'

import { FillTypeEnum, AlignEnum } from '@/enums/PropertyEnum'

const props = defineProps<{
  fill: string
}>()

const emits = defineEmits(['update:fill'])

const isDark = useDark()
const visible = ref(false)
const fillConfigRef = useTemplateRef<HTMLDivElement>('fillConfigRef')
const labelPosition = ref<FormProps['labelPosition']>('left')
const predefineColors = ref<string[]>([])
const selectedColor = ref<string>('#FF4B4B')
const offset = ref<number>(0)
const editorContainerRef = useTemplateRef<HTMLDivElement>('editorContainerRef')
const isAbsoluteFrom = ref(false) // 是否是绝对位置
const isAbsoluteTo = ref(false) // 是否是绝对位置
let leaferInstance: Leafer
let editor: monaco.editor.IStandaloneCodeEditor
let rect: Rect

interface IFillConfig {
  type: FillTypeEnum
  color?: string
  from?: AlignEnum | IUnitPointData
  to?: AlignEnum | IUnitPointData
  stretch?: number
  stops?: IColorStop[]
}

const form = reactive<IFillConfig>({
  type: FillTypeEnum.solid,
  color: '#32cd79',
  from: undefined,
  to: undefined,
  stretch: undefined,
  stops: [],
})

const openDialog = () => {
  visible.value = true
}

const confirm = () => {
  emits('update:fill', props.fill)
  visible.value = false
}
console.log(JSON.stringify(form));

const onOpen = () => {
  leaferInstance = new Leafer({
    view: fillConfigRef.value as HTMLElement,
  })
  rect = new Rect({
    width: 200,
    height: 200,
    fill: [JSON.parse(JSON.stringify(form))],
    x: (fillConfigRef.value?.clientWidth ?? 0) / 2 - 100,
    y: (fillConfigRef.value?.clientHeight ?? 0) / 2 - 100,
  })

  leaferInstance.add(rect)

  editor = monaco.editor.create(editorContainerRef.value as HTMLElement, {
    value: JSON.stringify(form, null, 2),
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

const onClose = () => {
   leaferInstance?.destroy()
   editor?.dispose()
}

const addColor = () => {
  if (offset.value) {

  } else {
    form.stops.push(selectedColor.value)
  }
}

const clearColor = () => {
  selectedColor.value = ''
}

const onTest = () => {
  rect.fill.push(JSON.parse(JSON.stringify(form)))
  rect.forceUpdate('fill')
  console.log(rect.fill);
  
}

watch(
  () => isAbsoluteFrom.value,
  (newVal) => {
    if (newVal) {
      form.from = {
        type: 'percent',
        x: 0,
        y: 0,
      }
      form.to = {
        type: 'percent',
        x: 0,
        y: 0,
      }
    } else {
      form.from = undefined
      form.to = undefined
    }
  },
  {
    immediate: true,
  }
)

watch(
  () => form.stops,
  (newVal) => {
    if (offset.value) {
      
    } else {
      predefineColors.value = newVal
    }
  },
  {
    deep: true,
  }
)

watch(
  () => form,
  (newVal) => {
    editor.setValue(JSON.stringify(newVal, null, 2))
  },
  {
    deep: true,
  }
)

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog
    @open="onOpen"
    width="1000"
    v-model="visible"
    title="Fill Config"
    align-center
    @close="onClose"
  >
    <div class="fill-config-content">
      <div class="fill-config-content-left">
        <div ref="fillConfigRef"></div>
        <div ref="editorContainerRef"></div>
      </div>
      <el-form :model="form" label-width="auto" :label-position="labelPosition">
        <el-form-item label="Fill Type">
          <el-select v-model="form.type" placeholder="Select">
            <el-option
              v-for="item in FillTypeEnum"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <template v-if="form.type === FillTypeEnum.solid">
          <el-form-item label="Color">
            <el-color-picker v-model="form.color" />
          </el-form-item>
        </template>
        <template v-else-if="form.type === FillTypeEnum.linear">
          <el-form-item class="fill-form-item" label="From config">
            <!-- 是否是绝对位置 -->
            <el-checkbox
              v-model="isAbsoluteFrom"
              label="Absolute Position"
            />
            <div class="fill-form-item-content" v-if="!isAbsoluteFrom">
              <h4>Relative Position</h4>
              <el-form-item label="From">
                <el-select v-model="form.from" placeholder="Select" clearable>
                  <el-option
                    v-for="item in AlignEnum"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="fill-form-item-content" v-else>
              <h4>Absolute Position</h4>
              <el-form-item label="From">
                <el-select
                  v-model="(form.from as IUnitPointData).type"
                  placeholder="Select"
                  clearable
                >
                  <el-option label="percent" value="percent" />
                  <el-option label="px" value="px" />
                </el-select>
              </el-form-item>
              <el-form-item label="X">
                <el-input-number v-model="(form.from as IUnitPointData).x" />
              </el-form-item>
              <el-form-item label="Y">
                <el-input-number v-model="(form.from as IUnitPointData).y" />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item class="fill-to-item" label="To config">
            <!-- 是否是绝对位置 -->
            <el-checkbox
              v-model="isAbsoluteTo"
              label="Absolute Position"
            />
            <div class="fill-to-item-content" v-if="!isAbsoluteTo">
              <h4>Relative Position</h4>
              <el-form-item label="To">
                <el-select v-model="form.to" placeholder="Select" clearable>
                  <el-option
                    v-for="item in AlignEnum"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="fill-to-item-content" v-else>
              <h4>Absolute Position</h4>
              <el-form-item label="To">
                <el-select
                  v-model="(form.to as IUnitPointData).type"
                  placeholder="Select"
                  clearable
                >
                  <el-option label="percent" value="percent" />
                  <el-option label="px" value="px" />
                </el-select>
              </el-form-item>
              <el-form-item label="X">
                <el-input-number v-model="(form.to as IUnitPointData).x" />
              </el-form-item>
              <el-form-item label="Y">
                <el-input-number v-model="(form.to as IUnitPointData).y" />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="Stretch">
            <el-input-number v-model="form.stretch" />
          </el-form-item>
          <el-form-item class="fill-stops-item" label="Stops">
            <div class="fill-stops-item-content">
              <h4>Color</h4>
              <el-color-picker-panel
                v-model="selectedColor"
                show-alpha
                :predefine="predefineColors"
              >
                <template #footer>
                  <el-button type="primary" text @click="clearColor"
                    >Clear</el-button
                  >
                  <el-button type="primary" plain @click="addColor"
                    >OK</el-button
                  >
                </template>
              </el-color-picker-panel>
            </div>
            <div class="fill-stops-item-content">
              <h4>Offset</h4>
              <el-input-number v-model="offset" />
            </div>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="confirm">Cancel</el-button>
        <el-button type="primary" @click="onTest"> Test </el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.fill-config-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.fill-config-content-left {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.fill-form-item-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fill-to-item-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fill-stops-item-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

<style scoped>
.fill-form-item {
  & :deep(.el-form-item__content) {
    display: block;
  }
}

.fill-to-item {
  & :deep(.el-form-item__content) {
    display: block;
  }
}

.fill-stops-item {
  & :deep(.el-form-item__content) {
    display: block;
  }
}

</style>

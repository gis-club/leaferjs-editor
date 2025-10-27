import {
  App,
  type IAppConfig,
  type IExportResult,

} from 'leafer-ui'
import { importJson } from '../../utils/file'
import FileSaver from 'file-saver'
import { ElMessage } from 'element-plus'

import { createLeafer } from '../../utils/element'
import { addEvent } from '../../utils/event'
import type { Ref } from 'vue'

import pinia from '@/stores/pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore(pinia)

// 导入自定义滤镜
import '../../utils/filter'

let app: App

export const initApp = (element: HTMLElement, config: IAppConfig): App => {
  app = new App({
    view: element,
    ...config,
  })

  addEvent(app)

  appStore.setApp(app)

  return app
}

export const changeBackgroundColor = (color: string) => {
  app.fill = color
}

/**
 * @description 导出图片
 * @param name 文件名
 */
export const exportImage = async (name: string) => {
  if (!name) {
    throw new Error('File name is required')
  }

  app.leafer?.tree?.export(name, {
    quality: 2,
    pixelRatio: 2,
    fill: '#00000000',
    smooth: true,
    padding: 0,
    contextSettings: {
      willReadFrequently: true,
      alpha: true,
    },
    blob: true,
  }).then((result: IExportResult) => {
    if (result.data && result.data instanceof Blob) { 
      console.log(result.data);
      const fileReader = new FileReader()
      fileReader.readAsDataURL(result.data)
      fileReader.onload = (e) => {
        console.log(e.target?.result);
        debugger
      }
      // debugger
      // const url = URL.createObjectURL(result.data)
      // console.log(url);
      // const a = document.createElement('a');
      // a.href = url;
      // const absoluteUrl = a.href;
      // console.log(absoluteUrl);

    } 
    
  })
}

/**
 * @description 导出叶子json
 * @param name 文件名
 */
export const exportTemplateJson = (name: string) => {
  if (!name) {
    throw new Error('File name is required')
  }

  if (app.editor.editing) {
    app.editor.target = undefined
  }

  const json = app.leafer?.toJSON()
  FileSaver.saveAs(new Blob([JSON.stringify(json)]), name + '_template.json')
  ElMessage.success('Export template json success')
}

/**
 * @description 导出选中的叶子json
 * @param name 文件名
 */
export const exportSelectedJson = (name: string) => {
  if (!name) {
    throw new Error('File name is required')
  }
  const json = app.editor.list.map((rect) => rect.toJSON())
  FileSaver.saveAs(new Blob([JSON.stringify(json)]), name + '_selected.json')
  ElMessage.success('Export selected json success')
}

/**
 * @description 导入叶子json
 */
export const selectedJson = async (properties: Ref<{name: string, value: any}[]>) => {
  const data = await importJson()
  const json = JSON.parse(data)

  createLeafer(json, app, properties)
  return json
}



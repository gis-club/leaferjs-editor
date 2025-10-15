import {
  App,
  type IAppConfig,

} from 'leafer-ui'
import { importJson } from './utils/file'
import FileSaver from 'file-saver'
import { ElMessage } from 'element-plus'

import { createLeafer } from './utils/element'
import { addEvent } from './utils/event'
import type { Ref } from 'vue'

let app: App

export const initApp = (element: HTMLElement, config: IAppConfig): App => {
  app = new App({
    view: element,
    ...config,
  })

  addEvent(app)

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

  app.leafer?.export(name + '.png')
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



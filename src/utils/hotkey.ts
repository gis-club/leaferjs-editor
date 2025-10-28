import hotkeys from 'hotkeys-js'
import { useRecordStore } from '@/stores/recordStore'

import { removeElement } from './element'

import pinia from '@/stores/pinia'
import { useAppStore } from '@/stores/app'
import type {  ILeafer } from 'leafer-ui'

const recordStore = useRecordStore(pinia)
const appStore = useAppStore(pinia)

export const registerHotkey = (element: HTMLElement) => {
  // 关键：让元素可聚焦并自动获取焦点
  element.setAttribute('tabindex', '-1');
  element.focus();
  
  hotkeys('ctrl + v', { element: element }, (e: KeyboardEvent) => {
    e.preventDefault()
    appStore.pasteElement()
  });

  hotkeys('ctrl+z', (event) => {
    event.preventDefault()
    const patches = recordStore.undo()
    if (patches && patches.length) {
      patches.forEach(patch => {
        removeElement(appStore.leafer! as ILeafer, patch.value.value)
      })
    }
  })
  
  hotkeys('ctrl+x', (event) => {
    event.preventDefault()
    appStore.cutElement(appStore.selectedElementIds)
  })
}
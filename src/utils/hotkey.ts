import hotkeys from 'hotkeys-js'
import { useRecordStore } from '@/stores/recordStore'

import { removeElement } from './element'

import pinia from '@/stores/pinia'
import { useAppStore } from '@/stores/app'
import type { App } from 'leafer-ui'

const recordStore = useRecordStore(pinia)
const appStore = useAppStore(pinia)

hotkeys('ctrl+z', (event, handler) => {
  event.preventDefault()
  const patches = recordStore.undo()
  if (patches && patches.length) {
    patches.forEach(patch => {
      removeElement(appStore.app! as App, patch.value.value)
    })
  }
})


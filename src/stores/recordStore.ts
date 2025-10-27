import { defineStore } from 'pinia'
import { useHistory } from '@/hooks/useHistory'
import { remove as _remove, cloneDeep } from 'lodash'

import { generateId } from '@/utils/nanoid'

type Component = {
  shapeType: string
  operateType: string
  id: string
  value: any
  [key: string]: any
}

const defaultItems: Component[] = [
  {
    shapeType: 'text',
    operateType: 'create',
    id: generateId(),
    value: null,
  },
  {
    shapeType: 'rect',
    operateType: 'create',
    id: generateId(),
    value: null,
  },
]

export const useRecordStore = defineStore('record', () => {
  const {
    state: record,
    update: updateRecord,
    undo,
    redo,
    undoStack,
    undoStackPointer,
    go,
    enable,
    isUndoDisable,
    isRedoDisable,
    undoCount,
    redoCount,
  } = useHistory<Component[]>([])

  /**
   * 创建新记录
   */
  function create(item: Component) {
    updateRecord((record) => {
      record.push(item)
    }, '新增组件')
  }

  /**
   * 根据名称查找单个组件
   */
  function findOne(id: string) {
    return record.value.find((item) => item.id === id)
  }

  /**
   * 根据名称查找多个组件
   */
  function find(ids: string | string[]) {
    return record.value.filter((c) => ids.includes(c.id))
  }

  /**
   * 查找并删除组件
   */
  function findAndRemove(ids: string | string[]) {
    let removedItems: Component[] = []
    updateRecord((record) => {
      removedItems = _remove(record, (c) => ids.includes(c.id))
    }, '删除组件')
    return removedItems
  }

  /**
   * 查找并更新单个组件
   */
  function findOneAndUpdate(id: string, props: Record<string, any>) {
    updateRecord((record) => {
      const component = record.find((c) => c.id === id)

      if (component) {
        Object.entries(props).forEach(([key, newValue]) => {
          if (component[key] !== newValue) {
            component[key] = newValue
          }
        })
      }
    }, '更新组件')
  }

  /**
   * 清空所有组件
   */
  function clear() {
    updateRecord((record) => {
      record.length = 0
    }, '清空')
  }

  /**
   * 将组件置顶
   */
  function toTop(names: string | string[]) {
    updateRecord((record) => {
      const removedItems = _remove(record, (c) => names.includes(c.name))
      record.unshift(...removedItems)
    }, '置顶')
  }

  /**
   * 将组件置底
   */
  function toBottom(names: string | string[]) {
    updateRecord((record) => {
      const removedItems = _remove(record, (c) => names.includes(c.name))
      console.log(removedItems)

      record.push(...removedItems)
    }, '置底')
  }

  /**
   * 设置组件列表
   */
  function set(value: Component[]) {
    record.value = value
  }

  /**
   * 初始化组件列表
   */
  function init(delay = 1000) {
    setTimeout(() => {
      enable()
      record.value = cloneDeep(defaultItems)
    }, delay)
  }

  return {
    create,
    findOne,
    find,
    findAndRemove,
    findOneAndUpdate,
    clear,
    toTop,
    toBottom,
    set,
    init,
    record,
    updateRecord,
    undo,
    redo,
    undoStack,
    undoStackPointer,
    go,
    isUndoDisable,
    isRedoDisable,
    undoCount,
    redoCount,
  }
})

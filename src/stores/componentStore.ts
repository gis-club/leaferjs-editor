import { defineStore } from 'pinia';
import { useHistory } from '@/hooks/useHistory';
import { remove as _remove, cloneDeep, toArray } from 'lodash';

import { generateId } from '@/utils/nanoid';

const defaultItems = [
  {
    type: 'text',
    name: generateId(),
    texture: '',
    scaleX: 1,
    filterList: [],
  },
  {
    type: 'rect',
    name: generateId(),
    texture: '',
    scaleX: 1,
    filterList: [],
  },
];

export const useComponentStore = defineStore('components', () => {
  let {
    state: components,
    update: updateComponents,
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
  } = useHistory([]);

  function create(item: any) {
    updateComponents((components) => {
      components.push(item);
    }, '新增组件');
  }

  function findOne(name: string) {
    return components.value.find((item) => item.name === name);
  }

  function find(names: string | string[]) {
    names = toArray(names);
    return components.value.filter((c) => names.includes(c.name));
  }

  function findAndRemove(names: string | string[]) {
    names = toArray(names);
    let removedItems = [];
    updateComponents((components) => {
      removedItems = _remove(components, (c) => names.includes(c.name));
    }, '删除组件');
    return removedItems;
  }

  function findOneAndUpdate(name: string, props: Record<string, any>) {
    updateComponents((components) => {
      const component = components.find((c) => c.name === name);

      if (component) {
        for (const [key, newValue] of Object.entries(props)) {
          if (
            Object.prototype.hasOwnProperty.call(component, key) &&
            component[key] !== newValue
          ) {
            component[key] = newValue;
          }
        }
      }
    }, '更新组件');
  }

  function clear() {
    updateComponents((components) => {
      components.length = 0;
    }, '清空');
  }

  function toTop(names: string | string[]) {
    names = toArray(names);

    updateComponents((components) => {
      const removedItems = _remove(components, (c) => names.includes(c.name));
      components.unshift(...removedItems);
    }, '置顶');
  }

  function toBottom(names: string | string[]) {
    names = toArray(names);
    updateComponents((components) => {
      const removedItems = _remove(components, (c) => names.includes(c.name));
      components.push(...removedItems);
    }, '置底');
  }

  function set(value: any[]) {
    components.value = value;
  }

  function init() {
    setTimeout(() => {
      components.value = cloneDeep(defaultItems);
      enable();
    }, 1000);
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
    components,
    updateComponents,
    undo,
    redo,
    undoStack,
    undoStackPointer,
    go,
    isUndoDisable,
    isRedoDisable,
    undoCount,
    redoCount,
  };
});

import { useHistory } from '@/hooks/useHistory'
import type { App, IEditorBase } from 'leafer-ui'
import type { Ruler } from 'leafer-x-ruler'

let {
  state,
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
} = useHistory([])

export default class EditorClass {
  app!: App
  ruler!: Ruler
  editor!: IEditorBase
  components = state

  constructor() {}

  findOneAndUpdate(name: string, props: Record<string, any>) {
    updateComponents((components: any[]) => {
      const component = components.find((c) => c.name === name)
debugger
      if (component) {
        for (const [key, newValue] of Object.entries(props)) {
          if (
            Object.prototype.hasOwnProperty.call(component, key) &&
            component[key] !== newValue
          ) {
            component[key] = newValue
          }
        }
      }
    }, '更新组件')
  }

  undo() {
    undo()
  }

  redo() {
    redo()
  }
  
  undoStack() {
    return undoStack.value
  }

  undoStackPointer() {
    return undoStackPointer.value
  }

  go(index: number) {
    go(index)
  }

  clear() {
    updateComponents((components) => {
      components.length = 0;
    }, '清空');
  }

  add(item: any) {
      updateComponents((components: any[]) => {
        components.push(item);
      }, '新增组件');
    console.log(this.components);
    
  }

  isUndoDisable() {
    return isUndoDisable.value
  }

  isRedoDisable() {
    return isRedoDisable.value
  }

  undoCount() {
    return undoCount.value
  }

  redoCount() {
    return redoCount.value
  }
}

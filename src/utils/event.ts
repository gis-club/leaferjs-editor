import { EditorEvent } from "@leafer-in/editor";
import { Box, KeyEvent, type App, PointerEvent, type IUI } from "leafer-ui";

export const addEvent = (app: App) => { 

  const deleteButton = Box.one({
    // // 添加移除按钮
    around: 'center',
    fill: '#FEB027',
    cornerRadius: 20,
    cursor: 'pointer',
    children: [{ tag: 'Text', fill: 'white', text: '移除', padding: [7, 10] }],
  })

  app.editor.config.buttonsFixed = true
  app.editor.buttons.add(deleteButton)

  deleteButton.on(PointerEvent.TAP, () => {
    app.editor.list.forEach((rect) => rect.remove())
    app.editor.target = undefined
  })

  app.leafer?.on(KeyEvent.DOWN, (e: KeyEvent) => {
    judgeKey(e.code, app)
  })

  
  app.canvas.view.oncontextmenu = (e: MouseEvent) => {
    e.preventDefault()
    console.log(app.editor.target);
    
  }
  
}

/**
 * @description 右键菜单
 * @param {App} app
 * @param {Function} callback
 * @returns {void}
 */
export const onContextmenu = (app: App, callback: (e: MouseEvent) => void) => {
  app.canvas.view.oncontextmenu = (e: MouseEvent) => {
    e.preventDefault()
    const event = e || window.event;
    callback(event as MouseEvent)
  }
}

/**
 * @description 选中元素
 * @param {App} app
 * @param {Function} callback
 * @param {Ref<{name: string, value: any}[]>} properties
 * @returns {void}
 */
export const beforeSelect = (app: App, callback: (target: IUI | IUI[]) => void) => {
  app.editor.on(EditorEvent.BEFORE_SELECT, (e: EditorEvent) => {
    callback(e.value)
  })
}

/**
 * @description 判断按键
 * @param {string} code
 * @param {App} app
 * @returns {void}
 */
const judgeKey = (code: string, app: App) => { 
  switch (code) {
    case 'Backspace':
      return handleBackspace(app)
    case 'Delete':
      return handleDelete(app)
    default:
      return false
  }
}

/**
 * @description 删除元素
 * @param {App} app
 * @returns {void}
 */
const handleBackspace = (app: App) => {
  const target = app.editor.target
  if (target && !Array.isArray(target)) {
    app.tree.remove(target)
  }
}

/**
 * @description 删除元素
 * @param {App} app
 * @returns {void}
 */
const handleDelete = (app: App) => {
  const target = app.editor.target
  if (target && !Array.isArray(target)) {
    app.tree.remove(target)
  }
}

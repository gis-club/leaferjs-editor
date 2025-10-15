import { Box, KeyEvent, type App, PointerEvent } from "leafer-ui";

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

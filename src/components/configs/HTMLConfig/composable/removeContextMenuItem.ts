// @ts-nocheck
import * as actions from "monaco-editor/esm/vs/platform/actions/common/actions";
let menus = actions.MenuRegistry._menuItems;

// 删除右键弹出来的一些菜单项
let contextMenuEntry = [...menus].find(
  (entry) => entry[0].id == "EditorContext"
);
let contextMenuLinks = contextMenuEntry[1];

let removableIds = [
  "editor.action.quickOutline",
  "editor.action.rename",
  "editor.action.changeAll",
  "editor.action.quickCommand",
];

const removeContextMenuItem = (list: any = contextMenuLinks, ids: string[] = removableIds) => {
  let node = list._first;
  do {
    const element = node.element || {};
    const command = element.command || {};
    let shouldRemove = ids.includes(command.id);
    if (shouldRemove) {
      list._remove(node);
    }
  } while ((node = node.next));
}

export default removeContextMenuItem

import { defineStore } from "pinia"
import type { ILeafer, App, IEditorBase} from "leafer-ui"
import { shallowRef, } from "vue"
import * as _ from 'lodash'
import { ElMessage } from 'element-plus'


export const useAppStore = defineStore('app', {
  state: () => ({
    app: shallowRef<App>(),
    leafer: shallowRef<ILeafer>(),
    editor: shallowRef<IEditorBase>(),
    selectedElementIds: shallowRef<string[]>([]),
    copyTempData: shallowRef<any>([]),
  }),
  actions: {
    /**
     * @description 设置app实例
     * @param instance app实例
     */
    setApp(instance: App) {
      this.app = instance
      this.leafer = instance.tree
      this.editor = instance.editor
    },
    /**
     * @description 剪切元素
     * @param ids 元素ID
     */
    cutElement(ids: string[]) {
      console.log('剪切元素');
      if (!ids) {
        ids = [...this.selectedElementIds];
      }
      const elements = this.getElementDataByIds(ids) || [];
      this.copyTempData = _.cloneDeep(elements);
      this.deleteLeafers(ids);
      // this.emitControl([]);
      ElMessage.success('剪切成功，点击 Ctrl + V 进行粘贴');
    },
    /**
     * @description 设置选中的元素ID
     * @param ids 元素ID
     */
    setSelectedElementIds(ids: string[]) {
      this.selectedElementIds = ids
    },
    /**
     * @description 根据ID获取元素数据
     * @param ids 元素ID
     * @returns 元素数据
     */
    getElementDataByIds(ids: string[]) {
      if (!this.app) {
        return [];
      }
      const arr = this.getLayerByIds(ids) || [];
      return arr;
    },
  
    /**
     * @description 根据ID获取元素数据
     * @param ids 元素ID
     * @returns 元素数据
     */
    getLayerByIds(ids: string[]): any[] {
      const arr: any[] = [];
      const findLayers = (layers: any) => {
        layers.forEach((layer: any) => {
          if (ids.includes(layer.id)) {
            arr.push(layer.toJSON());
          }
          if (layer.childs) {
            findLayers(layer.childs);
          }
        });
      };
      findLayers(this.leafer!.children);
      return arr;
    },

    /**
     * @description 删除元素
     * @param ids 元素ID
     */
    deleteLeafers(ids: string[]) {
      ids.forEach((id: string) => {
        const reslut = this.leafer!.children.find((target) => target.id === id)
        if (reslut) {
          this.leafer?.remove(reslut)
        }
      })
    },

    /**
     * @description 粘贴元素
     */
    pasteElement() {
      if (Array.isArray(this.copyTempData)) {
        this.copyTempData.forEach((item: any) => {
          this.leafer?.add(item)
        })
      } else {
        this.leafer?.add(this.copyTempData)
      }
      this.leafer?.updateLayout()
    },
  }
})

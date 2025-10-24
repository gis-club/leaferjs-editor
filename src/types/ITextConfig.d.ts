import {IFontWeightNumer, IFontWeightString, ITextDecorationData} from 'leafer-ui'
import type { IFillConfig } from "@/interfaces/IFillConfig"

declare global {
  interface ITextConfig {
    width: number // 宽度
    height: number // 高度
    text: string // 文本
    fill: IFillConfig[], // 填充颜色
    editable: boolean, // 是否可编辑
    fontSize: number, // 字体大小
    fontWeight: IFontWeightNumer | IFontWeightString, // 字体粗细
    italic: boolean, // 是否斜体
    textDecoration: ITextDecorationData, // 文本装饰
  }
}

export {ITextConfig}
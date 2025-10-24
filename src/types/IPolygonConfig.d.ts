import type { IFillConfig } from "@/interfaces/IFillConfig"

declare global {
  interface IPolygonConfig {
    width: number
    height: number
    sides: number
    curve: number
    cornerRadius:  number[]
    fill: IFillConfig[],
    editable: boolean,
  }
}

export {IPolygonConfig}
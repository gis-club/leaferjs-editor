import type { IFillConfig } from "@/interfaces/IFillConfig"

declare global {
  interface IStarConfig {
    width: number
    height: number
    corners: number
    innerRadius: number
    cornerRadius:  number
    fill: IFillConfig[],
    editable: boolean,
  }
}

export {IStarConfig}
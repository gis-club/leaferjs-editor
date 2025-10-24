import type { IFillConfig } from "@/interfaces/IFillConfig"

declare global {
  interface IRectConfig {
    width: number
    height: number
    cornerRadius: number[]
    fill: IFillConfig[],
    editable: boolean,
  }
}

export {IRectConfig}
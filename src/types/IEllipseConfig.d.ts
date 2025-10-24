import type { IFillConfig } from "@/interfaces/IFillConfig"

declare global {
  interface IEllipseConfig {
    width: number
    height: number
    startAngle: number
    endAngle: number
    innerRadius: number
    fill: IFillConfig[],
    editable: boolean,
  }
}

export {IEllipseConfig}
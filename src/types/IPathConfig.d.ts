import { IPathString , IPathCommandData , IPathCommandObject, WindingRule } from 'leafer-ui'
import type { IFillConfig } from '@/interfaces/IFillConfig'

declare global {
  interface IPathConfig {
    path: IPathString | IPathCommandData | IPathCommandObject[]
    windingRule: WindingRule
    scale: number
    fill: IFillConfig[],
    editable: boolean,
  }
}

export {IPathConfig}
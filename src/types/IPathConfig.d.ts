import { IPathString , IPathCommandData , IPathCommandObject, WindingRule } from 'leafer-ui'

declare global {
  interface IPathConfig {
    path: IPathString | IPathCommandData | IPathCommandObject[]
    windingRule: WindingRule
    scale: number
    fill: string,
    editable: boolean,
  }
}

export {IPathConfig}
import type { IStrokeAlign, IStrokeCap, IStrokeJoin } from 'leafer-ui'

export interface IStrokeConfig {
  type: string
  color: string
  strokeAlign?: IStrokeAlign
  strokeWidth?: number
  strokeWidthFixed?: string | boolean
  strokeCap?: IStrokeCap
  strokeJoin?: IStrokeJoin
  dashPattern?: [number, number]
  dashOffset?: number
}
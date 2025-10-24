import type { AlignEnum, FillTypeEnum } from "@/enums/PropertyEnum"
import type { IUnitPointData, IColorStop } from "leafer-ui"
import type { ImageFormatEnum } from "@/enums/ImageFormatEnum"

export interface IFillConfig {
  type: FillTypeEnum
  color?: string
  from?: AlignEnum | IUnitPointData
  to?: AlignEnum | IUnitPointData
  stretch?: number
  stops?: IColorStop[]
  url?: string
  format?: typeof ImageFormatEnum[number]
  changeful?: boolean
  sync?: boolean
}
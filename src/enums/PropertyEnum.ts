export const ColorEnum = {

} as const

export type ColorEnum = (typeof ColorEnum)[keyof typeof ColorEnum]

export const BooleanEnum = {
  editable: 'editable',
  italic: 'italic',
} as const

export type BooleanEnum = (typeof BooleanEnum)[keyof typeof BooleanEnum]

export const StringEnum = {
  windingRule: 'windingRule',
  text: 'text',
  url: 'url',
} as const

export type StringEnum = (typeof StringEnum)[keyof typeof StringEnum]

export const JsonEnum = {
  path: 'path',
  cornerRadius: 'cornerRadius',
  points: 'points',
  lineHeight: 'lineHeight',
  filter: 'filter',
  textDecoration: 'textDecoration',
  stroke: 'stroke',
  fill: 'fill',
} as const

export type JsonEnum = (typeof JsonEnum)[keyof typeof JsonEnum]

export const SelectEnum = {
  strokeCap: [
    {
      label: 'round',
      value: 'round',
    },
    {
      label: 'square',
      value: 'square',
    },
    {
      label: 'none',
      value: 'none',
    },
  ],
  strokeJoin: [
    {
      label: 'round',
      value: 'round',
    },
    {
      label: 'bevel',
      value: 'bevel',
    },
    {
      label: 'miter',
      value: 'miter',
    }
  ],
}

export type SelectEnum = (typeof SelectEnum)[keyof typeof SelectEnum]

export const FillTypeEnum = {
  solid: 'solid', // 纯色填充
  linear: 'linear', // 线性渐变
  radial: 'radial', // 径向渐变
  angular: 'angular', // 角度渐变
  image: 'image', // 图像填充
} as const

export type FillTypeEnum = (typeof FillTypeEnum)[keyof typeof FillTypeEnum]

export const AlignEnum = {
  center: 'center',
  'top-left': 'top-left',
  top: 'top',
  'top-right': 'top-right',
  right: 'right',
  'bottom-right': 'bottom-right',
  bottom: 'bottom',
  'bottom-left': 'bottom-left',
  left: 'left',
} as const
export type AlignEnum = (typeof AlignEnum)[keyof typeof AlignEnum]
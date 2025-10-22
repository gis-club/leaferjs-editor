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

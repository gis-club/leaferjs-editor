export const ShapeEnum = {
  Rect: 'Rect',
  Ellipse: 'Ellipse',
  Line: 'Line',
  Polygon: 'Polygon',
  Star: 'Star',
  Path: 'Path',
  Text: 'Text',
  Image: 'Image',
  Arrow: 'Arrow',
  HTMLText: 'HTMLText',
} as const

export type ShapeEnum = (typeof ShapeEnum)[keyof typeof ShapeEnum]
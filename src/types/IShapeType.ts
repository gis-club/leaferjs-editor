export const ShapeType = {
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

export type ShapeType = (typeof ShapeType)[keyof typeof ShapeType]
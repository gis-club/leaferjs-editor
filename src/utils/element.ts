import { Arrow } from '@leafer-in/arrow'
import type { IFill, IStroke } from 'leafer-ui'
import {
  App,
  PropertyEvent,
  Rect,
  Text,
  Image,
  Polygon,
  Ellipse,
  Line,
  Star,
  Path,
  type IUI,
  type IStrokeCap,
  type IStrokeJoin,
} from 'leafer-ui'
import { HTMLText } from '@leafer-in/html'
import type { Ref } from 'vue'

/**
 * @description 获取元素位置
 * @param {Element} container 容器
 * @param {number} width 宽度
 * @param {number} height 高度
 * @returns {Object} 位置
 */
const getXY = (container: Element, width: number = 0, height: number = 0) => {
  return {
    x: container.clientWidth / 2 - width / 2,
    y: container.clientHeight / 2 - height / 2,
  }
}

/**
 * @description 获取元素属性
 * @param element 元素
 * @param properties 属性
 */
const getElementProperties = (
  element: IUI,
  properties: Ref<{ name: string; value: any }[]>
) => {
  element.on(PropertyEvent.CHANGE, () => {
    properties.value = Object.entries(element.toJSON()).map(([key, value]) => ({
      name: key,
      value: value instanceof Object ? JSON.stringify(value) : value,
    }))
  })
}

// 创建矩形
export const createRect = (
  config: IRectConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  let { width, height, cornerRadius, fill, editable } = config
  if (!Array.isArray(cornerRadius)) {
    cornerRadius = [
      Number(cornerRadius),
      Number(cornerRadius),
      Number(cornerRadius),
      Number(cornerRadius),
    ]
  }

  const { x, y } = getXY(container, width, height)

  const rect = Rect.one(
    {
      editable: editable,
      width: Number(width),
      height: Number(height),
      fill: fill as unknown as IFill,
      cornerRadius: cornerRadius,
    },
    x,
    y
  )
  app.tree.add(rect)

  getElementProperties(rect, properties)
}

// 创建文本
export const createText = (
  config: ITextConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const {
    width,
    height,
    text,
    fill,
    editable,
    fontSize,
    fontWeight,
    italic,
    textDecoration,
  } = config

  const { x, y } = getXY(container, width, height)

  const leaferText = Text.one(
    {
      editable: editable,
      width: Number(width) === 0 ? undefined : Number(width),
      height: Number(height) === 0 ? undefined : Number(height),
      text: text,
      fill: fill as unknown as IFill,
      fontSize: Number(fontSize),
      fontWeight: fontWeight,
      italic: italic,
      textDecoration: textDecoration,
    },
    x,
    y
  )
  app.tree.add(leaferText)

  getElementProperties(leaferText, properties)
}

// 创建图片
export const createImage = (
  config: IImageConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { width, height, url, editable } = config

  const { x, y } = getXY(container, width, height)

  const image = Image.one(
    {
      editable: editable,
      width: Number(width) === 0 ? undefined : Number(width),
      height: Number(height) === 0 ? undefined : Number(height),
      url: url,
    },
    x,
    y
  )
  app.tree.add(image)

  getElementProperties(image, properties)
}

// 创建多边形
export const createPolygon = (
  config: IPolygonConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { width, height, sides, curve, cornerRadius, fill, editable } = config

  const { x, y } = getXY(container, width, height)

  const polygon = Polygon.one(
    {
      width: Number(width),
      height: Number(height),
      sides: Number(sides),
      curve: Number(curve),
      cornerRadius: cornerRadius,
      fill: fill as unknown as IFill,
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(polygon)
  getElementProperties(polygon, properties)
}

export const createEllipse = (
  config: IEllipseConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { width, height, startAngle, endAngle, innerRadius, fill, editable } =
    config

  const { x, y } = getXY(container, width, height)

  const ellipse = Ellipse.one(
    {
      width: Number(width),
      height: Number(height),
      startAngle: Number(startAngle),
      endAngle: Number(endAngle),
      innerRadius: Number(innerRadius),
      fill: fill as unknown as IFill,
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(ellipse)
  getElementProperties(ellipse, properties)
}

export const createLine = (
  config: ILineConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const {
    width,
    points,
    rotation,
    close,
    curve,
    cornerRadius,
    stroke,
    strokeWidth,
    editable,
  } = config

  const { x, y } = getXY(container, width)

  const line = Line.one(
    {
      width: Number(width),
      points: points,
      rotation: Number(rotation),
      close: close,
      curve: Number(curve),
      cornerRadius: cornerRadius,
      stroke: stroke as unknown as IStroke,
      strokeWidth: Number(strokeWidth),
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(line)
  getElementProperties(line, properties)
}

export const createStar = (
  config: IStarConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { width, height, corners, innerRadius, cornerRadius, fill, editable } =
    config

  const { x, y } = getXY(container, width, height)

  const star = Star.one(
    {
      width: Number(width),
      height: Number(height),
      corners: Number(corners),
      innerRadius: Number(innerRadius),
      cornerRadius: cornerRadius,
      fill: fill as unknown as IFill,
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(star)
  getElementProperties(star, properties)
}

export const createPath = (
  config: IPathConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { path, windingRule, scale, fill, editable } = config

  const { x, y } = getXY(container)

  const leaferPath = Path.one(
    {
      path: path,
      windingRule: windingRule,
      scale: scale,
      fill: fill as unknown as IFill,
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(leaferPath)
  getElementProperties(leaferPath, properties)
}

export const createArrow = (
  config: IArrowConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const {
    x: offsetX,
    y: offsetY,
    strokeCap,
    strokeJoin,
    strokeWidth,
    stroke,
    editable,
  } = config

  const { x, y } = getXY(container)

  const arrow = Arrow.one(
    {
      x: Number(offsetX),
      y: Number(offsetY),
      strokeCap: strokeCap as unknown as IStrokeCap,
      strokeJoin: strokeJoin as unknown as IStrokeJoin,
      strokeWidth: Number(strokeWidth),
      stroke: stroke as unknown as IStroke,
      editable: editable,
    },
    x,
    y
  )
  app.tree.add(arrow)
  getElementProperties(arrow, properties)
}

export const createHTML = (
  config: IHTMLConfig,
  app: App,
  container: Element,
  properties: Ref<{ name: string; value: any }[]>
) => {
  const { x: offsetX, y: offsetY, text, editable } = config

  const { x, y } = getXY(container)

  const html = HTMLText.one(
    {
      x: Number(offsetX),
      y: Number(offsetY),
      text: text,
      editable: editable,
    },
    x,
    y
  )

  getElementProperties(html, properties)
  app.tree.add(html)
}

/**
 * @description 创建叶子实例
 * @param json 叶子json
 */
export const createLeafer = (
  json: Array<any> | any,
  app: App,
  properties: Ref<{ name: string; value: any }[]>
) => {
  if (Array.isArray(json)) {
    json.forEach((item) => {
      switch (item.tag) {
        case 'Rect':
          const rect = Rect.one(item)
          getElementProperties(rect, properties)
          app.tree.add(rect)
          break
        case 'Text':
          const text = Text.one(item)
          getElementProperties(text, properties)
          app.tree.add(text)
          break
        case 'Image':
          const image = Image.one(item)
          getElementProperties(image, properties)
          app.tree.add(image)
          break
      }
    })
  } else {
    json.children.forEach((item: any) => {
      if (item.children.length > 0) {
        createLeafer(item.children, app, properties)
      }
    })
  }
}

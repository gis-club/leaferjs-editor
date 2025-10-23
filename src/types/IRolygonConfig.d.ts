declare global {
  interface IPolygonConfig {
    width: number
    height: number
    sides: number
    curve: number
    cornerRadius:  number[]
    fill: string,
    editable: boolean,
  }
}

export {IPolygonConfig}
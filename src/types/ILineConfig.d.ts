declare global {
  interface ILineConfig {
    width: number
    points: number[]
    rotation: number
    curve: number
    close: boolean
    cornerRadius: number
    strokeWidth: number
    stroke: string,
    editable: boolean,
  }
}

export {ILineConfig}
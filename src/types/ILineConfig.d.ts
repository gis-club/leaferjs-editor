declare global {
  interface ILineConfig {
    width: number
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
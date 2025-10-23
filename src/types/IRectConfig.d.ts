declare global {
  interface IRectConfig {
    width: number
    height: number
    cornerRadius: number[]
    fill: string,
    editable: boolean,
  }
}

export {IRectConfig}
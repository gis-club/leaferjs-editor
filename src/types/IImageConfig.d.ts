declare global {
  interface IImageConfig {
    width: number
    height: number
    url: string
    editable: boolean,
  }
}

export {IImageConfig}
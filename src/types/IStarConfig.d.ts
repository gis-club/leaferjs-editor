declare global {
  interface IStarConfig {
    width: number
    height: number
    corners: number
    innerRadius: number
    cornerRadius:  number
    fill: string,
    editable: boolean,
  }
}

export {IStarConfig}
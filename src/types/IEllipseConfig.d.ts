declare global {
  interface IEllipseConfig {
    width: number
    height: number
    startAngle: number
    endAngle: number
    innerRadius: number
    fill: string,
    editable: boolean,
  }
}

export {IEllipseConfig}
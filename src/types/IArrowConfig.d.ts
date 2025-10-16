declare global {
  interface IArrowConfig {
    x: number,
    y: number,
    strokeCap: string,
    strokeJoin: string,
    strokeWidth: number,
    stroke: string,
    editable: boolean,
  }
}

export {IArrowConfig}
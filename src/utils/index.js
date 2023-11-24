// px转vw
export function px2vw(_px) {
  return ((_px * 100.0) / import.meta.env.VITE_DESIGN_WIDTH).toFixed(5) + 'vw'
}
// px转vh
export function px2vh(_px) {
  return ((_px * 100.0) / import.meta.env.VITE_DESIGN_HEIGHT).toFixed(5) + 'vh'
}
// echarts中重新计算px
export const epx = (size) => {
  let clientWidth = window.innerWidth
  let scale = clientWidth / import.meta.env.VITE_DESIGN_WIDTH

  return Number((size * scale).toFixed(5))
}

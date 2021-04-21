// 完成点击物体 物体运动到中间的动画效果
function moveTo (dom, dis, property) {
  let timer = null
  let speed
  let a
  let countDis = 0
  speed = 0

  if (dis < 0) {
    a = -2
  } else {
    a = 2
  }
  timer = setInterval(() => {
    speed += a
    countDis += speed
    dom[property] += speed
    if (Math.abs(countDis) > Math.abs(dis)) {
      clearInterval(timer)
      timer = null
    }
  }, 20)
}
export default moveTo

import Vue from 'vue'
import DropTo from '../../views/utilsView/DropTo.vue'
const NewVue = Vue.extend(DropTo)
export default function ({
  startX,
  startY,
  endX,
  endY,
  src,
  width,
  height
}) {
  const newImg = new NewVue({
    el: document.createElement('div'),
    data () {
      return {
        left: startX,
        top: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height
      }
    }
  })
  document.body.appendChild(newImg.$el)
  setTimeout(() => {
    newImg.left = endX
    newImg.top = endY
    newImg.sx = 0.1
    newImg.sy = 0.1
    newImg.opacity = 0
  }, 0)
  setTimeout(() => {
    newImg.exist = false
  }, 1000)
}

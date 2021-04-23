<template>
  <div class="goods-lists">
    <div class="goods-list-item">
      <div class="goods-img">
        <img :src="item.images[0]" alt="" />
      </div>
      <div class="goods-introduce">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
        <div class="sendtime">
          <span>{{ item.tags[0] }}</span>
        </div>
        <div class="money">
          <div class="price">{{ item.price }}</div>
          <div class="number">
            <button v-if="num" @touchend="changeNumber(-1, item.id, $event)">
              -
            </button>
            <span v-if="num">{{ num }}</span>
            <button @touchend="changeNumber(1, item.id, $event)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dropTo from './utils/dropTo'
export default {
  props: ['item', 'num', 'animate'],
  created () {
    // console.log(this.num)
    if (this.num === null || this.num === undefined) {
      this.count = 0
      return
    }
    this.count = this.num
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    changeNumber (value, id, e) {
      console.log(this.animate)
      if (value > 0 && this.animate) {
        // const sWidth = 90
        console.log(1)
        const sLeft = e.target.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect()
          .left
        // console.log(sLeft, sWidth)
        const pWidth = 93.8
        const pLeft = 375.2

        // const sHeight = 90
        const sTop = e.target.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect()
          .top
        // const pHeight = 50;
        const pTop = document
          .getElementsByClassName('van-tabbar-item')[2]
          .getBoundingClientRect().top
        const pHeight = 50
        dropTo({
          startX: sLeft,
          startY: sTop,
          endX: pLeft + pWidth,
          endY: pTop + pHeight,
          src: this.item.images[0],
          width: 180,
          height: 180
        })
      }
      this.count += value
      if (this.count <= 0) {
        this.count = 0
      }
      this.$emit('changeNumber', this.count, id)
    }
  }
}
</script>
<style lang="less" scoped>
.goods-lists {
  width: 100%;
  //z-index: -2;
  .goods-list-item {
    width: 100%;
    height: 100px;
    display: flex;
    .goods-img {
      width: 90px;
      height: 90px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-introduce {
      width: 170px;
      .title {
        margin-top: 5px;
        font-size: 13px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 11px;
        margin-top: 5px;
        color: #cecece;
      }
      .sendtime {
        margin-top: 4px;
        font-size: 10px;
        color: #cecece;
        span {
          padding: 2px;
          border: 1px solid #cdcece;
        }
      }
      .money {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        color: #ff1a90;
        font-size: 14px;
        .number {
          button {
            border-radius: 50%;
            padding: 0;
            width: 20px;
            height: 20px;
            background-color: #ff1a90;
            line-height: 20px;
            text-align: center;
            border: none;
            color: #fff;
            outline: none;
          }
          span {
            padding: 0 5px;
          }
        }
      }
    }
  }
}
</style>

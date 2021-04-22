<template>
  <div class="goods-lists">
    <div
      class="goods-list-item"
      v-for="item in $store.state.goodsList"
      :key="item.id"
    >
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
            <button v-if="number" @click="changeNumber(-1)">-</button>
            <span v-if="number">{{ number }}</span>
            <button @click="changeNumber(1)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      number: 0
      // goodsList:[]
    }
  },
  methods: {
    changeNumber (value) {
      this.number += value
      if (this.number <= 0) {
        this.number = 0
      }
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

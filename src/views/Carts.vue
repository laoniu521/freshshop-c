<template>
  <div class="cart-wrapper">
    <div class="cart-head">
      <van-icon name="arrow-left" size="35" @touchend="$router.push('/')" />
      <div class="title">购物车</div>
      <div @touchend="delGoods" class="del">删除</div>
    </div>
    <div class="goods-list">
      <van-checkbox-group v-model="result">
        <van-checkbox
          v-for="(item, index) in resultList"
          :key="index"
          :name="item.id"
        >
          <goods-list
            @changeNumber="changeNumber"
            :key="item.id"
            :item="item"
            :num="countData[item.id]"
            :animate="animate"
          ></goods-list>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="totalMoney"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import goodsList from '../components/GoodsList.vue'
import production from '../api/production'
export default {
  created () {
    this.countData = JSON.parse(localStorage.getItem('countData')) || {}
    const ids = Object.keys(this.countData) || []
    ids.forEach((ele) => {
      if (this.countData[ele]) {
        production.getGoodsListById(ele).then((res) => {
          this.resultList.push(res.list[0])
        })
      }
    })
    // console.log(this.resultList)
  },
  data () {
    return {
      // checked: false,
      result: [],
      animate: false,
      resultList: [],
      countData: {}
    }
  },
  components: {
    goodsList
  },
  methods: {
    onSubmit () {
      const confirm = this.$dialog.confirm({
        message: '确认购买选中商品吗?'
      })
      confirm
        .then(() => {
          localStorage.removeItem('countData')
          this.resultList = []
          this.result = []
          this.countData = {}
        })
        .catch(() => {})
    },
    changeNumber (count, id) {
      this.$store.commit('changeCountData', { id, count })
      this.countData = { ...this.countData, ...this.$store.state.countData }
      localStorage.setItem(
        'countData',
        JSON.stringify({ ...this.countData, ...{ [id]: count } })
      )
      // 过滤掉 数量为0的商品
      this.resultList = this.resultList.filter((ele) => {
        return this.countData[ele.id]
      })
      // console.log(1)
      // console.log(this.result)
    },
    delGoods () {
      const confirm = this.$dialog.confirm({
        message: '确定要删除选中商品吗？'
      })
      confirm
        .then(() => {
          // console.log(this.result)
          for (const key in this.countData) {
            // console.log(this.result.includes(+key), key)
            if (this.result.includes(+key)) {
              this.countData[key] = 0
            }
          }
          this.resultList = this.resultList.filter((ele) => {
            if (this.result.includes(ele.id)) {
              return false
            }
            return true
          })

          localStorage.setItem(
            'countData',
            JSON.stringify({ ...this.countData })
          )
          console.log(this.countData)
        })
        .catch(() => {})
      // console.log(confirm)
      // this.result.forEach((ele) => {});
    }
  },
  computed: {
    totalMoney () {
      // const countMap = JSON.parse(localStorage.getItem('countData'))
      const totalMoney = this.resultList.reduce((prev, ele) => {
        // console.log(this.countData[ele.id])
        if (this.result.includes(ele.id)) {
          // console.log(1)
          return prev + this.countData[ele.id] * ele.price
        }
        return prev
      }, 0)
      // console.log(totalMoney)
      /* Object.values(
        JSON.parse(localStorage.getItem('countData'))
      ).reduce((prev, ele) => {
        return prev + singlePrice[ele] * ele
      }, 0) */
      return Math.ceil(totalMoney) * 100
    },
    checked: {
      get () {
        return this.result.length === this.resultList.length
      },
      set (value) {
        if (value) {
          this.result = this.resultList.map((ele) => {
            return ele.id
          })
        } else {
          this.result = []
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cart-head {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 14px;
  background-color: #fff;
  i {
    padding: 10px;
  }
  .del {
    padding: 10px;
    color: #4994df;
  }
  .title {
    flex: 1 1 auto;
    text-align: center;
    padding: 10px 0;
  }
}
.goods-list {
  .van-checkbox {
    margin-left: 20px;
  }
  margin-top: 38.4px;
  margin-bottom: 50px;
}
</style>

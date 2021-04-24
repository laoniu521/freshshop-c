<template>
  <div class="goods">
    <div class="head">
      <div class="search" @touchend="searchOn">
        <van-icon name="search" />
        <div>大苹果1块钱1斤</div>
      </div>
    </div>
    <div class="tab">
      <one-tab></one-tab>
    </div>
    <div class="side-nav" v-if="$store.state.isShow">
      <side-nav></side-nav>
    </div>
    <van-loading v-else-if="!$store.state.isShow" class="loading" size="60px"
      >加载中...</van-loading
    >
    <div class="goods-list">
      <div class="goods-head">
        <div class="head-title">
          <div :class="{ all: actClass === 'all' }" @click="handleClick('all')">
            综合
          </div>
          <div
            :class="{ sale: actClass === 'sale' }"
            @click="handleClick('sale')"
          >
            销量
          </div>
          <div
            :class="[
              { 'price-down price': actClass === 'price-down price' },
              { 'price-up price': actClass === 'price-up price' },
            ]"
            class="priceBtn"
            @click="handleClick('price-up price')"
          >
            价格
          </div>
        </div>
      </div>
      <div class="goods-content">
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          class="refreshLoad"
        >
          <goods-list
            @changeNumber="changeNumber"
            v-for="item in $store.state.goodsList"
            :key="item.id"
            :item="item"
            :num="countData[item.id]"
            :animate="animate"
          ></goods-list>
        </van-pull-refresh>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <router-link @touchend="changeAct(1)" to="/">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="apps-o">
        <router-link @touchend="changeAct(1)" to="/"> 商品 </router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="cart-o" :badge="totalProduction">
        <router-link @touchend="changeAct(2)" to="/cart">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="user-o">
        <router-link @touchend="changeAct(1)" to="/"> 用户 </router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import OneTab from '../components/OneTab.vue'
import SideNav from '../components/SideNav.vue'
import GoodsList from '../components/GoodsList.vue'
export default {
  created () {
    this.countData = JSON.parse(localStorage.getItem('countData')) || {}
    this.total = this.countData
  },
  data () {
    return {
      isLoading: false,
      actClass: 'all',
      active: 1,
      goodsList: [],
      countData: {},
      animate: true
    }
  },
  components: {
    OneTab,
    SideNav,
    GoodsList
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    handleClick (value) {
      if (this.actClass === 'price-up price' && value === 'price-up price') {
        this.actClass = 'price-down price'
        this.$store.commit('changeSort', 'price-down')
        this.$store.dispatch(
          'changeGoodsListAction',
          this.$store.state.sideNavList[0]
        )
        return
      } else if (
        this.actClass === 'price-down price' &&
        value === 'price-up price'
      ) {
        this.actClass = 'price-up price'
        this.$store.commit('changeSort', 'price-up')
        this.$store.dispatch(
          'changeGoodsListAction',
          this.$store.state.sideNavList[0]
        )
        return
      }
      this.actClass = value
      this.$store.commit('changeSort', value)
      this.$store.dispatch(
        'changeGoodsListAction',
        this.$store.state.sideNavList[0]
      )
    },
    changeNumber (count, id) {
      console.log(count)
      this.$store.commit('changeCountData', { id, count })
      this.countData = { ...this.countData, ...this.$store.state.countData }
      localStorage.setItem(
        'countData',
        JSON.stringify({ ...this.countData, ...{ [id]: count } })
      )
    },
    searchOn () {
      this.$router.push('/search')
    },
    changeAct (value) {
      this.active = value
    }
  },
  computed: {
    totalProduction () {
      const totalProduction = Object.values(this.countData).reduce(
        (prev, ele) => {
          return prev + ele
        },
        0
      )
      // console.log(totalProduction)
      return totalProduction
    }
  }
}
</script>
<style lang="less" scoped>
.goods {
  .head {
    width: 375px;
    padding-top: 11px;
    padding-bottom: 11px;
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    .search {
      width: 355px;
      height: 33px;
      margin: 0 auto;
      background-color: #eee;
      border-radius: 10px;
      line-height: 33px;
      text-align: center;
      font-size: 14px;
      > * {
        display: inline-block;
        vertical-align: middle;
        color: #a1a1a1;
      }
    }
  }
  .van-tabbar-item {
    position: relative;
    a {
      position: absolute;
      width: 93.8px;
      height: 50px;
      left: 0;
      top: 0;
      padding-top: 36px;
      text-align: center;
    }
  }
  .loading {
    position: absolute;
    top: 45%;
    left: 5%;
    transform: translateY(-50%);
  }
  .goods-list {
    width: 296px;
    margin-left: 79px;
    bottom: 50px;
    margin-top: 135px;
    position: relative;
    .goods-head {
      position: fixed;
      width: 296px;
      top: 135px;
      background-color: #fff;
      right: 0;
      z-index: 100;
      height: 25px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #eee;
      .head-title {
        display: flex;
        text-align: center;
        margin-right: 8px;
        div {
          width: 50px;
          text-align: center;
          line-height: 25px;
          color: #cecece;
          position: relative;
          &.sale,
          &.all,
          &.price {
            color: #ff1a90;
            font-weight: bold;
          }
          &.priceBtn::before {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            right: 0;
            top: 2px;
            border: 4px solid transparent;
            border-bottom-color: #cecece;
          }
          &.priceBtn::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            right: 0;
            bottom: 4px;
            border: 4px solid transparent;
            border-top-color: #cecece;
          }
          &.price-down::after {
            border-top-color: #ff1a90;
          }
          &.price-up::before {
            border-bottom-color: #ff1a90;
          }
        }
      }
    }
    .goods-content {
      position: absolute;
      left: 0;
      top: 72px;
      //padding-bottom: 50px;
      height: calc(100vh - 210px);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
        background: none;
      }
    }
    /* .refreshLoad {
      position: fixed;
      top: 160px;
    } */
  }
}
</style>

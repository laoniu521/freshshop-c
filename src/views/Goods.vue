<template>
  <div class="goods">
    <div class="head">
      <div class="search">
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
  </div>
</template>
<script>
import OneTab from '../components/OneTab.vue'
import SideNav from '../components/SideNav.vue'
export default {
  components: {
    OneTab,
    SideNav
  }
}
</script>
<style lang="less" scoped>
.goods {
  .head {
    width: 375px;
    margin-top: 11px;
    margin-bottom: 11px;
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
  .loading {
    position: absolute;
    top: 45%;
    left: 5%;
    transform: translateY(-50%);
  }
}
</style>

<template>
  <div class="side-nav" ref="sideNav">
    <div
      v-for="(item, index) in $store.state.sideNavList"
      :key="index"
      class="side-nav-item"
      :class="{ active: actIndex == index }"
      @touchstart="canTouch = true"
      @touchmove="canTouch = false"
      @touchend="move(index, $event)"
    >
      <div>{{ typeof item == "number" ? "全部" : item }}</div>
    </div>
  </div>
</template>
<script>
import moveTo from './utils/moveTo'
export default {
  data () {
    return {
      actIndex: 0,
      canTouch: false
    }
  },
  methods: {
    move (index, e) {
      // 判断用户是点击还是滑动
      if (!this.canTouch) {
        return
      }
      this.actIndex = index
      // 根据总结的点击滑动规律让被点击的一项移动到中间上来
      const sTop = e.target.getBoundingClientRect().top
      const sHeight = e.target.offsetHeight
      const pHeight = this.$refs.sideNav.offsetHeight
      const pTop = this.$refs.sideNav.getBoundingClientRect().top
      const dis = sHeight / 2 + sTop - pHeight / 2 - pTop
      moveTo(this.$refs.sideNav, dis, 'scrollTop')
    }
  }
}
</script>
<style lang="less" scoped>
.side-nav {
  position: fixed;
  left: 0;
  top: 135px;
  overflow-y: auto;
  height: calc(100vh - 170px);
  &::-webkit-scrollbar {
    width: 0;
    background-color: none;
  }
  .side-nav-item {
    height: 40px;
    text-align: center;
    position: relative;
    div {
      height: 18px;
      padding: 11px 20px;
      line-height: 18px;
    }
    &.active {
      div {
        color: #ff1a90;
      }
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 6px;
        height: 18px;
        background-color: #ff1a90;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/' && from.path === '/search') {
        this.transitionName = 'right'
      } else if (to.path === '/search' && from.path === '/') {
        this.transitionName = 'left'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>
<style lang="less">
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.left-enter,
.right-leave-to {
  transform: translateX(100%);
}
.left-enter-active,
.right-leave-active {
  transition: all 0.3s;
}
.left-enter-to,
.right-leave {
  transform: translateX(0);
}
</style>

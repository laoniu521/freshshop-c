<template>
  <div
    class="drop"
    v-if="exist"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      opacity,
      left: `${left}px`,
      top: `${top}px`,
      transform: `scale(${sx},${sy})`,
    }"
  >
    <img :src="src" />
  </div>
</template>

<style lang="less" scoped>
.drop {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  transition: all 0.7s;
  transform-origin: 0% 0%;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
</style>

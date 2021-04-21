<template>
  <div class="one-tab" ref="oneTab">
    <div
      v-for="(item, index) in menuList"
      :key="item.title"
      class="tab-item"
      :class="{ active: index == actIndex }"
      @touchend="move(index, $event)"
      @touchstart="touch = true"
      @touchmove="touch = false"
    >
      <div class="img">
        <img :src="item.imgURL" alt="" />
      </div>
      <div class="text">
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import moveTo from './utils/moveTo'
export default {
  created () {
    this.$store.dispatch(
      'changeSideNavListAction',
      this.menuList[this.actIndex].title
    )
    console.log(this.menuList[this.actIndex].title)
  },
  data () {
    return {
      actIndex: 0,
      touch: false,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg'
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg'
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg'
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg'
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg'
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg'
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg'
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg'
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg'
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg'
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg'
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg'
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg'
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg'
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg'
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg'
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg'
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg'
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg'
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg'
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg'
        }
      ]
    }
  },
  methods: {
    move (index, e) {
      // 要让用户点击的时候才会触发选中效果 而不是拖动的时候也触发 提高用户交互体验
      if (this.touch === false) {
        return
      }
      this.actIndex = index
      // 通过计算得到点击需要移动的距离的一般规律
      const pWidth = this.$refs.oneTab.offsetWidth
      const sWidth = e.target.offsetWidth
      const sLeft = e.target.getBoundingClientRect().left
      const dis = sWidth / 2 + sLeft - pWidth / 2
      moveTo(this.$refs.oneTab, dis, 'scrollLeft')
      // 发送数据
      this.$store.dispatch(
        'changeSideNavListAction',
        this.menuList[this.actIndex].title
      )
    }
  }
}
</script>
<style lang="less" scoped>
.one-tab {
  position: fixed;
  left: 0;
  top: 55px;
  width: 100vw;
  overflow-x: auto;
  display: flex;
  align-content: center;
  margin-bottom: 10px;
  z-index: 100;
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .tab-item {
    width: 50px;
    height: 70px;
    margin-left: 10px;
    background-color: #fff;
    .img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text {
      margin-top: 5px;
      text-align: center;
      border-radius: 30px;
      font-size: 12px;
    }
    &.active {
      .img {
        border: 2px solid #d13193;
      }
      .text {
        background-color: #d13193;
        color: #ffffff;
      }
    }
  }
}
</style>

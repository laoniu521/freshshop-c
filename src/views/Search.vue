<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" size="35" @touchend="$router.push('/')" />
      <van-search
        v-model="value"
        placeholder="大芒果10块钱2斤"
        @input="onInput"
      />
      <div class="searchBtn" v-if="search">取消</div>
      <van-icon
        name="shopping-cart-o"
        :badge="totalProduction"
        v-else
        @touchend="$router.push('/cart')"
      />
    </div>
    <div class="search-content" v-if="result.length">
      <div
        @touchend="handleTouch(item)"
        class="search-item"
        v-for="item in result"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <!-- <div class="search-history">
      <div>酒</div>
      <div>酒</div>
      <div>酒</div>
      <div>酒</div>
      <div>酒</div>
      <div>酒</div>
    </div> -->
    <div class="result-content">
      <goods-list
        v-for="item in searchList"
        :key="item.id"
        :item="item"
        :num="countData[item.id]"
        @changeNumber="changeNumber"
        :animate="animate"
      ></goods-list>
    </div>
  </div>
</template>
<script>
import production from '../api/production'
import GoodsList from '../components/GoodsList.vue'
export default {
  data () {
    return {
      value: '',
      result: [],
      timer: null,
      searchList: [],
      countData: {},
      search: true,
      animate: false
    }
  },
  components: {
    GoodsList
  },
  methods: {
    onInput () {
      if (!this.value) {
        this.result = []
        clearTimeout(this.timer)
        this.timer = null
        return
      }
      if (this.timer) {
        console.log(1)
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        console.log(this.value)
        production.getSearchResult(this.value).then((res) => {
          this.result = res.result
          console.log(this.result)
        })
      }, 500)
    },
    handleTouch (value) {
      this.countData = JSON.parse(localStorage.getItem('countData'))
      this.search = false
      production
        .getSearchList(value, this.$store.state.page, this.$store.state.size)
        .then((res) => {
          this.searchList = res.list
          this.result = []
          this.value = value
        })
    },
    changeNumber (count, id) {
      this.$store.commit('changeCountData', { id, count })
      this.countData = { ...this.countData, ...this.$store.state.countData }
      localStorage.setItem(
        'countData',
        JSON.stringify({ ...this.countData, ...{ [id]: count } })
      )
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
.search-wrapper {
  z-index: 1000;
  background-color: #ffffff;
}
.search-head {
  display: flex;
  align-content: center;
  height: 34px;
  margin-top: 10px;
  margin-left: 12px;
  margin-right: 12px;
  line-height: 34px;
  font-size: 15px;
  i {
    line-height: 34px;
  }
  > div {
    flex: 1 1 auto;
  }
}
.search-content {
  margin-top: 5px;
  height: 400px;
  overflow-y: scroll;
  z-index: 1000;
  background-color: #ffffff;
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .search-item {
    height: 20px;
    padding: 10px 30px;
    color: #a1a1a1;
  }
}
.result-content {
  position: fixed;
  left: 50%;
  top: 48px;

  height: 100vh;
  transform: translateX(-50%);
  z-index: -1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
}
.search-history {
  position: fixed;
  left: 10px;
  top: 423px;
  display: flex;
  flex-wrap: wrap;
  div {
    padding: 5px 10px;
    background-color: #ddd;
    margin-left: 5px;
  }
}
</style>

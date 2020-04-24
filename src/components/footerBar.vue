<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="coupon-o" dot>分类</van-tabbar-item>
    <van-tabbar-item icon="gift-card-o" info="5">值得买</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" info="20">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" dot >个人</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'footerBar',
  data () {
    return {
      active: ''
    }
  },
  methods: {
    onChange (index) {
      console.log(index)
      if (index === 4) {
        if (this.$store.getters.getUserName === '') {
          this.$router.push({name: 'loginPage'})
        } else {
          this.$router.push({name: 'selfInfo'})
        }
      }
    }
  }
}
</script>

<style>

</style>

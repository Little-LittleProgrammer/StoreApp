<template>
  <div >
    <van-row style="background:#fff">
      <van-col span="5">
        <van-icon class="van_icon1" name="home-o" @click="backToHome"/>
      </van-col>
      <van-col span="14">
        <img class="logo" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/indexLogo-a90bdaae6b.png" alt="">
      </van-col>
      <van-col span="5">
        <van-icon class="van_icon2" name="good-job-o" />
      </van-col>
    </van-row>
    <div class="van_cell">
      <van-cell title="个人信息" is-link url="/vant/mobile.html" >
        <van-icon
          slot="right-icon"
          name="manager-o"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell title="我的二维码" is-link to="index" arrow-direction="right">
        <van-icon
          slot="right-icon"
          name="qr"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell title="我的尺寸" is-link to="index" />
      <van-cell title="会员俱乐部" is-link to="index" value="顶级会员"/>
      <van-cell title="积分中心" is-link to="index" value="520"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selfMessage',
  data () {
    return {

    }
  },
  methods: {
    backToHome () {
      this.$router.push({path: '/selfInfo'})
    }
  }
}
</script>

<style>
.van_icon1{
  margin: .3rem 0 0 .3rem;
}
.van_icon2{
  margin: .3rem .3rem 0 .3rem;
  float: right;
}
.logo{
  width: 2rem;
  /* height: .5rem; */
  display: inline-block;
  margin: .3rem 0 0 1.8rem;
}
.van_cell{
  margin: .3rem 0 0 0;
}
</style>

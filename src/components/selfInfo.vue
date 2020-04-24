<template>
  <div>
    <!-- 个人信息 -->
    <div class="header_card" @click="openSelf">
      <van-image
        class="header_image"
        round
        width="2rem"
        height="2rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="header_info">
        <div class="header_name">{{username}}</div>
        <div class="header_level">顶级会员</div>
      </div>
    </div>

    <!-- 我的资产 -->
    <van-cell title="我的资产" value="￥6389123648" />
    <van-row class="self_van">
      <van-col span="6" >
        <div class="self_van1">￥10231</div>
        <div>回馈金</div>
      </van-col>
      <van-col span="6" >
         <div class="self_van1">398</div>
        <div>红包</div>
      </van-col>
      <van-col span="6" >
         <div class="self_van1">666</div>
        <div>优惠卷</div>
      </van-col>
      <van-col span="6" >
         <div class="self_van1">￥39240</div>
        <div>津贴</div>
      </van-col>
    </van-row>

    <!-- 12宫格，展示信息 -->
    <van-grid :column-num="3" class="selfInfo_grid">
      <van-grid-item
        v-for="(value,index) in setList"
        :key="index"
        :icon="value.icon"
        :text="value.text"
      />
    </van-grid>

    <div class="selfInfo_cell" @click="backToHome">退出登录</div>

    <div style="height:2rem;text-align:center;font-size:.6rem"></div>
    <!-- footer底部 -->
    <footerBar></footerBar>
  </div>
</template>

<script>
import footerBar from './footerBar'
import Axios from 'axios'
export default {
  name: 'selfInfo',
  components: {footerBar},
  data () {
    return {
      username: '',
      setList: []
    }
  },
  mounted () {
    this.username = this.$store.getters.getUserName
    Axios.get('http://localhost:3000/getSetList').then((res) => {
      this.setList = res.data
    })
  },
  methods: {
    openSelf () {
      this.$router.push({name: 'selfMessage'})
    },
    backToHome () {
      this.$store.dispatch('changeUserName', '')
      this.$router.push({name: 'loginPage'})
    }
  }
}
</script>

<style>
.header_card{
  background-image: url('../assets/selfInfo/1.png');
  height: 4rem;
}
.header_image{
  margin: 1rem 0 0 .5rem;
  float: left;
}
.header_info{
  margin: 1.1rem 0 0 .5rem;
  color: #fff;
  float: left;
  width: 50%;
}
.header_info div.header_name{
  font-size: 1rem;
}
.header_info div.header_level{
  font-size: .5rem;
  font-family: "楷体","楷体_GB2312";
}
.self_van{
  font-size: .3rem;
  background-color: #fff;
  text-align: center;
  height: 1.6rem;
  margin: .02rem 0 0 0;

}
.self_van1{
  /* text-align: center; */
  font-weight: 900;
  line-height: .8rem;
  margin: .2rem 0 0 0;
}
.selfInfo_grid{
  margin: .3rem 0 0 0;
}
.selfInfo_cell{
  font-size: .4rem;
  margin: .3rem 0 0 0;
  line-height: 1rem;
  height: 1rem;
  text-align: center;
  background-color: #fff;
}

</style>

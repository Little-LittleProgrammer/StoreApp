<template>
  <div class="hello">
    <!-- header -->
    <van-sticky >
      <van-row style="background:#fff">
        <van-col >
          <img class="logo" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/indexLogo-a90bdaae6b.png" alt="">
        </van-col>
        <van-col >
          <van-search class="index_head_search" v-model="searchInfo" placeholder="请输入搜索关键词" />
        </van-col>
        <van-col >
          <div class="index_head_Button" v-show="flag==true" @click="loginUser">登录</div>
          <div v-show="flag==false" class="index_head_info" @click="showAction">您好，{{userName}}
          </div>
          <van-action-sheet
            v-model="show"
            :actions="actions"
            description="操作"
            cancel-text="取消"
            @cancel="onCancel"
            @select="onSelect"
          />
        </van-col>
      </van-row>
      <!-- tab滚动标签栏 -->
      <van-tabs class="index_head_tab">
        <van-tab v-for="(content,index) in titleList" :title="content" :key="index">

        </van-tab>
      </van-tabs>
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="index_head_swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" width="100%"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 品牌slogan -->
    <van-row class="index_slogan">
      <van-col :span="8">
        <i class="icon icon_1"></i>
        <span >网易品牌自营</span>
      </van-col>
      <van-col :span="8">
        <i class="icon icon_2"></i>
        <span >30天无忧退货</span>
      </van-col>
      <van-col :span="8">
        <i class="icon icon_3"></i>
        <span >48小时快速退款</span>
      </van-col>
    </van-row>

    <!-- 宫格 -->
    <van-grid :column-num="5" :border = false>
      <van-grid-item
        v-for="(content,index) in gridTitleList"
        :key="index"
        class="index_grid"
      >
        <img :src="content.icon" alt="帅">
        <div>{{content.text}}</div>
      </van-grid-item>
    </van-grid>

    <!-- 商品列表 -->
    <div class="goodListDiv">
      <h1 >
        <label >新品首发</label>
        <a href="">更多>></a>
      </h1>
      <van-grid :column-num="3" :border = false>
        <van-grid-item
          v-for="(content,index) in gridGoodsList"
          :key="index"
          class="index_grid"
        >
        <div style="background:#f5f5f5">
          <img :src="content.icon" alt="帅">
        </div>

          <div>{{content.text}}</div>
          <div>{{content.price}}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div style="height:2rem;background-color:#666;text-align:center;font-size:.6rem">
      死鬼，人家的底线暴露出来了
    </div>

    <!-- 遮罩层 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <img src="../assets/advertising.png" class="block"  alt="">
    </van-overlay>

    <!-- footer底部 -->
    <footerBar></footerBar>

    <van-dialog v-model="showChange" title="忘记密码" show-cancel-button @confirm = "confirmChange" @cancel = "cancelChange" :before-close = "callBack">
      <van-form ref="loginForm" class="login_form" >
        <van-field
          v-model="loginForm.password"
          name="密码"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写需要修改的密码' }]"
        />
        <van-field
          v-model="loginForm.rePassword"
          name="请确认密码"
          type="password"
          label="请确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请填写需要修改的密码' },{ validator:compare, message: '两次密码不一致' }]"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import footerBar from './footerBar'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  components: {footerBar},
  data () {
    return {
      flag: false,
      showOverlay: true,
      titleList: [],
      show: false,
      showChange: false,
      userName: '',
      loginForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      images: [
        'https://yanxuan.nosdn.127.net/8ec721fa317bc3da13b9d765b8608e60.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/7d5b27b1f1d4d86394cb12abc366c3a9.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/7f762f223c3e320df8260c4b54879124.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/1c63cd8f5bd9b16ded51d8df786b5957.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
      ],
      gridTitleList: [
        {
          text: '新品首发',
          icon: require('../assets/goods_icon/1.png')
        },
        {
          text: '居家生活',
          icon: require('../assets/goods_icon/2.png')
        },
        {
          text: '服饰鞋包',
          icon: require('../assets/goods_icon/3.png')
        },
        {
          text: '美食酒水',
          icon: require('../assets/goods_icon/4.png')
        },
        {
          text: '个护清洁',
          icon: require('../assets/goods_icon/5.png')
        },
        {
          text: '母婴亲子',
          icon: require('../assets/goods_icon/6.png')
        },
        {
          text: '运动旅行',
          icon: require('../assets/goods_icon/7.png')
        },
        {
          text: '数码家电',
          icon: require('../assets/goods_icon/8.png')
        },
        {
          text: '全球特色',
          icon: require('../assets/goods_icon/9.png')
        },
        {
          text: '好货抄底',
          icon: require('../assets/goods_icon/10.gif')
        }
      ],
      gridGoodsList: [
        {
          text: '省钱卡',
          icon: require('../assets/goods_list/1.png'),
          price: '300元'
        },
        {
          text: '酒精消毒纸巾',
          icon: require('../assets/goods_list/2.png'),
          price: '300元'
        },
        {
          text: '加厚洗脸巾',
          icon: require('../assets/goods_list/3.png'),
          price: '300元'
        },
        {
          text: '去黑头仪',
          icon: require('../assets/goods_list/4.png'),
          price: '300元'
        },
        {
          text: '面霜',
          icon: require('../assets/goods_list/5.png'),
          price: '300元'
        },
        {
          text: '蒸汽清洁机',
          icon: require('../assets/goods_list/6.png'),
          price: '300元'
        }
      ],
      searchInfo: '',
      actions: [
        {name: '修改密码', index: '0'},
        {name: '退出登录', index: '1'}
      ],
      active: ''
    }
  },
  created () {
    const _this = this
    console.log('this.loginFlag', typeof this.flag) // 为什么v-if不起作用啊
    axios.get('http://localhost:3000/getTitleList')
      .then(
        function (res) {
          console.log(res)
          _this.titleList = res.data
        }
      )
  },
  mounted () {
    this.userName = this.$store.getters.getUserName
    console.log('asd', this.userName)
    if (this.userName === '' || this.userName === undefined) {
      this.flag = true
    }
  },
  methods: {
    compare (val) {
      return this.loginForm.password === this.loginForm.rePassword
    },
    showAction () {
      if (this.show === true) {
        this.show = false
      } else {
        this.show = true
      }
    },
    loginUser () {
      this.$store.dispatch('changeUserName', '')
      this.$router.push({name: 'loginPage'})
    },
    onCancel () {
      this.show = false
      console.log(this.show)
    },
    onSelect (item) {
      this.show = false
      if (item.index === '0') {
        this.showChange = true
      } else if (item.index === '1') {
        this.$store.dispatch('changeUserName', '')
        this.flag = true
      }
    },
    confirmChange () {
      this.$refs.loginForm.validate()
      if (this.loginForm.password !== '' && this.loginForm.password === this.loginForm.rePassword) {
        axios.post('http://127.0.0.1:3000/changePwd', {username: this.$store.getters.getUserName, password: this.loginForm.password})
          .then((response) => {
            if (response.status === 200) {
              console.log(response)
              this.$notify({ type: 'success', message: '修改成功' })
            } else {
              this.$notify({ type: 'danger', message: '修改失败' })
            }
          })
      }
    },
    callBack (action, done) {
      console.log(action)
      console.log(this.register)
      if (action === 'confirm') {
        if (this.loginForm.password === this.loginForm.rePassword) {
          done()
          this.loginForm.username = ''
          this.loginForm.rePassword = ''
          this.loginForm.password = ''
        } else {
          done(false)
        }
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    cancelChange () {
      this.loginForm.username = ''
      this.loginForm.rePassword = ''
      this.loginForm.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  width: 1.84rem;
  /* height: .5rem; */
  display: inline-block;
  margin: .4rem 0 0 .4rem;
}
.index_head_search{
  width: 5.9rem;
  height: 1.3rem;
  border: 0;
  margin: 0 0 0 .1rem;
}
.van-search__content{
  background:#ededed;
  border-radius: .2rem;
}
.van-search{
  padding: 0.32rem 0.1rem;
}
.index_head_tab{
  height: 1rem;
}
.index_head_swipe{
  /* height: 3rem; */
  margin: .18rem 0 0 0;
}
.index_slogan{
  background:#fff;
  font-size: .32rem;
  text-align: center;
}
.index_grid img{
  width:100%
}
.index_grid div{
  font-size:.3rem
}
.index_grid img{
  width:100%
}
.index_slogan span{
  vertical-align: middle;
}
.index_slogan i.icon{
  display: inline-block;
  background-repeat: no-repeat;
  vertical-align: middle;
  background-size: 100%;
  width: .5rem;
  height: .5rem;
}
.index_slogan i.icon_1{
  background-image: url('../assets/1.png');
}
.index_slogan i.icon_2{
  background-image: url('../assets/2.png');
}
.index_slogan i.icon_3{
  background-image: url('../assets/3.png');
}
.index_head_Button{
  border: 1px solid #DD1A21;
  line-height: .5rem;
  color: #DD1A21;
  border-radius: .1rem;
  margin: .4rem 0 0 .2rem;
  width: .9rem;
  height: .5rem;
  text-align: center;
  font-size: .3rem;
}
.index_head_info{
  line-height: .5rem;
  border-radius: .1rem;
  margin: .4rem 0 0 .2rem;
  width: 1.5rem;
  height: .5rem;
  text-align: center;
  font-size: .3rem;
}
.goodListDiv{
  clear: both;
  background:#fff;
}
.goodListDiv h1{
  /* line-height: 1rem; */
  font-size: .5rem;
  padding: .5rem 0 0 .2rem;
}
.goodListDiv a{
  font-size: .3rem;
  margin: 0 0.5rem;
  float: right;
}
.block {
  width: 6rem;
  margin: 5rem 2rem 2rem 2rem ;
}
</style>

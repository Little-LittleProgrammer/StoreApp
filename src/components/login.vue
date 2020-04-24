<template>
  <div>
    <!-- <van-button icon="arrow-left" type="default" class="return_button"/> -->
    <div class="return_button" ><van-icon name="arrow-left" @click="returnIndex"/></div>
    <div class="logo_mode">
      <img src="../assets/logo.png" alt="">
    </div>
    <van-form @submit="onSubmit" class="login_form" >
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button :loading = "showload" round block type="info" native-type="submit" :disabled="showFlag">
          提交
        </van-button>
      </div>
    </van-form>
    <van-row class="register_mode">
      <van-col span="12" @click="showRegister = true">注册</van-col>
      <van-col span="12" @click="showForget = true">忘记密码</van-col>
    </van-row>

    <van-dialog v-model="showRegister" title="注册" show-cancel-button @confirm = "confirmRegister" @cancel = "cancelRegister" :before-close = "callBack">
      <van-form ref="register" class="login_form" >
        <van-field
          v-model="register.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="register.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="register.question"
          name="提示问题"
          label="提示问题"
          placeholder="提示问题"
          :rules="[{ required: true, message: '请填写提示问题' }]"
        />
      </van-form>
    </van-dialog>

    <van-dialog v-model="showForget" title="忘记密码" show-cancel-button @confirm = "confirmForget" @cancel = "cancelForget" :before-close = "callBackT">
      <van-steps :active="active">
        <van-step>输入用户名和问题</van-step>
        <van-step>输入需要修改的密码</van-step>
      </van-steps>
      <van-form @submit="onNextStep" ref="forget" class="login_form" v-if="step">
        <van-field
          v-model="forget.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="forget.question"
          name="提示问题"
          label="提示问题"
          placeholder="提示问题"
          :rules="[{ required: true, message: '请填写提示问题' }]"
        />
        <div style="margin: 16px;">
          <van-button :loading = "showload" round block type="info" native-type="submit" :disabled="showFlag">
            下一步
          </van-button>
        </div>
      </van-form>
      <van-form ref="forget" class="login_form" v-else>
        <van-field
          v-model="forget.password"
          name="密码"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写需要修改的密码' }]"
        />
        <van-field
          v-model="forget.rePassword"
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
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      active: 0,
      step: true,
      showForget: false,
      register: {
        password: '',
        username: '',
        question: ''
      },
      forget: {
        username: '',
        password: '',
        question: '',
        rePassword: ''
      },
      showFlag: false,
      showload: false,
      showRegister: false
    }
  },
  methods: {
    compare (val) {
      return this.forget.password === this.forget.rePassword
    },
    onSubmit (values) {
      const _this = this
      console.log(_this.username)
      axios.post('http://127.0.0.1:3000/getUser', {
        username: _this.username,
        password: _this.password
      })
        .then((response) => {
          // 成功时服务器返回 response 数据
          if (response.status === 200) {
            console.log(response)
            this.showFlag = true
            this.$notify({ type: 'success', message: '登录成功' })
            this.$store.dispatch('changeUserName', _this.username)
            setTimeout(() => {
              this.$router.push({name: 'HelloWorld'})
            }, 1000)
          } else {
            this.showFlag = true
            this.showload = true
            this.$notify({ type: 'danger', message: '用户名或密码错误' })
            setTimeout(() => {
              this.showFlag = false
              this.showload = false
            }, 5000)
          }
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onNextStep () {
      axios.post('http://127.0.0.1:3000/forgetUser', {username: this.forget.username, question: this.forget.question})
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.$notify({ type: 'success', message: '验证成功' })
            this.active = 1
            this.step = false
          } else {
            this.$notify({ type: 'danger', message: '验证失败' })
          }
        })
    },
    returnIndex () {
      this.$router.push({name: 'HelloWorld'})
    },
    callBack (action, done) {
      console.log(action)
      console.log(this.register)
      if (action === 'confirm') {
        if (this.register.username !== '' && this.register.password !== '' && this.register.question !== '') {
          done()
          this.register.username = ''
          this.register.password = ''
          this.register.question = ''
        } else {
          done(false)
        }
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    confirmRegister () {
      this.$refs.register.validate()
      if (this.register.username !== '' && this.register.password !== '' && this.register.question !== '') {
        axios.post('http://127.0.0.1:3000/registerUser', {username: this.register.username, password: this.register.password, question: this.register.question})
          .then((response) => {
            if (response.status === 200) {
              console.log(response)
              this.$notify({ type: 'success', message: '注册成功' })
            } else {
              this.$notify({ type: 'danger', message: '注册失败' })
            }
          })
      } else {
        // this.showRegister = true
      }
    },
    cancelRegister () {
      // this.$refs.register.resetValidation()
      this.register.username = ''
      this.register.password = ''
      this.register.question = ''
      // console.log(this.$refs['register'])
    },
    confirmForget () {
      this.$refs.forget.validate()
      if (this.forget.password !== '' && this.forget.password === this.forget.rePassword) {
        axios.post('http://127.0.0.1:3000/changePwd', {username: this.forget.username, password: this.forget.password})
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
    callBackT (action, done) {
      console.log(action)
      console.log(this.register)
      this.active = 0
      this.step = true
      if (action === 'confirm') {
        if (this.forget.password === this.forget.rePassword) {
          done()
          this.forget.username = ''
          this.forget.rePassword = ''
          this.forget.password = ''
          this.forget.question = ''
        } else {
          done(false)
        }
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    cancelForget () {
      this.step = true
      this.active = 0
      this.forget.username = ''
      this.forget.rePassword = ''
      this.forget.password = ''
      this.forget.question = ''
    }
  }
}
</script>

<style scoped>
.login_form{
  /* margin: 1rem 0 0 0; */
}
.return_button{
  margin: .5rem 0 0 .5rem;
}
.logo_mode{
  width: 5rem;
  margin: 1rem 0 0 2.4rem;
}
.logo_mode img{
  width: 100%;
}
.register_mode{
  text-align: center;
  font-size: .3rem;
  color: #f00;
}
</style>

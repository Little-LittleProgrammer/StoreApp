import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/index'
import login from '@/components/login'
import selfInfo from '@/components/selfInfo'
import selfMessage from '@/components/selfMessage/selfMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'loginPage',
      component: login
    },
    {
      path: '/selfInfo',
      name: 'selfInfo',
      component: selfInfo
    },
    {
      path: '/selfMessage',
      name: 'selfMessage',
      component: selfMessage
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './assets/rem'
// import './assets/reset.css'
import 'amfe-flexible/index.js'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import {Button, Col, Row, Search, Tab, Tabs, Swipe, SwipeItem, Lazyload, Grid, GridItem, Tabbar, TabbarItem, Sticky, Form, Field, Icon, Notify, DropdownMenu, DropdownItem, ActionSheet, Dialog, Step, Steps, ContactCard, ContactList, ContactEdit, Image, Cell, CellGroup, Overlay} from 'vant'

Vue.use(Overlay)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(ContactCard)
Vue.use(ContactList)
Vue.use(ContactEdit).use(Image)

Vue.config.productionTip = false
Vue.use(Col).use(Button).use(Row).use(Search).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Lazyload).use(Grid).use(GridItem).use(Tabbar).use(TabbarItem).use(Sticky).use(Form)
Vue.use(Field).use(Icon).use(Notify).use(DropdownMenu).use(DropdownItem).use(ActionSheet).use(Dialog).use(Step).use(Steps)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

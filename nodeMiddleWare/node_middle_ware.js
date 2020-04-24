var express = require('express')
var app = express()
var bodyParse = require('body-parser')
let userForm = [{name: 'wal', pwd: 'yxq', question: '520'}]

// 增加头部信息解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')// 允许源访问，本利前端访问路径为“http://localhost:8080”
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

// 使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())

// 处理根目录的get请求
app.get('/getTitleList', function (req, res) {
  var titleList = ['推荐', '居家生活', '服饰鞋包', '美食酒水', '个护清洁', '母婴亲子', '运动旅行', '数码家电', '全球特色']
  res.send(titleList)
})

// 处理/login请求
app.post('/getUser', function (req, res) {
  // 获取登录名称和密码
  var name = req.body.username
  var pwd = req.body.password
  if (userForm.length === 0) {
    if (name === 'wal' && pwd === 'yxq') {
      res.status(200).send(
        '登录成功'
      )
    } else {
      res.status(201).send(
        '登陆失败'
      )
    }
  } else {
    for (var i = 0; i < userForm.length; i++) {
      if (name === userForm[i].name && pwd === userForm[i].pwd) {
        console.log('userForm', userForm)
        res.status(200).send(
          '登录成功'
        )
        break
      } else if (i === userForm.length - 1) {
        res.status(201).send(
          '登录失败'
        )
      }
    }
  }

  // 向前台反馈信息
})

// 注册
app.post('/registerUser', function (req, res) {
  var name = req.body.username
  var pwd = req.body.password
  var question = req.body.question
  console.log('req.body.question', req.body.question)
  userForm.push({name: name, pwd: pwd, question: question})
  console.log('userForm', userForm)
  res.status(200).send(
    '注册成功'
  )
})

// 忘记密码
app.post('/forgetUser', function (req, res) {
  var name = req.body.username
  var question = req.body.question
  for (var i = 0; i < userForm.length; i++) {
    if (name === userForm[i].name) {
      if (question === userForm[i].question) {
        console.log('userForm', userForm)
        res.status(200).send(
          '验证成功'
        )
        break
      }
    }
    if (i === userForm.length - 1) {
      res.status(201).send(
        '验证失败'
      )
    }
  }
})

// 修改密码
app.post('/changePwd', function (req, res) {
  var name = req.body.username
  var password = req.body.password
  for (var i = 0; i < userForm.length; i++) {
    if (name === userForm[i].name) {
      userForm[i].pwd = password
      console.log('userForm', userForm)
      res.status(200).send(
        '修改成功'
      )
    } else if (i === userForm.length - 1) {
      res.status(201).send(
        '修改失败'
      )
    }
  }
})

// 个人页面的宫格内容
app.get('/getSetList', function (req, res) {
  var list = [
    { text: '我的订单',
      icon: 'balance-list-o'},
    { text: '充卡白赚36元',
      icon: 'music-o'},
    { text: '周六一起拼',
      icon: 'info-o'},
    { text: '售后服务',
      icon: 'phone-o'},
    { text: '邀请返利',
      icon: 'balance-list-o'},
    { text: '优先够',
      icon: 'shop-o'},
    { text: '积分中心',
      icon: 'cash-on-deliver'},
    { text: '会员俱乐部',
      icon: 'diamond-o'},
    { text: '地址管理',
      icon: 'logistics'},
    { text: '账号安全',
      icon: 'warn-o'},
    { text: '客服与帮助',
      icon: 'service-o'},
    { text: '意见反馈',
      icon: 'good-job-o'}
  ]
  res.status(200).send(
    list
  )
})

// 监听3000端口
var server = app.listen(3000)

console.log('服务器已运行')
console.log('userForm', userForm)
console.log('监听网址为:http://127.0.0.1:3000/')

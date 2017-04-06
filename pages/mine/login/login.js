var app = getApp()
let loginurl = app.globalData.host+'login'
// var util = require('../../utils/util.js')
Page({
  data:{
    name: '',
    password: ''
  },
    // 立即注册
  registerNow: function () {
    console.log('跳至注册界面')
    wx.navigateTo({
      url: '../register/register'
    })
  },
    // 登录
  login: function () {
    console.log('登录啦!用户名和密码分别是' + this.data.name + '/' + this.data.password)
    // 用户名和密码均不为空时可以登录
    var name = this.data.name
    var pwd = this.data.password
    var that = this
    if(name.length!=0 && pwd.length!=0){
      var params = {
        "username": name,
        "password": pwd
      }
      console.log(params)
      wx.request({
        url: loginurl,
        data: params,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        success: function(res){
          // success
          console.log(res)
          if(res.data.status==0){
            // 请求登录成功
          
            // 提示用户登录成功
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 2000
            })
            console.log(res.data.data)
            // 将用户信息进行本地存储
            wx.setStorage({
              key: 'userInfo',
              data: res.data.data
            })
            wx.setStorage({
              key: 'isLogin',
              data: true
            })
            // 加时间戳
            var date = new Date()
            wx.setStorage({
              key: 'logintime',
              data: date
            })
            // 跳转至个人中心
            setTimeout(back, 2000)
            function back() {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
                success: function(res){
                  // success
                },
              })
            }
            // wx.switchTab({
            //   url: '../mine',
            //   success: function(res){
            //     // success
            //     console.log('回到个人中心')
            //   },
            //   fail: function(res) {
            //     // fail
            //     console.log('tiaozhuanshibai')
            //   },
            //   complete: function(res) {
            //     // complete
            //   }
            // })
          }else{
            // 登录失败
            console.log(res.data.info)
          }
        },
        fail: function(res) {
          // fail
          console.log(res)
        },
        complete: function(res) {
          // complete
        }
      })
    }
    
    
  },
    // 获取输入的用户名
  nameInput: function (e) {
    console.log(e.detail.value)
    this.setData ({
        name: e.detail.value
    });
  },
    // 获取输入的密码
  passwordInput: function (e) {
    console.log(e.detail.value)
    this.setData ({
        password: e.detail.value
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
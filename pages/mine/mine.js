// pages/mine/mine.js
var app = getApp()

Page({
  data:{
    isLogin: Boolean,
    userInfo: {},
    logintips: '请登录',
    nickname: '',//登录后的昵称
    wx_userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.saveWxInfo()
  },

  saveWxInfo: function(){
    var that = this

    try {
      let userinfo = wx.getStorageSync('wx_userInfo')
      console.log(res.data)
      that.setData({
        wx_userInfo: res.data
      })
    }catch (e){
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          wx_userInfo: userInfo
        })
        //console.log(that.data.wx_userInfo)
        wx.setStorage({
          key: 'wx_userInfo',
          data: userInfo,
        })
      })
    }
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var _this = this
    // 获取登录状态
    wx.getStorage({
      key: 'isLogin',
      success: function(res){
        // success
        console.log(res)
        _this.setData ({
          isLogin: res.data
        })
      }
    })
    // 获取已登录用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        console.log(res)
        _this.setData ({
          userInfo: res.data,
          nickname: res.data.Weixin_Name
        })
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loginAction: function () {
    if(this.data.isLogin){
      // 已经登录不跳至登录页面
      console.log('您已经登录!')
    }else{
      // 未登录，跳至登录页面
      wx.navigateTo({
        url: './login/login'
      })
      console.log('登录事件！')
    }
  },
  logOut:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          _this.setData({
            isLogin: false
          })
          wx.setStorage({
            key: 'isLogin',
            data: false,
            success: function(res){
              console.log('退出登录后用户信息更新成功')
            },
            fail: function(res) {
              console.log('退出登录后用户信息更新失败')
            },
            complete: function(res) {
              // complete
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/mine/mine' // 分享路径
    }
  }
})
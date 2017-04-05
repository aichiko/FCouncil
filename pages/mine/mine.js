// pages/mine/mine.js
Page({
  data:{
    isLogin: Boolean,
    logintips: '您还没有登录'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var _this = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        console.log(res.data)
        if (res.data.isLogin) {
          _this.setData ({
            isLogin: true,
            logintips: '用户名'
          })
        }else{
          _this.setData ({
            isLogin: false,
            logintips: '请登录'
          })
        }
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
    wx.navigateTo({
      url: './login/login'
    })
    console.log('登录事件！')
  },
  logOut:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          var data = {}
          wx.getStorage({
            key: 'userInfo',
            success: function(res){
              // success
              console.log(res.data)
              res.data.isLogin = false
              data = res.data
              _this.logintips = '请登录'
            }
          })
          wx.setStorage({
            key: 'userInfo',
            data: data,
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
  }
})
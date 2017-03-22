// pages/mine/mine.js
Page({
  data:{
    logintips: '您还没有登录'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        console.log(res.data)
        if (res.data.isLogin) {
          _this.setData ({
            logintips: '用户名'
          })
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
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
  }
})
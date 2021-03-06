// pages/expert/expert.js
var app = getApp()
let requestUrl = app.globalData.host+'teacherdetail'
Page({
  data:{
    id: 0,
    expert: {},
    isLogin: false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.index)
    var that = this
    
    this.setData({
      id: options.index
    })
    this.expertDetailRequest()
    let isLogin = wx.getStorageSync('isLogin')
    this.setData({
      isLogin: isLogin
    })
  },

  expertDetailRequest: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: requestUrl,
      data: {
        "ID": this.data.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0) {
          that.setData({
            expert: res.data.data
          })
        }
      },
      fail: function() {
        // fail
        wx.hideLoading()
        console.log(res)
      },
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
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: '专家详情', // 分享标题
      // desc: '专家详情', // 分享描述
      path: 'pages/expert/expert?index='+this.data.id // 分享路径
    }
  }
})
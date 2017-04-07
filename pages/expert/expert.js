// pages/expert/expert.js
var app = getApp()
let requestUrl = app.globalData.host+'teacherdetail'
Page({
  data:{
    id: 0,
    expert: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.index)
    var that = this
    
    this.setData({
      id: options.index
    })
    this.expertDetailRequest()
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
  }
})
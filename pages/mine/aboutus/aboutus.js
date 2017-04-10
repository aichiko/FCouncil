var app = getApp()
let aboutusurl = app.globalData.host+'Aboutus'
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data:{
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.prepareData()
  },
  prepareData:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: aboutusurl,
      // data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.status == 0) {
          wx.hideLoading()
          // console.log(WxParse)
          console.log(res.data.data.content)
          var article = '<div>'+res.data.data.content+'</div>';
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
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
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/mine/aboutus/aboutus' // 分享路径
    }
  }
})
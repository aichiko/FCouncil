var app = getApp()
let requestUrl = app.globalData.host+'lawdetail'
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data:{
    id: '',
    law: {}
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
    this.setData({
      id: options.id
    })

    this.prepareData()
  },

  prepareData: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: requestUrl,
      data: {"ID": this.data.id},
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0){
          that.setData({
            law: res.data.data
          })

          //console.log(WxParse)
          var article = '<div>'+that.data.law.Content+'</div>';
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
        console.log(res)
        wx.hideLoading()
      },
    })
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
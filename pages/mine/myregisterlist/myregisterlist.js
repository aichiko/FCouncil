var app = getApp()
let requestUrl = app.globalData.host+'history'
Page({
  data:{
    registerlist: [
      {
        name: "huiyimbiaoti",
        create_time: "2017-04-04"
      }, 
      {
        name: "huiyimbiaoti",
        create_time: "2017-04-04"
      } 
    ],
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getRegisterList()
  },

  // 获取数据
  getRegisterList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: requestUrl,
      data: {
        "ID": 222
      },
      method: 'POST',// 默认为GET，必须大写
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 0) {
          that.setData({
            registerlist: res.data.data
          })
        }
      },
      fail: function(res) {
        // fail
        wx.hideLoading()
        console.log(res)
      },
      complete: function(res) {
        // complete
      }
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
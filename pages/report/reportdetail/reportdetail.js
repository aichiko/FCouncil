var app = getApp()
let requesturl = app.globalData.host+'reportdetail'
Page({
  data:{
    id: '',
    report: {},
    content: ''
  },
  readCompleteDoc: function() {

    wx.downloadFile({
      url: 'https://www.fcouncil.com'+ this.data.report.Content,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
        id: options.id
    })
    this.detailRequest()
  },

  detailRequest: function() {
    var that = this
    wx.request({
      url: requesturl,
      data: {"ID": this.data.id},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        console.log(res)
        if (res.data.status == 0){
          that.setData({
            report: res.data.data
          })
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
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/report/reportdetail/reportdetail' // 分享路径
    }
  }
})
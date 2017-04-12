var app = getApp()
let requestUrl = app.globalData.host+'playmp4'


Page({
  data:{
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    id: '',
    videoUrl: ''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
      id: options.id
    })
    var that = this
    this.prepareData(this.data.id, function(data){
      that.setData({
        videoUrl: data
      })
    })
  },

  prepareData: function(id, success) {
    wx.request({
      url: requestUrl,
      data: {
        "ID": id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if (res.data.status == 0) {
          if (success) {
            success(res.data.data)
          }
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
      },
    })
  },

  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },

  videoErrorCallback: function(e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
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
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/activityList/activitydetail/activitydetail/videoplayer/videoplayer' // 分享路径
    }
  }
})
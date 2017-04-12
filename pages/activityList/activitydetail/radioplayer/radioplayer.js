var app = getApp()
let requestUrl = app.globalData.host+'playmp3'

Page({
 onReady: function (e) {
  // 使用 wx.createAudioContext 获取 audio 上下文 context
  console.log(e)
  this.audioCtx = wx.createAudioContext('myAudio')
 },
  data: {
    // poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    id: '',
    // author: '许巍',
    audioUrl: [],
    audioName: []
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    var that = this
    this.prepareData(this.data.id, function(data){
      that.setData({
        audioUrl: data.mp3File,
        audioName: data.mp3Name
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
  
  funplay: function(){
    console.log("audio play");
  },
  funpause: function(){
    console.log("audio pause");
  },
  funtimeupdate: function(u){
    console.log(u.detail.currentTime);
    console.log(u.detail.duration);
  },
  funended: function(){
    console.log("audio end");
  },
  funerror: function(u){
    console.log(u.detail.errMsg);
  }
})
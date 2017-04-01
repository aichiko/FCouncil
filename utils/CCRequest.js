
var app = getApp()

function CCRequest(path, parameters, success) {
    wx.request({
      url: app.globalData.host+'Videoclass',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      },
      fail: function(error) {
        // fail

      },
      complete: function(res) {
        // complete
      }
    })
}




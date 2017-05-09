
var app = getApp()

function sayHello(name) {
  console.log(`Hello ${name} !`)
}

function CCRequest(path, parameters, success, fail) {
  wx.showLoading({})
  wx.request({
    url: app.globalData.host+path,
    data: parameters,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, // 设置请求的 header
    success: function(res){
      // success
      if (res.data.status == 0) {
        if (success) {
          success(res.data.data)
        }
      }else {
        fail(res.data.info)
      }
    },
    fail: function(error) {
      // fail
      if (fail){
        fail(error)
      }
    }
  })
}

module.exports = {
  request: CCRequest,
  sayHello: sayHello
}


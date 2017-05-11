var app = getApp();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function ccRequestWithURL(url, parameters, success, fail) {
  // wx.showLoading()
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: parameters,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, // 设置请求的 header
    success: function (res) {
      // success
      wx.hideLoading()
      if (res.data.status == 0) {
        if (success) {
          console.log("parameters", parameters)
          console.log("success", res.data.data)
          typeof success == "function" && success(res.data.data)
        }
      } else {
        fail(res.data.info)
        if (fail) {
          console.log("parameters", parameters)
          console.log("failInfo", res.data.info)
          typeof fail == "function" && fail(res.data.info)
        }

      }
    },
    fail: function (error) {
      // fail
      wx.hideLoading()
      console.log("parameters", parameters)
      console.log("error", error)
      if (fail) {
        fail(error)
      }
    }
  })
}

function ccRequest(path, parameters, success, fail) {

  // wx.showLoading()
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: app.globalData.host + path,
    data: parameters,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, // 设置请求的 header
    success: function (res) {
      // success
      wx.hideLoading()
      if (res.data.status == 0) {
        if (success) {
          console.log("parameters", parameters)
          console.log("success", res.data.data)
          typeof success == "function" && success(res.data.data)
        }
      } else {
        fail(res.data.info)
        if (fail){
          console.log("parameters", parameters)
          console.log("failInfo", res.data.info)
          typeof fail == "function" && fail(res.data.info)
        }
        
      }
    },
    fail: function (error) {
      // fail
      wx.hideLoading()
      console.log("parameters", parameters)
      console.log("error", error)
      if (fail) {
        fail(error)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  ccRequest: ccRequest,
  ccRequestWithURL: ccRequestWithURL
}



var app = getApp()
let classurl = app.globalData.host+'answerclass'
let commitURL = app.globalData.host+'answersave'
Page({
  data:{
    inputTitleValue: '',
    index: 0,
    questionContent: '',
    typeList: []
  },
  // 输入标题是实时获取输入内容
  bindKeyInput: function (e) {
    this.setData({
      inputTitleValue:e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindButtonSubmit:function (e) {
    console.log(e.detail.value)
    var that = this
    let value = e.detail.value
    wx.showModal({
      title: '提示',
      content: '确认提交问题？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(value.title == null) {
            console.log('标题不能为空！！！')
            wx.showModal({
              title: '标题不能为空',
              showCancel:false
            })
            return
          }
          let userInfo = wx.getStorageSync('userInfo')
          let userID = userInfo.ID
          let typeID = that.data.typeList[value.picker].ID
          var dic = {"UserID": userID, "Title":value.title, "TypeclassID": typeID, "Content": value.content }
          that.commitQuestion({
            parameters: dic,
            success: function(data) {
              console.log('请求成功',data)
            }
          })
          console.log('提交问题')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  commitQuestion: function(parameters, success) {
    var that = this
    wx.showLoading({
      title:'提交问题'
    })
    wx.request({
      url: commitURL,
      data: parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log('commitURL',parameters,res)
        wx.hideLoading()
        if(res.data.status == 0){
          if (success){
            success(res.data.data)
          }
        }else {
          wx.showModal({
              title: res.data.info,
              showCancel:false,
              success: function(){
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
        
      }
    })
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.classRequest()
  },

  classRequest: function(){
    var that = this
    wx.request({
      url: classurl,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        
        if(res.data.status == 0){
          that.setData({
            typeList: res.data.data
          })
        }

      },
      fail: function() {
        // fail
        console.log(res)
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
      path: 'pages/mine/onlinechannel/askquestion/askquestion' // 分享路径
    }
  }
})
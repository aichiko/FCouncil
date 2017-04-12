var app = getApp()
let answerdetailurl = app.globalData.host+'answerdetail'
let answerdetaillisturl = app.globalData.host+'answerdetaillist'
let answertosaveurl = app.globalData.host+'answertosave'
var WxParse = require('../../../../wxParse/wxParse.js');

Page({
  data:{
      isMyQuestion: true,// 是不是我提的问题
      ID: '',
      userID: '',
      detailData: {},
      answerList: [],
      content: ''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log('详情页面')
    console.log(options)
    this.setData({
        ID: options.id
    })
    var index = options.index
    var isMyQuestion 
    if (index == 1) {
      console.log('我的提问')
      isMyQuestion = true
    }else{
      console.log('热门提问')
      isMyQuestion = false
    }
    this.setData({
      isMyQuestion: isMyQuestion
    })
    this.prepareData()
    this.prepareListData()
  },
  prepareData:function(){
    var that = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    var userID = this.data.userID
    var dic
    if (app.globalData.isLogin && this.data.isMyQuestion) {
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        userID: userInfo.ID
      })
      dic = { "ID": this.data.ID,"userID": userID}
    }else{
      dic = { "ID": this.data.ID }
    }
    wx.request({
      url: answerdetailurl,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if(res.data.status == 0){
          that.setData({
            detailData: res.data.data
          })
          var article = '<div>'+that.data.detailData.Content+'</div>';
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
        wx.hideLoading()
        console.log(res)
        console.log('上面是问答详情内容')
      },
      complete: function(res) {
        // complete
        wx.hideLoading()
      }
    })
  },
  prepareListData:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var userID = this.data.userID
    var dic
    if (app.globalData.isLogin && this.data.isMyQuestion) {
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        userID: userInfo.ID
      })
      dic = { "ID": this.data.ID,"userID": userID}
    }else{
      dic = { "ID": this.data.ID }
    }
    wx.request({
      url: answerdetaillisturl,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        console.log('上面是问答详情列表')
        if(res.data.status == 0){
          that.setData({
            answerList: res.data.data
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
        wx.hideLoading()
      }
    })
  },
  // 追问
  // bindTextAreaBlur:function(e){
  //   console.log(e.detail.value)
  //   this.setData({
  //     questionContent: e.detail.value
  //   })
  //   console.log(this.data.questionContent)
  // },
  // 提交问题
  bindButtonSubmit:function(e){
    console.log(e.detail.value)
    var that = this
    let value = e.detail.value
    if(value.content.length == 0 || value.content.length == null) {
      console.log('提问内容不能为空！！！')
      wx.showModal({
        title: '提问内容不能为空',
        showCancel:false
      })
      return
    }
    var userID = this.data.userID
    var dic
    dic = { "AID": this.data.ID,"UserID": userID,'RContent': value.content}
    console.log(dic)
    that.commitQuestion({
      parameters: dic,
      success: function(data) {
        console.log('请求成功',data)
        wx.showModal({
          title: '追问成功',
          showCancel:false
        })
      }
    })
    console.log('提交问题')
  },
  commitQuestion:function(parameters, success){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    // var userID = this.data.userID
    // var dic
    // dic = { "AID": this.data.ID,"UserID": '3144','RContent': this.data.questionContent}
    console.log(parameters.parameters)
    wx.request({
      url: answertosaveurl,
      data: parameters.parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if(res.data.status == 0){
          that.setData({
            content: ''
          })
          if (success){
            success(res.data.data)
          }
          // 成功以后刷列表
          that.prepareListData()
        }
      },
      fail: function(res) {
        // fail
        wx.hideLoading()
        console.log(res)
        console.log('追问提交结果')
      },
      complete: function(res) {
        // complete
        wx.hideLoading()
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
      path: 'pages/mine/onlinechannel/questiondetail/questiondetail' // 分享路径
    }
  }
})
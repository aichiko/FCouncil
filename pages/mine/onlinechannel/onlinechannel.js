// pages/onlinechannel/onlinechannel.js
var app = getApp()
let requesturl = app.globalData.host+'answerhot'

Page({
  data:{
    page: 1,
    hostQuestionList:[
        {
          
        },
        {

        }
      ],
  },
  // 跳至详情
  toQuestionDetail: function () {
    wx.navigateTo({
      url: './questiondetail/questiondetail'
    })
  },
  // 跳至提问页面
  askQuestion: function () {
    console.log('跳至提问页面')
    wx.navigateTo({
      url: './askquestion/askquestion'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.questionListRquest()
  },

  // 专业报告列表
  questionListRquest: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
        parameters: {"page": this.data.page}
    })
    wx.request({
      url: requesturl,
      data: this.data.parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0){
          that.setData({
            hostQuestionList: res.data.data
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
      }
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // 在页面展示之后先获取一次数据
    var that = this;
    // GetList(that);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
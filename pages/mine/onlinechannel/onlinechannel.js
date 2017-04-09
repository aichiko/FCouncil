// pages/onlinechannel/onlinechannel.js
var app = getApp()
let requesturl = app.globalData.host+'answerhot'
let myQuestion = app.globalData.host+'answer'

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data:{

    tabs: ["热门问题", "我的提问"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    page: 1,
    myPage: 1,
    parameters: {},
    myParameters: {},
    hostQuestionList:[],
    myQuestionList: [],
    foodLoad: true,
  },
  // 跳至详情
  toQuestionDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: './questiondetail/questiondetail?id='+e.currentTarget.dataset.detailid
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

    var that = this;
        wx.getSystemInfo({
          success: function(res) {
              that.setData({
                  sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
          }
      });

    this.questionListRquest()
  },
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex == 1 && this.data.myQuestionList.length==0) {
      this.myQuestionListRequest()
    }
  },


  // 我的提问列表
  myQuestionListRequest: function() {
    // 获取已登录用户信息
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        console.log("userInfo",res.data)
        function getdata(data) {
          console.log("myQuestionList=========", data)
          that.setData({
            myQuestionList: data
          })
        }
        that.setData({
          myParameters: {"page": that.data.myPage, "ID": res.data.ID}
        })
        that.prepareData(myQuestion, that.data.myParameters, getdata)
      }
    })
  },
  // 热门问题列表
  questionListRquest: function() {
    var that = this
    function getdata(data) {
      console.log("hostQuestionList=========", data)
      that.setData({
        hostQuestionList: data
      })
    }
    this.setData({
        parameters: {"page": this.data.page}
    })
    this.prepareData(requesturl, this.data.parameters, getdata)
  },

  prepareData: function(url, parameters, setData){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: parameters,
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
          // that.setData({
          //   hostQuestionList: res.data.data
          // })
          if (setData) {
            setData(res.data.data)
          }
          return 
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      }
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  loadMoreData: function(activeIndex) {

    if (activeIndex == 0 && this.data.foodLoad == false) {
      return
    }

    if (activeIndex == 1) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    let page = (activeIndex == 0 ? this.data.page: this.data.myPage) + 1
    let dic = activeIndex == 0 ? this.data.parameters: this.data.myParameters
    dic.page = page
    wx.request({
      url: activeIndex == 0 ?requesturl: myQuestion,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.hideLoading()
        console.log(dic,res)
        if (res.data.status == 0){
          if (activeIndex == 0) {
            var arr = that.data.hostQuestionList.concat(res.data.data)
            that.setData({
              parameters: dic,
              hostQuestionList: arr,
              foodLoad: res.data.data.length > 0
            })
          }else {
            var arr = that.data.myQuestionList.concat(res.data.data)
            that.setData({
              myParameters: dic,
              myQuestionList: arr,
              myFoodLoad: res.data.data.length > 0
            })
          }
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      },
    })
  },

  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // this.questionListRquest()
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.loadMoreData(this.data.activeIndex)
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
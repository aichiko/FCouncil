// pages/laws/laws.js
var app = getApp()
Page({
  data:{
    lawsList: [],
    page: 1,
    parameters: {},
  },
  // 法律法规列表
  lawsListRquest: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
        parameters: {"Page": this.data.page}
    })
    console.log(this.data.parameters)
    wx.request({
      url: app.globalData.host+'law',
      data: this.data.parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        wx.stopPullDownRefresh
        console.log(res)
        wx.hideLoading()
        that.setData({
          lawsList: res.data.data
        })
      },
      fail: function(res) {
        // fail
        wx.stopPullDownRefresh
        console.log(res)
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    this.lawsList()
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.loadmoreData()
  },
  loadmoreData: function() {
    let page = this.data.parameters.Page
    page += 1
    let dic = this.data.parameters
    dic.Page = page
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log(dic)
    wx.request({
      url: app.globalData.host+'law',
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        let arr = that.data.lawsList.concat(res.data.data)
        console.log(arr)
        that.setData({
          parameters: dic,
          lawsList: arr
        })
      },
      fail: function(res) {
        // fail
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
      }
    })
  },
  // 跳至法律法规详情页
  toLawDetail: function (e) {
    // console.log(e)
    var ID = e.currentTarget.dataset.id
    // console.log(ID)
    console.log('跳至法律法规详情')
    wx.navigateTo({
      url: './lawdetail/lawdetail?ID='+ID
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // 如果是网络请求或是别的方法传出的值调用“this”,不能直接用，需要用变量接收“this” 再使用(如mine.js中的用法)
    this.lawsListRquest()
    console.log(this.data.laws)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
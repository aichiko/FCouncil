
var app = getApp()
Page({
  data:{
    // 根据上一页面的index值判断是哪个活动，请求数据
    activityType: 0,
    page: 1,
    // 假数据
    filterArray: ["地区", "年份", "标签"],

    activityList: [
      {
        title: '活动名称',
        content: '活动名称的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '活动名称',
        content: '活动名称的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '活动名称',
        content: '活动名称的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '活动名称',
        content: '活动名称的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '活动名称',
        content: '活动名称的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
    ]
  },
  toDetail: function () {
    wx.navigateTo({
      url: './activitydetail/activitydetail?id=活动id'
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
      activityType: options.index
    })
    this.activityListRequest(options.index)
  },

  activityListRequest: function(TypeID) {
    console.log(TypeID)
    wx.request({
      url: app.globalData.host+'videolist',
      data: {"page": this.data.page, "TypeID": TypeID},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
      },
      fail: function(res) {
        // fail
        console.log(res)
      },
      complete: function(res) {
        // complete
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
  onPullDownRefresh: function() {
    console.log("刷新")
  },
  onReachBottom: function() {
    console.log("加载更多")
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
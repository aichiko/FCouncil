var app = getApp()
let requestUrl = app.globalData.host+'history'
let resignUrl = app.globalData.host+'regsign'
Page({
  data:{
    params: {},
    page: 1,
    registerlist: [],

    showMyToast: false,
    myToastText: ''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getUserInfo()
  },
  toDetail:function(e){
    let index = e.currentTarget.dataset.detailid
    let item = this.data.registerlist[index]
    let ID = item.ID
    wx.navigateTo({
      url: '../../activityList/activitydetail/activitydetail?id='+ID
    })
  },
  // 注册签到
  resignAction:function(e) {
    let index = e.currentTarget.dataset.index
    var isResign = this.data.registerlist[index].Issign
    // console.log(e)
    var that = this
    if(isResign){
      // 已经签到，不做任何操作，暂时不做取消签到
    }else{
      // 未签到，进行签到
      console.log('签到')
      wx.showModal({
        title: '签到',
        content: '签到后不能取消，您确定要签到吗？',
        success: function(res) {
          if (res.confirm) {
            console.log(that.data.params.userID+that.data.registerlist[index].ID)
            wx.request({
              url: resignUrl,
              data: {"userID": that.data.params.userID,"videoID": that.data.registerlist[index].ID},
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res){
                console.log(res)
                // success
                if(res.data.status==0) {
                  console.log('签到成功！')
                  that.setData({
                    showMyToast: true,
                    myToastText: res.data.info
                  })
                  setTimeout(function(){
                    that.setData({
                      showMyToast: false
                    }) //1秒之后弹窗隐藏
                  },2000)
                  var list = that.data.registerlist
                  list[index].Issign = 1
                  that.setData({
                    registerlist: list
                  })
                }else{
                  console.log(res)
                }
              },
              fail: function(res) {
                // fail
                console.log(res)
              },
              complete: function(res) {
                // complete
              }
            })
          }else{
            console.log('点击取消操作')
          }
        }
      })
    }
  },
  // 获取个人信息的参数
  getUserInfo:function(){
    var that = this
    var ID = ''
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        ID = res.data.ID
        console.log('id:'+ID)
        that.getRegisterList(ID)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  // 获取数据
  getRegisterList: function (ID) {
    console.log(ID)
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      params: {
        page: that.data.page,
        userID: ID
      }
    })
    wx.request({
      url: requestUrl,
      data: that.data.params,
      method: 'POST',// 默认为GET，必须大写
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 0) {
          that.setData({
            registerlist: res.data.data
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
      }
    })
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // this.lawsList()
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.loadmoreData()
  },
  loadmoreData: function() {
    let page = this.data.params.page
    page += 1
    let dic = this.data.params
    dic.page = page
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log(dic)
    wx.request({
      url: requesturl,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 0){
          let arr = that.data.registerlist.concat(res.data.data)
          console.log(arr)
          that.setData({
            params: dic,
            registerlist: arr
          })
        }
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
      path: 'pages/mine/myregisterlist/myregisterlist' // 分享路径
    }
  }
})
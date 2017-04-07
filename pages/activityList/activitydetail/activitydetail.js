var app = getApp()
let regVideoUrl = app.globalData.host+'regvideo'
let videoRegCancelUrl = app.globalData.host+'videoregcancel'
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data:{
    // 活动id,用来请求详情
    id: '',
    activity: {},
    canReg: true,
    regBtnText: '',
    regParams: {},
    // 控制展开
    isDescFold: true,
    descHeight: '12em'
  },
  foldOrExtend:function() {
    console.log('点击折叠。。。。')
    var isFold = this.data.isDescFold
    this.setData({
      isDescFold: !isFold,
    })
    if(this.data.isDescFold) {
      this.setData({
        descHeight: '12em',
      })
    }else {
      this.setData({
        descHeight: 'auto',
      })
    }
    console.log(this.data.isDescFold)
  },
  registerNow:function(){
    if(this.data.canReg){
      // 可注册
      var that = this
      wx.showModal({
        title: '提示',
        content: '您确定要注册吗？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: regVideoUrl,
              data: that.data.params,
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res){
                // success
                // 提示用户注册成功
                if(res.data.status==0){
                  wx.showToast({
                  title: '注册成功！',
                  icon: 'success',
                  duration: 2000
                  })
                  // 将显示文字修改成取消注册
                  that.setData({
                    canReg: false,
                    regBtnText: '取消注册'
                  })
                }else{
                  console.log(res.data.info)
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
          } else if (res.cancel) {
            console.log('用户点击取消')
            
          }
        }
      })
    }else{
      if(this.data.activity.Isreg&&!this.data.activity.Isold){
        // 取消关注,取消成功，只要未过期，就还可注册
        console.log('取消关注')
        wx.request({
          url: videoRegCancelUrl,
          data: that.data.params,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res){
            // success
            // 提示用户注册成功
            if(res.data.status==0){
              wx.showToast({
                title: '取消注册成功！',
                icon: 'success',
                duration: 2000
              })
              // 将显示文字修改成取消注册
              that.setData({
                canReg: true,
                regBtnText: '立即注册'
              })
            }else{
              console.log(res.data.info)
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
        // 已过期,不做任何操作
        console.log('已过期')
      }
    }
  },
  // 取消注册
  cancelRegister:function(){

  },
  // 看视频
  watchVideo:function(){
    console.log('看视频')
  },
  // 听录音
  listenVoice:function(){
    console.log('听录音')
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
        id: options.id
    })
    console.log(options.id)
    this.getRegParams()
    this.prepareData()

  },
  getRegParams:function() {
    var videoID = this.data.id
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        that.setData({
          params: {
            userID: res.data.ID,
            VideoID: videoID
          }
        })
      }
    })
    
  },
  prepareData: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host+'videodetail',
      data: { "ID": this.data.id },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        var activity = res.data.data
        wx.hideLoading()
        if (res.data.status == 0) {
          that.setData({
            activity: activity
          })
          // 判断按钮是否可注册
          var canReg 
          var regBtnText
          if(!activity.Isreg && !activity.Isold){
            // 未注册未过期
            canReg = true
            regBtnText = '立即注册'
          }else if(activity.Isreg){
            canReg = false
            regBtnText = '取消注册'
          }else {
            canReg = false
            regBtnText = '已过期'
          }
          that.setData({
            canReg: canReg,
            regBtnText: regBtnText
          })
          console.log(WxParse)
          var article = '<div>'+that.data.activity.videodesc+'</div>';
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
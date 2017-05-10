var app = getApp()
let regVideoUrl = app.globalData.host+'regvideo'
let videoRegCancelUrl = app.globalData.host+'videoregcancel'
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data:{
    // 活动id,用来请求详情
    id: '',
    userID: '',
    activity: {},
    canReg: true,
    regBtnText: '',
    regParams: {},
    // 控制展开
    isDescFold: true,
    descHeight: '12em',

    showMyToast: false,
    myToastText: '',
    // 判断是否 为分享的页面，如果是分享的页面则加入一个黑色的小 button
    isShare: false
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
    let islogin = wx.getStorageSync('isLogin')
    if (islogin == false) {
      //未登录
      wx.navigateTo({
        url: '../../mine/login/login'
      })
      return
    }
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userID: userInfo.ID
    })
    var that = this
    if(this.data.canReg){
      // 可注册
      wx.showModal({
        title: '提示',
        content: '您确定要注册吗？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: regVideoUrl,
              data: {"userID": that.data.userID,"VideoID": that.data.id},
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res){
                // success
                // 提示用户注册成功
                if(res.data.status==0){
                  // wx.showToast({
                  // title: '注册成功！',
                  // icon: 'success',
                  // duration: 2000
                  // })
                  that.setData({
                    showMyToast: true,
                    myToastText: '注册成功！'
                  })
                  setTimeout(function(){
                    that.setData({
                      showMyToast: false
                    }) //1秒之后弹窗隐藏
                  },2000)
                  // 将显示文字修改成取消注册
                  that.setData({
                    canReg: false,
                    regBtnText: '取消注册',
                    'activity.Isreg': 1
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
      // ==============华丽分割线====================
    }else{
      if (!this.data.activity.Isold && !this.data.activity.Issign ){
        // 不可注册的两种情况（1.已过期，2.未过期已经注册可取消）
        // 未过期
        //已签到不可取消
        wx.showModal({
          title: '提示',
          content: '您确定要取消注册吗？',
          success: function(res) {
            if (res.confirm) {
              console.log('取消关注')
              wx.request({
                url: videoRegCancelUrl,
                data: {"userID": that.data.userID,"VideoID": that.data.id},
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(res){
                  // success
                  // 提示用户注册成功
                  if(res.data.status==0){
                    // wx.showToast({
                    //   title: '取消注册成功！',
                    //   icon: 'success',
                    //   duration: 2000
                    // })
                    that.setData({
                      showMyToast: true,
                      myToastText: '取消注册成功！'
                    })
                    setTimeout(function(){
                      that.setData({
                        showMyToast: false
                      })//1秒之后弹窗隐藏
                    },2000)
                    // 将显示文字修改成取消注册
                    that.setData({
                      canReg: true,
                      regBtnText: '立即注册',
                      'activity.Isreg': 0
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
        // ================华丽分割线================
      }else{
        // 已过期,不做任何操作
        //已签到，不作作何处理  【-by alimoon】
        console.log('已过期')
      }
    }
  },
  // 看视频
  watchVideo:function(e){
    let activityid = e.currentTarget.dataset.activityid
    console.log('看视频')
    wx.navigateTo({
      url: './videoplayer/videoplayer?id='+activityid,
    })
  },
  // 听录音
  listenVoice:function(e){
    console.log('听录音')
    let activityid = e.currentTarget.dataset.activityid
    wx.navigateTo({
      url: './radioplayer/radioplayer?id='+activityid,
    })
  },
  gotoHome:function(){
    wx.switchTab({
      url: '../../home/home',
    })
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
    if (this.data.id == "") {
      console.log(options.id)
      this.setData({
        id: options.id
      })
    }
    console.log(options.isShare)
    if (options.isShare) {
      this.setData({
        isShare: options.isShare
      })
    }

    this.getRegParams()
  },
  getRegParams:function() {
    var that = this
    var videoID = this.data.id
    var regParams = this.data.regParams
    that.prepareData()
  },
  prepareData: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    
    var dic
    let isLogin = wx.getStorageSync('isLogin')
    if (isLogin) {
      let userInfo = wx.getStorageSync('userInfo')
      this.setData({
        userID: userInfo.ID
      })
      dic = { "ID": this.data.id,"UID": this.data.userID}
    }else{
      dic = { "ID": this.data.id }
    }
    var UID = this.data.userID
    console.log('请求详情的userID参数'+UID)
    wx.request({
      url: app.globalData.host+'videodetail',
      data: dic, 
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
      success: function(res){
        // success
        console.log('详情结果：')
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
          if (!activity.Isreg && !activity.Isold && !activity.Issign){
            // 未注册未过期
            canReg = true
            regBtnText = '立即注册'
          } else if (activity.Isreg && !activity.Isold && !activity.Issign){
            // 已注册未过期
            canReg = false
            regBtnText = '取消注册'
          } else if (activity.Issign) {
            // 已注册已签到，不能取消不能注册
            canReg = false
            regBtnText = '已签到'
          }
          else {
            // 过期
            canReg = false
            regBtnText = '已过期'
          }
          that.setData({
            canReg: canReg,
            regBtnText: regBtnText
          })
          // console.log(WxParse)
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
      // title: '活动详情', // 分享标题
      path: 'pages/activityList/activitydetail/activitydetail?id='+this.data.id+"&isShare=true" // 分享路径
    }
  },
})
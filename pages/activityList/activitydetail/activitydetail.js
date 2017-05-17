var app = getApp()
let regVideoPath = 'regvideo'
let videoRegCancelPath = 'videoregcancel'
var WxParse = require('../../../wxParse/wxParse.js');
import { $wuxToast } from '../../../components/wux'
import { $wuxDialog } from '../../../components/wux'
let appid = 'wx6297e3823970c9ce'; //填写微信小程序appid  
let secret = '68ce47ddcfd19f38bd097123163d72cc'; //填写微信小程序secret 
var utils = require('../../../utils/util.js');

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

  paySuccess: function () {
    console.log("支付成功")
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function () {
      wx.navigateBack({
      })
    }, 2000)
  },

  payfailure: function () {
    function showToastCancel(message) {
      $wuxToast.show({
        type: 'cancel',
        timer: 1500,
        color: '#fff',
        text: message,
        success: () => console.log(message)
      })
    };
    showToastCancel('付款失败');
  },

  showPayToast:function(id){
    var that = this
    function wx_pay(id){
      console.log("id=", id)
      wx.login({
        success: function (loginCode) {
          //调用request请求api转换登录凭证  
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.openid);
              utils.ccRequestWithURL("https://www.fcouncil.com/index.php/Home/pay/getprepay", {
                orderID: id,  /*订单号*/
                openid: res.data.openid
              }, function success(data) {
                console.log(data);
                var obj = {
                  'timeStamp': data.timeStamp,
                  'nonceStr': data.nonceStr,
                  'package': data.package,
                  'signType': data.signType,
                  'paySign': data.paySign,
                  'success': function (res) {
                    console.log("success");
                    console.log(res);
                    that.paySuccess();
                  },
                  'fail': function (res) {
                    console.log('fail:' + JSON.stringify(res));
                    that.payfailure()
                  },
                };
                console.log(obj)
                wx.requestPayment(obj);
              }, function fail(data) {
                if (data.info) {
                  that.showToastText(data.info)
                  console.log(data.info)
                }
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      })
    }

    if (this.data.activity.Isold == 0 && this.data.activity.Meetfee > 0){
      //提示付费
      console.log('提示付费')
      wx.showModal({
        title: '提示',
        content: '参加活动需要付费，您需要进行支付吗？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('确定')
            wx_pay(id)
          } else {
            console.log('取消')
          }
        }
      });
    }
  },

  showToastText: function(message) {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => console.log(message)
    })
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
      const that = this
      const alert = (content) => {
        $wuxDialog.alert({
          title: '提示', 
          content: content, 
        })
      }

      $wuxDialog.prompt({
        title: '提示', 
        content: '您确定要注册吗？', 
        fieldtype: 'text', 
        password: false, 
        defaultText: '', 
        placeholder: '请输入注册备注', 
        maxlength: 30, 
        onConfirm(e) {
          const value = that.data.$wux.dialog.prompt.response
          // alert(content)
          console.log('用户点击确定')
          console.log(e, value)
          utils.ccRequest(regVideoPath, { "userID": that.data.userID, "VideoID": that.data.id, "regcontent": value },
            function(data){
            // 提示用户注册成功
            wx.showToast({
              title: '注册成功！',
              icon: 'success',
              duration: 2000
            })
            // that.showToastText('注册成功！')
            // 将显示文字修改成取消注册
            that.setData({
              canReg: false,
              regBtnText: '取消注册',
              'activity.Isreg': 1
            })
            // 注册成功后需要提示是否去付钱（meetfee > 0 并且没有过期的）
            // 传入注册ID 用于支付
            setTimeout(function () {
              that.showPayToast(data.OrderID)
            }, 2000);
          }, function(data){
            if (data.info){
              that.showToastText(data.info)
              console.log(data.info)
            }
          })
        },
      })
    /*
      wx.showModal({
        title: '提示',
        content: '您确定要注册吗？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')

            utils.ccRequest(regVideoPath, { "userID": that.data.userID, "VideoID": that.data.id },
             function(data){
              // 提示用户注册成功
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 2000
              })
              console.log(res)
              // that.showToastText('注册成功！')
              // 将显示文字修改成取消注册
              that.setData({
                canReg: false,
                regBtnText: '取消注册',
                'activity.Isreg': 1
              })
              // 注册成功后需要提示是否去付钱（meetfee > 0 并且没有过期的）
              // 传入注册ID 用于支付
              setTimeout(function () {
                that.showPayToast(data.OrderID)
              }, 2000);
            }, function(data){
              if (data.info){
                that.showToastText(data.info)
                console.log(data.info)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
        
      })*/
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
              console.log('取消注册')
              utils.ccRequest(videoRegCancelPath, { 
                "userID": that.data.userID, 
                "VideoID": that.data.id 
              }, function(data){
                that.showToastText("取消注册成功")
                // 将显示文字修改成取消注册
                that.setData({
                  canReg: true,
                  regBtnText: '立即注册',
                  'activity.Isreg': 0
                })
              }, function(data){
                if (data.info) {
                  that.showToastText(data.info)
                  console.log(data.info)
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
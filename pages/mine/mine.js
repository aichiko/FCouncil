// pages/mine/mine.js
var app = getApp()

Page({
  data:{
    isLogin: Boolean,
    userInfo: {},
    logintips: '请登录',
    nickname: '',//登录后的昵称
    userType: '类型',
    validity: '',
    Weixin_pic: '',
    wx_userInfo: {}

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.saveWxInfo()
  },

  tapName: function(event) {
    wx.login({
      success: function (loginCode) {
        var appid = 'wx6297e3823970c9ce'; //填写微信小程序appid  
        var secret = '68ce47ddcfd19f38bd097123163d72cc'; //填写微信小程序secret  

        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.openid);

            wx.request({
              url: 'https://www.fcouncil.com/index.php/Home/pay/getprepay',
              
              method: 'POST',
              data: {
                bookingNo: '20178888',  /*订单号*/
                total_fee: 1,   /*订单金额*/
                openid: res.data.openid
              
              },
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              success: function (res) {
                console.log(res.data);
                var obj = {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package':  res.data.package,
                  'signType': 'MD5',
                  'total_fee': 1,
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    console.log("success");
                    console.log(res);
                  },
                  'fail': function (res) {
                    console.log('fail:' + JSON.stringify(res));
                  }
                };
                console.log(obj);
                wx.requestPayment(obj);
              },
              fail: function (err) {
                console.log(err)
              }
            })

          }
        })
      }
    }) ;  
  },
  saveWxInfo: function(){
    var that = this

    try {
      let userinfo = wx.getStorageSync('wx_userInfo')
      console.log(res.data)
      that.setData({
        wx_userInfo: res.data
      })
    }catch (e){
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          wx_userInfo: userInfo
        })
        //console.log(that.data.wx_userInfo)
        wx.setStorage({
          key: 'wx_userInfo',
          data: userInfo,
        })
      })
    }
  },

  onReady: function(){
    // 页面渲染完成
  },

  onShow: function(){
    // 页面显示
    var _this = this
    // 获取登录状态
    wx.getStorage({
      key: 'isLogin',
      success: function(res){
        // success
        console.log(res)
        _this.setData ({
          isLogin: res.data
        })
      }
    })
    // 获取已登录用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        console.log('userInfo=====',res)
        _this.setData ({
          userInfo: res.data,
          nickname: res.data.Weixin_Name,
          userType: res.data.UsertypeName,
          validity: res.data.Enddate,
          Weixin_pic: res.data.Weixin_pic
        })
        console.log('Weixin_pic=====',_this.data.Weixin_pic)
      }
    })
  },
  onHide: function(){
    // 页面隐藏
  },
  onUnload: function(){
    // 页面关闭
  },
  loginAction: function () {
    if(this.data.isLogin){
      // 已经登录不跳至登录页面
      console.log('您已经登录!')
      wx.navigateTo({
        url: './mineInfo/mineInfo?id=' + this.data.userInfo.ID
      })
    }else{
      // 未登录，跳至登录页面
      wx.navigateTo({
        url: './login/login'
      })
      console.log('登录事件！')
    }
  },
  logOut:function(){
    var _this = this
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          _this.setData({
            isLogin: false
          })
          wx.setStorage({
            key: 'isLogin',
            data: false,
            success: function(res){
              console.log('退出登录后用户信息更新成功')
            },
            fail: function(res) {
              console.log('退出登录后用户信息更新失败')
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
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/mine/mine' // 分享路径
    }
  }
})
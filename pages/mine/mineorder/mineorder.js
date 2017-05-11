// pages/mine/mineorder/mineorder.js
var utils = require('../../../utils/util.js');
let path = "orderlist"
let appid = 'wx6297e3823970c9ce'; //填写微信小程序appid  
let secret = '68ce47ddcfd19f38bd097123163d72cc'; //填写微信小程序secret  

Page({
  data:{
    tabs: ["全部", "未付款", "已付款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    page: 1,
    nopayPage: 1,
    payPage: 1,
    
    parameters: {},
    nopayParameters: {},
    payParameters: {},
    allOrderList:[],
    nopayOrderList: [],
    payOrderList: [],
    //表示三个视图能否下拉刷新
    foodLoad: true,
    nopayFoodLoad: true,
    payFoodLoad: true,

    userID: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    let userInfo = wx.getStorageSync('userInfo')
    var ID = userInfo.ID
    this.setData({
      userID: ID
    })
    console.log(this.data.userID)
    this.prepareData()
  },

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex == 2 && this.data.payOrderList.length==0) {
      this.payOrderListRequest()
    }else if (this.data.activeIndex == 1 && this.data.nopayOrderList.length==0) {
      this.nopayOrderListRequest()
    }
  },

  prepareData: function() {
    var that = this
    this.setData({
      parameters: { "page": this.data.page, "userID": this.data.userID }
    })
    utils.ccRequest(path, this.data.parameters, function success(data){
      that.setData({
        allOrderList: data
      })
    }, function fail(){})
  },

  nopayOrderListRequest:function() {
    var that = this
    this.setData({
      nopayParameters: { "page": this.data.nopayPage, "userID": this.data.userID, "Isnopay": 1 }
    })
    utils.ccRequest(path, this.data.nopayParameters, function success(data) {
      that.setData({
        nopayOrderList: data
      })
    }, function fail() { })
  },
  
  payOrderListRequest:function() {
    var that = this
    this.setData({
      payParameters: {"page": this.data.payPage, "userID": this.data.userID, "Ispay": 1 }
    })
    utils.ccRequest(path, this.data.payParameters, function success(data) {
      that.setData({
        payOrderList: data
      })
    }, function fail() { })
  },

  loadMoreData: function (activeIndex) {

    if (activeIndex == 0 && !this.data.foodLoad){
      return
    }
    if (activeIndex == 1 && !this.data.nopayFoodLoad){
      return
    }
    if (activeIndex == 2 && !this.data.payFoodLoad){
      return
    }
    var that = this
    var page = 1
    var dic = {}
    if(activeIndex == 0) {
      page = this.data.page+1
      dic = this.data.parameters
    }else if(activeIndex == 1){
      page = this.data.nopayPage+1
      dic = this.data.nopayParameters
    } else {
      page = this.data.payPage+1
      dic = this.data.payParameters
    }
    dic.page = page
    utils.ccRequest(path, dic, function success(data) {
      if (activeIndex == 0) {
        var arr = that.data.allOrderList.concat(data)
        that.setData({
          page: page,
          parameters: dic,
          allOrderList: arr,
          foodLoad: data.length > 0
        })
      } else if (activeIndex == 1){
        var arr = that.data.nopayOrderList.concat(data)
        that.setData({
          nopayPage: page,
          nopayParameters: dic,
          nopayOrderList: arr,
          nopayFoodLoad: data.length > 0
        })
      }else {
        var arr = that.data.payOrderList.concat(data)
        that.setData({
          payPage: page,
          payParameters: dic,
          payOrderList: arr,
          payFoodLoad: data.length > 0
        })
      }
    }, function fail() { })
  },

  payTap: function(button) {
    console.log(button)
    let id = button.currentTarget.dataset.id
    console.log("id=",id)

    wx.login({
      success: function (loginCode){
        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function(res){
            console.log(res.data.openid);
            utils.ccRequestWithURL("https://www.fcouncil.com/index.php/Home/pay/getprepay", {
              bookingNo: '20178888',  /*订单号*/
              total_fee: 1,   /*订单金额*/
              openid: res.data.openid

            }, function success(data){
              console.log(data);
              var obj = {
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'total_fee': 1,
                'paySign': data.paySign,
                'success': function (res) {
                  console.log("success");
                  console.log(res);
                },
                'fail': function (res) {
                  console.log('fail:' + JSON.stringify(res));
                },
              };
              console.log(obj)
              wx.requestPayment(obj);
            }, function fail(){} )
          }, 
          fail: function (err) {
            console.log(err)
          }
        })

      }
    })
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
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    this.loadMoreData(this.data.activeIndex)
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/mine/mineorder/mineorder' // 分享路径
    }
  }
})
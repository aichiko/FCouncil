// pages/mine/mineorder/mineorder.js
Page({
  data:{
    tabs: ["全部", "已付款","未付款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    page: 1,
    payPage: 1,
    nopayPage: 1,
    parameters: {},
    payParameters: {},
    nopayParameters: {},
    allOrderList:[1],
    payOrderList: [2],
    nopayOrderList: [3],
    foodLoad: true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex == 1 && this.data.payOrderList.length==0) {
      this.payOrderListRequest()
    }else if (this.data.activeIndex == 2 && this.data.nopayOrderList.length==0) {
      this.nopayOrderListRequest()
    }
  },

  prepareData: function() {

  },

  payOrderListRequest:function() {
    
  },
  
  nopayOrderListRequest:function() {
    
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
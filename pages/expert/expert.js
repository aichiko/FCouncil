// pages/expert/expert.js
Page({
  data:{
    expert: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.index)
    var that = this
    wx.getStorage({
      key: 'expertsList',
      success: function(res){
        // success
        let expert = res.data[options.index]
        console.log(expert)
        that.setData({
          expert: expert
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

    this.setData({
      expertDesc: options.expert 
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
  }
})
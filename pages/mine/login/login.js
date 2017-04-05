Page({
  data:{
    name: String,
    password: String,
    userInfo: {
        isLogin: Boolean,
        name: String,
    }
  },
    // 立即注册
  registerNow: function () {
    console.log('跳至注册界面')
    wx.navigateTo({
      url: '../register/register'
    })
  },
    // 登录
  login: function (name, password) {
    console.log('登录啦!用户名和密码分别是' + this.data.name + '/' + this.data.password)
    wx.showToast({
      title: '登录成功！',
      icon: 'success',
      duration: 2000
    })
    this.setData ({
        userInfo: {
            isLogin: true
        }
    });
    wx.setStorage({
      key: 'userInfo',
      data: this.data.userInfo
    })
    // 跳转至个人中心
    wx.redirectTo({
      url: '../mine',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
    // 获取输入的用户名
  nameInput: function (e) {
    console.log(e.detail.value)
    this.setData ({
        name: e.detail.value
    });
  },
    // 获取输入的密码
  passwordInput: function (e) {
    console.log(e.detail.value)
    this.setData ({
        password: e.detail.value
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
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
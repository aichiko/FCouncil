var app = getApp()
let registerurl = app.globalData.host+'reg'
Page({
  data:{
    name: '',
    password: '',
    confirmPassword: '',
    showErr: false,
    errorText: ''
  },
  registerAction: function () {
    this.setData({
      showErr: false
    });
    console.log('注册！！')
    console.log(this.data)
    // 账号密码皆不为空，且两次密码输入一致
    var name = this.data.name
    var pwd = this.data.password
    var confirmPwd = this.data.confirmPassword
    
    if(name.length!=0 && pwd.length!=0 && confirmPwd!=0){
      var params = {
        "username": name,
        "password": pwd
      }
      if(pwd === confirmPwd){
        // 请求
        var that = this
        console.log(params)
        wx.request({
          url: registerurl,
          data: params,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res){
            // success
            console.log(res)
            if(res.data.status==0){
              wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 2000,
              })
              setTimeout(back, 2000)
              // 跳至登录页面（返回）
              function back() {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                  success: function(res){
                    // success
                  },
                })
              }
            }else{
              // 注册失败
              console.log(res.data.info)
              that.setData({
                showErr: true,
                errorText: res.data.info
              })
              // alert(res.data.info)
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
        console.log('密码输入不一致,请重新输入')
        this.setData({
          showErr: true,
          errorText: '密码输入不一致,请重新输入'
        })
      }
    }else{
      console.log('请输入完整信息')
      this.setData({
        showErr: true,
        errorText: '请输入完整信息'
      })
    }
  },
  nameInput:function(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  passwordInput:function(e){
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  passwordConfirmInput:function(e){
    console.log(e.detail.value)
    this.setData({
      confirmPassword: e.detail.value
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
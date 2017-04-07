var app = getApp()
let registerurl = app.globalData.host+'reg'
Page({
  data:{
    name: '',
    password: '',
    confirmPassword: '',
    principle: '',
    mobile: '',
    email: '',

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
    var principle = this.data.principle
    var mobile = this.data.mobile
    var email = this.data.email
    
    if(name.length!=0 && pwd.length!=0 && confirmPwd.length!=0&& principle.length!=0 && mobile.length!=0 && email.length!=0){
      var params = {
        "username": name,
        "password": pwd,
        "principle": principle,
        "mobile": mobile,
        "email": email
      }
      var regPhone = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
      var regMail = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/
      var isPhone = regPhone.test(mobile)
      var isMail = regMail.test(email)
      if(pwd === confirmPwd && isPhone && isMail){
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
        // 按优先级排，在前面的最后判断，则最终显示的为最后的错误提示
        if(!isMail){
          console.log('邮箱不合法')
          this.setData({
            showErr: true,
            errorText: '请输入正确邮箱'
          })
        }
        if(!isPhone){
          console.log('手机号不合法')
          this.setData({
            showErr: true,
            errorText: '请输入正确手机号'
          })
        }
      }
        if(pwd != confirmPwd){
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
  principleInput:function(e){
    console.log(e.detail.value)
    this.setData({
      principle: e.detail.value
    })
  },
  mobileInput:function(e){
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },
  emailInput:function(e){
    console.log(e.detail.value)
    this.setData({
      email: e.detail.value
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
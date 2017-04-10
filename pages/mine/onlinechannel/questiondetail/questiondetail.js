Page({
  data:{
      isMyQuestion: true,// 是不是我提的问题
      title: '这个问题是这样子的，这个位置放的是标题。',
      desc: '不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知',
      list:[{isAnswer: true,name: '呵呵呵哒',time:'2017-3-23  12:00', content: '这是一个不为人知的秘密，不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知想知道吗？不告诉你！哈哈哈哈哈哈哈！！！',pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2954656113,714258966&fm=23&gp=0.jpg'},{isAnswer: false,name: '呵呵呵哒',time:'2017-3-23  12:00', content: '不告诉我，我还不想知道了呢！哼哈哈哈哈哈哈哈！！不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知不告诉我，我还不想知！',pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2954656113,714258966&fm=23&gp=0.jpg'}]
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
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/mine/onlinechannel/questiondetail/questiondetail' // 分享路径
    }
  }
})
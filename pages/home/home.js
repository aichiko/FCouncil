// pages/home/home.js
Page({
  data:{
    grids: ["全部", "电话会议", "视频会议", "研讨会", "高峰论坛", "实战训练", "参观活动", "其他活动"],
    imgUrls: [],
    expertsList: [
      {
        name: '专家一', 
        desc: '春天来了，夏天还会远吗',
        expertTel: '021-62703381',
        expertEmail:'liuyun@163fcouncil.com'
      },
      {
        name: '专家二', 
        desc: '春天来了，你不会来了',
        expertTel: '021-62703381',
        expertEmail:'liuyun@163fcouncil.com'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var tempThis = this
    wx.request({
      url: 'https://www.fcouncil.com/index.php/Home/Api/banner',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        var urlLists = tempThis.data.imgUrls
        for(var i = 0; i < res.data.length; i++) {
          urlLists.push('https://www.fcouncil.com/' + res.data[i].PicUrl);
        }
        tempThis.setData({
          imgUrls : urlLists
        })
        // console.log(tempThis.data.imgUrls)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})

function expertsList(res) {
    wx.navigateTo({
      url: 'pages/expertsList/expertsList'
    })
  }
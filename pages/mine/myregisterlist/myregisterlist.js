var url = "http://www.imooc.com/course/ajaxlist"
var page_index = 0;

// 获取数据
var GetList = function (that) {
  that.setData({
        hidden:false
    });
    wx.request({
        url:url,
        method: 'GET',// 默认为GET，必须大写
        data:{// 参数字典
            page_index : 0,
            page_size : 6,
            sort : 'last',
            is_easy : 0,
            lange_id : 0,
            pos_id : 0,
            unlearn : 0
        },
        success:function(res){
            var list = that.data.registerlist;
            console.info(list);
            for(var i = 0; i < res.data.list.length; i++)            {
              list.push(res.data.list[i]);
            }
            that.setData({
                registerlist : list
            });
            page_index ++;
            console.log('success')
            that.setData({
                hidden:true
            });
        }
    });
}
Page({
  data:{
    hidden: true,
    registerlist: [],
    scrollTop: 0,
    scrollHeight:0
  },
  refresh:function(event){
    // 该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      page_index = 0;
      this.setData({
          registerlist : [],
          scrollTop : 0
      });
      console.log('refresh')
      GetList(this)
  },
  loadMore:function(){
    // 该方法绑定了页面滑动到底部的事件
      var that = this;
      GetList(that);
  },
  scroll: function(event) {
    console.log(event)
    // 该方法绑定了页面滚动时的事件，记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    // 微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              console.info(res.windowHeight);
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    // 在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
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
// pages/onlinechannel/onlinechannel.js
var page_index = 0;
var url = 'http://www.imooc.com/course/ajaxlist';

// 获取数据
var GetList = function (that) {
  
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
          var list = that.data.list;
          console.info(list);
          for(var i = 0; i < res.data.list.length; i++)            {
            list.push(res.data.list[i]);
          }
          that.setData({
              list : list
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
    list: [{}, {}]
  },
  // 跳至详情
  toQuestionDetail: function () {
    wx.navigateTo({
      url: './questiondetail/questiondetail'
    })
  },
  // 跳至提问页面
  askQuestion: function () {
    console.log('跳至提问页面')
    wx.navigateTo({
      url: './askquestion/askquestion'
    })
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
    // 页面初始化 options为页面跳转所带来的参数
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
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // 在页面展示之后先获取一次数据
    var that = this;
    // GetList(that);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
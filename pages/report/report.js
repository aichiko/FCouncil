// pages/laws/laws.js
Page({
  data:{
    reports: [
      {
        title: '报告名称',
        content: '报告的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '报告名称',
        content: '法律法规的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '报告名称',
        content: '报告的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '报告名称',
        content: '报告的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
      {
        title: '报告名称',
        content: '报告的内容，比较简单的，只是为了显示效果，随便加点东西'
      },
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // 如果是网络请求或是别的方法传出的值调用“this”,不能直接用，需要用变量接收“this” 再使用(如mine.js中的用法)
    console.log(this.data.reports)
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
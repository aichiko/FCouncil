let path = 'reportdetail'
var WxParse = require('../../../wxParse/wxParse.js');
var utils = require('../../../utils/util.js');
import { $wuxToast } from '../../../components/wux'
Page({
  data:{
    id: '',
    report: {},
    content: ''
  },
  readCompleteDoc: function() {
    function showToastText(message) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: message,
        success: () => console.log(message)
      })
    }
    wx.showLoading({
      title: '下载中'
    })
    wx.downloadFile({
      url: this.data.report.Content,
      success: function (res) {
        wx.hideLoading()
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function(res) {
            console.log('打开文档失败')
            wx.showToast({
              title: '打开文档失败'
            })
          }
        })
      },
      fail: function(res) {
        console.log(res)
        wx.hideLoading()
        console.log('下载文档失败')
        if (res.errMsg.includes("downloadFile:fail exceed max file size")){
          showToastText('文档过大，您可以去官网进行下载');
        }else {
          showToastText('下载文档失败');
        }
      }
    })
  },
  showToastText(message) {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => console.log(message)
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
        id: options.id
    })
    //this.detailRequest()
    let id = this.data.id
    var that = this
    utils.ccRequest(path, { "ID": id }, function completion(data){
      that.setData({
        report: data
      })
      // console.log(WxParse)
      var article = '<div>' + that.data.report.BaoDesc + '</div>';
      /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
      WxParse.wxParse('article', 'html', article, that, 5);
    }, function failure(data){
      console.log("failure",data)
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
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      path: 'pages/report/reportdetail/reportdetail?id='+this.data.id // 分享路径
    }
  }
})
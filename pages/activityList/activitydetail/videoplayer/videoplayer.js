// function getRandomColor () {
//  let rgb = []
//  for (let i = 0 ; i < 3; ++i){
//   let color = Math.floor(Math.random() * 256).toString(16)
//   color = color.length == 1 ? '0' + color : color
//   rgb.push(color)
//  }
//  return '#' + rgb.join('')
// }

Page({
 onReady: function (res) {
  this.videoContext = wx.createVideoContext('myVideo')
 },
 inputValue: '',
  data: {
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  // danmuList: [{
  //     text: '第 1s 出现的弹幕',
  //     color: '#ff0000',
  //     time: 1
  //   },
  //   {
  //     text: '第 3s 出现的弹幕',
  //     color: '#ff00ff',
  //     time: 3
  //   }
  //   ]
  },
  onLoad: function (options) {
    console.log(options)
  },
 bindInputBlur: function(e) {
  this.inputValue = e.detail.value
 },
  // bindButtonTap: function() { //视频下载
  //   var that = this
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: ['front','back'],
  //     success: function(res) {
  //       that.setData({
  //         src: res.tempFilePath
  //       })
  //     }
  //   })
  // },
//  bindSendDanmu: function () {
//   this.videoContext.sendDanmu({
//    text: this.inputValue,
//    color: getRandomColor()
//   })
//  },
  videoErrorCallback: function(e) {
   console.log('视频错误信息:');
   console.log(e.detail.errMsg);
  }
})
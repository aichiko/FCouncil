// pages/expertList/expertList.js
var app = getApp()
let requestUrl = app.globalData.host+'teacher'
Page({
  data:{
    expertsList: [
      {
        "Name": "刘筠",
        "Title": "上海市局稽查局资深所长",
        "Desc": "拥有三十年税务工作经历。历任税务专管员、咨询员、检查员、副所长、所长。自2012年起担任上海市税务干部学校客座讲师，为检查员和科所长培训各类税务稽查技巧和实操。录制的视频课件成为上海市税务干部远程教育的学习内容。参与或带队检查了“上海某局3.4亿元小金库案”、“著名演艺人偷税案”、“上海某首富环开增值税发票偷税案”、“上海某进口家具公司偷税案”、“上海某美容美发偷税案”等市局、总局、中纪委、国务院督办的大案，带队检查了工商银行、建设银行、交通银行、新华保险、汇丰保险等金融企业。在工作中和各税务局的稽查部门以及市公安经侦建立起广泛的联系。\r\n",
        "PicPath": "https://www.fcouncil.com/upload/1487058398996747909.jpg",
        "Tel": "021-62703381",
        "Email": "liuyun@fcouncil.com",
      },
      {
        "Name": "傅嘉欣 ",
        "Title": "协同共享企业服务（上海）股份有限公司 副总裁 ",
        "Desc": "傅先生从1998年起便开始专注于转让定价领域，在为跨国企业提供中国转让定价、价值评估以及税务和商业咨询领域拥有超过18年的专业服务经验。多次受国家税务总局及各地税务机关的邀请为全国各层次转让定价税务官员进行业务培训，曾撰写并出版作为国税总局转让定价税务管理丛书之一的《日本转让定价基本税制及案例集》。企业并购重组架构设计、内部控制、交易谈判等也是其专业强项。傅先生拥有复旦大学经济学学士学位，是中国注册会计师、税务师以及国际注册内部审计师，精通英语和日语，以客观中立及良好的实务经验与技术倍受推崇。",
        "PicPath": "https://www.fcouncil.com/upload/month_1606/fu.jpg",
        "Tel": "021-62709567",
        "Email": "charlesfu@fcouncil.com",
      }
    ],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    

    this.expertListRequest()

  },

  expertListRequest: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: requestUrl,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0) {
          that.setData({
            expertsList: res.data.data
          })
        }
      },
      fail: function(res) {
        // fail
        wx.hideLoading()
        console.log(res)
      },
    })
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
// pages/laws/laws.js
var app = getApp()
// let requesturl = app.globalData.host+'law'
let typeUrl = app.globalData.host +'answerclass'
let requesturl = app.globalData.host+'answerhot'

Page({
  data:{
    lawsList: [],
    page: 1,
    parameters: {},

    // nzopen:false,
    // nzshow:false,
    /// 筛选点击的 button
    shownavindex: -1,
    filterindex: -1,

    /// 黑色背景
    isfull: false,
    content: [],

    typeList: [],

    // 假数据
    filterArray: ["类型"],

    inputShowed: false,
    // 搜索的word
    inputVal: ""
  },

  showInput: function (e) {
    console.log("showInput" ,e)
    this.setData({
        inputShowed: true
    });
  },
  hideInput: function (e) {
    console.log("hideInput" ,e)
    this.setData({
        inputVal: "",
        inputShowed: false
    });
    let dic = this.data.parameters
    console.log(dic)
    delete(dic.keyword)
    console.log(dic)
    dic.page = 1
    this.lawsListRquest(dic)
  },
  clearInput: function (e) {
    console.log("clearInput" ,e)
    this.setData({
        inputVal: ""
    });
  },
  // 暂时不需要热更新
  inputTyping: function (e) {
    console.log("inputTyping" ,e)
    /*
    this.setData({
        inputVal: e.detail.value
    });
    */
  },

  searchConfirm: function(e) {
    console.log("searchConfirm" ,e)
    this.setData({
        inputVal: e.detail.value
    });
    if (e.detail.value.length >0) {
      // 搜索长度大于0 时， 进行搜索
      var that = this
      this.searchData(e.detail.value, function(data){
        that.setData({
          lawsList: data
        })
      })
    }
  },

  searchData: function(keyword, success) {
    var that = this
    let dic = this.data.parameters
    dic.page = 1
    dic.keyword = keyword
    
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: requesturl,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 0){
          that.setData({
            parameters: dic
          })
          if(success){
            success(res.data.data)
          }
        }else{
          that.setData({
            lawsList: []
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      },
    })
  },
  typeRquest: function() {
    var that = this
    wx.request({
      url: typeUrl,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        console.log(res)
        if (res.data.status == 0){
          that.setData({
            typeList: res.data.data
          })
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
  },
  
  // 法律法规列表
  lawsListRquest: function(parameters) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    
    console.log(this.data.parameters)
    wx.request({
      url: requesturl,
      data: this.data.parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0){
          that.setData({
            lawsList: res.data.data,
            parameters: parameters
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // this.lawsList()
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    // if (this.data.nzshow){
      this.loadmoreData()
    // }
  },
  loadmoreData: function() {
    let page = this.data.parameters.page
    page += 1
    let dic = this.data.parameters
    dic.page = page
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log(dic)
    wx.request({
      url: requesturl,
      data: dic,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 0){
          let arr = that.data.lawsList.concat(res.data.data)
          console.log(arr)
          that.setData({
            parameters: dic,
            lawsList: arr
          })
        }
      },
      fail: function(res) {
        // fail
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
      }
    })
  },
  // 跳至法律法规详情页
  toLawDetail: function (e) {
    console.log('跳至法律法规详情')
    let index = e.currentTarget.dataset.detailid
    let item = this.data.lawsList[index]
    let ID = item.ID
    wx.navigateTo({
      url: '../mine/onlinechannel/questiondetail/questiondetail?id='+ID+'&index=0'
      // url: './lawdetail/lawdetail?id='+ID
    })
  },

  filterItemAction: function(e) {
    console.log('filterItemAction。。。。。')
    let array = ["类型"]
    let keys = [ "typeID"]
    var parameters = this.data.parameters
    let keyindex = this.data.shownavindex
    let arr = this.data.content[this.data.shownavindex]
    console.log(arr)
    var filterArray = this.data.filterArray
    let index = e.currentTarget.dataset.filter
    if (index==0){
      //选择全部, 清楚筛选条件
      filterArray[keyindex] = array[keyindex]
      let key = keys[keyindex]
      parameters[key] = 0
      this.setData({
        filterindex: -1,
        filterArray: filterArray,
        parameters: parameters
      })
    }else {
      console.log(index)
      let item = arr[index]
      console.log(item)
      filterArray[keyindex] = item
      let key = keys[keyindex]
      if (this.data.shownavindex == 0) {
        parameters[key] = this.data.typeList[index-1].ID
      }
      this.setData({
        filterindex: index,
        filterArray: filterArray,
        parameters: parameters
      })
    }
    this.hidebg()

    console.log(parameters)
    this.filterRequest()
  },

  filterRequest: function() {
    console.log('filterrequest。。。。。。')
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    let parameters = this.data.parameters
    parameters.page = 1
    console.log(parameters)
    wx.request({
      url: requesturl,
      data: parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.hideLoading()
        console.log('筛选请求结果')
        console.log(res)
        if (res.data.status == 0) {
          that.setData({
            parameters: parameters,
            lawsList: res.data.data
          })
        }else {
          that.setData({
            parameters: parameters,
            reportsList: []
          })
        }
        
      },
      fail: function(res) {
        // fail
        console.log('筛选失败')
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
      }
    })
  },


  filterAction: function(view) {
    console.log('filterAction........')
    console.log(view)
    let index = view.currentTarget.dataset.hi
    if (this.data.shownavindex == -1) {
      this.setData({
        shownavindex: index,
        isfull: true,
        nzopen:true,
        nzshow: false,
        content: this.getContent(index),
      })
    }else {
      let navindex = this.data.shownavindex
      if (index == navindex) {
        this.setData({
          shownavindex: -1,
          isfull: false,
          nzopen: false,
          nzshow: true,
          content: [],
        })
      }else {
        this.setData({
          shownavindex: index,
          isfull: true,
          nzopen:true,
          nzshow: false,
          content: this.getContent(index),
        })
      }
    }
  },

  getContent: function(index) {
    // ["分类"]
    console.log(index)
    var content = []
    if (index == 0) {
      let arr = this.data.typeList
      var arr1 = ["全部"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    }
    console.log(content)
    return content
  },

  hidebg: function(e){
    console.log("hidebg")
    this.setData({
      isfull:false,
      shownavindex: -1,
      nzopen: false,
      nzshow: true
    })
  },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // 如果是网络请求或是别的方法传出的值调用“this”,不能直接用，需要用变量接收“this” 再使用(如mine.js中的用法)
    this.lawsListRquest({"page": this.data.page})
    this.typeRquest()
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
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: '首页', // 分享标题
      // desc: '首页', // 分享描述
      path: 'pages/laws/laws' // 分享路径
    }
  }
})
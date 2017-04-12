
var app = getApp()
Page({
  data:{
    nzopen:false,
    nzshow:false,
    /// 筛选点击的 button
    shownavindex: -1,
    filterindex: -1,

    /// 黑色背景
    isfull: false,
    content: [],
    // 根据上一页面的index值判断是哪个活动，请求数据
    activityType: 0,
    page: 1,
    parameters: {},

    firstType: -1,

    // 假数据
    filterArray: ["类型", "地区", "年份", "标签"],

    typeList: [],

    yearList: [],

    tagList: [],

    cityList: [
      {
      "ID": "2",
      "Desc": "北京",
      "Ctype": "1",
      "IsDelete": "0",
      "Aorder": "2"
      },
      {
        "ID": "4",
        "Desc": "天津",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "3"
      },
      {
        "ID": "3",
        "Desc": "上海",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "4"
      },
      {
        "ID": "5",
        "Desc": "苏州",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "5"
      },
      {
        "ID": "6",
        "Desc": "深圳",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "7"
      },
      {
        "ID": "8",
        "Desc": "其他",
        "Ctype": "1",
        "IsDelete": "0",
        "Aorder": "10"
      }
    ],

    activityList: []
  },
  toDetail: function (e) {
    let index = e.currentTarget.dataset.detailid
    let item = this.data.activityList[index]
    let ID = item.ID
    wx.navigateTo({
      url: './activitydetail/activitydetail?id='+ID
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
      activityType: options.index
    })
    this.activityListRequest(options.index)
    this.videoClassRquest()
    this.cityListRquest()
    this.timeRquest()
    this.tagListRquest()
  },

  videoClassRquest: function() {
    var that = this
    wx.request({
      url: app.globalData.host+'Videoclass',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if (res.data.status == 0) {
          that.setData({
            typeList: res.data.data
          })
        }else {
          that.setData({
            typeList: []
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
  cityListRquest: function() {
    var that = this
    wx.request({
      url: app.globalData.host+'cityclass',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          cityList: res.data.data
        })
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

  timeRquest: function() {
    var that = this
    wx.request({
      url: app.globalData.host+'yearlist',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          yearList: res.data.data
        })
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

  tagListRquest: function() {
    var that = this
    wx.request({
      url: app.globalData.host+'labclass',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          tagList: res.data.data
        })
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

  activityListRequest: function(TypeID) {
    console.log(TypeID)
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
        parameters: {"page": this.data.page, "TypeID": TypeID}
    })
    console.log(this.data.parameters)
    wx.request({
      url: app.globalData.host+'videolist',
      data: this.data.parameters,

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.stopPullDownRefresh()
        console.log(res)
        wx.hideLoading()

        if (res.data.status == 0) {
          that.setData({
            activityList: res.data.data
          })
        }else {
          that.setData({
            activityList: []
          })
        }
        

      },
      fail: function(res) {
        // fail
        wx.stopPullDownRefresh()
        console.log(res)
        wx.hideLoading()
      },
      complete: function(res) {
        // complete
        wx.stopPullDownRefresh()
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
    this.activityListRequest(this.data.parameters.TypeID)
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    this.loadmoreData()
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
      url: app.globalData.host+'videolist',
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
        var arr = []
        if (res.data.status == 0) {
          let arr1 = that.data.activityList
          let arr2 = res.data.data
          //console.log(arr2)
          arr = arr1.concat(res.data.data)
        }else {
          arr = that.data.activityList
        }
        //console.log(arr)
        that.setData({
          parameters: dic,
          activityList: arr
        })
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

  filterItemAction: function(e) {
    let array = ["类型", "地区", "年份", "标签"]
    let keys = ["TypeID", "CityID", "yearID", "labID"]
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
      }else if(this.data.shownavindex == 1){
        parameters[key] = this.data.cityList[index-1].ID
      }else if(this.data.shownavindex == 2){
        parameters[key] = this.data.yearList[index-1]
      }else if(this.data.shownavindex == 3){
        parameters[key] = this.data.tagList[index-1].ID
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
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    let parameters = this.data.parameters
    parameters.page = 1
    console.log(parameters)
    wx.request({
      url: app.globalData.host+'videolist',
      data: parameters,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        // success
        wx.hideLoading()
        console.log(res)
        if (res.data.status == 0) {
          that.setData({
            parameters: parameters,
            activityList: res.data.data
          })
        }else {
          that.setData({
            parameters: parameters,
            activityList: []
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

  filterAction: function(view) {
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

  hidebg: function(e){
    console.log("hidebg")
    this.setData({
      isfull:false,
      shownavindex: -1,
      nzopen: false,
      nzshow: true
    })
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      // title: '活动列表', // 分享标题
      path: 'pages/activityList/activityList' // 分享路径
    }
  },

  getContent: function(index) {
    // ["类型", "地区", "年份", "标签"]
    var content = []
    if (index == 0) {
      let arr = this.data.typeList
      var arr1 = ["全部"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    }else if (index == 1){
      let arr = this.data.cityList
      console.log(arr)
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    }else if (index == 2){
      let arr = this.data.yearList
      content[index] = ["不限"].concat(arr)
    }else if (index == 3){
      let arr = this.data.tagList
      var arr1 = ["不限"]
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        arr1.push(element.Desc)
      }
      content[index] = arr1
    }
    return content
  }
})
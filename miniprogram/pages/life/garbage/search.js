const db = wx.cloud.database()
Page({
  data: {
    MAX_LIMIT: 20,
    page: 0,
    dataCount: 0,
    datas: [],
    searchTxt: "",
    logo: "",
    ishavedata: true
  },
  onLoad: function (options) {
    this.data.dataCount = db.collection('product').count()
    this.data.page = 0
    this.data.datas = []
    this.data.ishavedata = true
    if (Object.keys(options).length != 0) {
      this.data.searchTxt = options.searchTxt;
      this.onGetData()
    }
  },
  searchIcon: function (e) {
    this.data.searchTxt = e.detail.value
    console.log(e.detail.value)
    this.onGetData()
  },
  onGetData: function () {
    var that = this
    wx.showLoading({
      title: '正在加载中.....',
    })
    console.log(this.data.page)
    db.collection('product').skip(this.data.page * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).where({
      name: db.RegExp({
        regexp: that.data.searchTxt
      })
    }).get({
      success: function (res) {
        wx.hideLoading()
        console.log(res.data.length)
        console.log("11111")
        that.data.page = that.data.page + 1
        for (var i = 0; i < res.data.length; i++) {
          that.data.datas.push(res.data[i])
        }
        that.setData({
          datas: that.data.datas
        })
        console.log(that.data.datas)
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res.errMsg)
        that.setData({
          ishavedata: false
        })
      }
    })
  },
  onReachBottom: function () {
    if(this.data.ishavedata)
      this.onGetData()
  },
})
const db = wx.cloud.database()
Page({
  data: {
    MAX_LIMIT: 20,
    page: 0,
    dataCount: 0,
    datas: [],
    searchTxt: "",
    logo: "",
    ishavedata: true,
    disabled: false,
    value: null
  },
  onLoad: function (options) {
    this.data.dataCount = db.collection('product').count()
    if (Object.keys(options).length != 0) {
      this.data.searchTxt = options.searchTxt;
      this.setData({
        disabled: true,
        value: options.searchTxt
      })
      this.onGetData()
    }
  },
  init: function (e) {
    this.setData({
      page: 0,
      dataCount: 0,
      datas: [],
      ishavedata: true,
      disabled: false,
      value: null
    })
  },
  searchIcon: function (e) {
    this.init()
    this.data.searchTxt = e.detail.value
    this.setData({
      value: e.detail.value
    })
    console.log(e.detail.value)
    this.onGetData()
  },
  onGetData: function () {
    var that = this
    wx.showLoading({
      title: '正在加载中.....',
    })
    db.collection('product').skip(this.data.page * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).where({
      name: db.RegExp({
        regexp: that.data.searchTxt
      })
    }).get({
      success: function (res) {
        wx.hideLoading()
        if (that.data.page == 0 && res.data.length == 0) {
          that.setData({
            ishavedata: false
          })
        }
        that.data.page = that.data.page + 1
        for (var i = 0; i < res.data.length; i++) {
          that.data.datas.push(res.data[i])
        }
        that.setData({
          datas: that.data.datas
        })
        console.log(that.data)
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
    if (this.data.ishavedata)
      this.onGetData()
  },
})
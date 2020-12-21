const db = wx.cloud.database()
Page({
  data: {
    MAX_LIMIT: 20,
    page: 0,
    dataCount: 0,
    datas: [],
    logo: "",
    isHasData: true,
  },
  onLoad: function (options) {
    this.data.keyword = options.keyword
    this.data.dataCount = db.collection('product').count()
    this.onGetData()
  },
  onGetData: function () {
    wx.showLoading({
      title: '正在加载数据中.....',
    })
    if (this.data.dataCount < this.data.page * this.data.MAX_LIMIT) {
      wx.showToast({
        title: '数据已经加载完',
        icon: "none"
      })
      wx.hideLoading()
      return
    }
    var that = this
    if (this.data.page == 0) {
      this.data.datas = []
    }
    var datas = db.collection('product').skip(this.data.page * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).where({
      name: db.RegExp({
        regexp: that.data.keyword,
      })
    }).get({
      success: function (res) {
        wx.hideLoading()
        if (res.data.length == 0 && that.data.page == 0) {
          that.setData({
            isHasData: false
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            that.data.datas.push(res.data[i])
          }
          that.setData({
            datas: that.data.datas,
            isHasData: true
          })
          that.data.page = that.data.page + 1
        }
      },
      fail: res => {
        wx.hideLoading()
        if (that.data.datas.length == 0) {
          that.setData({
            isHasData: false
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.data.page = 0
    this.onGetData()
  },
  onGoHome: function () {
    wx.switchTab({
      url: '/pages/life/life',
    })
  },
  onReachBottom: function () {
    this.onGetData()
  },
})
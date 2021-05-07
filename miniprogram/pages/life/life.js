// pages/life/life.js
const app=getApp();
Page({
  data: {
    currentTab: 0,
    release_sign: false,
    backTop : false,
    heightRpx: app.globalData.heightRpx
  },
  switchTab: function (e) {
    let tab = e.currentTarget.id
    if (tab === 'tableft') {
      this.setData({
        currentTab: 0,
        release_sign : false
      })
    } else if (tab === 'tabmiddle') {
      this.setData({
        currentTab: 1,
        release_sign : true
      })
    } else if (tab === 'tabright') {
      this.setData({
        currentTab: 2,
        release_sign : true
      })
    }
  },
  switchSwiper: function (e) {
    let tab = e.detail.currentItemId
    if (tab === 'tableft') {
      this.setData({
        currentTab: 0,
        release_sign : false
      })
    } else if (tab === 'tabmiddle') {
      this.setData({
        currentTab: 1,
        release_sign : true
      })
    } else if (tab === 'tabright') {
      this.setData({
        currentTab: 2,
        release_sign : true
      })
    }
  },
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTop =  true 
      that.setData({
        backTop: backTop
      })
},
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})
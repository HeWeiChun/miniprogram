// pages/study/study.js
const app = getApp()
Page({
  data: {
    currentTab: 0
  },
  switchTab: function (e) {
    let tab = e.currentTarget.id
    if (tab === 'tableft') {
      this.setData({
        currentTab: 0
      })
    } else if (tab === 'tabmiddle') {
      this.setData({
        currentTab: 1
      })
    } else if (tab === 'tabright') {
      this.setData({
        currentTab: 2
      })
    }
  },
  switchSwiper: function (e) {
    let tab = e.detail.currentItemId
    if (tab === 'tableft') {
      this.setData({
        currentTab: 0
      })
    } else if (tab === 'tabmiddle') {
      this.setData({
        currentTab: 1
      })
    } else if (tab === 'tabright') {
      this.setData({
        currentTab: 2
      })
    }
  },
  onLoad: function () {console.log(app.globalData)},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})
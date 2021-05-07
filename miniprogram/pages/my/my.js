// pages/user/index.js
const app = getApp()
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    wxlogin: true,
  },
  onLoad: function (options) {
    this.setData({
      userinfo: app.globalData.userInfo
    })
  },
  onShow() {    
    this.setData({
      userinfo: app.globalData.userInfo
  })}
})
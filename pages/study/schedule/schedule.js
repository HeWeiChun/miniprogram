// pages/study/schedule/schedule.js
var util = require('../../../utils/util.js');
Page({
  data: {
    time: util.myformatTime(new Date()),
    test: 0,
    wlist: null
  },
  handleClick: function (e) {
    const db = wx.cloud.database()
    let that = this
    db.collection('kebiao').get({
      success: function (res) {
        that.setData({
          wlist: res.data
        })
      }
    })
  },
  onLoad: function () {console.log(1234)},
  onReady: function () {console.log(1234)},
  onShow: function () {console.log(1234)},
  onHide: function () {console.log(1234)},
  onUnload: function () {console.log(1234)},
  onPullDownRefresh: function () {console.log(1234)},
  onReachBottom: function () {console.log(1234)},
  onShareAppMessage: function () {console.log(1234)},
})
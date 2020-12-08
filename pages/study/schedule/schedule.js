// pages/study/schedule/schedule.js
var util = require('../../../utils/util.js');
Page({
  data: {
    time: util.myformatTime(new Date())
  },
  onLoad: function () {console.log(111)},
  onReady: function () {console.log(111)},
  onShow: function () {console.log(111)},
  onHide: function () {console.log(111)},
  onUnload: function () {console.log(111)},
  onPullDownRefresh: function () {console.log(111)},
  onReachBottom: function () {console.log(111)},
  onShareAppMessage: function () {console.log(111)},
  test: function () {
    const db = wx.cloud.database()
    var that = this
    db.collection('todos').doc('e62469b25fce46af01128a552c3fa02d').get({
      success: function (res) {
        that.setData({
          ttt: res.data['description']
        })
      }
    })
  }
})
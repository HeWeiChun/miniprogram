// pages/study/schedule/schedule.js
var util = require('../../../utils/util.js');
Component({
  data:{
    time: util.myformatTime(new Date()),
    test: 0,
    wlist: null
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {this.handleClick()}, //程序开始时运行
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {console.log("show") },
    hide: function () {console.log("hide") },
  },
  methods:{
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
  }
})
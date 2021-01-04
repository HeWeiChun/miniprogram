// pages/study/schedule/schedule.js
const app = getApp()
var util = require('../../../utils/util.js');
Component({
  data: {
    time: util.myformatTime(new Date()),
    test: 0,
    wlist: null,
    nowWeek: 3,
    week: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    userInfo: app,
    currentTab: 10,
    heightRpx: app.globalData.heightRpx
  },
  lifetimes: {
    attached: function () {
      this.setData({
        currentTab:14
      })
      this.handleClick()
    }, 
  },
  pageLifetimes: {
    show: function () {},
    hide: function () {},
  },
  methods: {
    handleClick: function (e) {
      const db = wx.cloud.database();
      const _ = db.command;
      let that = this;

      wx.cloud.callFunction({
        name: 'schedule',
        data: {
          nowWeek: that.data.nowWeek,
        },
        success: function(res){
          console.log(res.result)
          that.setData({
            wlist: res.result.data
          })
        },
        fail: function(res){
          console.log(res)
        },
      })
    },
    switchSwiper:function(e){
      this.data.nowWeek=e.detail.current+3;
      this.handleClick()
    }
  }
})
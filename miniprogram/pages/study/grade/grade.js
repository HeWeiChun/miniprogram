// pages/study/grade/grade.js
const app = getApp()
Component({
  data: {
    xueqi: ["20181", "20182", "20191", "20192"],
    score: null,
    nowXueqi: null,
    heightRpx: app.globalData.heightRpx
  },

  lifetimes: {
    attached: function () {
      this.data.nowXueqi="20181"
      this.getScore()
    },
    moved: function () {},
    detached: function () {},
  },

  pageLifetimes: {
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    switchSwiper: function (e) {
      this.data.nowXueqi = this.data.xueqi[e.detail.current];
      console.log(this.data.nowXueqi)
      this.getScore()
    },
    getScore: function (e) {
      const db = wx.cloud.database();
      const _ = db.command;
      let that = this;
      console.log(typeof(that.data.nowXueqi))
      wx.cloud.callFunction({
        name: 'score',
        data: {
          xueqi: that.data.nowXueqi,
        },
        success: function (res) {
          console.log(res.result)
          that.setData({
            score: res.result.data
          })
        },
        fail: function (res) {
          console.log(res)
        },
      })
    }
  }
})
//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({}),
  Page({
    data: {
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      username: null,
      password: null,
      success: false
    },
    ck: function () {
      wx.switchTab({
        url: '../study/study',
      })
    },
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onLoad: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    formSubmit: function (e) {
      var that = this;
      this.setData({
        username: e.detail.value.username,
        password: e.detail.value.password
      })
      if(this.data.username == "" || this.data.password == ""){
        wx.showModal({
          title: '提示',
          content: '不能为空'
        })
      }
      else{
        const db = wx.cloud.database();
        const _=db.command;
        db.collection('user').where({
          username: _.eq(that.data.username)
        })
        .get({
          success: function (res) {
            if (res.data.length==0 || (res.data.length==1 && res.data[0]["password"]!=that.data.password))
            {
              wx.showModal({
                content: '用户名不存在或密码错误'
              })
            }
            else {
              app.globalData.username = e.detail.value.username
              app.globalData.userID = res.data[0]["_id"]
              wx.switchTab({
                url: '../study/study',
              })
            }
          }
        })
      }
    }
  })
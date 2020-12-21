Page({
  data: {
    accessToken: "",
    isShow: false,
    results: [],
    src: "",
    isCamera: true,
    btnTxt: "拍照",
    cWidth: 0,
    cHeight: 0
  },
  onLoad() {
    this.ctx = wx.createCameraContext()
    this.accessTokenFunc()
  },
  takePhoto() {
    var that = this
    if (this.data.isCamera == false) {
      this.setData({
        isCamera: true,
        btnTxt: "拍照"
      })
      return
    }
    this.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        that.setData({
          src: res.tempImagePath,
          isCamera: false,
          btnTxt: "重拍"
        })
        wx.showLoading({
          title: '正在加载中',
        })
        console.log(res)
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            console.log("res.errMsg")
            that.cutImg(res)
          },
          fail: function (res) {
            console.log("res.errMsg")
            wx.hideLoading()
            console.log(res.errMsg)
          },
        })
      }
    })
  },
  cutImg: function (res) {
    var that = this
    var ratio = 2;
    var canvasWidth = res.width //图片原始长宽
    var canvasHeight = res.height
    console.log(canvasWidth)
    console.log(canvasHeight)
    while (canvasWidth > 4096 || canvasHeight > 4096) { // 保证宽高在400以内
      canvasWidth = Math.trunc(res.width / ratio)
      canvasHeight = Math.trunc(res.height / ratio)
      ratio++;
    }
    that.setData({
      cWidth: canvasWidth,
      cHeight: canvasHeight
    })
    //----------绘制图形并取出图片路径--------------
    var ctx = wx.createCanvasContext('canvas')
    ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
    console.log(res.path)
    console.log(canvasWidth)
    console.log(canvasHeight)
    console.log("res.errMsg")
    ctx.draw(false,
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          fileType: 'png',
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          success: function (res) {
            console.log("res.errMsg")
            console.log(res.tempFilePath) //最终图片路径
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePath,
              encoding: "base64",
              success: function (res) {
                that.req(that.data.accessToken, res.data)
              },
              fail: function (res) {
                console.log("res.errMsg")
                wx.hideLoading()
                console.log(res.errMsg)
              },
            })
          },
          fail: function (res) {
            console.log("res.errMsg")
            wx.hideLoading()
            console.log(res.errMsg)
          },
        })
      }, 1000)
    )
  },
  req: function (token, image) {
    var that = this
    console.log("res.errMsg")
    wx.request({
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=" + token,
      data: {
        "image": image
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log("res.errMsg")
        wx.hideLoading()
        that.setData({
          results: res.data.result,
          isShow: true,
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log("res.errMsg")
        wx.hideLoading()
        console.log(res.errMsg)
      },
    })
  },
  accessTokenFunc: function () {
    var that = this
    console.log("accessTokenFunc is start")
    wx.cloud.callFunction({
      name: 'baiduAccessToken',
      success: function (res) {
        console.log(res.result.data.access_token)
        that.data.accessToken = res.result.data.access_token
      }
    })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: '/pages/life/garbage/search?searchTxt=' + e.detail.value,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  hideModal: function () {
    this.setData({
      isShow: false,
    })
  }
})
// pages/life/release/free/free.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
    intro :'',
    type: '',
    title:'',
    price: '',
    tele : 0,

    clould_img_id_list: [],
    maxContentLength: 1000,
    minContentLength: 10,
    items: [
      {value: 'jiajiao', name: '家教'},
      {value: 'yigong', name: '义工', checked: 'true'},
      {value: 'jianzhi', name: '兼职'}
    ]


  },

  /**
   * 组件的方法列表
   */
  methods: {

    radioChange: function(e)
    {
      this.setData({
        type: e.detail.value
      })
    },

    onLoad: function (options) {
      
      // console.log(length_goods);
      
    },
    input_title: function (e) {
      if (e.detail.value.length >= 18) {
        wx.showToast({
          title: '标题已达到最大字数限制',
        })
      }
      // console.log(e.detail.value)
      this.setData({
        title: e.detail.value
      })
    },
    input_title: function (e) {
      if (e.detail.value.length >= 140) {
        wx.showToast({
          title: '内容已达到最大字数限制',
        })
      }
      // console.log(e.detail.value)
      this.setData({
        title: e.detail.value
      })
    },
    input_orignalMoney: function (e) {
      if (e.detail.value.length >= this.data.maxContentLength) {
        wx.showToast({
          title: '已达到最大字数限制',
        })
      }
      this.setData({
        price: e.detail.value
      })
    },
    input_tele: function (e) {
      if (e.detail.value.length >= this.data.maxContentLength) {
        wx.showToast({
          title: '已达到最大字数限制',
        })
      }
      this.setData({
        tele: e.detail.value
      })
    },
    input_content: function (e) {
      if (e.detail.value.length >= this.data.maxContentLength) {
        wx.showToast({
          title: '已达到最大字数限制',
        })
      }
      this.setData({
        intro: e.detail.value
      })
      // console.log(e.detail.value)
    },
    chooseimage: function () {
      var that = this;
      wx.chooseImage({
        count: 9, // 默认9 
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
        success: function (res) {
          if (res.tempFilePaths.length > 0) {
            //图如果满了9张，不显示加图
            if (res.tempFilePaths.length == 9) {
              that.setData({
                hideAdd: 1
              })
            } else {
              that.setData({
                hideAdd: 0
              })
            }
            //把每次选择的图push进数组
            let img_url = that.data.img_url;
            for (let i = 0; i < res.tempFilePaths.length; i++) {
              if (img_url.length >= 9) {
                wx.showToast({
                  image: '../images/warn.png',
                  title: '图片过多'
                })
                that.setData({
                  hideAdd: 1
                })
                break
              }
              img_url.push(res.tempFilePaths[i])
            }
            that.setData({
              img_url: img_url
            })
          }
        }
      })
    },
    /**
     * 执行发布时图片已经上传完成，写入数据库的是图片的fileId
     */
    publish: function(img_url_ok) {
      var that = this
      
      const db = wx.cloud.database({
        envs: "mysql-9geagcktcf8a17e0"
      })
      //const db = wx.cloud.database({});
      var that = this;
      const cont = db.collection("helps_in_life");

      cont.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // 发布时小程序传入
          //author_id: event.openid,不要自己传，用sdk自带的
          price: this.data.price,
          title: this.data.title,
          tele : this.data.tele,
          intro: this.data.intro,
          type : this.data.type
          // 服务器时间和本地时间会造成什么影响，需要评估
        },
        success: function (res) {
          // 强制刷新，这个传参很粗暴
          console.log("success"+res)
          var pages = getCurrentPages();             //  获取页面栈
          var prevPage = pages[pages.length - 2];    // 上一个页面
          prevPage.setData({
            update: true
          })
          wx.hideLoading()
          wx.navigateBack({
            delta: 1
          })
        },
        fail: function(res) {
          that.publishFail('发布失败')
        }
      })
      
    },
    //发布按钮事件
    send: function () {
      if (this.data.intro.length < this.data.minContentLength) {
        wx.showToast({
          image: '../images/warn.png',
          title: '介绍太短!',
        })
        return
      }
      if (this.data.title.length == 0) {
        wx.showToast({
          image: '../images/warn.png',
          title: '请输入标题！',
        })
        return
      }
      // 获得现在闲置的数据库的记录个数
      //1、引用数据库
      
      var that = this;
      // console.log(that.data);
      
      
      wx.showLoading({
        title: '发布中',
        mask: true
      })

      that.publish()
      
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    publishFail(info) {
      wx.showToast({
        image: '../images/warn.png',
        title: info,
        mask: true,
        duration: 2500
      })
    }
  }
})

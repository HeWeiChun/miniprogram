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
    img_url: [],
    content: '',
    title :'',
    id : 0 ,
    clould_img_id_list: [],
    maxContentLength: 1000,
    minContentLength: 10,
    minPrice : 0,
    originalPrice : 0,
    tele : 0


  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      console.log(getApp().globalData)
      // 本页面要传数据到服务器，要对是否拿到这些数据做校验
      const db = wx.cloud.database({
        envs: "mysql-9geagcktcf8a17e0"
      })
      //const db = wx.cloud.database({});
      var that = this;
      const cont = db.collection("goods_in_free");
      var length_goods = 0;
      cont.get({
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          
          // console.log(_this.data.goods);
          length_goods = res.data.length + 1;
          console.log(length_goods);
          that.setData({
            id:  length_goods
          })
          //console.log(that);
        }
      });
      // console.log(length_goods);
      
    },
    input_title: function (e) {
      if (e.detail.value.length >= 18) {
        wx.showToast({
          title: '标题已达到最大字数限制',
        })
      }
      console.log(e.detail.value)
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
        originalPrice: e.detail.value
      })
    },
    input_nowMoney: function (e) {
      if (e.detail.value.length >= this.data.maxContentLength) {
        wx.showToast({
          title: '已达到最大字数限制',
        })
      }
      this.setData({
        minPrice: e.detail.value
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
        content: e.detail.value
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
      
      console.log(that.data);
      wx.cloud.callFunction({
        // 改成我的
        name: 'public_free',
        data: {
          // penid: app.globalData.openId,// 这个云端其实能直接拿到
          // author_name: app.globalData.wechatNickName,
          // author_avatar_url: app.globalData.wechatAvatarUrl,
          content: this.data.content,
          title : this.data.title,
          image_url: img_url_ok,
          id : this.data.id,
          minPrice: this.data.minPrice,
          originalPrice : this.data.originalPrice,
          tele : this.data.tele,
          // publish_time: "",
          // update_time: ""//目前让服务器自己生成这两个时间
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
      if (this.data.content.length < this.data.minContentLength) {
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
      // 图片的url
      let img_url = that.data.img_url;
      // console.log("img_url...."+ img_url);
      
      let img_url_ok = [];
      //由于图片只能一张一张地上传，所以用循环
      if (img_url.length == 0) {
        wx.showToast({
          image: '../images/warn.png',
          title: '请附上图片！',
        })
        return
      }
      for (let i = 0; i < img_url.length; i++) {
        var str = img_url[i];
        // console.log("str...."+ str);
        // var obj = str.lastIndexOf("/");
        // var fileName = str.substr(obj + 1);
        const id = that.data.id;
        // console.log("id...."+ id);
        const cloudPath = 'free_images/' + id.toString() + "_" + (i+1).toString() ;
        
        // console.log("cloudPath...."+ cloudPath);
        wx.cloud.uploadFile({
          cloudPath: cloudPath,//必须指定文件名，否则返回的文件id不对
          
          filePath: img_url[i], // 小程序临时文件路径
          success: res => {
            // get resource ID: 
            // console.log(res)
            
            // console.log("cloudPath"+ cloudPath),
            //把上传成功的图片的地址放入数组中
            img_url_ok.push(res.fileID);
            console.log("res.fileID"+res.fileID);
            //如果全部传完，则可以将图片路径保存到数据库
            if (img_url_ok.length == img_url.length) {
              console.log(img_url_ok)
              that.publish(img_url_ok)
            }
          },
          fail: err => {
            // handle error
            that.publishFail('图片上传失败')
            console.log('fail: ' + err.errMsg)
          }
        })
      }  
      
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

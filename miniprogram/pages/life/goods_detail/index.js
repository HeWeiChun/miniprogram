// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
      goodsObj : {},
      isCollect: false,
  },

  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   * 
   */

  onLoad: function(e)
  {
    var index =  parseInt(e.id)
    console.log("index"+index)
    this.setData({
      id: index
    })

    const db = wx.cloud.database({
      envs: "mysql-9geagcktcf8a17e0"
    })
    //const db = wx.cloud.database({});
    var that = this;
    const cont = db.collection("goods_in_free");
    // console.log(index)
    cont.where({
      id : index
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的记录的数组
        console.log(res.data[0].title)
        that.setData({
          goodsObj: res.data[0]
        })
        console.log(that.data.goodsObj)
    }
  })
  
    
  
  },

  onShow: function (e) {
    // const products = wx.getStorageSync('products') || [];
    // console.log(e.id)
    // let pages = getCurrentPages();
    // let currentPage = pages[pages.length - 1];
    // let options = currentPage.options;
    // const {
    //   id
    // } = options;
    // this.getGoodsDetail(id);
  },
  // onShow: function () {
  //   const products = wx.getStorageSync('products') || [];

  //   // productViewsRecord();


  //   const products = wx.setStorageSync('products', products) || [];
  // },
  
  
})
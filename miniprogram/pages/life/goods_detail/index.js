// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },

  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function(e)
  {
    console.log(e.id)
  },

  onShow: function (e) {
    // const products = wx.getStorageSync('products') || [];
    console.log(e.id)
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      id
    } = options;
    this.getGoodsDetail(id);
  }
  // onShow: function () {
  //   const products = wx.getStorageSync('products') || [];

  //   // productViewsRecord();


  //   const products = wx.setStorageSync('products', products) || [];
  // },
})
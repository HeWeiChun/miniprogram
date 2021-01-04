// pages/life/help/help.js
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
    current: 0,
    listgoods:[],  
    backTop:false,
    swiper:{
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTop = scrollTop > 100 ? true : false
    that.setData({
      backTop: backTop
    })
  },
  
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.handleClick()

    }, //程序开始时运行
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log("show")
    },
    hide: function () {
      console.log("hide")
    },
  },
  methods: {
    handleClick: function (e) {
      var _this = this;
      //1、引用数据库
      const db = wx.cloud.database({
        envs: "mysql-9geagcktcf8a17e0"
      })
      //const db = wx.cloud.database({});
      const cont = db.collection("helps_in_life");
      //2、开始查询数据了  news对应的是集合的名称
      cont.get({
        //如果查询成功的话
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          
          // console.log(_this.data.goods);
          //console.log(res.data);
          const length_goods = res.data.length;
          //console.log(length_goods);
          for(var i = 0; i<length_goods ; i++)
          {
            res.data[i].pic_src = "images/" + res.data[i].type + ".svg";
            //console.log("images/" + res.data[i].type + ".jpg");
            //console.log(res.data[i]);
          }
          _this.setData({
            listgoods: res.data
          })
          console.log(_this.data.listgoods);
        }
      });
    }
  }
})


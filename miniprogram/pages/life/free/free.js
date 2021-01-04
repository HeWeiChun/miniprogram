// pages/life/free/free.js
Component({
  data: {
    current: 0,
    goods: [],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
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
      const cont = db.collection("goods_in_free");
      console.log(cont);
      
      //2、开始查询数据了  news对应的是集合的名称
      cont.get({
        //如果查询成功的话
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          
          console.log(_this.data.goods);
          const length_goods = res.data.length;
          console.log(length_goods);
          for(var i = 0; i<length_goods ; i++)
          {
            const id_str =  res.data[i].id.toString() + "_1";
            console.log(id_str);
            res.data[i].pic_src = "cloud://mysql-9geagcktcf8a17e0.6d79-mysql-9geagcktcf8a17e0-1304322982/free_images/" + id_str 
          }
          _this.setData({
            goods: res.data
          })
          console.log(_this.data.goods);
        }
      });
    },

    toDetailsTap:function(e)
    {
      console.log('../goods_detail/index?id=' + e.currentTarget.dataset.id)
      // const idstr =  e.currentTarget.dataset.id.toString()
      
      
      
    }
  }
})
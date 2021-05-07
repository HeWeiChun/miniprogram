Component({
  data:{
    showActionsheet: false,
    groups: [
        { text: '发布闲置', value: 'release_free' },
        { text: '发布帮帮', value: 'release_help' },
        { text: '我的发布', type: 'warn', value: 'my_release' }
    ]
  },
  properties: {
    backTop: { // 属性名
      type: Boolean,
      value: ''
    },
    release_sign: { // 属性名
      type: Boolean,
      value: ''
    }
    
  },
  methods: {
    itemclick: function (e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 400
      })
    },
    release_function: function () {
      this.setData({
        showActionsheet: true
      })
    },
    close: function () {
      this.setData({
        showActionsheet: false
      })
    },
    btnClick: function(e) {
      console.log(e.detail)
      const value = e.detail.index;
      console.log(value)
      switch(value)
      {
        case 0:
          wx.navigateTo({
            url: '../../pages/life/release/free/free'
          })
          break;
        case 1:
          wx.navigateTo({
            url: '../../pages/life/release/help/help'
          })
          break;
        case 2:
          wx.navigateTo({
            url: '../../pages/life/release/free/free'
          })
          break;
      }
      this.close()
    }
  }
});
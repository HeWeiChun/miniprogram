// pages/life/garbage/garbage.js
Component({
  options:{
    addGlobalClass:true,
  },
  methods: {
    goSearch: function() {
      wx.navigateTo({
        url: 'garbage/search',
        success: function(res) {
          console.log(res)
        },
        fail:function(res){
          console.log(res.errMsg)
        }
      }
      )
    },
    onBindCamera: function() {
      wx.navigateTo({
        url: 'garbage/camera/camera',
      })
    }
  }
})

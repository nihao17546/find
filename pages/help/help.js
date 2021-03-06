// pages/help/help.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    help_src: "http://ovstg74bg.bkt.clouddn.com/help1.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var the = this;
    wx.request({
      url: app.data.getHelpSrcUrl,
      data: {

      },
      success: function (res) {
        if (res.data.code == 200) {
          the.setData({
            help_src: res.data.result
          })
        }
      },
      fail: function () {
      },
      complete: function () {

      }
    })
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
  
  }
})
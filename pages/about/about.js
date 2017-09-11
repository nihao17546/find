// pages/about/about.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
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
      url: app.data.getContentUrl,
      data: {

      },
      success: function (res) {
        if (res.data.code == 200) {
          the.setData({
            content: res.data.result
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
  
  },

  copywx: function () {
    wx.setClipboardData({
      data: 'nhweiwin',
      success: function (res) {
        wx.showToast({
          title: '微信号复制成功',
          icon: 'success',
          duration: 1100
        })
      }
    })
  },

  copyqq: function () {
    wx.setClipboardData({
      data: '420584320',
      success: function (res) {
        wx.showToast({
          title: 'QQ号复制成功',
          icon: 'success',
          duration: 1100
        })
      }
    })
  }
})
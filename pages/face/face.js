// pages/face/face.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "99"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var the = this;
    if (options.msg){
      the.setData({
        msg: "dasdasd:msg:" + options.msg
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

  onShareAppMessage: function (res) {
    var title = "微信小程序分享";
    var path = "/pages/pic/pic";
    if (res.from === 'button') {
      if (!(app.data.user && app.data.user.id)) {
        wx.showModal({
          title: '您还未登录',
          content: "请先跳转至[我的]页面进行登录操作。",
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            } else if (res.cancel) {

            }
          }
        })
      }
      else {
        title = "来PK";
        path = "/pages/face/face?msg=哈哈哈哈";
      }
    }
    return {
      title: title,
      path: path,
      success: function (res) {
        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
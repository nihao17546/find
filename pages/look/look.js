// pages/look/look.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultPic: "http://fdfs.nihaov.com/tou.png",
    image_hidden: false,
    b_pic_hidden: false,
    a_word_hidden: true,
    canvas_hidden: true,
    word_value: "",
    btn_word: "选择照片"
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

  choose_pic: function () {
    var the = this;
    if(the.data.btn_word == '选择照片'){
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: function (res) {
          the.setData({
            b_pic_hidden: true,
            a_word_hidden: false,
            defaultPic: res.tempFilePaths[0]
          })
        },
      })
    }
    else{
      the.setData({
        defaultPic: "http://fdfs.nihaov.com/tou.png",
        b_pic_hidden: false,
        a_word_hidden: true,
        repeat_hidden: true,
        btn_word: "选择照片",
        word_value: ""
      })
    }
  },

  showLook: function(){
    var the = this;
    if (the.data.defaultPic != 'http://fdfs.nihaov.com/tou.png'){
      wx.previewImage({
        urls: [the.data.defaultPic]
      })
    }
  },

  add_word: function (e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    var the = this;
    var word = e.detail.value.word.trim();
    var color = e.detail.value.color;
    var pos = e.detail.value.pos;
    var size = e.detail.value.size;
    var type = e.detail.value.type;
    if (word != ''){
      wx.uploadFile({
        url: app.data.uploadUrl,
        filePath: the.data.defaultPic,
        name: 'file',
        formData: {
          word: word,
          pos: pos,
          size: size,
          color: color,
          family: '黑体',
          type: type
        },
        success: function (res) {
          var da = JSON.parse(res.data);
          if (da.code == 200){
            the.setData({
              defaultPic: da.result,
              btn_word: "重新制作",
              b_pic_hidden: false,
              a_word_hidden: true,
              repeat_hidden: true,
              word_value: ""
            })
            wx.hideLoading()
          }
          else{
            wx.hideLoading()
            var mess = "图片处理错误";
            if (da.message){
              mess = da.message;
            }
            wx.showModal({
              title: '图片处理错误',
              content: mess,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
              }
            })
          }
        },
        fail: function (){
          wx.hideLoading()
          wx.showModal({
            title: '失败',
            content: "服务异常",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              } else if (res.cancel) {

              }
            }
          })
        }
      })
    }
  }
})
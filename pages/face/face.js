// pages/face/face.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultPic: "http://ovstg74bg.bkt.clouddn.com/tou.png",
    windowWidth : 0,
    windowHeight: 0,
    faces:[],
    choose_text: "拍照",
    share_hidden:true,
    a: {
      hidden: true,
      top: 0,
      left: 0
    },
    b: {
      hidden: true,
      top: 0,
      left: 0
    },
    c: {
      hidden: true,
      top: 0,
      left: 0
    },
    d: {
      hidden: true,
      top: 0,
      left: 0
    },
    e: {
      hidden: true,
      top: 0,
      left: 0
    }
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
    wx.getSystemInfo({
      success: function (res) {
        the.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
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
        title = "哈哈,刚测出我的年龄" + this.data.faces[0].age + ",我的颜值" + this.data.faces[0].beauty + ",你也来测测吧";
        path = "/pages/face/face?msg=" + app.data.user.id;
      }
    }
    return {
      title: title,
      // desc: "小程序描述",
      path: path,
      imageUrl: this.data.defaultPic,
      success: function (res) {
        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  choose_pic: function(){
    var the = this;
    if (app.data.user && app.data.user.id) {
      if (the.data.choose_text == "重拍"){
        the.setData({
          choose_text: "拍照",
          defaultPic: "http://ovstg74bg.bkt.clouddn.com/tou.png",
          share_hidden: true,
          faces: []
        })
        return;
      }
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          the.setData({
            faces: []
          })
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          wx.uploadFile({
            url: app.data.faceUrl,
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              uid: app.data.user.id,
              current: 1
            },
            success: function (res1) {
              wx.hideLoading();
              console.log(res1)
              var da = JSON.parse(res1.data);
              if(da.code == 200){
                the.setData({
                  // defaultPic: da.result.pic
                  defaultPic: res.tempFilePaths[0]
                })
                console.log(da.result)
                if (da.result.face.length == 0){
                  wx.showModal({
                    title: '提示',
                    content: '您上传的照片没有识别出人物头像,重新上传一张高清无码照片吧～',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {

                      } else if (res.cancel) {

                      }
                    }
                  })
                }
                else{
                  var ff = [];
                  var len = 5;
                  if (da.result.face.length < 5){
                    len = da.result.face.length;
                  }
                  for (var i = 0; i < len; i++){
                    var f = da.result.face[i];
                    var title;
                    // 相框高 
                    var showH = (f.picH * 200) / f.picW;
                    var le = (f.left / f.picW) * 200 - 100 + the.data.windowWidth/2;
                    var to = (f.top / f.picH) * showH + 8;
                    if(i == 0){
                      if(len > 1){
                        title = 'A';
                        the.setData({
                          a: {
                            hidden: false,
                            top: to,
                            left: le
                          }
                        })
                      }
                    }
                    else if (i == 1) {
                      title = 'B';
                      the.setData({
                        b: {
                          hidden: false,
                          top: to,
                          left: le 
                        }
                      })
                    }
                    else if (i == 2) {
                      title = 'C';
                      the.setData({
                        c: {
                          hidden: false,
                          top: to,
                          left: le 
                        }
                      })
                    }
                    else if (i == 3) {
                      title = 'D';
                      the.setData({
                        d: {
                          hidden: false,
                          top: to,
                          left: le 
                        }
                      })
                    }
                    else if (i == 4) {
                      title = 'E';
                      the.setData({
                        e: {
                          hidden: false,
                          top: to,
                          left: le 
                        }
                      })
                    }
                    var human = "卡通人物";
                    if (f.human > f.cartoon){
                      human = "真实人物"
                    }
                    var obj = {
                      title: title,
                      age: f.age,
                      gender: f.gender,
                      beauty: f.beauty,
                      glasses: f.glasses,
                      expression: f.expression,
                      race: f.race,
                      type: human
                    }
                    ff.push(obj);
                  }
                  the.setData({
                    faces: ff,
                    choose_text: "重拍",
                    share_hidden: false
                  })

                }
              }
              else{
                var mess = "抱歉，服务异常";
                if (da.message) {
                  mess = da.message;
                }
                wx.showModal({
                  title: '照片处理错误',
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
            fail: function (r) {
              console.error(r)
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
        },
      })
    }
    else{
      wx.showModal({
        title: '您还未登录',
        content: "请先跳转至[我的]页面进行登录操作。",
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my'
            });
          } else if (res.cancel) {

          }
        }
      })
    }
  },

  about: function(){
    wx.navigateTo({
      url:"/pages/about/about"
    })
  }
})
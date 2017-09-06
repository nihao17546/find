// pages/look/look.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultPic: "http://ovstg74bg.bkt.clouddn.com/tou.png",
    image_hidden: false,
    b_pic_hidden: false,
    a_word_hidden: true,
    canvas_hidden: true,
    word_value: "",
    btn_word: "选择照片",
    help_src: "http://ovstg74bg.bkt.clouddn.com/help1.png",
    user: {}
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
    // var the = this;
    // if (app.data.user && app.data.user.id) {
    //   the.setData({
    //     'user': app.data.user
    //   })
    // }
    // else {
    //   wx.getStorage({
    //     key: '1_token',
    //     success: function (res) {
    //       wx.request({
    //         url: app.data.checkUserId,
    //         data: {
    //           userId: res.data
    //         },
    //         success: function (res1) {
    //           if (res1.data.code == 200) {
    //             the.setData({
    //               'user': res1.data.result
    //             })
    //             app.data.user = res1.data.result;
    //           }
    //           else {
    //             the.setData({
    //               'user': {}
    //             })
    //             app.data.user = {};
    //           }
    //         },
    //         complete: function () {

    //         }
    //       })
    //     },
    //     fail: function () {
    //       the.setData({
    //         'user': {}
    //       })
    //       app.data.user = {};
    //     }
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.data.user && app.data.user.id){
      this.setData({
        user: app.data.user
      })
    }
    else{
      this.setData({
        user: {}
      })
    }
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
    if (the.data.user && the.data.user.id){
      if (the.data.btn_word == '选择照片') {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            the.setData({
              b_pic_hidden: true,
              a_word_hidden: false,
              defaultPic: res.tempFilePaths[0]
            })
          },
        })
      }
      else {
        the.setData({
          defaultPic: "http://ovstg74bg.bkt.clouddn.com/tou.png",
          b_pic_hidden: false,
          a_word_hidden: true,
          repeat_hidden: true,
          btn_word: "选择照片",
          word_value: ""
        })
      }
    }
    else{
      // the.to_author()
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

  showLook: function(){
    var the = this;
    if (the.data.defaultPic != 'http://ovstg74bg.bkt.clouddn.com/tou.png'){
      wx.previewImage({
        urls: [the.data.defaultPic]
      })
    }
  },

  cancel: function(){
    this.setData({
      defaultPic: "http://ovstg74bg.bkt.clouddn.com/tou.png",
      b_pic_hidden: false,
      a_word_hidden: true,
      repeat_hidden: true,
      btn_word: "选择照片",
      word_value: ""
    })
  },

  add_word: function (e) {
    var the = this;
    if (!(the.data.user && the.data.user.id)) {
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
      return;
    }
    var word = e.detail.value.word.trim();
    var color = e.detail.value.color;
    var pos = e.detail.value.pos;
    var size = e.detail.value.size;
    var type = e.detail.value.type;
    if (word != ''){
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      wx.uploadFile({
        url: app.data.uploadUrl,
        filePath: the.data.defaultPic,
        name: 'file',
        formData: {
          word: word,
          pos: pos,
          size: size,
          color: color,
          family: '宋体',
          type: type,
          uid: the.data.user.id
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
            wx.hideLoading();
            wx.previewImage({
              urls: [the.data.defaultPic]
            })
            app.data.reloadFavo = true;
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
    else{
      wx.showToast({
        title: '请输入需要添加的文字',
        icon: 'success',
        duration: 1100
      })
    }
  },

  authFun: function (code, user, encryptedData, iv) {
    var the = this;
    wx.request({
      url: app.data.authUrl,
      data: {
        code: code,
        user: JSON.stringify(user),
        encryptedData: encryptedData,
        iv: iv
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.setStorage({
            key: "1_token",
            data: "pph_&" + res.data.result.unionId
          })
          the.setData({
            'user': res.data.result
          })
          app.data.user = res.data.result;
          the.choose_pic()
        }
        else if (res.data.message) {
          wx.showModal({
            title: '登录失败',
            content: res.data.message,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              } else if (res.cancel) {
              }
            }
          })
        }
        else {
          wx.showModal({
            title: '登录失败',
            content: "服务器异常",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              } else if (res.cancel) {
              }
            }
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '登录失败',
          content: '服务器异常',
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

  to_author: function () {
    var the = this;
    wx.login({
      success: function (resLogin) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            the.authFun(resLogin.code, res.userInfo, res.encryptedData, res.iv)
          }, fail: function () {
            wx.openSetting({
              success: function (data) {
                if (data) {
                  if (data.authSetting["scope.userInfo"] == true) {
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (data1) {
                        the.authFun(resLogin.code, data1.userInfo, data1.encryptedData, data1.iv)
                      },
                      fail: function () {
                        wx.showModal({
                          title: '登录失败',
                          content: '获取授权信息失败',
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
                  else {
                    wx.showModal({
                      title: '登录失败',
                      content: '获取授权信息失败',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                      }
                    })
                  }
                }
                else {
                  wx.showModal({
                    title: '登录失败',
                    content: '获取授权信息失败',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                      } else if (res.cancel) {
                      }
                    }
                  })
                }
              },
              fail: function () {
                wx.showModal({
                  title: '登录失败',
                  content: '获取授权信息失败',
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
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '登录失败',
          content: '授权登录失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      },
      complete: function () {

      }
    })
  },

  help: function() {
    // wx.redirectTo({
    //   url: "/pages/help/help"
    // })
    wx.previewImage({
      urls: [this.data.help_src]
    })
  }
})
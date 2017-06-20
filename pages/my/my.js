// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLogin:'登录',
    userIdRex:'^[a-zA-Z0-9]{6,12}$',
    login_hidden:true,
    my_hidden:true,
    user:{},
    weixinBtn: false,
    weixinBtnText: '微信登录',
    hidden: true,
    pics: [],
    pictures: [],
    picIds: []
  },

  weixinLoginFun:function(re){
    if(re){
      this.setData({
        weixinBtn: true,
        weixinBtnText: '正在登录中...'
      })
    }
    else{
      this.setData({
        weixinBtn: false,
        weixinBtnText: '微信登录'
      })
    }
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
    if(app.data.user.id){
      the.setData({
        'login_hidden': true,
        'my_hidden': false,
        'user': app.data.user
      })
    }
    else{
      wx.getStorage({
        key: '1_token',
        success: function (res) {
          wx.request({
            url: app.data.checkUserId,
            data: {
              userId: res.data
            },
            success: function (res1) {
              if (res1.data.code == 200) {
                the.setData({
                  'login_hidden': true,
                  'my_hidden': false,
                  'user': res1.data.result
                })
                app.data.user = res1.data.result;
              }
              else {
                the.setData({
                  'login_hidden': false,
                  'my_hidden': true,
                  'user': {}
                })
                app.data.user = {};
              }
            },
            complete: function () {

            }
          })
        },
        fail: function () {
          the.setData({
            'login_hidden': false,
            'my_hidden': true,
            'user': {}
          })
          app.data.user = {};
        }
      })
    }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  registSubmit: function (e) {
    var nickname = e.detail.value.nickname.trim();
    var user_id = e.detail.value.user_id.trim();
    var password = e.detail.value.password;
    var password_r = e.detail.value.password_r;
    if(nickname==''){
      wx.showToast({
        title: '昵称不能为空',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    var ss = new RegExp(this.data.userIdRex);
    if (!ss.test(user_id)){
      wx.showToast({
        title: '账号只能由数字或英文组成，长度6-12',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    if (password.length<6||password.length>20){
      wx.showToast({
        title: '密码长度限制6-20',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    if(password!=password_r){
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    var the = this;
    wx.request({
      url: app.data.registUrl,
      data: {
        nickname:nickname,
        userId:user_id,
        password:password
      },
      success: function (res) {
        if(res.data.code==200){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 1500
          })
          wx.setStorage({
            key: "1_token",
            data: user_id
          })
          the.setData({
            'user': res.data.result
          })
          app.data.user = res.data.result;
          the.setData({
            'login_hidden': true,
            'my_hidden': false
          })
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        }
      },
      complete: function () {
        
      }
    })
  },

  loginSubmit: function (e){
    var the = this;
    var user_id = e.detail.value.user_id.trim();
    var password = e.detail.value.password;
    if(user_id!=""&&password!=""){
      wx.request({
        url: app.data.loginUrl,
        data: {
          userId: user_id,
          password: password
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx.setStorage({
              key: "1_token",
              data: user_id
            })
            the.setData({
              'user': res.data.result,
              'login_hidden': true,
              'my_hidden': false
            })
            app.data.user = res.data.result;
          }
          else {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'success',
              duration: 1500
            })
          }
        },
        complete: function () {

        }
      })
    }
  },

  to_regist:function(){
    this.setData({
      'login_hidden':true
    })
  },

  to_login: function () {
    this.setData({
      'login_hidden': false
    })
  },

  logout: function(){
    var the = this;
    wx.showModal({
      title: '退出',
      content: '确认要退出吗？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: '1_token',
            success: function (res) {

            }
          })
          the.setData({
            'user':{},
            'login_hidden': false,
            'my_hidden': true,
            'pics':[],
            'pictures':[],
            'picIds':[]
          })
          app.data.user = {};
        } else if (res.cancel) {
        }
      }
    })
  },
  favoPicFun:function(uid,page){
    var the = this;
    the.setData({
      'hidden': false
    })
    wx.request({
      url: app.data.ownFavoUrl,
      data: {
        uid: uid,
        page: page
      },
      success: function (res) {
        
      },
      complete: function () {
        the.setData({
          'hidden': true
        })
      }
    })
  },
  authFun: function (code, user, encryptedData,iv){
    var the = this;
    wx.request({
      url: app.data.authUrl,
      data:{
        code: code,
        user: JSON.stringify(user),
        encryptedData: encryptedData,
        iv: iv
      },
      success:function(res){
        if(res.data.code==200){
          wx.setStorage({
            key: "1_token",
            data: "pph_&"+res.data.result.unionId
          })
          the.setData({
            'user': res.data.result,
            'login_hidden': true,
            'my_hidden': false
          })
          app.data.user = res.data.result;

        }
        else if (res.data.message){
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
        else{
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
        the.weixinLoginFun(false)
      },
      fail:function(){
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
        the.weixinLoginFun(false)
      }
    })
  },

  to_author:function(){
    var the = this;
    the.weixinLoginFun(true)
    wx.login({
      success: function (resLogin) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            the.authFun(resLogin.code, res.userInfo, res.encryptedData,res.iv)
          },fail:function(){
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
                        the.weixinLoginFun(false)
                      }
                    })
                  }
                  else{
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
                    the.weixinLoginFun(false)
                  }
                }
                else{
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
                  the.weixinLoginFun(false)
                }
              },
              fail:function(){
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
                the.weixinLoginFun(false)
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
        the.weixinLoginFun(false)
      },
      complete: function () {
        
      }
    })
  },
  showPic: function (e) {
    var index = parseInt(e.currentTarget.dataset.index),
      pa = parseInt(e.currentTarget.dataset.pa),
      pictures = this.data.pictures;
    var ind = index * 3 + pa;
    if (ind < pictures.length) {
      wx.previewImage({
        current: pictures[ind],
        urls: pictures
      })
    }
  },
  imgError: function (e) {
    var index = parseInt(e.currentTarget.dataset.index),
      pa = parseInt(e.currentTarget.dataset.pa);
    var pk;
    if (pa == 0) {
      pk = "pics[" + index + "].path1";
    }
    else if (pa == 1) {
      pk = "pics[" + index + "].path2";
    }
    else {
      pk = "pics[" + index + "].path3";
    }
    this.setData({
      [pk]: app.data.errPic
    })
    var picId = this.data.picIds[index * 3 + pa];
    wx.request({
      url: app.data.errorUrl,
      data: {
        picId: picId,
        errMsg: e.detail.errMsg
      },
      success: function (res) {

      }
    })
  }
})
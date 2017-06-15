// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLogin:'登录',
    userIdRex:'^[a-zA-Z0-9]{6,12}$',
    regist_hidden:true,
    login_hidden:true,
    my_hidden:true,
    user:{},
    weixinBtn: false,
    weixinBtnText: '微信登录'
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
                'regist_hidden': true,
                'login_hidden': true,
                'my_hidden': false,
                'user': res1.data.result
              })
            }
            else {
              the.setData({
                'regist_hidden': true,
                'login_hidden': false,
                'my_hidden': true,
                'user': {}
              })
            }
          },
          complete: function () {

          }
        })
      },
      fail:function(){
        the.setData({
          'regist_hidden':true,
          'login_hidden':false,
          'my_hidden': true,
          'user': {}
        })
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
          the.setData({
            'regist_hidden': true,
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
              'regist_hidden': true,
              'login_hidden': true,
              'my_hidden': false
            })
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
      'regist_hidden':false,
      'login_hidden':true
    })
  },

  to_login: function () {
    this.setData({
      'regist_hidden': true,
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
            'regist_hidden': true,
            'login_hidden': false,
            'my_hidden': true
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  to_author:function(){
    var the = this;
    the.weixinLoginFun(true)
    wx.login({
      success: function (res) {
        console.log('success')
        console.log('success')
        console.log('success')
        console.log('success')
        console.log('success')
      },
      fail: function (res) {
        
      },
      complete: function () {
        the.weixinLoginFun(false)
      }
    })
  }
})
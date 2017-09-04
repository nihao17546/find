App({

  data:{
    findUrl:"https://www.nihaov.com/random",
    queryUrl:"https://www.nihaov.com/query/",
    registUrl:"https://www.nihaov.com/user/regist",
    checkUserId:"https://www.nihaov.com/user/check",
    loginUrl:"https://www.nihaov.com/user/login",
    authUrl:"https://www.nihaov.com/user/auth",
    favoUrl:"https://www.nihaov.com/user/favo",
    errorUrl: "https://www.nihaov.com/error",
    errPic:"http://fdfs.nihaov.com/404.jpg",
    ownFavoUrl: "https://www.nihaov.com/user/ownFavoList",
    rmFavoUrl: "https://www.nihaov.com/user/rmFavo",
    suggestionUrl: "https://www.nihaov.com/user/suggestion",
    uploadUrl: "https://www.nihaov.com/upload/look",
    user: {},
    reloadFavo: false
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var the = this;
    wx.getStorage({
      key: '1_token',
      success: function (res) {
        wx.request({
          url: the.data.checkUserId,
          data: {
            userId: res.data
          },
          success: function (res1) {
            if (res1.data.code == 200) {
              the.data.user = res1.data.result;
            }
            else {
              the.data.user = {};
            }
          },
          complete: function () {

          }
        })
      },
      fail: function () {
        the.data.user = {};
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

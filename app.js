App({

  data:{
    findUrl:"https://www.nihaov.com/find",
    picCompressPrefix:"http://fdfs.nihaov.com/compress/250",
    picPrefix: "http://fdfs.nihaov.com",
    queryUrl:"https://www.nihaov.com/query/image/",
    registUrl:"http://127.0.0.1:8099/user/regist",
    checkUserId:"http://127.0.0.1:8099/user/check",
    loginUrl:"http://127.0.0.1:8099/user/login",
    appId:"wx51a25b79d1e4d7b0",
    appSecret:"63d979a5dc7103a3605afecab365200e",
    authUrl:"http://127.0.0.1:8099/user/auth"
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
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

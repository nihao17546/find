// pages/pic/pic.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    searchKey:'',
    page:1,
    display:'none',
    viewDisplay:'',
    noneTextDisplay:'none',
    hidden:true
  },

  getPics: function(callBack){
    this.setData({
      searchKey: '',
      page:1,
      noneTextDisplay: 'none',
      hidden:false
    })
    var the = this;
    wx.request({
      url: app.data.findUrl,
      data: {
      },
      success: function (res) {
        var p1 = [], p2 = [], p3 = [], p = [];
        for (var i = 0; i < res.data.length; i++) {
          if (i % 3 == 0) {
            p1.push(app.data.picCompressPrefix + res.data[i].path);
          }
          else if (i % 3 == 1) {
            p2.push(app.data.picCompressPrefix + res.data[i].path);
          }
          else {
            p3.push(app.data.picCompressPrefix + res.data[i].path);
          }
        }
        var len = Math.max(p1.length, p2.length, p3.length)
        for (var i = 0; i < len; i++) {
          var obj = {};
          if (p1[i] != undefined) {
            obj.path1 = p1[i];
          }
          if (p2[i] != undefined) {
            obj.path2 = p2[i];
          }
          if (p3[i] != undefined) {
            obj.path3 = p3[i];
          }
          p.push(obj);
        }
        the.setData({ pics: p });
      },
      complete: function(){
        if(callBack){
          callBack();
        }
        the.setData({
          hidden: true
        })
      }
    })
  },

  searchAppend: function (page, rows, keyword){
    var the = this;
    var url = app.data.queryUrl + page + "/" + rows + "/" + encodeURI(keyword);
    the.setData({
      hidden: false
    })
    wx.request({
      url: url,
      data: {
      },
      success: function (res) {
        if (res.data.data.length>0){
          var p1 = [], p2 = [], p3 = [], p = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (i % 3 == 0) {
              p1.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
            else if (i % 3 == 1) {
              p2.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
            else {
              p3.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
          }
          var len = Math.max(p1.length, p2.length, p3.length)
          for (var i = 0; i < len; i++) {
            var obj = {};
            if (p1[i] != undefined) {
              obj.path1 = p1[i];
            }
            if (p2[i] != undefined) {
              obj.path2 = p2[i];
            }
            if (p3[i] != undefined) {
              obj.path3 = p3[i];
            }
            p.push(obj);
          }
          var c = the.data.pics.concat(p);
          the.setData({ pics: c });
        }
        else {
          the.setData({
            page:-1
          })
        }
      },
      complete: function () {
        the.setData({
          hidden: true
        })
      }
    })
  },

  searchPics: function (page,rows,keyword){
    var the = this;
    var url = app.data.queryUrl + page + "/" + rows+"/"+encodeURI(keyword);
    the.setData({
      hidden: false
    })
    wx.request({
      url: url,
      data: {
      },
      success: function (res) {
        if (res.data.data.length>0){
          var p1 = [], p2 = [], p3 = [], p = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (i % 3 == 0) {
              p1.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
            else if (i % 3 == 1) {
              p2.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
            else {
              p3.push(app.data.picCompressPrefix + res.data.data[i].path);
            }
          }
          var len = Math.max(p1.length, p2.length, p3.length)
          for (var i = 0; i < len; i++) {
            var obj = {};
            if (p1[i] != undefined) {
              obj.path1 = p1[i];
            }
            if (p2[i] != undefined) {
              obj.path2 = p2[i];
            }
            if (p3[i] != undefined) {
              obj.path3 = p3[i];
            }
            p.push(obj);
          }
          the.setData({ pics: p });
        }
        else{
          the.setData({
            noneTextDisplay: 'block'
          })
        }
      },
      complete: function () {
        the.setData({
          hidden: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPics();
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
    this.getPics(this.call);
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
    if (this.data.searchKey!=''&&this.data.page!=-1){
      this.setData({
        page:this.data.page+1
      })
      this.searchAppend(this.data.page, 30, this.data.searchKey)
    }
  },

  call: function(){
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  searchSubmit: function(e){
    if(this.data.hidden){
      var v = e.detail.value.key.trim();
      this.setData({
        searchKey: v,
        page: 1
      })
      if (v != '') {
        this.setData({
          pics: []
        })
        this.searchPics(this.data.page, 30, v)
      }
    }
  },
  searchBind: function () {
    this.setData({
      display:'block',
      viewDisplay:'none',
      noneTextDisplay: 'none'
    })
  },
  searchBlur: function () {
    this.setData({
      display: 'none',
      viewDisplay: ''
    })
  }
})
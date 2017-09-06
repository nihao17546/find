// pages/pic/pic.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    pictures:[],
    picIds:[],
    searchKey:'',
    page:1,
    display:'none',
    viewDisplay:'',
    noneTextDisplay:'none',
    hidden:true,
    openPic:true
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
        var pp = [], ids = [];
        for (var i = 0; i < res.data.length; i++) {
          var cs;
          var ss = res.data[i].src;
          if (res.data[i].compressSrc){
            cs = res.data[i].compressSrc;
          }
          else{
            cs = res.data[i].src;
          }
          if (i % 3 == 0) {
            p1.push(cs);
          }
          else if (i % 3 == 1) {
            p2.push(cs);
          }
          else {
            p3.push(cs);
          }
          pp.push(ss);
          ids.push(res.data[i].id);
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
        the.setData({
          pics: p,
          pictures: pp,
          picIds: ids
        });
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
          var pp = [], ids = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (i % 3 == 0) {
              p1.push(res.data.data[i].compressSrc);
            }
            else if (i % 3 == 1) {
              p2.push(res.data.data[i].compressSrc);
            }
            else {
              p3.push(res.data.data[i].compressSrc);
            }
            pp.push(res.data.data[i].src);
            ids.push(res.data.data[i].id);
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
          var cc = the.data.pictures.concat(pp);
          var dd = the.data.picIds.concat(ids);
          the.setData({ 
            pics: c,
            pictures: cc,
            picIds: dd
          });
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
          var pp = [], ids = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (i % 3 == 0) {
              p1.push(res.data.data[i].compressSrc);
            }
            else if (i % 3 == 1) {
              p2.push(res.data.data[i].compressSrc);
            }
            else {
              p3.push(res.data.data[i].compressSrc);
            }
            pp.push(res.data.data[i].src);
            ids.push(res.data.data[i].id);
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
          the.setData({ 
            pics: p,
            pictures: pp,
            picIds: ids
          });
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
          pics: [],
          pictures: []
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
  },
  showPic:function(e){
    if(this.data.openPic){
      var index = parseInt(e.currentTarget.dataset.index),
        pa = parseInt(e.currentTarget.dataset.pa),
        pictures = this.data.pictures;
      var ind = index * 3 + pa;
      if (ind < pictures.length){
        wx.previewImage({
          current: pictures[ind],
          urls: pictures
        })
      }
    }
  },
  favoPic:function(e){
    var the = this;
    the.setData({
      openPic:false
    })
    wx.showModal({
      title: '收藏',
      content: "确认收藏该图片？",
      success: function (res) {
        if (res.confirm) {
          if (app.data.user.id){
            var index = parseInt(e.currentTarget.dataset.index),
              pa = parseInt(e.currentTarget.dataset.pa);
            var ind = index * 3 + pa;
            wx.request({
              url: app.data.favoUrl,
              data:{
                uid: app.data.user.id,
                picId: the.data.picIds[ind]
              },
              success:function(res1){
                if (res1.data.code==200){
                  wx.showToast({
                    title: res1.data.message,
                    icon: 'success',
                    duration: 1100
                  })
                  app.data.reloadFavo = true;
                }
                else{
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
              },
              fail:function(){
                wx.showModal({
                  title: '失败',
                  content: "收藏失败",
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
        } else if (res.cancel) {
        }
      },
      complete:function(){
        the.setData({
          openPic: true
        })
      }
    })
  },
  imgError:function(e){
    var index = parseInt(e.currentTarget.dataset.index),
      pa = parseInt(e.currentTarget.dataset.pa);
      var pk;
    if(pa==0){
      pk = "pics[" + index + "].path1";
    }
    else if(pa==1){
      pk = "pics[" + index + "].path2";
    }
    else{
      pk = "pics[" + index + "].path3";
    }
    this.setData({
      [pk]: app.data.errPic
    })
    var picId = this.data.picIds[index * 3 + pa];
    wx.request({
      url: app.data.errorUrl,
      data:{
        picId: picId,
        errMsg: e.detail.errMsg
      },
      success:function(res){

      }
    })
  }
})
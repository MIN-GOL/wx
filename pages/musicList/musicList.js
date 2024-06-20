// pages/musicList/musicList.js
import Toast from '@vant/weapp/toast/toast';

Page({
  // 初始化
  init: function (id) {
    var title = ''
    if (id === "19723756") {title = "飙升榜"}
    if (id === "3779629") {title = "新歌榜"}
    if (id === "3778678") {title = "热歌榜"}
    wx.setNavigationBarTitle({
      title: title
    });
    // 判断id是否和缓存一致
    console.log("本地"+this.data.id);
    console.log("现在的id"+id);
    if (this.data.id === id) {
      this.setData({
        list: wx.getStorageSync('musicList')
      })
      return
    }else {
      this.setData({
        id: id
      })
      wx.removeStorageSync('musicList')
    }
  },

  // 获取歌单
  getMusicList: function () {
    var that = this;
    if (!wx.getStorageSync('musicList')) {
      wx.request({
        url: 'https://music.163.com/api/playlist/detail',
        data: {
          id: this.data.id
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let code = res.data.code
          if (code === -447) {
            that.getMusicList();
          } 
          if (code === 200 ) {
            // 存入data
            that.setData({
              list: res.data.result
            })
            // 判断缓存
            let sync = wx.getStorageSync('musicList')
            if (!sync) {
              wx.setStorageSync('musicList', res.data.result)
              console.log('缓存成功');
            }else{
              console.log('有缓存 不更新');
            }
            wx.stopPullDownRefresh({
              success: (res) => {
                Toast("获取成功")
              }
            })
          }
        }
      })
    } else {
      console.log('有数据 不进行网络请求');
      wx.stopPullDownRefresh({
        success: (res) => {
          Toast("数据已是最新")
        }
      })
      return
    }
   
  },
  // 转到详细页面播放器
  toRadio: function (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: "/pages/radio/radio?id="+id
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const id = wx.getStorageSync('list_id')
    this.init(id)
    this.getMusicList(this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      list: ''
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getMusicList(this.data.id)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
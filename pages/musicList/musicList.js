// pages/musicList/musicList.js
import Toast from '@vant/weapp/toast/toast';

Page({
  init: function (id) {
    var title = ''
    if (id === "19723756") {title = "飙升榜"}
    if (id === "3779629") {title = "新歌榜"}
    if (id === "3778678") {title = "热歌榜"}
    wx.setNavigationBarTitle({
      title: title
    });
  },

  getMusicList: function () {
    var that = this;
    const options = that.data.list;
    if (Object.keys(options).length === 0) {
      console.log('没有数据 进行网络请求')
    }else{
      console.log('有数据 不进行网络请求');
      wx.stopPullDownRefresh({
        success:(res) => {
          Toast("数据已是最新")
        }
      })
      return
    }
    wx.request({
      url: 'https://music.163.com/api/playlist/detail',
      data: {
        id: that.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let code = res.data.code
        console.log(res.data);
        console.log(code);
        if (code === -447) {
          Toast("服务器忙碌 请稍后再试");
        }else{
          that.setData({
            list: res.data.result
          })
          wx.stopPullDownRefresh({
            success:(res) => {
              Toast("获取成功")
            }
          })
        var list_m = wx.getStorageSync('musicList')
        if (list_m.length <= 0) {
          wx.setStorageSync('musicList', res.data)
          console.log('本地存入成功');
        }
        console.log('本地已存在');
      }
      }
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
    this.data.id = options.id;
    this.init(this.data.id)
    this.getMusicList(this.data.id)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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
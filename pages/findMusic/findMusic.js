// pages/findMusic/findMusic.js
import Toast from '@vant/weapp/toast/toast';
const fs = wx.getFileSystemManager();


Page({
  // 获取时间
  getTimeState: function() {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    let state = ``;
    if (hours >= 0 && hours <= 10) {
      state = `早上好`;
    } else if (hours > 10 && hours <= 14) {
      state = `中午好`;
    } else if (hours > 14 && hours <= 18) {
      state = `下午好`;
    } else if (hours > 18 && hours <= 24) {
      state = `晚上好`;
    }
    this.setData({
      time: state
    })
  },

  // 获取歌单
  getMusicList: function () {
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/playlist/detail',
      data: {
        id: 9773625535
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
        } else {
          that.setData({
            mingol: res.data.result
          })
          console.log(that.data.mingol.creator);
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    mingol: {},
    list:[19723756,3779629,3778678,2250011882],
    Soar:{},
    New:{},
    Hot:{},
    Rank:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTimeState();
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
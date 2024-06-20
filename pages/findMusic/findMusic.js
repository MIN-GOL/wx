// pages/findMusic/findMusic.js
import Toast from '@vant/weapp/toast/toast';
const fs = wx.getFileSystemManager();


Page({
  // 跳转到列表详情
  toList: function (e) {
    const id = e.currentTarget.id
    // 判断缓存是否有数据 有的话进行更新
    wx.setStorageSync('list_id', id);
    wx.switchTab({
      url: "/pages/musicList/musicList"
    })
  },
  // 转到详细页面播放器
  toRadio: function (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: "/pages/radio/radio?id="+id
    })
  },
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
        if (code === -447) {
          that.getMusicList();
        } else {
          console.log("网络请求成功");
          that.setData({
            mingol: res.data.result
          })
          var list_m = wx.getStorageSync('list_m')
          if (list_m.length <= 0) {
            wx.setStorageSync('list_m', res.data)
            console.log('本地存入成功');
          }
          console.log('本地已存在');
        }
      }
    })
  },
  // 本地读取
  getList_m: function () {
    var data = wx.getStorageSync('list_m');
    console.log(data.result);
    if (data) {
      this.setData({ mingol: data.result });
      console.log('本地读取mingol歌单成功');
    }else{
      this.getMusicList();
    }
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    mingol: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTimeState();
    this.getList_m();
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
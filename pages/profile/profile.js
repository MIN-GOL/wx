// pages/profile/profile.js
Page({
  // 页面初始化
  init: function () {
    var that = this;
    that.data.list.forEach(function (lid) {
      that.getAllMusicList(lid);
    })
  },

  // 获取个人信息
  getInfo: function () {
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/v1/user/detail/600553406',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          info: res.data
        })
      }
    })
  },

  // 获取所有歌单信息
  getAllMusicList: function (lid) {
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/playlist/detail',
      data: {
        id: lid
      },
      success(res) {
        if (res.data.code === -447) {
          that.getAllMusicList(lid);
        } else {
            that.setData({
              all: { ...that.data.all, [lid]: res.data.result }
            });
          console.log(lid + "加载成功");
        }
      }
    })
  },
  toList: function (e) {
    const id = e.currentTarget.id
    // 判断缓存是否有数据 有的话进行更新
    wx.setStorageSync('list_id', id);
    wx.switchTab({
      url: "/pages/musicList/musicList"
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    list: [9773625535, 10180993460, 8216469383],
    all:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
    this.getInfo();
    
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
// pages/selectMusic/selectMusic.js
import Toast from '@vant/weapp/toast/toast';
Page({
  // 加载数据
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  // 搜索歌曲
  onSearch() {
    var that = this;
    wx.request({
      url: 'http://music.163.com/api/search/get/web',
      data: {
        csrf_token: 'hlpretag=',
        s: this.data.value,
        type: 1,
        offset: 0,
        total: true,
        limit: 15
      },
      success(res){
        const resp = res.data
        if (resp.code === 200) {
          Toast('搜索成功')
          that.setData({
            resp: resp.result
          })
        }else{
          Toast('搜索失败')
        }
      }
    })
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
    value: '',
    resp: {}
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
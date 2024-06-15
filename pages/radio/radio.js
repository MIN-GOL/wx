// pages/radio/radio.js
Page({
  // 开始播放
  playAudio() {
    this.innerAudioContext.play();
    this.setData({
      state: 'running'
    })
  },
  // 暂停播放
  pauseAudio() {
    this.innerAudioContext.pause();
    this.setData({
      state: 'paused'
    })
  },
  // 终止播放
  stopAudio() {
    this.innerAudioContext.stop();
    this.setData({
      state: 'paused',
      'play.persent': 0
    })
  },
  // 格式化时间
  formatTime: function (num) {
    const s = Math.floor(num/1000)
    const minutes = Math.floor(s / 60)
    const seconds = s % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  },
  // 获取歌词
  getLyrics: function () {
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/song/lyric',
      data:({
        id: that.data.id,
        lv: 1,
        kv: 1,
        tv: -1
      }),
      success(res){
        var data = res.data
        console.log(data);
        that.setData({
          lyric: data
        })
      }
    })
  },
  // 获取歌曲详细信息
  getMusicinfo: function () {
    var that = this;
    wx.request({
      url: 'http://music.163.com/api/song/detail/',
      data:({
        id: that.data.id,
        ids: [that.data.id]
      }),
      success(res){
        var data = res.data.songs[0]
        var d = data.duration
        var time = that.formatTime(d)
        that.setData({
          music: data,
          'play.duration':time
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    id: '',
    lyric: {},
    music: {},
    state: 'running',
    play: {
      currentTime: '00:00',
      duration: '00:00',
      persent: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id = options.id
    this.setData({
      id: id,
      url: "http://music.163.com/song/media/outer/url?id=" + id + ".mp3"
    })
    this.getLyrics();
    this.getMusicinfo();
    // 创建 InnerAudioContext 实例
    this.innerAudioContext = wx.createInnerAudioContext();
    // 设置音频源
    this.innerAudioContext.src = this.data.url;
    // 监听音频播放事件
    this.innerAudioContext.onPlay(() => {
      console.log('音频开始播放');
    });
    // 监听音频暂停事件
    this.innerAudioContext.onPause(() => {
      console.log('音频暂停播放');
    });
    // 监听音频停止事件
    this.innerAudioContext.onStop(() => {
      console.log('音频停止播放');
    });
    // 监听音频播放结束事件
    this.innerAudioContext.onEnded(() => {
      console.log('音频播放结束');
    });
    // 监听音频播放错误事件
    this.innerAudioContext.onError((res) => {
      console.error('音频播放错误', res);
    });
  },    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.playAudio();
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
    this.stopAudio();
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
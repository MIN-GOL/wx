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
      'play.currentTime': '00:00',
      'play.persent': 0
    })
  },
  // 渲染秒数
  sliderChanging: function (e) {
    var persent = e.detail.value
    this.setData({
      'play.currentTime': this.formatTime(persent*1000)
    })
  },
  // 同步数据
  sliderChange: function (e) {
    var persent = e.detail.value
    this.setData({
      'play.persent': persent
    })
    this.setData({
      'play.currentTime': this.formatTime(persent*1000)
    })
    this.innerAudioContext.seek(persent)
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
        let lyric = res.data.lrc.lyric.split('[')
        that.setData({
          lyric: lyric
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
        var per = Math.floor(data.duration/1000)
        var time = that.formatTime(d)
        that.setData({
          music: data,
          'play.duration':time,
          'play.max': per
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
    lyric: [],
    music: {},
    state: 'running',
    play: {
      max: 0,
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
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.src = this.data.url;
    this.innerAudioContext.onPlay(() => {
      console.log('音频播放');
    });
    this.innerAudioContext.onPause(() => {
      console.log('音频暂停播放');
    });
    this.innerAudioContext.onStop(() => {
      console.log('音频停止播放');
      this.setData({
        state: 'paused'
      })
    });
    this.innerAudioContext.onEnded(() => {
      console.log('音频播放结束');
      this.setData({
        state: 'paused'
      })
    });
    this.innerAudioContext.onError((res) => {
      console.error('音频播放错误', res);
      this.setData({
        state: 'paused'
      })
    });
    setInterval(() => {
      if (this.data.state === "running") {
        const currentTime = this.data.play.currentTime;
        const time = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]) + 1
        const persent = this.data.play.persent
        this.setData({
          'play.currentTime': this.formatTime(time*1000),
          'play.persent': persent+1
        })
      }
    }, 1000);
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
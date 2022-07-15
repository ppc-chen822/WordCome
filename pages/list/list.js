const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    showword:''
  },
  onLoad() {
    db.collection('userword')
    .where({
        user:app.globalData.openid
    })
    .get()
    .then(res=>{
      let wordlist = res.data
      let show = this.Random(wordlist)
      let showword = show[0].word.word.wordHead
      console.log(show[0].word.word.wordHead)
      this.setData({
        showword:showword
      })
    })
  },
  Random(array) {
    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    let index = random(0, array.length);
    return array.splice(index, 1);
  },
  goLearn(){
    wx.navigateTo({
      url: '/pages/learn/learn',
      success:(res)=>{
        console.log(res)
      }
    })
  },
  onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: 'Loading...',
    })
    console.log("下拉刷新啦");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function(){
    this.onRefresh();
  },
});

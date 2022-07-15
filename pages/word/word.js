const app = getApp();
Page({
  data: {
    id: "",
    ukphone: "",
    usphone: "",
    trans: "",
    sCn: "",
    sContent: "",
    isCollect: false,
    collects: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    var tran = options.tran;
    var search = options.query;
    console.log(this.data.search)
    this.setData({
      search: search,
      tran: tran,
    });
    wx.cloud.callFunction({
      name: "getData",
      data: {
        word: this.data.search,
      },
      success: (res) => {
        if (res.result.data.length !== 0) {
          var list = res.result.data[0].content.word.content;
          let collect = res.result.data[0].content;
          this.setData({
            ukphone: list.ukphone,
            usphone: list.usphone,
            trans: list.trans,
            sContent: list.sentence.sentences[0].sContent,
            sCn: list.sentence.sentences[0].sCn,
          });
          this.data.collects = collect;
        } else {
          console.log("未收录此单词");
        }
      },
    });
    wx.cloud
      .database()
      .collection("userword")
      .where({
        user:app.globalData.openid
      })
      .get()
      .then((res) => {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          let detailword = res.data[i].word.word.wordHead;
          if (this.data.search === detailword) {
            this.setData({
              isCollect: true,
            });
          }
        }
      })
      .catch((res) => {
        console.log('未收藏',res);
      });
  },
  collect(e) {
    var that = this
    if (!this.data.isCollect) {
      wx.cloud.callFunction({
        name: "collect",
        data: {
          word: this.data.collects,
        },
        success: (res) => {
          this.setData({
            isCollect: true,
          });
          wx.showToast({
            title: '已加入生词本',
          })
        },
      });
    } else {
      wx.cloud
        .database()
        .collection("userword")
        .where({
            user:app.globalData.openid
        })
        .get({
          success: (res) => {
            for (var i = 0; i <= res.data.length; i++) {
              let detailword = res.data[i].word.word.wordHead;
              if (this.data.search === detailword) {
                that.setData({
                  id:res.data[i]._id
                });
                wx.cloud.callFunction({
                  name: "delect",
                  data: {
                    wid: this.data.id,
                  },
                  success:res=>{
                    console.log(res)
                    that.setData({
                      isCollect:false
                    })
                    wx.showToast({
                      title: '已从生词本删除',
                    })
                  }
                });
              }
            }
          },
        });
    }
  },
});

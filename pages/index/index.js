// index.js
// 获取应用实例
var util = require("../../utils/util");
// var MD5 = require('../../utils/md5')
const app = getApp();
Page({
  data: {
    weekday: "",
    week: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    search: "",
  },

  btnUp: function () {
    this.setData({
      bottom: "550rpx",
    });
  },
  btnUnder: function () {
    this.setData({
      bottom: "100rpx",
    });
  },
  handlerSearch(e) {
    console.log(e);
    if (!e.detail.value.trim()) {
      this.setData({
        search: "",
      });
      return;
    }
    this.setData({
      search: e.detail.value,
    });
  },
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time);
    this.setData({
      time: time,
      month: time.split("/")[1],
      day: time.split("/").pop().split(" ")[0],
    });
    console.log(this.data.search);
  },
  onShow: function () {
    var today = new Date().getDay();
    // console.log("today:"+today);
    switch (today) {
      case 0:
        this.setData({
          weekday: this.week[0],
        });
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        this.setData({
          weekday: this.data.week[today],
        });
        break;
    }
  },
  getData: function (e) {
    var that = this;
    var appid = "20220405001159950";
    var key = "dswko4VCkCiFrO8LZHVq";

    const the_md5 = require("../../utils/md5");
    var salt = new Date().getTime();
    var query = this.data.search;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = "en";
    var to = "zh";
    var str1 = appid + query + salt + key;
    var sign = the_md5.MD5(str1);
    console.log(query);
    if (query != "") {
      wx.request({
        url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
        type: "get",
        dataType: "json",
        data: {
          q: query,
          appid: appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
        },
        success: function (data) {
          that.setData({
            search: "",
          });
          var tran = data.data.trans_result[0].dst;
          wx.navigateTo({
            url: "/pages/word/word?query="+query+'&tran='+tran,
          });
        },
      });
    } else {
      wx.showToast({
        title: "请输入单词",
        icon: "none",
      });
    }
  },
});

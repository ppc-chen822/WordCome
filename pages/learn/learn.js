const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    b:-1,
    trans: "",
    tablist: [
      {
        id: "0",
        title: "短语",
        detail:[]
      },
      {
        id: "1",
        title: "同根词",
        detail:[]
      },
      {
        id: "2",
        title: "同近词",
        detail:[]
      },
    ],
    selindex: 0,
  },
  change(e) {
    console.log(this.data.tablist)
    console.log(e);
    let { index } = e.currentTarget.dataset;
    console.log(index);
    this.setData({
      selindex: index,
    });
  },
  Random(array) {
    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    let index = random(0, array.length);
    return array.splice(index, 1);
  },
  Order(array,a){
      console.log("进入函数")
    if(a<array.length){
        return array.splice(a, 1);
    }
    if(a>=array.length){
        this.data.b=0;
        return array.splice(this.data.b, 1);
    }
  },
  Rselect() {
    db.collection("userword")
        .where({
            user:app.globalData.openid
        })
      .get()
      .then((res) => {
        let wordlist = res.data;
        let show = this.Order(wordlist,++this.data.b);
        console.log(show)
        let content = show[0].word.word.content
        this.setData({
          showlist: show[0].word.word,
          trans: content.trans,
          relWordpos: content.relWord.rels,
          [`tablist[0].detail`]:content.phrase,
          [`tablist[1].detail`]:content.relWord,
          [`tablist[2].detail`]:content.syno
        });
      });
  },
  onLoad() {
    this.Rselect();
  },
  next() {
    this.Rselect();
  },
});

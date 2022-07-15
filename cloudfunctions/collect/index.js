// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'cloud02-9ga2ioxkd6b7e8c8'
  });
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let word  = event.word
  let isCollect = event.isCollect
  let userInfo = event
  let { OPENID } = cloud.getWXContext()
  return db.collection('userword').add({
    data:{
      user:OPENID,
      word:word,
      isCollect:isCollect
    }
  })

}
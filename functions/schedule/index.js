// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.nowWeek % 2 == 1) {
    try {
      return await db.collection('schedule').where({
        single: _.eq("1")
      }).get()
    } catch (e) {
      console.log(e)
    }
  } else {
    try {
      return await db.collection('schedule').where({
        double: _.eq("1")
      }).get()
    } catch (e) {
      console.log(e)
    }
  }
}
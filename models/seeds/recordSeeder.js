const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    { name: '房租', category: '家居物業', date: '2021-01-01', amount: 20000, categoryIcon: '<i class="fas fa-home"></i>' },
    { name: '捷運', category: '交通出行', date: '2021-01-02', amount: 50, categoryIcon: '<i class="fas fa-shuttle-van"></i>' },
    { name: '看電影', category: '休閒娛樂', date: '2021-01-03', amount: 200, categoryIcon: '<i class="fas fa-grin-beam"></i>' },
    { name: '午餐', category: '餐飲食品', date: '2021-01-04', amount: 80, categoryIcon: '<i class="fas fa-utensils"></i>' },
    { name: '電話費', category: '其他', date: '2021-01-05', amount: 600, categoryIcon: '<i class="fas fa-pen"></i>' }
  ).then(() => {
    console.log('recordSeeder done!')
    return db.close()
  }).then(() => {
    console.log('db closed!')
  })
})
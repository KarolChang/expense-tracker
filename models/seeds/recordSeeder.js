const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(
    { name: '房租', category: '家居物業', date: '2021-01-01', amount: 20000 },
    { name: '捷運', category: '交通出行', date: '2021-01-02', amount: 50 },
    { name: '看電影', category: '休閒娛樂', date: '2021-01-03', amount: 200 },
    { name: '午餐', category: '餐飲食品 ', date: '2021-01-04', amount: 80 },
    { name: '電話費', category: '其他 ', date: '2021-01-05', amount: 600 }
  )
  console.log('create done!')
})

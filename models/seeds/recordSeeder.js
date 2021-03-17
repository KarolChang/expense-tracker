const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const USER_SEED = { name: 'father', email: 'father@gmail.com', password: '123456' }

db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(USER_SEED.password, salt))
    .then(hash => {
      return User.create({
        name: USER_SEED.name,
        email: USER_SEED.email,
        password: hash
      })
    })
    .then(user => {
      const userId = user._id
      return Promise.all([
        Record.create({ name: '房租', category: '家居物業', date: '2021-01-01', amount: 20000, merchant: 'XX房東', categoryIcon: '<i class="fas fa-home fa-2x"></i>', userId }),
        Record.create({ name: '捷運', category: '交通出行', date: '2021-01-02', amount: 50, merchant: 'OO捷運', categoryIcon: '<i class="fas fa-shuttle-van fa-2x"></i>', userId }),
        Record.create({ name: '看電影', category: '休閒娛樂', date: '2021-01-03', amount: 200, merchant: 'XX影城', categoryIcon: '<i class="fas fa-grin-beam fa-2x"></i>', userId }),
        Record.create({ name: '午餐', category: '餐飲食品', date: '2021-02-04', amount: 80, merchant: 'OO牛肉麵', categoryIcon: '<i class="fas fa-utensils fa-2x"></i>', userId }),
        Record.create({ name: '電話費', category: '其他', date: '2021-03-05', amount: 600, merchant: 'XX電信', categoryIcon: '<i class="fas fa-pen fa-2x"></i>', userId }),
        Record.create({ name: '電話費', category: '其他', date: '2021-02-05', amount: 700, merchant: 'XX電信', categoryIcon: '<i class="fas fa-pen fa-2x"></i>', userId }),
        Record.create({ name: '晚餐', category: '餐飲食品', date: '2021-02-05', amount: 100, merchant: '排骨飯', categoryIcon: '<i class="fas fa-utensils fa-2x"></i>', userId })
      ])
    })
    .then(() => {
      console.log('recordSeeder done!')
      process.exit()
    })
})
const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    { name: '家居物業', icon: '<i class="fas fa-home fa-2x"></i>' },
    { name: '交通出行', icon: '<i class="fas fa-shuttle-van fa-2x"></i>' },
    { name: '休閒娛樂', icon: '<i class="fas fa-grin-beam fa-2x"></i>' },
    { name: '餐飲食品', icon: '<i class="fas fa-utensils fa-2x"></i>' },
    { name: '其他', icon: '<i class="fas fa-pen fa-2x"></i>' }
  ).then(() => {
    console.log('categorySeeder done!')
    process.exit()
  })
})
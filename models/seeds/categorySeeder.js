const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    { name: '家居物業', sort:'支出', icon: '<i class="fas fa-home fa-2x"></i>' },
    { name: '交通出行', sort:'支出', icon: '<i class="fas fa-shuttle-van fa-2x"></i>' },
    { name: '休閒娛樂', sort:'支出', icon: '<i class="fas fa-grin-beam fa-2x"></i>' },
    { name: '餐飲食品', sort:'支出', icon: '<i class="fas fa-utensils fa-2x"></i>' },
    { name: '其他支出', sort:'支出', icon: '<i class="fas fa-pen fa-2x"></i>' },
    { name: '薪水', sort:'收入', icon: '<i class="fas fa-file-invoice-dollar fa-2x"></i>' },
    { name: '其他收入', sort:'收入', icon: '<i class="fas fa-search-dollar fa-2x"></i>' }
  ).then(() => {
    console.log('categorySeeder done!')
    process.exit()
  })
})
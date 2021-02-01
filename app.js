const express = require('express')
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

const categorySymbols = [
  { name: '家居物業', icon: '<i class="fas fa-home"></i>' },
  { name: '交通出行', icon: '<i class="fas fa-shuttle-van"></i>' },
  { name: '休閒娛樂', icon: '<i class="fas fa-grin-beam"></i>' },
  { name: '餐飲食品', icon: '<i class="fas fa-utensils"></i>' },
  { name: '其他', icon: '<i class="fas fa-pen"></i>' }
]

app.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expenses => {
      // const index = categorySymbols.findIndex(category => expenses.category === category.name)
      // if (index === -1) return
      // expenses.category = categorySymbols[index].icon
      // const icon = categorySymbols[index].icon
      res.render('index', { expenses })
    })
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})

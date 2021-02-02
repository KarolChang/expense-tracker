const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// set route for index page (read info)
app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        // Category.find({ category: record.category })
        //   .lean()
        //   .then(category => record.$push({ icon: [category.icon] }))
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// set route for create page
app.get('/record/create', (req, res) => {
  res.render('create')
})

// storage created info and show on index page 
app.post('/record', (req, res) => {
  const expenseList = req.body
  return Record.create(expenseList)
    .then(() => {
      res.redirect('/')
      res.render('index', { totalAmount })
    })
    .catch(error => console.log(error))
})

// set route for edit page
app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// storage edit info and show on index page
app.post('/record/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete expense record
app.post('/record/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// choose category
app.get('/record', (req, res) => {
  const category = req.query.category
  let totalAmount = 0
  Record.find({ category })
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, category })
    })
    .catch(error => console.log(error))
})









app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})

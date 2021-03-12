const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// set route for create page
router.get('/create', (req, res) => {
  res.render('create')
})

// storage created info and show on index page 
router.post('/', (req, res) => {
  const records = req.body
  Category.find()
    .lean()
    .then(categories => {
      const category = categories.find(category => records.category === category.name)
      records.categoryIcon = category.icon
      return Record.create(records)
    })
    .then(() => {
      res.redirect('/')
      res.render('index', { records })
    })
    .catch(error => console.log(error))
})


// set route for edit page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// storage edit info and show on index page
router.put('/:id', (req, res) => {
  const id = req.params.id
  const recordEdit = req.body
  Category.find()
    .lean()
    .then(categories => {
      const category = categories.find(category => category.name === recordEdit.category)
      recordEdit.categoryIcon = category.icon
    })
  return Record.findById(id)
    .then(record => {
      Object.assign(record, recordEdit)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete expense record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// choose category
// choose month
router.get('/', (req, res) => {
  const category = req.query.category
  const month = req.query.month
  let totalAmount = 0
  return Record.find(
    { category })
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, category, month})
    })
    .catch(error => console.log(error))
})


module.exports = router
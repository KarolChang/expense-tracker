const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// const Category = require('./models/category')

// set route for index page (read info)
router.get('/', (req, res) => {
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


module.exports = router
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// set route for index page (read info)
router.get('/', (req, res) => {
  let totalAmount = 0
  let month = []
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        // month 
        month.push(record.date.slice(0, (record.date.indexOf('-') + 3)))
        month = month.filter(function(e, i, s) {
          return s.indexOf(e) === i
        })
      })
      // render
      res.render('index', { records, totalAmount, month })
    })
    .catch(error => console.log(error))
})


module.exports = router
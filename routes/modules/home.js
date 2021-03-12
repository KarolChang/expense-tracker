const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// set route for index page (read info)
router.get('/', (req, res) => {
  let totalAmount = 0
  let months = []
  Record.find()
    .lean()
    .then(records => {
      records.forEach((record, index) => {
        totalAmount += record.amount
        // 以月份篩選的欄位
        months.push(showYearMonth(record))
        months = months.filter(function(e, i, s) {
          return s.indexOf(e) === i
        })
        // 給畫面呈現的日期格式
        record.date = showYearMonthDate(record)
      })
      res.render('index', { records, totalAmount, months })
    })
    .catch(error => console.log(error))
})

// FUNCTION: find year and month
function showYearMonth(record) {
  const year = new Date(record.date).getFullYear()
  const month = new Date(record.date).getMonth() + 1
  return month < 10 ? `${year}-0${month}` : `${year}-${month}`
}

// FUNCTION: find year and month
function showYearMonthDate(record) {
  const year = new Date(record.date).getFullYear()
  let month = new Date(record.date).getMonth() + 1
  let date = new Date(record.date).getDate()
  if (month < 10) {
    month = '0' + month.toString()
  }
  if (date < 10) {
    date = '0' + date.toString()
  }
  return `${year}-${month}-${date}`
}

module.exports = router
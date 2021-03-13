const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const { showYearMonth, showYearMonthDate } = require('../../public/dateFormat')

// set route for index page (read info)
router.get('/', (req, res) => {
  let totalAmount = 0
  let months = []
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach((record, index) => {
        totalAmount += record.amount
        // 顯示 以月份篩選 的欄位
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

// filter Category & Month
router.get('/filter', (req, res) => {
  let totalAmount = 0
  let months = []
  const category = req.query.category
  const month = req.query.month
  if (category === '全部類別' && month === '全部月份') {
    return res.redirect('/')
  } else if (category === '全部類別') {
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        const records = recordList.filter(record => showYearMonth(record) === month)
        records.forEach(record => {
          totalAmount += record.amount
          // 顯示 以月份篩選 的欄位
          months.push(showYearMonth(record))
          months = months.filter(function(e, i, s) {
            return s.indexOf(e) === i
          })
          // 給畫面呈現的日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, month, months })
      })
      .catch(error => console.log(error))
  } else if (month === '全部月份') {
    Record.find({ category })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        records.forEach(record => {
          // 顯示 以月份篩選 的欄位
          months.push(showYearMonth(record))
          months = months.filter(function(e, i, s) {
            return s.indexOf(e) === i
          })
          totalAmount += record.amount
          // 給畫面呈現的日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, category, months })
      })
      .catch(error => console.log(error))
  } else {
    Record.find({ category })
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        // 顯示 以月份篩選 的欄位
        recordList.forEach(record => {
          months.push(showYearMonth(record))
          months = months.filter(function(e, i, s) {
            return s.indexOf(e) === i
          })
        })
        const records = recordList.filter(record => showYearMonth(record) === month)
        records.forEach(record => {
          totalAmount += record.amount
          // 給畫面呈現的日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, category, month, months })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router
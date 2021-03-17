const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const { showYearMonth, showYearMonthDate, renderMonthFilter } = require('../../utils/dateFormat')

// set route for index page (read info)
router.get('/', (req, res) => {
  let totalAmount = 0
  let months = []
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => {
        // 顯示 以月份篩選 的欄位
        months = renderMonthFilter(record, months)
        // 顯示 總金額
        totalAmount += record.amount
        // 顯示 日期格式
        record.date = showYearMonthDate(record)
      })
      res.render('index', { records, totalAmount, months })
    })
    .catch(error => console.log(error))
})

// filter Category & Month
router.get('/filter', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  let months = []
  const category = req.query.category
  const month = req.query.month
  if (category === '全部類別' && month === '全部月份') {
    return res.redirect('/')
  } else if (category === '全部類別') {
    Record.find({ userId })
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        recordList.forEach(record => {
          // 顯示 以月份篩選 的欄位
          months = renderMonthFilter(record, months)
        })
        const records = recordList.filter(record => showYearMonth(record) === month)
        records.forEach(record => {
          // 顯示 總金額
          totalAmount += record.amount
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, month, months })
      })
      .catch(error => console.log(error))
  } else if (month === '全部月份') {
    Record.find({ category, userId })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        records.forEach(record => {
          // 顯示 以月份篩選 的欄位
          months = renderMonthFilter(record, months)
          // 顯示 總金額
          totalAmount += record.amount
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, category, months })
      })
      .catch(error => console.log(error))
  } else {
    Record.find({ category, userId })
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        recordList.forEach(record => {
          // 顯示 以月份篩選 的欄位
          months = renderMonthFilter(record, months)
        })
        const records = recordList.filter(record => showYearMonth(record) === month)
        records.forEach(record => {
          // 顯示 總金額
          totalAmount += record.amount
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
        })
        res.render('index', { records, totalAmount, category, month, months })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router
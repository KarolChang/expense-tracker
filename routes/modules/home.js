const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const { showYearMonth, showYearMonthDate, renderMonthFilter } = require('../../utils/dateFormat')

// set route for index page (read info)
router.get('/', (req, res) => {
  let totalExpense = 0
  let totalIncome = 0
  let totalProfit = 0
  let months = []
  const userId = req.user._id
  // 顯示 收入金額
  Record.find({ userId, sort: '收入' })
    .lean()
    .then(records => records.forEach(record => {
      totalIncome += record.amount
    }))
  // 顯示 支出金額
  Record.find({ userId, sort: '支出' })
    .lean()
    .then(records => records.forEach(record => {
      totalExpense += record.amount
    }))
  return Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => {
        // 顯示 以月份篩選 的欄位
        months = renderMonthFilter(record, months)
        // 顯示 日期格式
        record.date = showYearMonthDate(record)
        // 顯示 收入、支出用顏色區別
        const sort = record.sort === '收入' ? false : true
        record.expense = sort
      })
      // 計算 盈餘
      totalProfit = totalIncome - totalExpense
      return res.render('index', { records, totalExpense, months, totalIncome, totalProfit })
    })
    .catch(error => console.log(error))
})

// filter Category & Month
router.get('/filter', (req, res) => {
  const userId = req.user._id
  let totalExpense = 0
  let totalIncome = 0
  let totalProfit = 0
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
          // 顯示 金額
          if (record.sort === '收入') {
            totalIncome += record.amount
          }
          if (record.sort === '支出') {
            totalExpense += record.amount
          }
          totalProfit = totalIncome - totalExpense
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
          // 顯示 收入、支出用顏色區別
          const sort = record.sort === '收入' ? false : true
          record.expense = sort
        })
        res.render('index', { records, totalExpense, month, months, totalIncome, totalProfit })
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
          // 顯示 金額
          if (record.sort === '收入') {
            totalIncome += record.amount
          }
          if (record.sort === '支出') {
            totalExpense += record.amount
          }
          totalProfit = totalIncome - totalExpense
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
          // 顯示 收入、支出用顏色區別
          const sort = record.sort === '收入' ? false : true
          record.expense = sort
        })
        res.render('index', { records, totalExpense, category, months, totalIncome, totalProfit })
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
          // 顯示 金額
          if (record.sort === '收入') {
            totalIncome += record.amount
          }
          if (record.sort === '支出') {
            totalExpense += record.amount
          }
          totalProfit = totalIncome - totalExpense
          // 顯示 日期格式
          record.date = showYearMonthDate(record)
          // 顯示 收入、支出用顏色區別
          const sort = record.sort === '收入' ? false : true
          record.expense = sort
        })
        res.render('index', { records, totalExpense, category, month, months, totalIncome, totalProfit })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router
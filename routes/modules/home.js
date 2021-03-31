const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const { showYearMonth, showYearMonthDate, renderMonthFilter } = require('../../utils/dateFormat')

// set route for index page (read info)
router.get('/', async (req, res) => {
  try {
    let totalExpense = 0
    let totalIncome = 0
    let totalProfit = 0
    let months = []
    const userId = req.user._id
    const records = await Record.find({ userId })
      .lean().sort({ date: 'desc' })
    records.forEach(record => {
      // 顯示 以月份篩選 的欄位
      months = renderMonthFilter(record, months)
      // 顯示 日期格式
      record.date = showYearMonthDate(record)
    })
    // 顯示 支出&收入 金額
    for (const record of records) {
      if (record.sort === '支出') {
        totalExpense += record.amount
      } else {
        totalIncome += record.amount
      }
    }
    // 計算 盈餘
    totalProfit = totalIncome - totalExpense
    return res.render('index', { records, totalExpense, months, totalIncome, totalProfit })
  } catch (err) {
    console.warn(err)
  }
})

// filter Category & Month
router.get('/filter', async (req, res) => {
  try {
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
      const recordList = await Record.find({ userId })
        .lean().sort({ date: 'desc' })
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
        return res.render('index', { records, totalExpense, month, months, totalIncome, totalProfit })
      })
    } else if (month === '全部月份') {
      const records = await Record.find({ category, userId })
        .lean().sort({ date: 'desc' })
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
      })
      return res.render('index', { records, totalExpense, category, months, totalIncome, totalProfit })
    } else {
      const recordList = await Record.find({ category, userId })
        .lean().sort({ date: 'desc' })
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
      })
      return res.render('index', { records, totalExpense, category, month, months, totalIncome, totalProfit })
    }
  } catch (err) {
    console.warn(err)
  }
})

module.exports = router

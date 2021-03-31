const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { showYearMonthDate } = require('../../utils/dateFormat')

// set route for create page
router.get('/create', (req, res) => {
  return res.render('create')
})

// storage created info and show on index page
router.post('/', async (req, res) => {
  try {
    const records = req.body
    if (records.name.length > 10) {
      const nameMsg = '項目欄位不可超過10字元!'
      return res.render('create', { records, nameMsg })
    }
    const sort = records.sort
    records.userId = req.user._id
    const categories = await Category.find({ sort }).lean()
    const category = categories.find(category => records.category === category.name)
    records.categoryIcon = category.icon
    await Record.create(records)
    req.flash('success_msg', `「${records.sort} - ${records.name}」新增成功!`)
    return res.redirect('/')
  } catch (err) {
    console.warn(err)
  }
})

// set route for edit page
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ userId, _id }).lean()
    record.date = showYearMonthDate(record)
    return res.render('edit', { record })
  } catch (err) {
    console.warn(err)
  }
})

// storage edit info and show on index page
router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const recordEdit = req.body
  recordEdit._id = _id
  if (recordEdit.name.length > 10) {
    const nameMsg = '項目欄位不可超過10字元!'
    return res.render('edit', { record: recordEdit, nameMsg })
  }
  try {
    const categories = await Category.find().lean()
    const category = categories.find(category => category.name === recordEdit.category)
    recordEdit.categoryIcon = category.icon
    const record = await Record.findOne({ userId, _id })
    Object.assign(record, recordEdit)
    await record.save()
    req.flash('success_msg', `「${record.sort} - ${record.name}」編輯成功!`)
    return res.redirect('/')
  } catch (err) {
    console.warn(err)
  }
})

// delete expense record
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ userId, _id })
    record.remove()
    return res.redirect('/')
  } catch (err) {
    console.warn(err)
  }
})

module.exports = router

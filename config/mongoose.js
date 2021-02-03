const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const recordList = require('./record.json').results
const USER_SEED = [{
  name: 'father', email: 'father@gmail.com', password: '123456'
}, {
  name: 'mother', email: 'mother@gmail.com', password: '123456'
}]
const recordCount = 5

db.once('open', async () => {
  try {
    await new Promise((resolve) => {
      USER_SEED.forEach((user, index) => {
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => {
            return User.create({
              name: user.name,
              email: user.email,
              password: hash
            })
          })
          .then(user => {
            resolve(Promise.all(Array.from({ length: recordCount }, (_, i) => {
              const record = recordList[i + index * recordCount]
              record.userId = user._id
              console.log(record)
              return Record.create(record)
            })))
          })
      })
    })
    console.log('recordSeeder done!')
    process.exit()
  } catch (e) {
    console.log(e)
  }
})
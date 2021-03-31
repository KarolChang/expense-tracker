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
  const createdUsers = []
  // 建立User
  try {
    for (const user of USER_SEED) {
      const hash = await bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt))
      const createdUser = await User.create({
        name: user.name,
        email: user.email,
        password: hash
      })
      createdUsers.push(createdUser)
    }
  } catch (error) {
    console.log(error)
  }
  // 建立Record
  try {
    for (const [userIndex, user] of createdUsers.entries()) {
      for (const record of recordList.slice((userIndex * recordCount), (recordCount + userIndex * recordCount))) {
        record.userId = user._id
        await Record.create(record)
      }
    }
    console.log('recordSeeder done!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

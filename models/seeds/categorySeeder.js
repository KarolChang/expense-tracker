const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const categoryList = require('./category.json').results

db.once('open', async () => {
  try {
    await new Promise((resolve) => {
      resolve(
        Promise.all(Array.from({ length: categoryList.length }, (_, i) => {
          return Category.create(categoryList[i])
        }))
      )
    })
  } catch (e) {
    console.log(e)
  }
  console.log('categorySeeder done!')
  process.exit()
})

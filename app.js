const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})

const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

// router.post('/login')

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  return User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('This email has been registered!')
        res.render('register', { name, email, password, confirmPassword})
      } else {
        return User.create({
          name,
          email,
          password
        })
      }
    })
    .then(() => res.render('login', { email }))
    .catch(err => console.log(err))
})

// router.get('/logout')

module.exports = router
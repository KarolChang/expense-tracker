const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login', { email: req.session.email })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的!'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經被註冊過了!'})
        res.render('register', { name, email, password, confirmPassword, errors })
      }
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
    })
    .then(() => {
      req.session.email = req.body.email
      req.flash('success_msg', `${req.body.email}註冊成功!`)
      res.redirect('/users/login')
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出!')
  req.session.email = ''
  res.redirect('/users/login')
})

module.exports = router
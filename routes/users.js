const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utilities/catchAsync')
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', 
    {failureFlash: true, failureRedirect: '/login', keepSessionInfo: true}), users.login)

router.get('/logout', users.logout)

module.exports = router
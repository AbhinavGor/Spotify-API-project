const express = require('express')
const passport = require('passport')

const isLoggedIn = require('../Middleware/auth')

const router = express.Router()

router.get('/welcome', (req, res) => {
    res.render('landing')
})
router.get('/', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('dashboard', {user: req.user})
    // res.send({"message":`Hello ${req.user.displayName}!`, user: req.user})
})

router.get('/error', (req, res) => res.send("Unknown Error"))

router.get('/spotify', passport.authenticate('spotify'))

router.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/auth/error'}),
    function(req, res){
        res.redirect('/auth')
})

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout(); 
    res.redirect('/');
})

module.exports = router
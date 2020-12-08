const express = require('express')
const cookieSession = require('cookie-session')

const passport = require('passport')
require ('./passport')

const isLoggedIn = require('./Middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', isLoggedIn, (req, res) => {
    res.send({"message":`Hello ${req.user.displayName}!`, user: req.user})
})

app.get('/auth/error', (req, res) => res.send("Unknown Error"))

app.get('/auth/spotify', passport.authenticate('spotify'))

app.get('/auth/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/auth/error'}),
    function(req, res){
        res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout(); 
    res.redirect('/');
})

app.listen(PORT, () => console.log(`Server lisening to Kygo on port ${PORT}.`))
const express = require('express')
const https = require('https')
const axios = require('axios');

const isLoggedIn = require('../Middleware/auth')
const User = require('../models/User')

const router = express.Router()

router.get('/artists', isLoggedIn,  async (req, res) => {
    const foundUser = await User.findOne({ spotifyID: req.user.id})

    let data = await axios.get('https://api.spotify.com/v1/me/top/artists', { headers: { Authorization: 'Bearer ' + foundUser.accessToken } })
    let artists = data.data

    console.log(artists.items[0])

    res.render('artists', {artists, user: req.user})
})

router.get('/tracks', isLoggedIn,  async (req, res) => {
    const foundUser = await User.findOne({ spotifyID: req.user.id})
    
    let data = await axios.get('https://api.spotify.com/v1/me/top/tracks', { headers: { Authorization: 'Bearer ' + foundUser.accessToken } })
    let tracks = data.data

    console.log(tracks)

    res.send(tracks)
})

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout(); 
    res.redirect('/');
})

module.exports = router
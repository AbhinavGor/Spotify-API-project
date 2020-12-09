const express = require('express')
const https = require('https')
const axios = require('axios');

const isLoggedIn = require('../Middleware/auth')
const User = require('../models/User')

const router = express.Router()

// axios.get('https://api.spotify.com/v1/me/top/artists')
//   .then(response => {
//     global artists = response;
//   })
//   .catch(error => {
//     console.log(error);
// });

async function getArtists(token) {
    const authStr = "Bearer " + token
    try {
        let res = await axios.get('https://api.spotify.com/v1/me/top/artists', { headers: { Authorization: authStr } })
  
        let data = res.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        // res.send(error)
    }
  }

router.get('/', async (req, res) => {
    const foundUser = await User.findOne({ spotifyID: req.user.id})

    const artists = getArtists(foundUser.accessToken);

    console.log(foundUser)
    res.send(getArtists(foundUser.accessToken))
})

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout(); 
    res.redirect('/');
})

module.exports = router
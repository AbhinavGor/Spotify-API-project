const express = require('express')
const https = require('https')
const axios = require('axios');

const isLoggedIn = require('../Middleware/auth')

const router = express.Router()

// axios.get('https://api.spotify.com/v1/me/top/artists')
//   .then(response => {
//     global artists = response;
//   })
//   .catch(error => {
//     console.log(error);
// });

async function getArtists() {

    try {
        let res = await axios.get('https://api.spotify.com/v1/me/top/artists')
  
        let data = res.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        res.send(error)
    }
  }

router.get('/', (req, res) => {
    const artists = getArtists();
    res.send(artists)
})

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout(); 
    res.redirect('/');
})

module.exports = router
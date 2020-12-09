const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    spotifyID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
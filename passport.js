require('dotenv').config()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/spotify/callback"
},
function (accessToken,  refreshToken, profile, done){
    return done(null, profile)
}
))
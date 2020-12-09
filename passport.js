require('dotenv').config()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

const User = require('./models/User')

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
    User.findOne({spotifyID: profile.id}, (err, user) => {
        if(err){
            return done(err)
        }
        if(!user){
            const user = new User({
                spotifyID: profile.id,
                name: profile.displayName,
                accessToken: accessToken
            });

            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else{
            user.accessToken = accessToken
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
            
            return(err, user)
        }
    })
    // console.log(accessToken)
    return done(null, profile, accessToken)
}
))
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if(currentUser){
                done(null, currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    email: profile._json.email,
                    strategy: 'google',
                    id: profile.id,
                    picture: profile._json.picture,
                    refreshToken: refreshToken,
                }).save().then((newUser) => {
                    done(null, newUser)
                })
            }
        })
    })
)
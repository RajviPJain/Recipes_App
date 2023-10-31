const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const db = require("../config/db");
var User = db.user;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
    //   console.log(profile);
      const registerUser=await User.findOrCreate({
        where:{
            email:profile.email
        },
        defaults: {
            email:profile.email,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
            username:profile.displayName,
            imageurl:profile.photos[0].value

          }
      })

      console.log(registerUser[0].id)
      
      const user={
        id:registerUser[0].id,username:profile.displayName
      }
      console.log(user)
      // console.log("AccessToken", accessToken);
      // console.log("RefreshToken", refreshToken);

      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = { passport };
const db = require("../config/db");
const passport = require("passport");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");

opts.secretOrKey = process.env.JWT_SECRET_KEY;

var User = db.user;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    const user = await User.findOne({
      attributes: ["id", "username"],
      where: { id: jwt_payload.id },
    });
    // console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = { passport };

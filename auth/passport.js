const passport = require("passport");

const passportJWT = require("passport-jwt");

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;
const db = require("../services/users");

const config = {};
config.secretOrKey = process.env.JWT_SECRET || "your_jwt_secret";
config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("authorization");

passport.use(
  new JwtStrategy(config, async (jwtPayload, done) => {
    try {
      const user = await db.getUserById(jwtPayload.userId);
      console.log("USERIDPASSPORT", user);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (e) {
      return done(e, false);
    }
  })
);

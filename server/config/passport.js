const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("./database");
const User = connection.models.User;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

passport.use(new LocalStrategy(customFields, async (username, password, done) => {
    try {
        //   user = await User.findOne({ username: username });
          if (!user) { return done(null, false); }
          
          bcrypt.compare(password, user.passwordHash, (err, isValid) => {
              if (err) throw err;
              if (isValid) {
                  return done(null, user);
              } else {
                  return done(null, false);
              }
          });
    } catch (err) {
           return done(err);
    }                                                                               
 }));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    user = User.findById(userId)
               .then((user) => {
                   console.log(user)
                   done(null, user);
               })
               .catch(err => done(err))
})
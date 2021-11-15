const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/sql");
const scripts = require('../db/scripts')
const customFields = {
  usernameField: "username",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFields, (username, password, done) => {

    db.get(scripts.GET_USER_BY_USERNAME, username, (err, row) => {
        if (!row) return done(null, false);
        console.log(row.password)
        bcrypt.compare(password, row.password, (err, isValid) => {
          if (err) throw err;
          if (isValid) {
            console.log('Password is valid')
            return done(null, row);
          } else {
            console.log('Password is valid')
            return done(null, false, { message: "Incorrect username or password"});
          }
        });
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  db.get(`SELECT username FROM users WHERE username = ?`, username, function (err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});

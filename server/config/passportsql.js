const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("./database");
const User = connection.models.User;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

// function hashPassword(password, salt) {
//     var hash = crypto.createHash('sha256');
//     hash.update(password);
//     hash.update(salt);
//     return hash.digest('hex');
//   }
  
passport.use(new LocalStrategy(function(username, password, done) {
    db.get('SELECT password FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    bcrypt.compare(password, row.password, (err, isValid) => {
    if (err) throw err;
    if (isValid) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});
//   db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
//     if (!row) return done(null, false);
//     return done(null, row);
//   });
});
}));
  

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    db.get('SELECT id, email FROM users WHERE id = ?', id, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
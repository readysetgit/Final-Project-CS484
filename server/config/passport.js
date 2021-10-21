const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("./database");
const User = connection.models.User;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = async (username, password, done) => {
  try {
        user = await User.findOne({ username: username });
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
};

// const verifyCallback = (username, password, done) => {
//   User.findOne({ username: username })
//     .then((user) => {
//       if (!user) {
//         return done(null, false);
//       }
//       bcrypt.compare(password, user.passwordHash, (err, isValid) => {
//         if (err) {
//           return done(err);
//         }
//         if (isValid) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return done(err);
//     });
// };

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('We are in serialize')
    console.log(user)
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    console.log('We are in deserialize')
    console.log(userId)
    user = User.findById(userId)
               .then((user) => {
                   console.log(user)
                   done(null, user);
               })
               .catch(err => done(err))
})
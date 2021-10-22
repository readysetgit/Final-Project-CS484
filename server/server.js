const express = require("express");
const session = require("express-session");
const passport = require("passport");
const generatePasswordHash =
  require("./lib/passwordUtils").generatePasswordHash;
const path = require("path");
const PORT = process.env.PORT || 3001;
const bcrypt = require("bcrypt");

const connection = require("./config/database");
const MongoStore = require("connect-mongo")(session);
const User = connection.models.User;

// Normally we'd use a ".env" file, but for this assignment, we're using an env.json file instead
const env = require("./env.json");
// require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

//----------------------------- SESSION --------------------------------
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

//---------------------- PASSPORT AUTHENTICATION ---------------------
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// ------------------------- ROUTES ----------------------------------

app.get("/authenticate", (req, res, next) => {
  // Checks if the user is currently logged in on passportjs
  if (req.user) {
    res.send({ isLoggedIn: true });
  } else {
    res.send({ isLoggedIn: false });
  }
});
// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send("Incorrect username or password");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: req.user.username, name: req.user.name });
        //console.log(req.user)
      });
    }
  })(req, res, next);
});

//logout
app.post("/logout", (req, res, next) => {
  req.logOut();
  res.send("Logged out");
});

// Signup
app.post("/signup", (req, res, next) => {
  // check if username exists
  let userobj = await User.findOne({ username: req.body.username });
  if (userobj !== null) {
    res.send({ error: "Username is taken, try logging in" });
    return;
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      // creates a new user objects
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash: hash,
      });

      // Saves to mongodb database
      newUser.save().then((user) => {
        //console.log(user);
        res.send({ username: user.username, name: user.name });
      });
    });
  }
});

// Update User Details
app.put("/update", async (req, res) => {
  User.updateOne(
    { username: req.user.username },
    { $set: { name: req.body.name } }
  )
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete User
app.delete("/delete", (req, res) => {
  User.findOneAndRemove({ username: req.user.username }).then((r) => {
    req.logOut();
    //console.log(r)
    res.send("Successfully Deleted User");
  });
});

app.get("/dashboard", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.redirect("/login");
      res.status(401).send("Unauthorized");
      // res.status(401).sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
      });
    }
  })(req, res, next);
});

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
// --------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const bcrypt = require("bcrypt");
const db = require('./db/sql')
const SQLiteStore = require("connect-sqlite3")(session);
const path = require('path')
const db_path = path.join(__dirname, "./db/");
const env = require("./env.json"); 
// Normally we'd use a ".env" file, but for this assignment, we're using an env.json file instead
// require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
const scripts = require("./db/scripts");
app.use(
  cors({
    origin: "http://localhost:3000", // location of the react app we are connecting to
    credentials: true,
  })
);

//----------------------------- SESSION --------------------------------------------------

app.use(
  session({
    secret: env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({
      table:'sessions',
      dir: db_path,
      db: 'sessionsDB.db'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    }
  })
);

//---------------------- PASSPORT AUTHENTICATION ------------------------------------------------
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());


// ------------------------- ROUTES ---------------------------------------------------------

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send({error: info});
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: user.username, name: user.name });
      });
    }
  })(req, res, next);
});

// Logout
app.post("/logout", (req, res, next) => {
  req.logOut();
  res.send("Logged out");
});

// Signup
app.post("/signup", async (req, res, next) => {
  db.get(scripts.GET_USER_BY_USERNAME, req.body.username, (err, row) => {
    if (row !== undefined) {
        res.status(403).send({ error: "Username is taken, try logging in" });
        return;
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          db.run(scripts.ADD_USER, req.body.username, hash, req.body.name, (err, newrow) => {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`Added new user with username ${req.body.username}`);
            res.send({ username: req.body.username, name: req.body.name });
          });
        });
      }
  })
});

// Update User Details
// app.put("/update", async (req, res) => {
  // User.updateOne(
  //   { username: req.user.username },
  //   { $set: { name: req.body.name } }
  // )
  //   .then((data) => {
  //     console.log(data);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
// });

// Delete User
app.delete("/delete", (req, res) => {
  db.run(scripts.DELETE_ACCOUNT_BY_USERNAME, req.user.username, (err) => {
    req.logOut();
    res.send("Successfully Deleted User");
  })
});

// Authenticate User
app.get("/authenticate", (req, res, next) => {
  // Checks if the user is currently logged in
  console.log(req)
  if (req.user) {
    res.send({ isLoggedIn: true , username: req.user.username, name: req.user.name });
  } else {
    res.send({ isLoggedIn: false });
  }
});

// Add location by username and place_id
app.post("/addlocation", (req, res, next) => {
  db.run(scripts.ADD_NEW_LOCATION, req.bodylat, req.body.lng, req.body.location_details, req.body.like_num, req.body.dislike_num, (err, row) => {
    console.log(row)
    db.run(scripts.ADD_LOCATION_BY_PLACE_ID_USERNAME, row.location_id, req.user.username, (err, newrow) => {
      if (err) throw err;
      res.send(newrow)
    })
  })
})

// Delete location by username and place_id
app.delete("/deletelocation", (req, res, next) => {
  db.run(scripts.DELETE_LOCATION_BY_USERNAME_LOCATION_ID, req.user.username, req.body.location_id, (err) => {
    if (err) throw err
    res.send("Successfully deleted location")
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;